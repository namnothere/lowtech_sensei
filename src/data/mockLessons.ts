import type { Lesson } from '../types';

export const mockLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Introduction to Japanese',
    sections: [
      {
        id: 'section-1-1',
        type: 'Vocab',
        title: 'Basic Greetings'
      },
      {
        id: 'section-1-2',
        type: 'Grammar',
        title: 'は (wa) Particle'
      },
      {
        id: 'section-1-3',
        type: 'Exercise',
        title: 'Practice Greetings'
      }
    ]
  },
  {
    id: 'lesson-2',
    title: 'Numbers and Time',
    sections: [
      {
        id: 'section-2-1',
        type: 'Vocab',
        title: 'Numbers 1-10'
      },
      {
        id: 'section-2-2',
        type: 'Grammar',
        title: 'Time Expressions'
      },
      {
        id: 'section-2-3',
        type: 'Exercise',
        title: 'Counting Practice'
      }
    ]
  },
  {
    id: 'lesson-3',
    title: 'Daily Activities',
    sections: [
      {
        id: 'section-3-1',
        type: 'Vocab',
        title: 'Common Verbs'
      },
      {
        id: 'section-3-2',
        type: 'Grammar',
        title: 'ます Form'
      },
      {
        id: 'section-3-3',
        type: 'Exercise',
        title: 'Daily Routine'
      }
    ]
  }
]; 