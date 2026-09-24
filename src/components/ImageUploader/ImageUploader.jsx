import React, { useState } from 'react';
import supabase from '../supabaseClient';

export default function ImageUploader({ currentImageUrl, onImageUploaded }) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `hero/${fileName}`;

      // 1. Upload image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(filePath);

      // 3. Update state with new public URL
      onImageUploaded(data.publicUrl);
      alert('Image uploaded successfully!');
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 my-4">
      <label className="text-sm font-bold text-slate-700">Hero Image</label>
      {currentImageUrl && (
        <img 
          src={currentImageUrl} 
          alt="Current Hero" 
          className="w-32 h-32 object-cover rounded-lg border border-slate-300 mb-2" 
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        disabled={uploading}
        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
      />
      {uploading && <p className="text-xs text-amber-600">Uploading image...</p>}
    </div>
  );
}