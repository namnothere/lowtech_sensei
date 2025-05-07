import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { PageContent } from '../types';
import { api } from '../services/api';
import ReactMarkdown from 'react-markdown';

export function PageContentComponent() {
  const { pageId } = useParams<{ pageId: string }>();
  const [content, setContent] = useState<PageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMarkdown, setEditedMarkdown] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      if (!pageId) return;
      try {
        const data = await api.getPageContent(pageId);
        setContent(data);
        setEditedMarkdown(data.markdown);
      } catch (error) {
        console.error('Failed to fetch page content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [pageId]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !pageId) return;

    try {
      const result = await api.uploadFile(file, pageId);
      // Handle the uploaded file URL (e.g., update the content state)
      console.log('File uploaded:', result.url);
    } catch (error) {
      console.error('Failed to upload file:', error);
    }
  };

  if (isLoading) {
    return <div className="p-4 text-gray-600 dark:text-gray-400">Loading...</div>;
  }

  if (!content) {
    return <div className="p-4 text-red-600 dark:text-red-400">Content not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Page Content</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      {isEditing ? (
        <textarea
          value={editedMarkdown}
          onChange={(e) => setEditedMarkdown(e.target.value)}
          className="w-full h-96 p-4 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      ) : (
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{content.markdown}</ReactMarkdown>
        </div>
      )}

      {/* Media content */}
      <div className="mt-8">
        {content.images.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Images</h2>
            <div className="grid grid-cols-2 gap-4">
              {content.images.map((url, index) => (
                <img key={index} src={url} alt={`Image ${index + 1}`} className="rounded-lg" />
              ))}
            </div>
          </div>
        )}

        {content.audios.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Audio Files</h2>
            <div className="space-y-4">
              {content.audios.map((url, index) => (
                <audio key={index} controls className="w-full">
                  <source src={url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              ))}
            </div>
          </div>
        )}

        {content.files.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Files</h2>
            <div className="space-y-2">
              {content.files.map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 dark:text-blue-400 hover:underline"
                >
                  File {index + 1}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* File upload section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Upload Files</h2>
        <input
          type="file"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500 dark:text-gray-400
            file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            dark:file:bg-blue-900 dark:file:text-blue-300
            hover:file:bg-blue-100 dark:hover:file:bg-blue-800"
        />
      </div>
    </div>
  );
} 