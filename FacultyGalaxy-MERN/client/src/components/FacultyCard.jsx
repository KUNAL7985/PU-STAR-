import React from 'react';

export default function FacultyCard({ item, onOpen }) {
  return (
    <div className="card">
      <div className="flex items-center gap-4">
        <img className="avatar" src={`http://localhost:5000/api/faculty/${item._id}/photo`} onError={(e)=>{e.currentTarget.src='https://via.placeholder.com/96?text=PP'}} />
        <div>
          <h3 className="text-xl font-bold">{item.name}</h3>
          <p className="text-sm opacity-80">{item.about}</p>
        </div>
      </div>
      <div className="mt-3 text-sm">
        <div><b>Room:</b> {item.roomNo} &nbsp; <b>Cabin:</b> {item.cabinNo}</div>
        <div><b>Subjects:</b> {item.subjects?.join(', ')}</div>
        <div><b>Awards:</b> {item.awards?.join(', ')}</div>
      </div>
      <div className="mt-4">
        <button className="btn btn-primary" onClick={()=>onOpen(item._id)}>Open Profile</button>
      </div>
    </div>
  );
}
