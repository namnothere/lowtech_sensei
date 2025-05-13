import type { Lesson, PageContent } from '../types';
import { mockLessons } from '../data/mockLessons';

const API_BASE_URL = '/api';

// Common fetch options with CORS headers
const fetchOptions = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
};

// Mock page content data
const mockPageContent: Record<string, PageContent> = {
  'section-1-1': {
    id: 'section-1-1',
    markdown: `# Basic Greetings

## Common Greetings
- こんにちは (Konnichiwa) - Hello/Good afternoon
- おはようございます (Ohayou gozaimasu) - Good morning
- こんばんは (Konbanwa) - Good evening
- さようなら (Sayounara) - Goodbye

## Practice
Try saying these greetings out loud! Remember to bow slightly when greeting someone.

## Cultural Notes
- Japanese people often bow when greeting each other
- The depth of the bow depends on the formality of the situation
- It's polite to use the more formal versions (with ございます) when meeting someone for the first time`,
    images: [],
    audios: [],
    files: []
  },
  'section-1-2': {
    id: 'section-1-2',
    markdown: `# The は (wa) Particle

The は particle is used to mark the topic of a sentence. It's one of the most important particles in Japanese grammar.

## Basic Usage
- は marks the topic of the sentence
- It's pronounced "wa" even though it's written as は
- The topic is what the sentence is about

## Examples
- 私は学生です (Watashi wa gakusei desu) - I am a student
- これは本です (Kore wa hon desu) - This is a book
- 山田さんは先生です (Yamada-san wa sensei desu) - Mr. Yamada is a teacher

## Practice
Try making your own sentences using the は particle!`,
    images: [],
    audios: [],
    files: []
  },
  'section-1-3': {
    id: 'section-1-3',
    markdown: `# Practice Greetings

## Exercise 1: Fill in the Blanks
Complete the following greetings:
1. Good morning: おはよう___
2. Good evening: こんばん___
3. Goodbye: さような___

## Exercise 2: Role Play
Practice these conversations with a partner:

A: こんにちは
B: こんにちは

A: おはようございます
B: おはようございます

## Exercise 3: Writing
Write three sentences using the は particle about:
1. Yourself
2. Your friend
3. Your favorite book`,
    images: [],
    audios: [],
    files: []
  },
  'section-2-1': {
    id: 'section-2-1',
    markdown: `# Numbers 1-10

## Basic Numbers
1. 一 (いち - ichi)
2. 二 (に - ni)
3. 三 (さん - san)
4. 四 (よん - yon)
5. 五 (ご - go)
6. 六 (ろく - roku)
7. 七 (なな - nana)
8. 八 (はち - hachi)
9. 九 (きゅう - kyuu)
10. 十 (じゅう - juu)

## Counting Objects
When counting objects, we use different counters. Here are some common ones:
- 個 (こ - ko) for general objects
- 枚 (まい - mai) for flat objects
- 本 (ほん - hon) for long objects

## Practice
Try counting different objects in your room using these numbers!`,
    images: [],
    audios: [],
    files: []
  },
  'section-2-2': {
    id: 'section-2-2',
    markdown: `# Time Expressions

## Basic Time Words
- 今 (いま - ima) - now
- 今日 (きょう - kyou) - today
- 明日 (あした - ashita) - tomorrow
- 昨日 (きのう - kinou) - yesterday

## Time of Day
- 朝 (あさ - asa) - morning
- 昼 (ひる - hiru) - noon
- 夜 (よる - yoru) - night
- 午前 (ごぜん - gozen) - AM
- 午後 (ごご - gogo) - PM

## Example Sentences
- 今何時ですか？(Ima nanji desu ka?) - What time is it now?
- 明日の朝 (Ashita no asa) - Tomorrow morning
- 昨日の夜 (Kinou no yoru) - Last night`,
    images: [],
    audios: [],
    files: []
  },
  'section-2-3': {
    id: 'section-2-3',
    markdown: `# Counting Practice

## Exercise 1: Number Writing
Write the following numbers in Japanese:
1. 3
2. 7
3. 10
4. 5
5. 8

## Exercise 2: Time Expressions
Complete these sentences:
1. 今___時です (It's ___ o'clock now)
2. ___の朝 (___ morning)
3. ___の夜 (___ night)

## Exercise 3: Counting Objects
Practice counting these objects:
- りんご (ringo - apple)
- 本 (hon - book)
- 紙 (kami - paper)`,
    images: [],
    audios: [],
    files: []
  },
  'section-3-1': {
    id: 'section-3-1',
    markdown: `# Common Verbs

## Basic Verbs
- 食べる (たべる - taberu) - to eat
- 飲む (のむ - nomu) - to drink
- 行く (いく - iku) - to go
- 来る (くる - kuru) - to come
- 寝る (ねる - neru) - to sleep

## Verb Groups
Japanese verbs are divided into three groups:
1. 一段動詞 (ichidan verbs) - end in る
2. 五段動詞 (godan verbs) - end in other syllables
3. 不規則動詞 (irregular verbs) - する and 来る

## Example Sentences
- ご飯を食べます (Gohan wo tabemasu) - I eat rice
- 水を飲みます (Mizu wo nomimasu) - I drink water
- 学校に行きます (Gakkou ni ikimasu) - I go to school`,
    images: [],
    audios: [],
    files: []
  },
  'section-3-2': {
    id: 'section-3-2',
    markdown: `# ます Form

The ます form is the polite form of verbs in Japanese. It's commonly used in daily conversation.

## How to Make ます Form
1. For 一段動詞 (ichidan verbs):
   - Remove る and add ます
   - 食べる → 食べます

2. For 五段動詞 (godan verbs):
   - Change the last syllable to the い sound and add ます
   - 飲む → 飲みます
   - 行く → 行きます

## Example Sentences
- 私は毎日学校に行きます (Watashi wa mainichi gakkou ni ikimasu) - I go to school every day
- 彼は水を飲みます (Kare wa mizu wo nomimasu) - He drinks water
- 私たちはご飯を食べます (Watashitachi wa gohan wo tabemasu) - We eat rice`,
    images: [],
    audios: [],
    files: []
  },
  'section-3-3': {
    id: 'section-3-3',
    markdown: `# Daily Routine

## Exercise 1: Verb Conjugation
Change these verbs to ます form:
1. 食べる
2. 飲む
3. 行く
4. 寝る
5. 来る

## Exercise 2: Daily Schedule
Write about your daily routine using ます form:
- 朝 (Morning)
- 昼 (Afternoon)
- 夜 (Evening)

## Exercise 3: Role Play
Practice these conversations:
A: 何時に起きますか？(Nanji ni okimasu ka?) - What time do you wake up?
B: 7時に起きます (Shichiji ni okimasu) - I wake up at 7

A: 何を食べますか？(Nani wo tabemasu ka?) - What do you eat?
B: パンを食べます (Pan wo tabemasu) - I eat bread`,
    images: [],
    audios: [],
    files: []
  }
};

