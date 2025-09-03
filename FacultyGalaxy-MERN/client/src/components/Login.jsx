import React, { useState } from 'react';
import api from '../api.js';

export default function Login({ onSuccess }) {
  const [username, setUsername] = useState('alice');
  const [password, setPassword] = useState('Passw0rd!');
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const r = await api.post('/auth/login', { username, password });
      onSuccess(r.data);
    } catch (e) {
      setError('Invalid credentials');
    }
  };
  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-2xl font-bold mb-2">Login</h2>
      <p className="text-sm opacity-80 mb-4">Use company-provided credentials to access editing.</p>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full rounded-xl px-4 py-3 border" value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" />
        <input className="w-full rounded-xl px-4 py-3 border" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="btn btn-primary w-full">Login</button>
      </form>
    </div>
  );
}
