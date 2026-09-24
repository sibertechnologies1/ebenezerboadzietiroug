import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/Admin/DashboardLayout';
import { 
  BiEnvelope, 
  BiCheckCircle, 
  BiFolder, 
  BiTrash, 
  BiSearch,
  BiRefresh,
  BiArrowBack,
  BiSave,
  BiCheck,
  BiCloudUpload,
  BiPlus
} from 'react-icons/bi';
import { supabase } from '../supabaseClient';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Content Management State
  const [selectedPage, setSelectedPage] = useState('home');
  const [sections, setSections] = useState([]);
  const [savingId, setSavingId] = useState(null);
  const [isSavingAll, setIsSavingAll] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(null);
  const [uploadingKey, setUploadingKey] = useState(null);

  // Helper to parse strings back to JSON objects or arrays if valid
  const parseJsonIfPossible = (val) => {
    if (typeof val === 'string') {
      const trimmed = val.trim();
      if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
        try {
          return JSON.parse(trimmed);
        } catch (e) {
          return val;
        }
      }
    }
    return val;
  };

  // Process whole content structure before database upload
  const cleanContentForSave = (content) => {
    if (Array.isArray(content)) {
      return content.map(item => {
        const cleaned = {};
        Object.entries(item).forEach(([k, v]) => {
          cleaned[k] = parseJsonIfPossible(v);
        });
        return cleaned;
      });
    }

    if (typeof content === 'object' && content !== null) {
      const cleaned = {};
      Object.entries(content).forEach(([k, v]) => {
        cleaned[k] = parseJsonIfPossible(v);
      });
      return cleaned;
    }

    return content;
  };

  // Fetch Page Sections
  const fetchSections = async (page) => {
    const { data, error } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page', page);

    if (!error && data) {
      setSections(data);
    }
  };

  useEffect(() => {
    if (activeTab === 'content') {
      fetchSections(selectedPage);
    }
  }, [activeTab, selectedPage]);

  // Update field inside single section object content
  const handleContentChange = (sectionId, fieldKey, value) => {
    setSections(prev => prev.map(sec => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          content: { ...sec.content, [fieldKey]: value }
        };
      }
      return sec;
    }));
  };

  // Update item inside section array content
  const handleArrayItemChange = (sectionId, index, fieldKey, value) => {
    setSections(prev => prev.map(sec => {
      if (sec.id === sectionId && Array.isArray(sec.content)) {
        const updatedArray = [...sec.content];
        updatedArray[index] = {
          ...updatedArray[index],
          [fieldKey]: value
        };
        return { ...sec, content: updatedArray };
      }
      return sec;
    }));
  };

  // Add a new item to an array section
  const handleAddArrayItem = (sectionId) => {
    setSections(prev => prev.map(sec => {
      if (sec.id === sectionId && Array.isArray(sec.content)) {
        const sampleItem = sec.content[0] ? { ...sec.content[0] } : {};
        const newItem = {};
        Object.keys(sampleItem).forEach(key => {
          newItem[key] = key === 'id' ? Date.now() : Array.isArray(sampleItem[key]) ? [] : '';
        });
        return { ...sec, content: [...sec.content, newItem] };
      }
      return sec;
    }));
  };

  // Remove an item from an array section
  const handleRemoveArrayItem = (sectionId, index) => {
    setSections(prev => prev.map(sec => {
      if (sec.id === sectionId && Array.isArray(sec.content)) {
        const updatedArray = sec.content.filter((_, i) => i !== index);
        return { ...sec, content: updatedArray };
      }
      return sec;
    }));
  };

  // Upload image to Supabase Storage and update field
  const handleImageUpload = async (event, sectionId, fieldKey, index = null) => {
    const file = event.target.files[0];
    if (!file) return;

    const uploadIdentifier = index !== null ? `${sectionId}-${index}-${fieldKey}` : `${sectionId}-${fieldKey}`;

    try {
      setUploadingKey(uploadIdentifier);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(filePath);

      if (index !== null) {
        handleArrayItemChange(sectionId, index, fieldKey, data.publicUrl);
      } else {
        handleContentChange(sectionId, fieldKey, data.publicUrl);
      }
    } catch (err) {
      alert('Image upload failed: ' + err.message);
    } finally {
      setUploadingKey(null);
    }
  };

  // Save single modified section back to Supabase
  const saveSection = async (section) => {
    setSavingId(section.id);
    
    const cleanedContent = cleanContentForSave(section.content);

    const { error } = await supabase
      .from('page_sections')
      .update({ content: cleanedContent, updated_at: new Date().toISOString() })
      .eq('id', section.id);

    setSavingId(null);
    if (!error) {
      setSaveSuccess(section.id);
      setTimeout(() => setSaveSuccess(null), 3000);
      fetchSections(selectedPage);
    } else {
      alert('Error updating section: ' + error.message);
    }
  };

  // Save all sections on the current page at once
  const saveAllSections = async () => {
    setIsSavingAll(true);
    try {
      for (const section of sections) {
        const cleanedContent = cleanContentForSave(section.content);
        const { error } = await supabase
          .from('page_sections')
          .update({ content: cleanedContent, updated_at: new Date().toISOString() })
          .eq('id', section.id);
        if (error) throw error;
      }
      setSaveSuccess('all');
      setTimeout(() => setSaveSuccess(null), 3000);
      fetchSections(selectedPage);
    } catch (err) {
      alert('Error saving all sections: ' + err.message);
    } finally {
      setIsSavingAll(false);
    }
  };

  // Fetch messages from Supabase
  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMessages(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleReadStatus = async (msg) => {
    const updatedStatus = !msg.read;
    const { error } = await supabase
      .from('messages')
      .update({ read: updatedStatus })
      .eq('id', msg.id);

    if (!error) {
      setMessages(messages.map(m => m.id === msg.id ? { ...m, read: updatedStatus } : m));
      if (selectedMessage?.id === msg.id) {
        setSelectedMessage({ ...selectedMessage, read: updatedStatus });
      }
    }
  };

  const deleteMessage = async (id) => {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);

    if (!error) {
      setMessages(messages.filter(m => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    }
  };

  const filteredMessages = messages.filter(m => 
    (m.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.subject || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-teal-800 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-900">Total Messages</span>
                <div className="p-2.5 bg-sky-50 rounded-xl text-sky-500 border border-slate-900">
                  <BiEnvelope className="text-xl" />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-teal-900 tracking-tight">{messages.length}</p>
            </div>

            <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-teal-800 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-900">Unread Inquiries</span>
                <div className="p-2.5 bg-sky-50 rounded-xl text-sky-500 border border-slate-900">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500 block animate-pulse"></span>
                </div>
              </div>
              <p className="text-3xl font-extrabold text-teal-900 tracking-tight">{unreadCount}</p>
            </div>

            <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-teal-800 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-900">Active Projects</span>
                <div className="p-2.5 bg-sky-50 rounded-xl text-sky-500 border border-slate-900">
                  <BiFolder className="text-xl" />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-teal-900 tracking-tight">4</p>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-teal-900 tracking-tight">Recent Inquiries</h3>
              <button 
                onClick={() => setActiveTab('messages')} 
                className="text-xs font-semibold text-sky-500 hover:text-sky-600 transition"
              >
                View All
              </button>
            </div>

            {loading ? (
              <p className="text-xs text-teal-800 py-4 text-center">Loading messages...</p>
            ) : messages.length === 0 ? (
              <p className="text-xs text-teal-800 py-4 text-center">No messages found.</p>
            ) : (
              <div className="space-y-3">
                {messages.slice(0, 3).map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => {
                      setSelectedMessage(item);
                      setActiveTab('messages');
                    }}
                    className="p-4 bg-white border-2 border-slate-900 hover:border-sky-500 rounded-xl flex items-center justify-between gap-4 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.read ? 'bg-transparent' : 'bg-sky-500'}`} />
                      <div className="truncate">
                        <p className="text-sm font-semibold text-teal-900 truncate">{item.subject || 'No Subject'}</p>
                        <p className="text-xs text-teal-800 truncate">{item.name} • {item.email}</p>
                      </div>
                    </div>
                    <span className="text-xs text-teal-800 whitespace-nowrap font-mono">
                      {item.created_at ? new Date(item.created_at).toLocaleDateString() : item.date}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* PAGE CONTENT EDITOR TAB */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          {/* Page Selector Navigation & Global Save Bar */}
          <div className="sticky top-0 z-30 bg-slate-50 pt-2 pb-4 border-b-2 border-slate-900 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto">
              {['home', 'about', 'portfolio', 'contact'].map((page) => (
                <button
                  key={page}
                  onClick={() => setSelectedPage(page)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                    selectedPage === page
                      ? 'bg-teal-900 text-white shadow-md'
                      : 'bg-white text-teal-900 border-2 border-slate-900 hover:bg-sky-50'
                  }`}
                >
                  {page} Page
                </button>
              ))}
            </div>

            <button
              onClick={saveAllSections}
              disabled={isSavingAll}
              className="inline-flex items-center gap-2 bg-teal-800 hover:bg-teal-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-md disabled:opacity-50 whitespace-nowrap shrink-0"
            >
              {saveSuccess === 'all' ? (
                <>
                  <BiCheck className="text-lg" />
                  <span>All Saved!</span>
                </>
              ) : (
                <>
                  <BiSave className="text-base text-white" />
                  <span>{isSavingAll ? 'Saving All...' : 'Save All Changes'}</span>
                </>
              )}
            </button>
          </div>

          {/* Section Editors */}
          <div className="space-y-6">
            {sections.length === 0 ? (
              <div className="bg-white border-2 border-slate-900 rounded-2xl p-8 text-center text-teal-900 text-xs font-semibold">
                No sections defined for this page yet.
              </div>
            ) : (
              sections.map((section) => (
                <div key={section.id} className="bg-white border-2 border-slate-900 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
                    <h3 className="text-base font-bold text-teal-900 tracking-tight">
                      {section.title || section.section_name || section.section_id?.toUpperCase()}
                    </h3>
                    <button
                      onClick={() => saveSection(section)}
                      disabled={savingId === section.id}
                      className="inline-flex items-center gap-2 bg-teal-800 hover:bg-teal-900 text-white font-semibold px-4 py-2 rounded-xl text-xs transition shadow-sm disabled:opacity-50"
                    >
                      {saveSuccess === section.id ? (
                        <>
                          <BiCheck className="text-lg text-white" />
                          <span>Saved!</span>
                        </>
                      ) : (
                        <>
                          <BiSave className="text-base text-white" />
                          <span>{savingId === section.id ? 'Saving...' : 'Save Section'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Array Section Content */}
                  {Array.isArray(section.content) ? (
                    <div className="space-y-4">
                      {section.content.map((item, index) => (
                        <div key={item.id || index} className="p-4 bg-slate-50 border-2 border-slate-900 rounded-xl space-y-4 relative">
                          <div className="flex items-center justify-between border-b border-slate-300 pb-2">
                            <span className="text-xs font-bold text-teal-900 uppercase">
                              Item #{index + 1}: {item.title || item.name || 'Untitled'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveArrayItem(section.id, index)}
                              className="text-red-500 hover:text-red-700 p-1 rounded-lg transition"
                              title="Delete Item"
                            >
                              <BiTrash className="text-lg" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 gap-4">
                            {Object.entries(item).map(([fieldKey, fieldValue]) => {
                              if (fieldKey === 'id') return null;

                              const isImage = fieldKey.toLowerCase().includes('image') || fieldKey.toLowerCase().includes('url');
                              const isArrayValue = Array.isArray(fieldValue);
                              const uploadId = `${section.id}-${index}-${fieldKey}`;

                              return (
                                <div key={fieldKey} className="space-y-1.5">
                                  <label className="text-xs font-bold uppercase tracking-wider text-teal-900">
                                    {fieldKey.replace(/([A-Z])/g, ' $1')}
                                  </label>

                                  {isImage ? (
                                    <div className="space-y-3 bg-white border-2 border-slate-900 rounded-xl p-4">
                                      {fieldValue && (
                                        <img 
                                          src={fieldValue} 
                                          alt="Preview" 
                                          className="w-32 h-32 object-cover rounded-lg border-2 border-slate-900" 
                                        />
                                      )}
                                      <div className="flex items-center gap-3">
                                        <label className="cursor-pointer inline-flex items-center gap-2 bg-teal-900 text-white font-semibold px-4 py-2 rounded-xl text-xs hover:bg-teal-800 transition">
                                          <BiCloudUpload className="text-lg" />
                                          <span>{uploadingKey === uploadId ? 'Uploading...' : 'Upload Image'}</span>
                                          <input 
                                            type="file" 
                                            accept="image/*" 
                                            className="hidden" 
                                            onChange={(e) => handleImageUpload(e, section.id, fieldKey, index)}
                                            disabled={uploadingKey === uploadId}
                                          />
                                        </label>
                                        <span className="text-[11px] text-teal-800 font-mono truncate">{fieldValue}</span>
                                      </div>
                                    </div>
                                  ) : isArrayValue ? (
                                    <input
                                      type="text"
                                      value={fieldValue.join(', ')}
                                      onChange={(e) => {
                                        const valuesArray = e.target.value.split(',').map(s => s.trim());
                                        handleArrayItemChange(section.id, index, fieldKey, valuesArray);
                                      }}
                                      placeholder="Separate items with commas"
                                      className="w-full bg-white border-2 border-slate-900 rounded-xl p-3 text-xs text-teal-900 font-medium focus:outline-none focus:border-sky-500 transition"
                                    />
                                  ) : typeof fieldValue === 'string' && fieldValue.length > 60 ? (
                                    <textarea
                                      rows={3}
                                      value={fieldValue}
                                      onChange={(e) => handleArrayItemChange(section.id, index, fieldKey, e.target.value)}
                                      className="w-full bg-white border-2 border-slate-900 rounded-xl p-3 text-xs text-teal-900 font-medium focus:outline-none focus:border-sky-500 transition"
                                    />
                                  ) : (
                                    <input
                                      type="text"
                                      value={typeof fieldValue === 'object' ? JSON.stringify(fieldValue) : fieldValue}
                                      onChange={(e) => handleArrayItemChange(section.id, index, fieldKey, e.target.value)}
                                      className="w-full bg-white border-2 border-slate-900 rounded-xl p-3 text-xs text-teal-900 font-medium focus:outline-none focus:border-sky-500 transition"
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => handleAddArrayItem(section.id)}
                        className="w-full py-3 border-2 border-dashed border-slate-900 rounded-xl text-teal-900 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition flex items-center justify-center gap-2"
                      >
                        <BiPlus className="text-lg" /> Add New Item
                      </button>
                    </div>
                  ) : (
                    /* Standard Single Object Form Fields with Nested Array Handling */
                    <div className="grid grid-cols-1 gap-4">
                      {Object.entries(section.content || {}).map(([key, val]) => {
                        const isImage = key.toLowerCase().includes('image') || key.toLowerCase().includes('url');
                        const isNestedArray = Array.isArray(val);

                        return (
                          <div key={key} className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-teal-900">
                              {key.replace(/([A-Z])/g, ' $1')}
                            </label>

                            {/* 1. Image Upload */}
                            {isImage ? (
                              <div className="space-y-3 bg-slate-50 border-2 border-slate-900 rounded-xl p-4">
                                {val && (
                                  <img 
                                    src={val} 
                                    alt="Preview" 
                                    className="w-32 h-32 object-cover rounded-lg border-2 border-slate-900" 
                                  />
                                )}
                                <div className="flex items-center gap-3">
                                  <label className="cursor-pointer inline-flex items-center gap-2 bg-teal-900 text-white font-semibold px-4 py-2 rounded-xl text-xs hover:bg-teal-800 transition">
                                    <BiCloudUpload className="text-lg" />
                                    <span>{uploadingKey === `${section.id}-${key}` ? 'Uploading...' : 'Upload Image'}</span>
                                    <input 
                                      type="file" 
                                      accept="image/*" 
                                      className="hidden" 
                                      onChange={(e) => handleImageUpload(e, section.id, key)}
                                      disabled={uploadingKey === `${section.id}-${key}`}
                                    />
                                  </label>
                                  <span className="text-[11px] text-teal-800 font-mono truncate">{val}</span>
                                </div>
                              </div>
                            ) : 

                            /* 2. Nested Array of Objects or Strings (Skills, Contact Details, Stats, etc.) */
                            isNestedArray ? (
                              <div className="space-y-3 p-4 bg-slate-50 border-2 border-slate-900 rounded-xl">
                                {val.map((item, itemIdx) => (
                                  <div key={itemIdx} className="p-3 bg-white border border-slate-300 rounded-lg space-y-2 relative">
                                    <div className="flex justify-between items-center border-b pb-1">
                                      <span className="text-[10px] font-bold text-teal-900 uppercase">Item #{itemIdx + 1}</span>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const updatedArray = val.filter((_, i) => i !== itemIdx);
                                          handleContentChange(section.id, key, updatedArray);
                                        }}
                                        className="text-red-500 hover:text-red-700 p-1"
                                      >
                                        <BiTrash className="text-sm" />
                                      </button>
                                    </div>

                                    {typeof item === 'object' && item !== null ? (
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {Object.entries(item).map(([subKey, subVal]) => (
                                          <div key={subKey} className="space-y-1">
                                            <span className="text-[10px] font-semibold text-slate-600 capitalize">
                                              {subKey.replace(/([A-Z])/g, ' $1')}
                                            </span>
                                            <input
                                              type="text"
                                              value={subVal ?? ''}
                                              onChange={(e) => {
                                                const updatedArray = [...val];
                                                updatedArray[itemIdx] = { ...updatedArray[itemIdx], [subKey]: e.target.value };
                                                handleContentChange(section.id, key, updatedArray);
                                              }}
                                              className="w-full bg-white border border-slate-400 rounded-lg p-2 text-xs text-teal-900 focus:outline-none focus:border-sky-500"
                                            />
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => {
                                          const updatedArray = [...val];
                                          updatedArray[itemIdx] = e.target.value;
                                          handleContentChange(section.id, key, updatedArray);
                                        }}
                                        className="w-full bg-white border border-slate-400 rounded-lg p-2 text-xs text-teal-900"
                                      />
                                    )}
                                  </div>
                                ))}

                                <button
                                  type="button"
                                  onClick={() => {
                                    const sample = val[0] ? { ...val[0] } : {};
                                    const newItem = typeof val[0] === 'object' 
                                      ? Object.keys(sample).reduce((acc, k) => ({ ...acc, [k]: '' }), {}) 
                                      : '';
                                    handleContentChange(section.id, key, [...val, newItem]);
                                  }}
                                  className="w-full py-2 border border-dashed border-teal-900 rounded-lg text-teal-900 font-bold text-xs hover:bg-white transition flex items-center justify-center gap-1"
                                >
                                  <BiPlus className="text-base" /> Add {key.replace(/([A-Z])/g, ' $1')}
                                </button>
                              </div>
                            ) : 

                            /* 3. Boolean Checkbox */
                            typeof val === 'boolean' ? (
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={val}
                                  onChange={(e) => handleContentChange(section.id, key, e.target.checked)}
                                  className="w-4 h-4 text-sky-500 border-2 border-slate-900 rounded focus:ring-0"
                                />
                                <span className="text-xs text-teal-900 font-semibold">Visible on website</span>
                              </div>
                            ) : 

                            /* 4. Textarea for Longer Text */
                            typeof val === 'string' && val.length > 60 ? (
                              <textarea
                                rows={4}
                                value={val}
                                onChange={(e) => handleContentChange(section.id, key, e.target.value)}
                                className="w-full bg-white border-2 border-slate-900 rounded-xl p-3 text-xs text-teal-900 font-medium focus:outline-none focus:border-sky-500 transition"
                              />
                            ) : (

                            /* 5. Standard Text Input */
                              <input
                                type="text"
                                value={val ?? ''}
                                onChange={(e) => handleContentChange(section.id, key, e.target.value)}
                                className="w-full bg-white border-2 border-slate-900 rounded-xl p-3 text-xs text-teal-900 font-medium focus:outline-none focus:border-sky-500 transition"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* MESSAGES TAB */}
      {activeTab === 'messages' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className={`lg:col-span-5 space-y-4 ${selectedMessage ? 'hidden lg:block' : 'block'}`}>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <BiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sky-500 text-lg" />
                <input 
                  type="text" 
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border-2 border-slate-900 rounded-xl pl-10 pr-4 py-2.5 text-xs text-teal-900 placeholder-teal-800/60 focus:outline-none focus:border-sky-500 transition shadow-sm font-medium"
                />
              </div>
              <button 
                onClick={fetchMessages} 
                className="p-2.5 bg-white border-2 border-slate-900 text-sky-500 hover:bg-sky-50 rounded-xl transition shadow-sm"
                title="Refresh Messages"
              >
                <BiRefresh className="text-lg" />
              </button>
            </div>

            <div className="space-y-2.5">
              {filteredMessages.length === 0 ? (
                <div className="p-8 text-center text-xs font-semibold text-teal-900 bg-white border-2 border-slate-900 rounded-2xl shadow-sm">
                  No matching messages.
                </div>
              ) : (
                filteredMessages.map((msg) => (
                  <div 
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`
                      p-4 rounded-2xl border-2 border-slate-900 cursor-pointer transition duration-200 space-y-2
                      ${selectedMessage?.id === msg.id 
                        ? 'bg-sky-50 border-sky-500 shadow-sm' 
                        : 'bg-white hover:bg-slate-50 shadow-sm'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-teal-900 truncate">{msg.name}</span>
                      <span className="text-[11px] text-teal-800 font-mono">
                        {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : msg.date}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-teal-900 truncate">{msg.subject || 'No Subject'}</p>
                    <p className="text-xs text-teal-800 line-clamp-2">{msg.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className={`lg:col-span-7 ${!selectedMessage ? 'hidden lg:block' : 'block'}`}>
            {selectedMessage ? (
              <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 shadow-sm space-y-6">
                <button 
                  onClick={() => setSelectedMessage(null)}
                  className="lg:hidden flex items-center gap-1.5 text-xs text-sky-500 font-medium mb-2"
                >
                  <BiArrowBack className="text-sm text-sky-500" />
                  <span>Back to all messages</span>
                </button>

                <div className="flex items-start justify-between gap-4 border-b-2 border-slate-900 pb-6">
                  <div>
                    <h3 className="text-xl font-bold text-teal-900 tracking-tight">{selectedMessage.subject || 'No Subject'}</h3>
                    <p className="text-xs text-teal-800 mt-1">
                      From: <span className="text-teal-950 font-bold">{selectedMessage.name}</span> ({selectedMessage.email})
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => toggleReadStatus(selectedMessage)}
                      className="p-2 bg-white text-teal-900 hover:bg-teal-50 rounded-xl text-lg border-2 border-slate-900 transition"
                      title={selectedMessage.read ? "Mark as Unread" : "Mark as Read"}
                    >
                      <BiCheckCircle className={selectedMessage.read ? "text-emerald-500" : "text-sky-500"} />
                    </button>
                    <button 
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="p-2 bg-white text-teal-900 hover:text-red-500 rounded-xl text-lg border-2 border-slate-900 transition"
                      title="Delete Message"
                    >
                      <BiTrash className="text-teal-800 hover:text-red-500" />
                    </button>
                  </div>
                </div>

                <div className="text-sm text-teal-900 leading-relaxed min-h-[160px] whitespace-pre-wrap font-medium">
                  {selectedMessage.message}
                </div>

                <div className="pt-4 border-t-2 border-slate-900">
                  <a 
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Inquiry'}`}
                    className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-5 py-2.5 rounded-xl text-xs transition duration-200 shadow-md shadow-sky-500/20"
                  >
                    <BiEnvelope className="text-base text-white" />
                    Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white border-2 border-slate-900 rounded-2xl p-12 text-center text-teal-900 font-semibold text-xs shadow-sm">
                Select a message from the left to read its full content.
              </div>
            )}
          </div>
        </div>
      )}

      {/* PROJECTS TAB */}
      {activeTab === 'projects' && (
        <div className="bg-white border-2 border-slate-900 rounded-2xl p-8 text-center space-y-3 shadow-sm">
          <BiFolder className="text-4xl text-sky-500 mx-auto" />
          <h3 className="text-lg font-bold text-teal-900 tracking-tight">Projects Manager</h3>
          <p className="text-xs text-teal-800 max-w-sm mx-auto">
            Manage your project portfolio items directly.
          </p>
        </div>
      )}

      {/* SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="bg-white border-2 border-slate-900 rounded-2xl p-8 text-center space-y-3 shadow-sm">
          <h3 className="text-lg font-bold text-teal-900 tracking-tight">System Settings</h3>
          <p className="text-xs text-teal-800 max-w-sm mx-auto">
            Configure system options and API configurations.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}

export default AdminDashboard;