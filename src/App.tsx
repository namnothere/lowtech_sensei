import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PageContentComponent } from './components/PageContent';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/lesson/:lessonId/:pageId" element={<PageContentComponent />} />
          <Route path="/" element={<div className="p-4 text-gray-600 dark:text-gray-400">Select a lesson from the sidebar</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
