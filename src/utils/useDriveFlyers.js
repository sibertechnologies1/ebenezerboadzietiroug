import { useState, useEffect } from 'react';

const FOLDER_ID = '19L6jP7xCl6uF5EsGsPzK9I4Y3e_iJXwC';
const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;

export function useDriveFlyers(limit = null) {
  const [flyers, setFlyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDriveFiles = async () => {
      try {
        setLoading(true);

        const q = `'${FOLDER_ID}' in parents and mimeType contains 'image/' and trashed = false`;
        const fields = 'files(id, name, createdTime)';
        const orderBy = 'createdTime desc';
        const pageSizeParam = limit ? `&pageSize=${limit}` : '';

        const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
          q
        )}&orderBy=${encodeURIComponent(
          orderBy
        )}&fields=${encodeURIComponent(
          fields
        )}${pageSizeParam}&key=${API_KEY}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch flyers from Google Drive');
        }

        const data = await response.json();

        const formattedFiles = (data.files || []).map((file) => ({
          id: file.id,
          title: file.name.replace(/\.[^/.]+$/, ''),
          imageUrl: `https://lh3.googleusercontent.com/d/${file.id}`,
          createdTime: file.createdTime,
        }));

        setFlyers(formattedFiles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDriveFiles();
  }, [limit]);

  return { flyers, loading, error };
}