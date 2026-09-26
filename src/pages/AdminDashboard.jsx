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
  BiPlus,
  BiSend
} from 'react-icons/bi';
import { GoUnread } from "react-icons/go";
import emailjs from '@emailjs/browser';
import { supabase } from '../supabaseClient';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Email replying state
  const [replyText, setReplyText] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  // Content Management State
  const [selectedPage, setSelectedPage] = useState('home');
  const [sections, setSections] = useState([]);
  const [savingId, setSavingId] = useState(null);
  const [isSavingAll, setIsSavingAll] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(null);
  const [uploadingKey, setUploadingKey] = useState(null);

  // Projects Management State
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: 'Web Development',
    image_url: '',
    live_url: '',
    github_url: '',
    featured: false
  });

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

  // Process content structure before database upload
  const cleanContentForSave = (content) => {
    if (Array.isArray(content)) {
      return content.map((item) => {
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

  // Update field inside single section object content safely
  const handleContentChange = (sectionId, fieldKey, value) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id === sectionId) {
          return {
            ...sec,
            content: {
              ...(typeof sec.content === 'object' && sec.content !== null ? sec.content : {}),
              [fieldKey]: value
            }
          };
        }
        return sec;
      })
    );
  };

  // Update item inside section array content safely
  const handleArrayItemChange = (sectionId, index, fieldKey, value) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id === sectionId && Array.isArray(sec.content)) {
          const updatedArray = sec.content.map((item, i) =>
            i === index ? { ...item, [fieldKey]: value } : item
          );
          return { ...sec, content: updatedArray };
        }
        return sec;
      })
    );
  };

  // Add a new item to an array section
  const handleAddArrayItem = (sectionId) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id === sectionId && Array.isArray(sec.content)) {
          const sampleItem = sec.content[0] ? { ...sec.content[0] } : {};
          const newItem = {};
          Object.keys(sampleItem).forEach((key) => {
            newItem[key] = key === 'id' ? Date.now() : Array.isArray(sampleItem[key]) ? [] : '';
          });
          return { ...sec, content: [...sec.content, newItem] };
        }
        return sec;
      })
    );
  };

  // Remove an item from an array section
  const handleRemoveArrayItem = (sectionId, index) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id === sectionId && Array.isArray(sec.content)) {
          const updatedArray = sec.content.filter((_, i) => i !== index);
          return { ...sec, content: updatedArray };
        }
        return sec;
      })
    );
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

  // Save all sections on current page at once
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
  fetchProjects();

  const channel = supabase
    .channel('dashboard_updates')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, () => {
      fetchMessages();
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
      fetchProjects();
    })
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);

  const toggleReadStatus = async (msg) => {
    const updatedStatus = !msg.read;
    const { error } = await supabase
      .from('messages')
      .update({ read: updatedStatus })
      .eq('id', msg.id);

    if (!error) {
      setMessages(messages.map((m) => (m.id === msg.id ? { ...m, read: updatedStatus } : m)));
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
      setMessages(messages.filter((m) => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    }
  };

  const handleSelectMessage = (msg) => {
    setSelectedMessage(msg);
    setReplyText('');
    setStatusMsg(null);
    if (!msg.read) {
      toggleReadStatus(msg);
    }
  };

  // Fallback direct mail client launcher
  const handleMailtoReply = () => {
    if (!selectedMessage) return;
    const subject = encodeURIComponent(`Re: ${selectedMessage.subject || 'Inquiry'}`);
    const body = encodeURIComponent(`Hi ${selectedMessage.name},\n\n`);
    window.location.href = `mailto:${selectedMessage.email}?subject=${subject}&body=${body}`;
  };

  // Direct reply dispatch via EmailJS
  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedMessage) return;

    setSendingEmail(true);
    setStatusMsg(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      to_name: selectedMessage.name,
      to_email: selectedMessage.email,
      reply_message: replyText,
      original_subject: selectedMessage.subject,
      original_message: selectedMessage.message
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setStatusMsg({ type: 'success', text: `Reply sent successfully to ${selectedMessage.email}` });
      setReplyText('');
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to send. Opening default mail client...' });
      setTimeout(handleMailtoReply, 1200);
    } finally {
      setSendingEmail(false);
    }
  };

  const filteredMessages = messages.filter((m) =>
    (m.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.subject || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = messages.filter((m) => !m.read).length;

  // Fetch Projects from Supabase
// 1. Fetch projects on component mount (runs once when dashboard loads)
const fetchProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (!error && data) {
    setProjects(data);
  }
};

const projectsCount = projects.length;


  const handleSaveProject = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: projectForm.title || '',
      description: projectForm.description || '',
      category: projectForm.category || 'Web Development',
      image_url: projectForm.image_url || '',
      live_url: projectForm.live_url || '',
      github_url: projectForm.github_url || '',
      featured: Boolean(projectForm.featured)
    };

    if (editingProject?.id) {
      const { error } = await supabase
        .from('projects')
        .update(payload)
        .eq('id', editingProject.id);

      if (!error) {
        resetProjectForm();
        fetchProjects();
      } else {
        alert('Error updating project: ' + error.message);
      }
    } else {
      const { error } = await supabase
        .from('projects')
        .insert([payload]);

      if (!error) {
        resetProjectForm();
        fetchProjects();
      } else {
        alert('Error adding project: ' + error.message);
      }
    }
    setLoading(false);
  };



