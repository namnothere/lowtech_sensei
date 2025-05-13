export interface Lesson {
  id: string;
  title: string;
  sections: Section[];
}

export interface Section {
  section_title: string;
  id: string;
  type: 'Vocab' | 'Grammar' | 'Exercise';
  title: string;
}

export interface PageContent {
  id: string;
  markdown: string;
  images?: string[];
  audios?: string[];
  files?: string[];
  content?: string;
  lesson_id?: string;
  type?: string;
  title?: string;
  sectionTitle?: string;
} 