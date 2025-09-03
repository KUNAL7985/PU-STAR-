import React from 'react';

export default function Header({ onLoginClick, onHome, onLogout, auth }) {
  return (
    <header className="bg-gradient-to-r from-purple-600 via-cyan-500 to-orange-400 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onHome}>
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur"></div>
          <h1 className="text-2xl md:text-3xl font-extrabold gradient-text">FacultyGalaxy</h1>
        </div>
        <nav className="flex items-center gap-6 text-sm md:text-base">
          <a className="header-link" href="#" onClick={(e)=>{e.preventDefault(); onHome();}}>Directory</a>
          <a className="header-link" href="https://www.linkedin.com/" target="_blank">LinkedIn</a>
          <a className="header-link" href="https://twitter.com/" target="_blank">Twitter</a>
          <a className="header-link" href="https://github.com/" target="_blank">GitHub</a>
          {!auth.token ? (
            <button className="btn btn-primary" onClick={onLoginClick}>Login</button>
          ) : (
            <button className="btn bg-white text-purple-700" onClick={onLogout}>Logout</button>
          )}
        </nav>
      </div>
    </header>
  );
}
