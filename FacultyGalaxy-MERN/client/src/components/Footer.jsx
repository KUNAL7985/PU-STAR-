import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-orange-400 via-cyan-500 to-purple-600 text-white mt-8">
      <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-bold text-lg mb-2">About University</h3>
          <p className="opacity-90">Empowering students through research, innovation, and community.</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-1 opacity-90">
            <li><a href="#" className="header-link">Admissions</a></li>
            <li><a href="#" className="header-link">Examinations</a></li>
            <li><a href="#" className="header-link">Placements</a></li>
            <li><a href="#" className="header-link">Research Portal</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Follow Us</h3>
          <div className="flex gap-3">
            <a href="https://facebook.com" target="_blank" className="header-link">Facebook</a>
            <a href="https://instagram.com" target="_blank" className="header-link">Instagram</a>
            <a href="https://youtube.com" target="_blank" className="header-link">YouTube</a>
          </div>
        </div>
      </div>
      <div className="text-center bg-black/20 py-3">© {new Date().getFullYear()} FacultyGalaxy</div>
    </footer>
  );
}
