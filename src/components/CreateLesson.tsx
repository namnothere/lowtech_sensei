import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-hot-toast';
import { api } from '../services/api';
import { v4 } from 'uuid';
import type { PageContent } from '../types';

const defaultMarkdown = `# TITLE

## CONTENT

`;

const sectionTypes = ['Vocab', 'Grammar', 'Exercise'] as const;
type SectionType = typeof sectionTypes[number];

export function CreateLesson() {
  const [title, setTitle] = useState('');
  const [sectionTitle, setSectionTitle] = useState('');
  const [sectionType, setSectionType] = useState<SectionType>('Vocab');
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Please enter a lesson title');
      return;
    }
    if (!sectionTitle.trim()) {
      toast.error('Please enter a section title');
      return;
    }
    setIsSaving(true);
    try {
      const pageId = v4();
      const lesson_id = v4();

      const data: PageContent = {
        id: pageId,
        lesson_id: lesson_id,
        markdown: markdown,
        type: sectionType,
        title: title,
        sectionTitle: sectionTitle,
        images: [],
        audios: [],
      };

      console.log("data", data); 

      await api.createLesson(data);
      toast.success('Lesson saved successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to save lesson:', error);
      toast.error('Failed to save lesson. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };



  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Create New Lesson</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-white rounded bg-gray-500 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 text-white rounded bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="mb-6 space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-200 mb-1">
            Lesson Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter lesson title"
          />
        </div>
        <div>
          <label htmlFor="sectionTitle" className="block text-sm font-medium text-gray-200 mb-1">
            Section Title
          </label>
          <input
            type="text"
            id="sectionTitle"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter section title"
          />
        </div>
        <div>
          <label htmlFor="sectionType" className="block text-sm font-medium text-gray-200 mb-1">
            Section Type
          </label>
          <select
            id="sectionType"
            value={sectionType}
            onChange={(e) => setSectionType(e.target.value as SectionType)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {sectionTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-[calc(100vh-16rem)] p-4 border rounded bg-gray-800 border-gray-700 text-white font-mono"
          />
        </div>
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
} 