// Upload project cover image to Supabase Storage
const handleProjectImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    setUploadingKey('project-image');
    const fileExt = file.name.split('.').pop();
    const fileName = `projects/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio-assets')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('portfolio-assets')
      .getPublicUrl(fileName);

    setProjectForm((prev) => ({
      ...prev,
      image_url: data.publicUrl
    }));
  } catch (err) {
    alert('Project image upload failed: ' + err.message);
  } finally {
    setUploadingKey(null);
  }
};



  // Reset Form with safe defaults
  const resetProjectForm = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      description: '',
      category: 'Web Development',
      image_url: '',
      live_url: '',
      github_url: '',
      featured: false
    });
  };

  // Populate Edit Form avoiding null state injection
  const handleEditProject = (proj) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title || '',
      description: proj.description || '',
      category: proj.category || 'Web Development',
      image_url: proj.image_url || '',
      live_url: proj.live_url || '',
      github_url: proj.github_url || '',
      featured: Boolean(proj.featured)
    });
  };

  // Delete Project
  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchProjects();
        } else {
      alert('Error deleting project: ' + error.message);
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab} unreadCount={unreadCount}>
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 pb-10 space-y-4 sm:space-y-6">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              
              {/* Total Messages */}
              <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between text-teal-800 mb-2 sm:mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-900">Total Messages</span>
                  <div className="p-2 sm:p-2.5 bg-sky-50 rounded-xl text-sky-500 border border-slate-900">
                    <BiEnvelope className="text-lg sm:text-xl" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-teal-900 tracking-tight">{messages.length}</p>
              </div>

              {/* Unread Inquiries */}
              <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between text-teal-800 mb-2 sm:mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-900">Unread Inquiries</span>
                  <div className="p-2 sm:p-2.5 bg-sky-50 rounded-xl text-sky-500 border border-slate-900">
                    <GoUnread className="text-lg sm:text-xl" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-teal-900 tracking-tight">{unreadCount}</p>
              </div>

              {/* Active Projects */}
              <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between text-teal-800 mb-2 sm:mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-900">Active Projects</span>
                  <div className="p-2 sm:p-2.5 bg-sky-50 rounded-xl text-sky-500 border border-slate-900">
                    <BiFolder className="text-lg sm:text-xl" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-teal-900 tracking-tight">{projectsCount}</p>
              </div>

            </div>
          </div>
        )}

        {/* PAGE CONTENT EDITOR TAB */}
        {activeTab === 'content' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="sticky top-0 z-10 bg-white pb-3 pt-1 border-b-2 border-slate-900 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {['home', 'about', 'portfolio', 'contact'].map((page) => (
                  <button
                    key={page}
                    onClick={() => setSelectedPage(page)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition shrink-0 ${
                      selectedPage === page
                        ? 'bg-teal-900 text-white shadow-md'
                        : 'bg-white text-teal-900 border-2 border-slate-900 hover:bg-sky-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={saveAllSections}
                disabled={isSavingAll}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-800 hover:bg-teal-900 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition shadow-md disabled:opacity-50 shrink-0"
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

            <div className="space-y-4 sm:space-y-6">
              {sections.length === 0 ? (
                <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 sm:p-8 text-center text-teal-900 text-xs font-semibold">
                  No sections defined for this page yet.
                </div>
              ) : (
                sections.map((section) => (
                  <div key={section.id} className="bg-white border-2 border-slate-900 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-slate-900 pb-3 gap-2">
                      <h3 className="text-base font-bold text-teal-900 tracking-tight">
                        {section.title || section.section_name || section.section_id?.toUpperCase()}
                      </h3>
                      <button
                        onClick={() => saveSection(section)}
                        disabled={savingId === section.id}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-800 hover:bg-teal-900 text-white font-semibold px-4 py-2 rounded-xl text-xs transition shadow-sm disabled:opacity-50"
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

                    {Array.isArray(section.content) ? (
                      <div className="space-y-4">
                        {section.content.map((item, index) => (
                          <div key={item.id || index} className="p-3 sm:p-4 bg-slate-50 border-2 border-slate-900 rounded-xl space-y-4 relative">
                            <div className="flex items-center justify-between border-b border-slate-300 pb-2">
                              <span className="text-xs font-bold text-teal-900 uppercase truncate max-w-[80%]">
                                Item #{index + 1}: {item.title || item.name || 'Untitled'}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveArrayItem(section.id, index)}
                                className="text-red-500 hover:text-red-700 p-1.5 rounded-lg transition"
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
                                      <div className="space-y-3 bg-white border-2 border-slate-900 rounded-xl p-3 sm:p-4">
                                        {fieldValue && (
                                          <img 
                                            src={fieldValue} 
                                            alt="Preview" 
                                            className="w-full sm:w-32 h-32 object-cover rounded-lg border-2 border-slate-900" 
                                          />
                                        )}
                                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                                          <label className="cursor-pointer inline-flex items-center justify-center gap-2 bg-teal-900 text-white font-semibold px-4 py-2.5 rounded-xl text-xs hover:bg-teal-800 transition">
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
                                          const valuesArray = e.target.value.split(',').map((s) => s.trim());
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
                      <div className="grid grid-cols-1 gap-4">
                        {Object.entries(section.content ?? {}).map(([key, val]) => {
                          const isImage = key.toLowerCase().includes('image') || key.toLowerCase().includes('url');
                          const isNestedArray = Array.isArray(val);

                          return (
                            <div key={key} className="space-y-1.5">
                              <label className="text-xs font-bold uppercase tracking-wider text-teal-900">
                                {key.replace(/([A-Z])/g, ' $1')}
                              </label>

                              {isImage ? (
                                <div className="space-y-3 bg-slate-50 border-2 border-slate-900 rounded-xl p-3 sm:p-4">
                                  {val && (
                                    <img 
                                      src={val} 
                                      alt="Preview" 
                                      className="w-full sm:w-32 h-32 object-cover rounded-lg border-2 border-slate-900" 
                                    />
                                  )}
                                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                                    <label className="cursor-pointer inline-flex items-center justify-center gap-2 bg-teal-900 text-white font-semibold px-4 py-2.5 rounded-xl text-xs hover:bg-teal-800 transition">
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
                              ) : isNestedArray ? (
                                <div className="space-y-3 p-3 sm:p-4 bg-slate-50 border-2 border-slate-900 rounded-xl">
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
                              ) : typeof val === 'boolean' ? (
                                <div className="flex items-center gap-3 py-1">
                                  <input
                                    type="checkbox"
                                    checked={val}
                                    onChange={(e) => handleContentChange(section.id, key, e.target.checked)}
                                    className="w-5 h-5 text-sky-500 border-2 border-slate-900 rounded focus:ring-0"
                                  />
                                  <span className="text-xs text-teal-900 font-semibold">Visible on website</span>
                                </div>
                              ) : typeof val === 'string' && val.length > 60 ? (
                                <textarea
                                  rows={4}
                                  value={val}
                                  onChange={(e) => handleContentChange(section.id, key, e.target.value)}
                                  className="w-full bg-white border-2 border-slate-900 rounded-xl p-3 text-xs text-teal-900 font-medium focus:outline-none focus:border-sky-500 transition"
                                />
                              ) : (
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
            <div className={`lg:col-span-5 space-y-3 sm:space-y-4 ${selectedMessage ? 'hidden lg:block' : 'block'}`}>
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
                  className="p-2.5 bg-white border-2 border-slate-900 text-sky-500 hover:bg-sky-50 rounded-xl transition shadow-sm shrink-0"
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
                      onClick={() => handleSelectMessage(msg)}
                      className={`
                        p-3.5 sm:p-4 rounded-2xl border-2 border-slate-900 cursor-pointer transition duration-200 space-y-1.5 sm:space-y-2
                        ${selectedMessage?.id === msg.id 
                          ? 'bg-sky-50 border-sky-500 shadow-sm' 
                          : 'bg-white hover:bg-slate-50 shadow-sm'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-teal-900 truncate">{msg.name}</span>
                        <span className="text-[10px] sm:text-[11px] text-teal-800 font-mono shrink-0">
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
                <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-6">
                  <button 
                    onClick={() => setSelectedMessage(null)}
                    className="lg:hidden inline-flex items-center gap-1.5 text-xs text-sky-600 font-bold py-1.5 px-3 bg-sky-50 border border-slate-900 rounded-lg mb-2"
                  >
                    <BiArrowBack className="text-sm text-sky-600" />
                    <span>Back to all messages</span>
                  </button>

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b-2 border-slate-900 pb-4 sm:pb-6">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-teal-900 tracking-tight">{selectedMessage.subject || 'No Subject'}</h3>
                      <p className="text-xs text-teal-800 mt-1 break-all">
                        From: <span className="text-teal-950 font-bold">{selectedMessage.name}</span> ({selectedMessage.email})
                      </p>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-start">
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

                  <div className="text-xs sm:text-sm text-teal-900 leading-relaxed min-h-[100px] sm:min-h-[140px] whitespace-pre-wrap font-medium">
                    {selectedMessage.message}
                  </div>

                  <div className="pt-4 border-t-2 border-slate-900 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-900">
                        Reply to {selectedMessage.name}
                      </span>
                      <button
                        type="button"
                        onClick={handleMailtoReply}
                        className="text-xs text-sky-600 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <BiEnvelope /> Open mail app
                      </button>
                    </div>

                    <form onSubmit={handleSendReply} className="space-y-3">
                      <textarea
                        rows={4}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={`Write a reply to ${selectedMessage.email}...`}
                        className="w-full bg-slate-50 border-2 border-slate-900 rounded-xl p-3 text-xs text-teal-900 font-medium focus:outline-none focus:border-sky-500 transition resize-none"
                      />

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        {statusMsg && (
                          <p className={`text-xs font-bold ${statusMsg.type === 'error' ? 'text-red-600' : 'text-emerald-600'}`}>
                            {statusMsg.text}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={sendingEmail || !replyText.trim()}
                          className="w-full sm:w-auto sm:ml-auto inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-teal-950 font-extrabold text-xs px-6 py-3 rounded-xl border-2 border-slate-900 shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0"
                        >
                          <span className="text-teal-950 font-bold">
                            {sendingEmail ? 'Sending...' : 'Send Reply'}
                          </span>
                          <BiSend className="text-base text-teal-950" />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="bg-white border-2 border-slate-900 rounded-2xl p-8 sm:p-12 text-center text-teal-900 font-semibold text-xs shadow-sm">
                  Select a message from the left to read its full content.
                </div>
              )}
            </div>
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b-2 border-slate-900 pb-4">
              <div>
                <h2 className="text-xl font-bold text-teal-900">Portfolio Projects</h2>
                <p className="text-xs text-teal-800 font-medium">Add, update, or remove live portfolio items.</p>
              </div>
              <button
                onClick={() => {
                  if (editingProject) {
                    resetProjectForm();
                  } else {
                    resetProjectForm();
                    setEditingProject({ isNew: true });
                  }
                }}
                className="inline-flex items-center justify-center gap-2 bg-teal-800 hover:bg-teal-900 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-sm"
              >
                <BiPlus className="text-base" />
                <span>{editingProject ? 'Cancel Editing' : 'Add New Project'}</span>
              </button>
            </div>

            {editingProject && (
              <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-teal-900 border-b-2 border-slate-900 pb-2">
                  {editingProject.id ? `Edit: ${editingProject.title}` : 'Create New Project'}
                </h3>

                <form onSubmit={handleSaveProject} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-teal-900">Title</label>
                      <input
                        type="text"
                        required
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        placeholder="e.g., E-Commerce Admin Console"
                        className="w-full bg-slate-50 border-2 border-slate-900 rounded-xl p-3 text-xs text-teal-900 font-medium focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-teal-900">Category</label>
                      <input
                        type="text"
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                        placeholder="e.g., Web App, Mobile, Design"
                        className="w-full bg-slate-50 border-2 border-slate-900 rounded-xl p-3 text-xs text-teal-900 font-medium focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-teal-900">Description</label>
                    <textarea
                      rows={3}
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      placeholder="Brief project summary..."
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-xl p-3 text-xs text-teal-900 font-medium focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-teal-900">Project Image</label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center justify-center gap-1.5 bg-teal-900 text-white font-semibold px-3 py-2 rounded-xl text-xs hover:bg-teal-800 transition shrink-0">
                        <BiCloudUpload className="text-base" />
                        <span>{uploadingKey === 'project-image' ? 'Uploading...' : 'Upload File'}</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleProjectImageUpload}
                          disabled={uploadingKey === 'project-image'}
                        />
                      </label>

                          <input
                            type="text"
                            value={projectForm.image_url}
                            onChange={(e) => setProjectForm({ ...projectForm, image_url: e.target.value })}
                            placeholder="Or paste https://..."
                            className="w-full bg-slate-50 border-2 border-slate-900 rounded-xl p-2.5 text-xs text-teal-900 font-medium focus:outline-none focus:border-sky-500"
                          />
                        </div>

                        {projectForm.image_url && (
                          <img 
                            src={projectForm.image_url} 
                            alt="Preview" 
                            className="w-full h-28 object-cover rounded-xl border-2 border-slate-900" 
                          />
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-teal-900">Live URL</label>
                      <input
                        type="text"
                        value={projectForm.live_url}
                        onChange={(e) => setProjectForm({ ...projectForm, live_url: e.target.value })}
                        placeholder="https://..."
                        className="w-full bg-slate-50 border-2 border-slate-900 rounded-xl p-3 text-xs text-teal-900 font-medium focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-teal-900">GitHub URL</label>
                      <input
                        type="text"
                        value={projectForm.github_url}
                        onChange={(e) => setProjectForm({ ...projectForm, github_url: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full bg-slate-50 border-2 border-slate-900 rounded-xl p-3 text-xs text-teal-900 font-medium focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={projectForm.featured}
                      onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                      className="w-4 h-4 text-sky-500 border-2 border-slate-900 rounded focus:ring-0"
                    />
                    <label htmlFor="featured" className="text-xs font-bold text-teal-900">
                      Highlight as Featured Project
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={resetProjectForm}
                      className="px-4 py-2 border-2 border-slate-900 text-teal-900 font-bold rounded-xl text-xs hover:bg-slate-100 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-teal-950 font-extrabold px-5 py-2 rounded-xl text-xs border-2 border-slate-900 shadow-sm transition"
                    >
                      <BiSave className="text-base" />
                      <span>{loading ? 'Saving...' : 'Save Project'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.length === 0 ? (
                <div className="col-span-full bg-white border-2 border-slate-900 rounded-2xl p-8 text-center text-xs font-semibold text-teal-900 shadow-sm">
                  No projects found. Click "Add New Project" above to create one.
                </div>
              ) : (
                projects.map((proj) => (
                  <div key={proj.id} className="bg-white border-2 border-slate-900 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                    {proj.image_url ? (
                      <img src={proj.image_url} alt={proj.title} className="w-full h-40 object-cover border-b-2 border-slate-900" />
                    ) : (
                      <div className="w-full h-40 bg-slate-100 border-b-2 border-slate-900 flex items-center justify-center text-slate-400">
                        <BiFolder className="text-4xl" />
                      </div>
                    )}

                    <div className="p-4 space-y-2 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-50 border border-slate-900 text-sky-800 px-2 py-0.5 rounded-md">
                          {proj.category || 'General'}
                        </span>
                        {proj.featured && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 border border-slate-900 text-emerald-900 px-2 py-0.5 rounded-md">
                            Featured
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-teal-900 truncate">{proj.title}</h3>
                      <p className="text-xs text-teal-800 line-clamp-2 font-medium">{proj.description}</p>
                    </div>

                    <div className="p-4 pt-0 border-t border-slate-200 mt-2 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleEditProject(proj)}
                        className="text-xs font-bold text-sky-600 hover:text-sky-800 transition"
                      >
                        Edit Details
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="text-xs font-bold text-red-500 hover:text-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-sm">
            <h3 className="text-base sm:text-lg font-bold text-teal-900 tracking-tight">System Settings</h3>
            <p className="text-xs text-teal-800 max-w-sm mx-auto">
              Configure system options and API configurations.
            </p>
          </div>
        )}
        
      </div>
    </DashboardLayout>
  );
}