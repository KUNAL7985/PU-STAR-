import React, { useEffect, useState, useRef } from 'react';
import api from '../api.js';

export default function SearchBar({ onSearch, onOpen }) {
  const [q, setQ] = useState('');
  const [suggest, setSuggest] = useState([]);
  const [show, setShow] = useState(false);
  const boxRef = useRef();

  useEffect(() => {
    const handler = (e) => { if (boxRef.current && !boxRef.current.contains(e.target)) setShow(false); };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  useEffect(() => {
    const t = setTimeout(async () => {
      if (q.trim().length > 0) {
        const r = await api.get('/faculty/suggest', { params: { q } });
        setSuggest(r.data);
        setShow(true);
      } else {
        setSuggest([]);
      }
    }, 200);
    return () => clearTimeout(t);
  }, [q]);

  const doSearch = async (e) => {
    e?.preventDefault();
    await onSearch(q);
    setShow(false);
  };

  return (
    <div className="relative max-w-3xl mx-auto mb-6" ref={boxRef}>
      <form onSubmit={doSearch} className="flex gap-2">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name, subject, or area..."
          className="w-full rounded-full px-5 py-3 shadow outline-none focus:ring-4 ring-purple-300" />
        <button className="btn btn-primary">Search</button>
      </form>
      {show && suggest.length > 0 && (
        <div className="absolute z-20 mt-2 w-full bg-white rounded-xl shadow-lg overflow-hidden">
          {suggest.map(s => (
            <div key={s.id} className="px-4 py-2 hover:bg-purple-50 cursor-pointer flex justify-between"
              onClick={() => { setQ(s.name); onOpen(s.id); setShow(false); }}>
              <span>{s.name}</span>
              <span className="text-xs opacity-60">Open</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
