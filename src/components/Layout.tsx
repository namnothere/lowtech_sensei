import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { Lesson } from '../types';
import { api } from '../services/api';

export function Layout({ children }: { children: React.ReactNode }) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set());
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchLessons = async () => {
    setIsSidebarExpanded(true);
    try {
      const data = await api.getLessons();
      setLessons(data);
      // Expand the lesson that contains the current section
      const currentLessonId = location.pathname.split('/')[2];
      if (currentLessonId) {
        setExpandedLessons(new Set([currentLessonId]));
      }
    } catch (error) {
      console.error('Failed to fetch lessons:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [location.pathname]);

  const toggleLesson = (lessonId: string) => {
    setExpandedLessons(prev => {
      const next = new Set(prev);
      if (next.has(lessonId)) {
        next.delete(lessonId);
      } else {
        next.add(lessonId);
      }
      return next;
    });
  };

  const handleAddLesson = () => {
    navigate('/create-lesson');
  };



  return (
    <div className="min-h-screen bg-gray-900">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 border-b border-gray-700">
        <div className="max-w-full ml-4 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-start h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-white">LowTech Sensei</span>
              </Link>
            </div>
            {/* <div className="flex items-center">
              <button className="p-2 rounded-md text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </button>
            </div> */}
          </div>
        </div>
      </nav>

      {/* Main Content with Sidebar */}
      <div className="pt-16 flex">
        {/* Sidebar */}
        <div 
          className={`fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-gray-700 bg-gray-800 transition-all duration-300 ease-in-out ${
            isSidebarExpanded ? 'w-64' : 'w-16'
          }`}
        >
          {/* Sidebar Toggle Button */}
          {/* <button
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            // className="absolute -right-3 top-4 z-auto bg-gray-800 border border-gray-700 rounded-full p-1.5 hover:bg-gray-700"
            className="absolute -right-3 top-4 z-auto bg-gray-800 border border-gray-700 rounded-full p-1.5 hover:bg-gray-700"
          >
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                isSidebarExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button> */}

          <div className={`p-4 ${!isSidebarExpanded && 'hidden'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Lessons</h2>
              <button 
                onClick={handleAddLesson}
                className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <nav>
              {isLoading ? (
                <div className="p-4 text-gray-400">Loading...</div>
              ) : (
                <ul className="space-y-2">
                  {/* {tempLesson && (
                    <TempLesson
                      key={tempLesson.id}
                      lesson={tempLesson}
                      isExpanded={expandedLessons.has(tempLesson.id)}
                      onToggle={toggleLesson}
                      location={location}
                      onSave={handleSaveTempLesson}
                      onDiscard={handleDiscardTempLesson}
                    />
                  )} */}
                  {lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <button
                        onClick={() => toggleLesson(lesson.id)}
                        className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-200 bg-transparent hover:bg-gray-700 rounded-md transition-colors duration-150"
                      >
                        <span>{lesson.title}</span>
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            expandedLessons.has(lesson.id) ? 'transform rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {expandedLessons.has(lesson.id) && (
                        <ul className="mt-1 space-y-1 pl-4">
                          {lesson.sections.map((section) => (
                            <li key={section.id}>
                              <Link
                                to={`/lesson/${lesson.id}/${section.id}`}
                                className={`block px-4 py-2 text-sm ${
                                  location.pathname.includes(section.id)
                                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                    : 'text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                } rounded-md`}
                              >
                                {section.type}: {section.section_title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </nav>
          </div>

          {/* Collapsed Sidebar Icons */}
          {!isSidebarExpanded && (
            <div className="p-2">
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => toggleLesson(lesson.id)}
                  className="w-full p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md mb-1"
                  title={lesson.title}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'pl-64' : 'pl-16'}`}>
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
} 