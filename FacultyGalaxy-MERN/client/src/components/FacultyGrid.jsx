import React from 'react';
import FacultyCard from './FacultyCard.jsx';

export default function FacultyGrid({ items, onOpen }) {
  if (!items || items.length === 0) {
    return <div className="text-center opacity-80">No results found.</div>
  }
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(it => <FacultyCard key={it._id} item={it} onOpen={onOpen} />)}
    </div>
  );
}
