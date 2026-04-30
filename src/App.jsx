import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import TrackingPage from './pages/TrackingPage';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const fetchToken = useAuthStore((state) => state.fetchToken);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tracking/:id" element={<TrackingPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
