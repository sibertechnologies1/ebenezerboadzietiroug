import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { BiSave, BiUser, BiGlobe, BiLockAlt, BiCheck, BiCloudUpload } from 'react-icons/bi';

const AdminSettings = ({ onAvatarUpdate }) => {
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    github_profile: '',
    linkedin_profile: '',
    avatar_url: ''
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setProfile((prev) => ({
          ...prev,
          email: user.email || '',
          full_name: user.user_metadata?.full_name || 'Ebenezer Boadzie Tiroug',
          github_profile: user.user_metadata?.github_profile || 'https://github.com/sibertechnologies1',
          linkedin_profile: user.user_metadata?.linkedin_profile || 'https://linkedin.com/in/ebenezerboadzietiroug',
          avatar_url: user.user_metadata?.avatar_url || ''
        }));
      }
    };
    fetchUserData();
  }, []);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingAvatar(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `avatars/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(fileName);

      const publicUrl = data.publicUrl;

      // Update state
      setProfile((prev) => ({ ...prev, avatar_url: publicUrl }));

      // Save directly to user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });

      if (updateError) throw updateError;

      if (onAvatarUpdate) onAvatarUpdate(publicUrl);
      setMessage('Profile avatar uploaded and saved!');
    } catch (err) {
      setMessage('Error uploading avatar: ' + err.message);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.updateUser({
        data: { 
          full_name: profile.full_name,
          github_profile: profile.github_profile,
          linkedin_profile: profile.linkedin_profile,
          avatar_url: profile.avatar_url
        }
      });

      if (error) throw error;
      if (onAvatarUpdate) onAvatarUpdate(profile.avatar_url);
      setMessage('Profile and site metadata updated successfully!');
    } catch (err) {
      setMessage('Error updating profile: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;
      setMessage('Password updated successfully!');
      setPasswordData({ newPassword: '', confirmPassword: '' });
    } catch (err) {
      setMessage('Error changing password: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="border-b-2 border-slate-900 pb-3">
        <h1 className="text-xl font-bold text-teal-900">System Settings</h1>
        <p className="text-xs text-teal-800 font-medium mt-0.5">Manage user credentials, personal profile, and social platform links.</p>
      </div>

      {message && (
        <div className="p-3 bg-sky-50 border-2 border-slate-900 text-teal-900 text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm">
          <BiCheck className="text-lg text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* Profile Details */}
      <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b-2 border-slate-900">
          <BiUser className="text-lg text-teal-900" />
          <h2 className="text-xs font-bold text-teal-900 uppercase tracking-wider">Account Details</h2>
        </div>

        <form onSubmit={handleProfileSave} className="space-y-4">
          {/* Avatar Upload Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-teal-900 uppercase tracking-wider">Profile Avatar</label>
            <div className="flex items-center gap-4">
              {profile.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt="Avatar Preview" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-slate-900 shadow-sm"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-teal-900 text-white font-extrabold flex items-center justify-center border-2 border-slate-900 text-lg">
                  EB
                </div>
              )}

              <label className="cursor-pointer inline-flex items-center gap-2 bg-teal-900 hover:bg-teal-800 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition shadow-sm">
                <BiCloudUpload className="text-lg" />
                <span>{uploadingAvatar ? 'Uploading...' : 'Upload New Photo'}</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarUpload}
                  disabled={uploadingAvatar}
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-teal-900 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                value={profile.full_name}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                className="w-full bg-slate-50 border-2 border-slate-900 rounded-xl p-3 text-xs text-teal-900 font-medium focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-teal-900 uppercase tracking-wider">Email Address (Read-only)</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full bg-slate-100 border-2 border-slate-900 rounded-xl p-3 text-xs text-slate-500 font-medium cursor-not-allowed opacity-75"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pb-3 pt-2 border-b-2 border-slate-900">
            <BiGlobe className="text-lg text-teal-900" />
            <h2 className="text-xs font-bold text-teal-900 uppercase tracking-wider">Site Links & Metadata</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-teal-900 uppercase tracking-wider">GitHub Profile URL</label>
              <input
                type="text"
                value={profile.github_profile}
                onChange={(e) => setProfile({ ...profile, github_profile: e.target.value })}
                className="w-full bg-slate-50 border-2 border-slate-900 rounded-xl p-3 text-xs text-teal-900 font-medium focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-teal-900 uppercase tracking-wider">LinkedIn Profile URL</label>
              <input
                type="text"
                value={profile.linkedin_profile}
                onChange={(e) => setProfile({ ...profile, linkedin_profile: e.target.value })}
                className="w-full bg-slate-50 border-2 border-slate-900 rounded-xl p-3 text-xs text-teal-900 font-medium focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs py-2.5 px-5 rounded-xl border-2 border-slate-900 shadow-sm transition disabled:opacity-50"
            >
              <BiSave className="text-base" />
              <span>{saving ? 'Saving...' : 'Save Profile & Links'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Security Section */}
      <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b-2 border-slate-900">
          <BiLockAlt className="text-lg text-teal-900" />
          <h2 className="text-xs font-bold text-teal-900 uppercase tracking-wider">Security & Password</h2>
        </div>

        <form onSubmit={handlePasswordChange} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-teal-900 uppercase tracking-wider">New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              className="w-full bg-slate-50 border-2 border-slate-900 rounded-xl p-3 text-xs text-teal-900 font-medium focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-teal-900 uppercase tracking-wider">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              className="w-full bg-slate-50 border-2 border-slate-900 rounded-xl p-3 text-xs text-teal-900 font-medium focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="col-span-full flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving || !passwordData.newPassword}
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-teal-950 font-extrabold text-xs py-2.5 px-5 rounded-xl border-2 border-slate-900 shadow-sm transition disabled:opacity-50"
            >
              <span>Update Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;