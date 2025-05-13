import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Lesson } from '../types';

interface TempLessonProps {
  lesson: Lesson;
  isExpanded: boolean;
  onToggle: (lessonId: string) => void;
  location: { pathname: string };
  onSave: (lesson: Lesson) => void;
  onDiscard: () => void;
}

export function TempLesson({ lesson, isExpanded, onToggle, location, onSave, onDiscard }: TempLessonProps) {
  const [title, setTitle] = useState(lesson.title);
  const [sectionTitle, setSectionTitle] = useState(lesson.sections[0].title);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const updatedLesson: Lesson = {
      ...lesson,
      title,
      sections: [
        {
          ...lesson.sections[0],
          title: sectionTitle
        }
      ]
    };
    await onSave(updatedLesson);
    setIsSaving(false);
  };

  return (
    <li className="border border-blue-500 rounded-md mb-2">
      <div className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-200 bg-transparent hover:bg-gray-700 rounded-md transition-colors duration-150">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 w-full"
          placeholder="Enter lesson title"
        />
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving || !title.trim() || !sectionTitle.trim()}
            className="px-2 py-1 text-xs text-white bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 rounded"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={onDiscard}
            className="px-2 py-1 text-xs text-white bg-red-500 hover:bg-red-600 rounded"
          >
            Discard
          </button>
          <button
            onClick={() => onToggle(lesson.id)}
            className="ml-2"
          >
            <svg
              className={`w-4 h-4 transition-transform ${
                isExpanded ? 'transform rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      {isExpanded && (
        <ul className="mt-1 space-y-1 pl-4">
          {lesson.sections.map((section) => (
            <li key={section.id}>
              <div className="flex items-center">
                <input
                  type="text"
                  value={sectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                  className="block px-4 py-2 text-sm bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-500 rounded w-full"
                  placeholder="Enter section title"
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
} 