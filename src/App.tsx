import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PageContentComponent } from './components/PageContent';
import { CreateLesson } from './components/CreateLesson';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/lesson/:lesson_id/:pageId" element={<PageContentComponent />} />
          <Route path="/create-lesson" element={<CreateLesson />} />
          <Route path="/" element={<div className="p-4 text-gray-600 dark:text-gray-400">Select a lesson from the sidebar</div>} />
        </Routes>
      </Layout>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
