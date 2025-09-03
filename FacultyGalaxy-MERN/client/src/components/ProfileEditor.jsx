import React, { useState } from 'react';
import api from '../api.js';

export default function ProfileEditor({ data, canEdit }) {
  const [form, setForm] = useState(() => ({
    about: data.about || '',
    roomNo: data.roomNo || '',
    cabinNo: data.cabinNo || '',
    subjects: (data.subjects || []).join(', '),
    email: data.email || '',
    phone: data.phone || '',
    officeHours: data.officeHours || '',
    researchAreas: (data.researchAreas || []).join(', '),
  }));
  const [msg, setMsg] = useState(null);

  const updateField = (k, v) => setForm({ ...form, [k]: v });

  const save = async () => {
    const payload = {
      about: form.about,
      roomNo: form.roomNo,
      cabinNo: form.cabinNo,
      subjects: form.subjects.split(',').map(s=>s.trim()).filter(Boolean),
      email: form.email,
      phone: form.phone,
      officeHours: form.officeHours,
      researchAreas: form.researchAreas.split(',').map(s=>s.trim()).filter(Boolean),
    };
    await api.put('/faculty/' + data._id, payload);
    setMsg('Saved!');
    setTimeout(()=>setMsg(null), 1500);
  };

  const uploadPhoto = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const fd = new FormData();
    fd.append('photo', f);
    await api.post('/faculty/' + data._id + '/photo', fd, { headers: { 'Content-Type': 'multipart/form-data' }});
    setMsg('Photo uploaded!');
    setTimeout(()=>window.location.reload(), 800);
  };

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
      <div className="card md:col-span-1 text-center">
        <img className="avatar mx-auto" src={`http://localhost:5000/api/faculty/${data._id}/photo`} onError={(e)=>{e.currentTarget.src='https://via.placeholder.com/96?text=PP'}} />
        {canEdit && (
          <div className="mt-3">
            <input type="file" accept="image/*" onChange={uploadPhoto} />
          </div>
        )}
        <h2 className="text-2xl font-extrabold mt-2">{data.name}</h2>
        <div className="text-sm opacity-80">Room {data.roomNo} · Cabin {data.cabinNo}</div>
      </div>
      <div className="md:col-span-2 card">
        <h3 className="text-xl font-bold mb-3">Profile</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <label className="flex flex-col text-sm">About<textarea className="border rounded-xl p-2" rows="4" value={form.about} onChange={e=>updateField('about', e.target.value)} disabled={!canEdit} /></label>
          <label className="flex flex-col text-sm">Subjects<input className="border rounded-xl p-2" value={form.subjects} onChange={e=>updateField('subjects', e.target.value)} disabled={!canEdit} /></label>
          <label className="flex flex-col text-sm">Research Areas<input className="border rounded-xl p-2" value={form.researchAreas} onChange={e=>updateField('researchAreas', e.target.value)} disabled={!canEdit} /></label>
          <label className="flex flex-col text-sm">Room No<input className="border rounded-xl p-2" value={form.roomNo} onChange={e=>updateField('roomNo', e.target.value)} disabled={!canEdit} /></label>
          <label className="flex flex-col text-sm">Cabin No<input className="border rounded-xl p-2" value={form.cabinNo} onChange={e=>updateField('cabinNo', e.target.value)} disabled={!canEdit} /></label>
          <label className="flex flex-col text-sm">Email<input className="border rounded-xl p-2" value={form.email} onChange={e=>updateField('email', e.target.value)} disabled={!canEdit} /></label>
          <label className="flex flex-col text-sm">Phone<input className="border rounded-xl p-2" value={form.phone} onChange={e=>updateField('phone', e.target.value)} disabled={!canEdit} /></label>
          <label className="flex flex-col text-sm">Office Hours<input className="border rounded-xl p-2" value={form.officeHours} onChange={e=>updateField('officeHours', e.target.value)} disabled={!canEdit} /></label>
        </div>
        {canEdit ? <button className="btn btn-primary mt-4" onClick={save}>Save</button> : <div className="opacity-70 mt-3">Login as owner or admin to edit.</div>}
        {msg && <div className="mt-2 text-green-700">{msg}</div>}
      </div>
    </div>
  );
}
