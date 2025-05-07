export interface Lesson {
  id: string;
  title: string;
  sections: Section[];
}

export interface Section {
  id: string;
  type: 'Vocab' | 'Grammar' | 'Exercise';
  title: string;
}

export interface PageContent {
  id: string;
  markdown: string;
  images: string[];
  audios: string[];
  files: string[];
} 