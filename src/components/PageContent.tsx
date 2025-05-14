import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { PageContent } from '../types';
import { api } from '../services/api';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-hot-toast';

export function PageContentComponent() {
  const { pageId } = useParams<{ pageId: string }>();
  const [content, setContent] = useState<PageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMarkdown, setEditedMarkdown] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      if (!pageId) return;
      try {
        const data = await api.getPageContent(pageId);
        console.log(data);
        setContent(data);
        setEditedMarkdown(data.markdown || data.content || '');
      } catch (error) {
        console.error('Failed to fetch page content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [pageId]);

  const handleSave = async () => {
    if (!pageId || !content) return;
    setIsSaving(true);
    try {
      // Update content state with new markdown
      const updatedContent = {
        ...content,
        markdown: editedMarkdown
      };
      setContent(updatedContent);

      // Send entire updated content to API
      const savedContent = await api.savePageContent(pageId, updatedContent);
      setContent(savedContent);
      setIsEditing(false);
      toast.success('Content saved successfully!');
    } catch (error) {
      console.error('Failed to save content:', error);
      toast.error('Failed to save content. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !pageId) return;

    setIsUploading(true);
    try {
      const result = await api.uploadFile(file, pageId);
      toast.success('File uploaded successfully!');
      
      // Update the content state with the new file
      if (content) {
        const updatedContent = {
          ...content,
          files: [...(content.files || []), result.url]
        };
        setContent(updatedContent);
        console.log(updatedContent);
        
        // Save the updated content to the server
        // await api.savePageContent(pageId, updatedContent);
      }
    } catch (error) {
      console.error('Failed to upload file:', error);
      toast.error('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = async (url: string, index: number) => {
    if (!pageId || !content) return;
    
    setIsDeleting(url);
    try {
      await api.deleteFile(url, pageId);
      
      // Update the content state by removing the deleted file
      const updatedFiles = [...(content.files || [])];
      updatedFiles.splice(index, 1);

      
      const updatedContent = {
        ...content,
        files: updatedFiles
      };
      
      console.log(updatedContent);
      setContent(updatedContent);
      
      // Save the updated content to the server
      // await api.savePageContent(pageId, updatedContent);
      
      toast.success('File deleted successfully!');
    } catch (error) {
      console.error('Failed to delete file:', error);
      toast.error('Failed to delete file. Please try again.');
    } finally {
      setIsDeleting(null);
    }
  };

  if (isLoading) {
    return <div className="p-4 text-gray-400">Loading...</div>;
  }

  if (!content) {
    return <div className="p-4 text-red-400">Content not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-end items-center mb-6">
        {/* <h1 className="text-2xl font-bold text-white">Page Content</h1> */}
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          disabled={isSaving}
          className="px-4 py-2 text-white rounded bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isSaving ? 'Saving...' : isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      {isEditing ? (
        <textarea
          value={editedMarkdown}
          onChange={(e) => setEditedMarkdown(e.target.value)}
          className="w-full h-96 p-4 border rounded bg-gray-800 border-gray-700 text-white"
        />
      ) : (
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{content.markdown || content.content}</ReactMarkdown>
        </div>
      )}

      {/* Media content */}
      <div className="mt-8">
        {(content.images?.length ?? 0) > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Images</h2>
            <div className="grid grid-cols-2 gap-4">
              {content.images?.map((url, index) => (
                <img key={index} src={url} alt={`Image ${index + 1}`} className="rounded-lg" />
              ))}
            </div>
          </div>
        )}

        {(content.audios?.length ?? 0) > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Audio Files</h2>
            <div className="space-y-4">
              {content.audios?.map((url, index) => (
                <audio key={index} controls className="w-full">
                  <source src={url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              ))}
            </div>
          </div>
        )}

        {(content.materials?.length ?? 0) > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Files</h2>
            <div className="space-y-2">
              {content.materials?.map((material, index) => (
                <div key={index} className="flex items-center justify-between">
                  <a
                    href={material.public_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {material.file_name}
                  </a>
                  <button
                    onClick={() => handleDeleteFile(material.public_url, index)}
                    disabled={isDeleting === material.public_url}
                    className="ml-2 text-xs text-red-400 hover:text-red-500 p-1 rounded-full"
                    title="Delete file"
                  >
                    {isDeleting === material.public_url ? (
                      <div className="animate-spin h-4 w-4 border-b-2 border-red-500 rounded-full"></div>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* File upload section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Upload Files</h2>
        <div className="relative">
          <input
            type="file"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="block w-full text-sm text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              dark:file:bg-blue-900 dark:file:text-blue-300
              hover:file:bg-blue-100 dark:hover:file:bg-blue-800
              disabled:opacity-50"
          />
          {isUploading && (
            <div className="absolute right-0 top-0 bottom-0 flex items-center pr-4">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 