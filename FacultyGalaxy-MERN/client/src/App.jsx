import React, { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import SearchBar from './components/SearchBar.jsx';
import FacultyGrid from './components/FacultyGrid.jsx';
import Login from './components/Login.jsx';
import ProfileEditor from './components/ProfileEditor.jsx';
import api from './api.js';

export default function App() {
  const [view, setView] = useState('home'); // home | login | profile
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [auth, setAuth] = useState({ token: localStorage.getItem('token'), facultyId: localStorage.getItem('facultyId'), role: localStorage.getItem('role') });

  useEffect(() => {
    // default list
    api.get('/faculty').then(r => setResults(r.data)).catch(() => {});
  }, []);

  const onSearch = async (q) => {
    const r = await api.get('/faculty', { params: { q } });
    setResults(r.data);
  };

  const openProfile = async (id) => {
    const r = await api.get('/faculty/' + id);
    setSelected(r.data);
    setView('profile');
  };

  const onLogin = (payload) => {
    localStorage.setItem('token', payload.token);
    if (payload.facultyId) localStorage.setItem('facultyId', payload.facultyId);
    localStorage.setItem('role', payload.role);
    setAuth({ token: payload.token, facultyId: payload.facultyId, role: payload.role });
    setView('home');
  };

  const logout = () => {
    localStorage.clear();
    setAuth({ token: null, facultyId: null, role: null });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLoginClick={() => setView('login')} onHome={() => setView('home')} onLogout={logout} auth={auth} />
      <main className="flex-1 container mx-auto px-4 py-6">
        {view === 'login' && <Login onSuccess={onLogin} />}
        {view === 'home' && (
          <>
            <SearchBar onSearch={onSearch} onOpen={openProfile} />
            <FacultyGrid items={results} onOpen={openProfile} />
          </>
        )}
        {view === 'profile' && selected && (
          <ProfileEditor data={selected} canEdit={(auth.role === 'admin') || (auth.facultyId === selected._id)} />
        )}
      </main>
      <Footer />
    </div>
  );
}