export const api = {
  async getLessons(): Promise<Lesson[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/lessons?l=all`, {
        ...fetchOptions,
      });
      if (!response.ok) {
        throw new Error('Failed to fetch lessons');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching lessons:', error);
      // Fallback to mock data if API fails
      return mockLessons;
    }
  },

  async getPageContent(pageId: string): Promise<PageContent> {
    try {
      const response = await fetch(`${API_BASE_URL}/pages?p=${pageId}`, {
        ...fetchOptions,
      });
      if (!response.ok) {
        throw new Error('Failed to fetch page content');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching page content:', error);
      // Fallback to mock data if API fails
      const content = mockPageContent[pageId];
      if (!content) {
        throw new Error('Page content not found');
      }
      return content;
    }
  },

  async uploadFile(file: File, pageId: string): Promise<{ url: string }> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('pageId', pageId);

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
        // Don't set Content-Type header for FormData, let the browser set it with the boundary
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();
      return { url: data.url };
    } catch (error) {
      console.error('Error uploading file:', error);
      // Fallback to local URL if API fails
      return { url: URL.createObjectURL(file) };
    }
  },

  async savePageContent(pageId: string, content: PageContent): Promise<PageContent> {
    try {
      const response = await fetch(`${API_BASE_URL}/pages?q=${pageId}`, {
        method: 'PATCH',
        ...fetchOptions,
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        throw new Error('Failed to save page content');
      }

      // Check if response has content before parsing
      const text = await response.text();
      if (!text) {
        return content; // Return the content we sent if response is empty
      }

      return JSON.parse(text);
    } catch (error) {
      console.error('Error saving page content:', error);
      // Fallback to mock data if API fails
      const mockContent = mockPageContent[pageId];
      if (!mockContent) {
        throw new Error('Page content not found');
      }
      return { ...mockContent, ...content };
    }
  },

  async createLesson(data: PageContent): Promise<PageContent> {
    try {
      const response = await fetch(`${API_BASE_URL}/pages?q=${data.id}`, {
        method: 'PATCH',
        ...fetchOptions,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save page content');
      }

      // Check if response has content before parsing
      const text = await response.text();
      if (!text) {
        return data; // Return the data we sent if response is empty
      }

      return JSON.parse(text);
    } catch (error) {
      console.error('Error saving page content:', error);
      // Fallback to mock data if API fails
      const mockContent = mockPageContent[data.id];
      if (!mockContent) {
        throw new Error('Page content not found');
      }
      return { ...mockContent, ...data };
    }
  },
}; 