import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BiGridAlt, 
  BiEnvelope, 
  BiFolder, 
  BiCog, 
  BiLogOut, 
  BiMenu, 
  BiX, 
  BiBell,
  BiEditAlt
} from 'react-icons/bi';
import { supabase } from '../../supabaseClient';

function DashboardLayout({ children, activeTab, setActiveTab }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: BiGridAlt },
    { id: 'content', label: 'Page Content', icon: BiEditAlt },
    { id: 'messages', label: 'Messages', icon: BiEnvelope, badge: 3 },
    { id: 'projects', label: 'Projects', icon: BiFolder },
    { id: 'settings', label: 'Settings', icon: BiCog },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-white text-teal-950 flex antialiased">
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-teal-950/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      <aside className={`
        fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-teal-900 text-white
        flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-400 flex items-center justify-center font-bold text-teal-950 shadow-md">
                A
              </div>
              <span className="font-bold text-lg text-white tracking-tight">Admin Console</span>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="lg:hidden p-1.5 text-teal-200 hover:text-white rounded-lg hover:bg-teal-800"
            >
              <BiX className="text-2xl" />
            </button>
          </div>

          <nav className="mt-8 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-sky-500 text-white shadow-md font-semibold' 
                      : 'text-teal-100 hover:text-white hover:bg-teal-800/70'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`text-lg flex-shrink-0 ${isActive ? 'text-white' : 'text-sky-300'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-sky-400/20 text-sky-200 border border-sky-400/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-teal-800">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-teal-200 hover:text-red-300 hover:bg-teal-800/60 rounded-xl transition duration-200"
          >
            <BiLogOut className="text-lg flex-shrink-0 text-sky-300" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <header className="h-16 border-b-2 border-slate-900 bg-white px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="lg:hidden p-2 text-teal-900 bg-teal-50 rounded-xl border border-slate-900 hover:bg-teal-100"
            >
              <BiMenu className="text-xl" />
            </button>
            <h1 className="text-lg font-bold text-teal-900 capitalize">{activeTab}</h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button className="p-2.5 text-sky-500 bg-sky-50 border border-slate-900 hover:bg-sky-100 rounded-xl relative transition">
              <BiBell className="text-lg text-sky-500" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-sky-500 rounded-full"></span>
            </button>
            <div className="h-6 w-[1px] bg-slate-900"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-900 text-white font-bold text-xs flex items-center justify-center">
                EB
              </div>
              <span className="text-xs font-semibold text-teal-900 hidden sm:inline-block">Ebenezer</span>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;