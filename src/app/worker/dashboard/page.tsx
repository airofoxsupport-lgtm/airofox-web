"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, Power, DollarSign, Briefcase, Award, Star, Bell, Calendar, History, MessageSquare, 
  MapPin, Phone, Navigation, Check, X, ShieldCheck, ArrowRight, Wallet, TrendingUp, Sparkles,
  Lock, Edit3, Globe, Plus, Trash2, CalendarDays, ExternalLink, RefreshCw, Menu,
  Sun, Moon
} from 'lucide-react';
import { db, WorkerProfile, Job, Review, AppNotification } from '@/lib/db';

export default function WorkerDashboard() {
  const router = useRouter();
  
  // State
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [worker, setWorker] = useState<WorkerProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'requests' | 'active' | 'earnings' | 'history' | 'schedule' | 'profile' | 'reviews' | 'notifications'>('home');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [historyFilter, setHistoryFilter] = useState<'today' | 'week' | 'month' | 'year'>('week');
  
  // Interactive UI states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatText, setChatText] = useState('');
  const [chatMessages, setChatMessages] = useState<{ sender: 'customer' | 'worker'; text: string; time: string }[]>([
    { sender: 'customer', text: 'Hi, please call me when you reach.', time: '10:05 AM' }
  ]);
  const [editProfileMode, setEditProfileMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<WorkerProfile>>({});

  const loadWorkerData = async (id: string) => {
    setJobs(await db.getJobsByWorker(id));
    setReviews(await db.getReviews(id));
    setNotifications(await db.getNotifications(id));
  };

  // Sync local theme state on mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  // Load state and authenticate
  useEffect(() => {
    const initWorker = async () => {
      const logged = localStorage.getItem('af_logged_worker');
      if (!logged) {
        router.push('/login');
        return;
      }
      
      const parsed = JSON.parse(logged) as WorkerProfile;
      // Get fresh details from DB
      const fresh = await db.getWorkerById(parsed.id);
      if (!fresh) {
        localStorage.removeItem('af_logged_worker');
        router.push('/login');
        return;
      }
      
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWorker(fresh);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEditedProfile(fresh);
      await loadWorkerData(fresh.id);
    };
    initWorker();
  }, [router]);

  const handleOnlineToggle = async () => {
    if (!worker) return;
    const newStatus = !worker.online;
    const updated = await db.updateWorker(worker.id, { online: newStatus });
    setWorker(updated);
    
    // Add system notification
    await db.createNotification({
      user_id: worker.id,
      title: newStatus ? 'You are Online 🟢' : 'You are Offline 🔴',
      message: newStatus ? 'You can now receive incoming booking requests in Mumbai.' : 'Requests paused. Switch online when ready.',
    });
    await loadWorkerData(worker.id);
  };

  const handleAcceptJob = async (jobId: string) => {
    if (!worker) return;
    await db.updateJobStatus(jobId, 'accepted');
    await loadWorkerData(worker.id);
    setActiveTab('active'); // Switch to active jobs view
  };

  const handleRejectJob = async (jobId: string) => {
    if (!worker) return;
    await db.updateJobStatus(jobId, 'rejected');
    await loadWorkerData(worker.id);
  };

  const handleUpdateJobStatus = async (jobId: string, nextStatus: Job['status']) => {
    if (!worker) return;
    await db.updateJobStatus(jobId, nextStatus);
    
    // Refresh worker profile (wallet might change on completion)
    const fresh = await db.getWorkerById(worker.id);
    if (fresh) setWorker(fresh);
    
    await loadWorkerData(worker.id);
  };

  const handleSendChatMessage = () => {
    if (!chatText.trim()) return;
    setChatMessages(prev => [...prev, { sender: 'worker', text: chatText, time: 'Just now' }]);
    setChatText('');
    
    // Simulate auto response after 2s
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'customer', text: 'Sure, thanks! I am waiting.', time: 'Just now' }]);
    }, 1500);
  };

  const handleSaveProfile = async () => {
    if (!worker) return;
    const updated = await db.updateWorker(worker.id, editedProfile);
    setWorker(updated);
    setEditProfileMode(false);
    
    await db.createNotification({
      user_id: worker.id,
      title: 'Profile Updated',
      message: 'Your personal, skill, and bank details have been saved.',
    });
    await loadWorkerData(worker.id);
  };

  const handleClearNotifications = async () => {
    if (!worker) return;
    await db.clearNotifications(worker.id);
    await loadWorkerData(worker.id);
  };

  const handleMarkNotifRead = async (notifId: string) => {
    await db.markNotificationRead(notifId);
    if (worker) await loadWorkerData(worker.id);
  };

  const handleLogout = () => {
    localStorage.removeItem('af_logged_worker');
    router.push('/login');
  };

  if (!worker) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-brand-orange" />
          <p className="text-sm text-brand-slate">Logging into Partner Workspace...</p>
        </div>
      </div>
    );
  }

  // Lists and stats
  const pendingRequests = jobs.filter(j => j.status === 'pending');
  const activeJobs = jobs.filter(j => ['accepted', 'on_the_way', 'arrived', 'started'].includes(j.status));
  const completedJobs = jobs.filter(j => j.status === 'completed');
  
  const todayEarnings = completedJobs
    .filter(j => j.date === new Date().toISOString().split('T')[0])
    .reduce((sum, j) => sum + j.estimated_earnings, 0);

  const weekEarnings = completedJobs
    .reduce((sum, j) => sum + j.estimated_earnings, 0); // Seed data matches this week

  // Filter booking history
  const filteredHistory = completedJobs.filter(j => {
    if (historyFilter === 'today') return j.date === new Date().toISOString().split('T')[0];
    return true; // Simple filter for demo
  });

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800 font-sans">
      
      {/* ── SIDEBAR ────────────────────────────────────── */}
      <aside className="w-64 bg-brand-navy text-white flex-shrink-0 flex flex-col justify-between border-r border-slate-800 hidden md:flex">
        <div className="p-6 space-y-8">
          
          {/* Brand header */}
          <div className="flex items-center gap-3">
            <img src="/logo.jpeg" alt="Logo" className="w-10 h-10 rounded-xl object-cover border border-slate-700" />
            <div>
              <h2 className="font-extrabold text-base leading-none">Partner Suite</h2>
              <span className="text-[10px] text-brand-orange font-bold uppercase tracking-wider">AiroFox Mumbai</span>
            </div>
          </div>

          {/* Profile mini-card */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex items-center gap-3.5">
            {worker.photo ? (
              <img src={worker.photo} alt={worker.name} className="w-11 h-11 rounded-full object-cover border border-slate-700" />
            ) : (
              <div className="w-11 h-11 bg-slate-700 rounded-full flex items-center justify-center font-bold text-sm uppercase">
                {worker.name.charAt(0)}
              </div>
            )}
            <div className="overflow-hidden">
              <p className="font-bold text-xs truncate leading-tight">{worker.name}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className={`w-2 h-2 rounded-full ${worker.online ? 'bg-emerald-500' : 'bg-slate-500'}`} />
                <span className="text-[10px] text-slate-400 font-medium">{worker.online ? 'Online' : 'Offline'}</span>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {[
              { id: 'home', label: 'Dashboard Home', icon: <Briefcase className="w-4 h-4" /> },
              { id: 'requests', label: 'Job Requests', icon: <Bell className="w-4 h-4" />, badge: pendingRequests.length },
              { id: 'active', label: 'Active Jobs', icon: <Navigation className="w-4 h-4" />, badge: activeJobs.length },
              { id: 'earnings', label: 'My Earnings', icon: <DollarSign className="w-4 h-4" /> },
              { id: 'history', label: 'Booking History', icon: <History className="w-4 h-4" /> },
              { id: 'schedule', label: 'My Availability', icon: <Calendar className="w-4 h-4" /> },
              { id: 'profile', label: 'Partner Profile', icon: <User className="w-4 h-4" /> },
              { id: 'reviews', label: 'Feedbacks & Reviews', icon: <Star className="w-4 h-4" /> },
              { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" />, badge: unreadNotifCount },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as 'home' | 'requests' | 'active' | 'earnings' | 'history' | 'schedule' | 'profile' | 'reviews' | 'notifications')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === item.id 
                    ? 'bg-brand-orange text-white font-bold' 
                    : 'text-slate-300 hover:bg-slate-900/50 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                    activeTab === item.id ? 'bg-white text-brand-orange' : 'bg-brand-orange text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-slate-900 hover:bg-red-950/20 hover:text-red-400 border border-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <Power className="w-4 h-4" /> Logout Partner
          </button>
        </div>
      </aside>

      {/* ── MAIN WORKSPACE ────────────────────────────── */}
      <div className="flex-grow flex flex-col min-h-screen overflow-y-auto pb-20 md:pb-0">
        
        {/* Top workspace bar */}
        <header className="bg-white border-b border-brand-border px-6 py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            {/* Hamburger helper for mobile - could open side drawer */}
            <span className="text-xs font-bold text-brand-navy block md:hidden">Partner Suite</span>
            <div className="flex items-center gap-2.5 bg-slate-100 px-3.5 py-1.5 rounded-full border border-brand-border/40">
              <span className={`w-2.5 h-2.5 rounded-full ${worker.online ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              <span className="text-xs font-extrabold text-brand-navy">
                {worker.online ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Action Go Online button */}
            <button
              onClick={handleOnlineToggle}
              className={`px-4.5 py-2 rounded-xl text-xs font-extrabold shadow-sm transition-all cursor-pointer ${
                worker.online 
                  ? 'bg-slate-100 hover:bg-slate-200 text-brand-navy' 
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white'
              }`}
            >
              {worker.online ? 'Go Offline' : 'Go Online'}
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-slate-100 rounded-xl text-brand-navy transition-all"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notifications Shortcut */}
            <button 
              onClick={() => setActiveTab('notifications')}
              className="relative p-2 hover:bg-slate-100 rounded-xl text-brand-navy transition-all"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-brand-orange rounded-full border-2 border-white" />
              )}
            </button>
          </div>
        </header>

        {/* Dynamic View container */}
        <div className="p-4 md:p-8 flex-grow max-w-5xl w-full mx-auto space-y-6 pb-24 md:pb-8">
          
          {/* TAB 1: DASHBOARD HOME */}
          {activeTab === 'home' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Welcome Banner */}
              <div className="bg-brand-navy text-white rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-xl border border-brand-navy/90 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2 relative z-10">
                  <h2 className="text-2xl md:text-3xl font-black">Good Day, {worker.name} 👋</h2>
                  <p className="text-slate-300 text-xs md:text-sm font-medium">
                    You are currently <strong className={worker.online ? 'text-emerald-400' : 'text-slate-400'}>{worker.online ? 'Online' : 'Offline'}</strong> and ready for AC repair and electric jobs.
                  </p>
                </div>
                
                {/* Stats quick overview */}
                <div className="flex gap-4 relative z-10 w-full md:w-auto">
                  <div className="flex-1 bg-white/10 backdrop-blur-md px-5 py-4.5 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Jobs Completed</p>
                    <p className="text-xl font-black text-brand-orange mt-1">{completedJobs.length}</p>
                  </div>
                  <div className="flex-1 bg-white/10 backdrop-blur-md px-5 py-4.5 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Feedback Rating</p>
                    <p className="text-xl font-black text-emerald-400 mt-1 flex items-center gap-1">⭐ {worker.rating}</p>
                  </div>
                </div>

                {/* Orb background */}
                <div className="absolute right-[-100px] top-[-50px] w-80 h-80 rounded-full bg-brand-orange/15 blur-[80px]" />
              </div>

              {/* Earnings & Pending KPI Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-brand-border/60 shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today&apos;s Earnings</p>
                    <h3 className="text-2xl font-black text-brand-navy">₹{todayEarnings.toLocaleString()}</h3>
                    <p className="text-[10px] text-emerald-500 font-bold">Payout direct to bank</p>
                  </div>
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange">
                    <DollarSign className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-brand-border/60 shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">This Week&apos;s Earnings</p>
                    <h3 className="text-2xl font-black text-brand-navy">₹{weekEarnings.toLocaleString()}</h3>
                    <p className="text-[10px] text-brand-slate/60 font-semibold">Updated today</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
                    <Wallet className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-brand-border/60 shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Requests</p>
                    <h3 className="text-2xl font-black text-brand-navy">{pendingRequests.length}</h3>
                    <button 
                      onClick={() => setActiveTab('requests')}
                      className="text-[10px] text-brand-orange font-bold hover:underline"
                    >
                      Accept New Jobs
                    </button>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    pendingRequests.length > 0 ? 'bg-amber-500/10 text-amber-500 animate-pulse' : 'bg-slate-100 text-slate-400'
                  }`}>
                    <Bell className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Quick Actions & Shortcut panels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Active Jobs Quick panel */}
                <div className="bg-white p-6 rounded-3xl border border-brand-border/60 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-extrabold text-sm text-brand-navy uppercase tracking-wider">Active Assignments ({activeJobs.length})</h3>
                    <button onClick={() => setActiveTab('active')} className="text-xs font-bold text-brand-orange hover:underline">View All</button>
                  </div>
                  
                  {activeJobs.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 border border-dashed border-brand-border rounded-2xl">
                      <p className="text-xs">No active assignments currently. Switch online to get jobs.</p>
                    </div>
                  ) : (
                    activeJobs.map(job => (
                      <div key={job.id} className="p-4 bg-slate-50 rounded-2xl border border-brand-border/50 flex justify-between items-center gap-4">
                        <div>
                          <p className="text-xs font-extrabold text-brand-navy">{job.customer_name}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">{job.service_required} • {job.distance}</p>
                          <span className="inline-block mt-2 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase bg-blue-100 text-blue-700">
                            {job.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <button 
                          onClick={() => setActiveTab('active')}
                          className="p-2 bg-brand-navy hover:bg-brand-orange text-white rounded-xl transition-all"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Notifications Quick panel */}
                <div className="bg-white p-6 rounded-3xl border border-brand-border/60 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-extrabold text-sm text-brand-navy uppercase tracking-wider">Latest Alerts</h3>
                    <button onClick={() => setActiveTab('notifications')} className="text-xs font-bold text-brand-orange hover:underline">View All</button>
                  </div>
                  
                  {notifications.slice(0, 3).map(notif => (
                    <div key={notif.id} className={`p-3 rounded-2xl border flex items-start gap-3 transition-colors ${
                      notif.read ? 'bg-white border-brand-border/50' : 'bg-amber-50/40 border-amber-100'
                    }`}>
                      <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${notif.read ? 'bg-slate-300' : 'bg-brand-orange'}`} />
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-brand-navy">{notif.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{notif.message}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: JOB REQUESTS */}
          {activeTab === 'requests' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-extrabold text-brand-navy">Incoming Job Requests</h2>
              
              {pendingRequests.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-brand-border/60 shadow-sm space-y-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <Bell className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-brand-navy">All Caught Up!</p>
                    <p className="text-xs text-brand-slate/60">No pending job requests in your service radius.</p>
                  </div>
                  {!worker.online && (
                    <button 
                      onClick={handleOnlineToggle}
                      className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      Go Online to Receive Jobs
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pendingRequests.map(job => (
                    <div key={job.id} className="bg-white rounded-3xl border border-brand-border/60 shadow-sm p-6 space-y-4 hover:border-brand-orange transition-all duration-300 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="px-2 py-0.5 rounded-lg text-[9px] font-extrabold uppercase bg-brand-orange/15 text-brand-orange border border-brand-orange/20">
                              {job.service_required}
                            </span>
                            <h3 className="font-extrabold text-base text-brand-navy mt-1.5">{job.customer_name}</h3>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-brand-slate/60 font-semibold">Est. Earnings</p>
                            <p className="text-lg font-black text-brand-navy mt-0.5">₹{job.estimated_earnings}</p>
                          </div>
                        </div>

                        <div className="border-t border-slate-100 pt-3 grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Distance</p>
                            <p className="text-brand-navy font-bold mt-0.5">📍 {job.distance}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Preferred Time</p>
                            <p className="text-brand-navy font-bold mt-0.5">⏰ {job.preferred_time}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="text-amber-500 font-bold">★ {job.customer_rating}</span>
                          <span className="text-slate-400 font-medium">(Customer Rating)</span>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4 border-t border-slate-100">
                        <button
                          onClick={() => handleRejectJob(job.id)}
                          className="flex-1 py-2.5 rounded-xl border border-brand-border hover:bg-slate-50 text-red-500 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          <X className="w-4 h-4" /> Reject
                        </button>
                        <button
                          onClick={() => handleAcceptJob(job.id)}
                          className="flex-1 py-2.5 bg-brand-navy hover:bg-brand-orange text-white text-xs font-extrabold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          <Check className="w-4 h-4" /> Accept Job
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ACTIVE JOBS */}
          {activeTab === 'active' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-extrabold text-brand-navy">Currently Assigned Jobs</h2>

              {activeJobs.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-brand-border/60 shadow-sm space-y-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <Navigation className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-bold text-brand-navy">No active assignments</p>
                  <p className="text-xs text-brand-slate/60">Accept incoming bookings under the Job Requests tab.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {activeJobs.map(job => {
                    const statusSteps = ['accepted', 'on_the_way', 'arrived', 'started', 'completed'];
                    const currentIdx = statusSteps.indexOf(job.status);
                    
                    return (
                      <div key={job.id} className="bg-white rounded-3xl border border-brand-border/60 shadow-lg overflow-hidden">
                        
                        {/* Job Head */}
                        <div className="bg-brand-navy text-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <span className="text-[10px] bg-brand-orange font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                              {job.service_required}
                            </span>
                            <h3 className="text-lg font-black mt-1.5">{job.customer_name}</h3>
                            <p className="text-xs text-slate-300 mt-1">📍 {job.address}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-slate-300">Est. Payout</p>
                            <p className="text-2xl font-black text-brand-orange mt-0.5">₹{job.estimated_earnings}</p>
                          </div>
                        </div>

                        {/* Status tracker visual */}
                        <div className="p-6 border-b border-slate-100">
                          <p className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-4">Job Progress Status</p>
                          
                          <div className="flex items-center justify-between px-2 relative before:absolute before:left-6 before:right-6 before:top-4 before:h-0.5 before:bg-brand-border before:z-0">
                            {[
                              { label: 'Confirmed', key: 'accepted' },
                              { label: 'On The Way', key: 'on_the_way' },
                              { label: 'Arrived', key: 'arrived' },
                              { label: 'Work Started', key: 'started' },
                              { label: 'Completed', key: 'completed' },
                            ].map((step, idx) => {
                              const stepIdx = statusSteps.indexOf(step.key);
                              const isPassed = currentIdx >= stepIdx;
                              const isCurrent = currentIdx === stepIdx;
                              
                              return (
                                <div key={step.key} className="flex flex-col items-center relative z-10">
                                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                                    isPassed 
                                      ? 'bg-brand-orange text-white border-brand-orange ring-4 ring-brand-orange/15 shadow-sm' 
                                      : 'bg-white text-slate-400 border-brand-border'
                                  }`}>
                                    {isPassed && currentIdx > stepIdx ? '✓' : idx + 1}
                                  </div>
                                  <span className={`text-[9px] font-semibold mt-1.5 tracking-tight ${
                                    isCurrent ? 'text-brand-orange font-extrabold' : 'text-brand-slate/60'
                                  }`}>
                                    {step.label}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Customer Actions & Contact details */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50">
                          <div className="space-y-4">
                            <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider">Customer Details</h4>
                            <div className="text-xs space-y-2 text-brand-slate">
                              <p><strong>Phone:</strong> {job.phone}</p>
                              <p><strong>Requested slot:</strong> {job.preferred_time}</p>
                              <p><strong>Distance:</strong> {job.distance} away</p>
                            </div>

                            {/* Contact buttons */}
                            <div className="flex gap-3">
                              <a
                                href={`tel:${job.phone}`}
                                className="flex-1 py-2.5 rounded-xl border border-brand-border bg-white text-brand-navy font-bold text-xs text-center flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-all shadow-sm"
                              >
                                <Phone className="w-4 h-4" /> Call Client
                              </a>
                              <button
                                onClick={() => setChatOpen(!chatOpen)}
                                className="flex-1 py-2.5 rounded-xl bg-white border border-brand-border text-brand-navy font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
                              >
                                <MessageSquare className="w-4 h-4" /> Live Chat
                              </button>
                            </div>
                          </div>

                          {/* Navigation / Map mockup */}
                          <div className="bg-slate-200/60 border border-brand-border rounded-2xl p-5 flex flex-col justify-between items-center relative overflow-hidden h-44">
                            {/* Dummy Map Visual */}
                            <div className="absolute inset-0 bg-[radial-gradient(#ff7a00_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
                            <div className="relative z-10 text-center space-y-2">
                              <MapPin className="w-8 h-8 text-brand-orange mx-auto animate-bounce" />
                              <p className="text-xs font-bold text-brand-navy">Navigation Assistance</p>
                              <p className="text-[10px] text-brand-slate">GPS coordinates tracked under client proxy</p>
                            </div>
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.address)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="relative z-10 w-full py-2 bg-brand-navy hover:bg-brand-orange text-white text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1.5 shadow-sm transition-all"
                            >
                              <Navigation className="w-3.5 h-3.5" /> Navigate with Maps
                            </a>
                          </div>
                        </div>

                        {/* Status update CTA buttons */}
                        <div className="bg-white px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
                          {job.status === 'accepted' && (
                            <button
                              onClick={() => handleUpdateJobStatus(job.id, 'on_the_way')}
                              className="px-5 py-2.5 bg-brand-navy hover:bg-brand-orange text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                            >
                              Mark: On The Way
                            </button>
                          )}
                          {job.status === 'on_the_way' && (
                            <button
                              onClick={() => handleUpdateJobStatus(job.id, 'arrived')}
                              className="px-5 py-2.5 bg-brand-navy hover:bg-brand-orange text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                            >
                              Mark: Arrived
                            </button>
                          )}
                          {job.status === 'arrived' && (
                            <button
                              onClick={() => handleUpdateJobStatus(job.id, 'started')}
                              className="px-5 py-2.5 bg-brand-navy hover:bg-brand-orange text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                            >
                              Mark: Work Started
                            </button>
                          )}
                          {job.status === 'started' && (
                            <button
                              onClick={() => handleUpdateJobStatus(job.id, 'completed')}
                              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                            >
                              <Check className="w-4 h-4" /> Work Completed
                            </button>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

              {/* Chat drawer mockup */}
              {chatOpen && (
                <div className="fixed bottom-6 right-6 z-40 bg-white w-80 h-96 rounded-3xl border border-brand-border shadow-2xl overflow-hidden flex flex-col justify-between animate-in slide-in-from-bottom-6 duration-300">
                  <div className="bg-brand-navy text-white px-4 py-3 flex justify-between items-center">
                    <span className="text-xs font-bold">Client Chat Support</span>
                    <button onClick={() => setChatOpen(false)} className="text-xs text-slate-300 hover:text-white font-bold">Close</button>
                  </div>
                  
                  {/* Chat logs */}
                  <div className="p-4 flex-grow overflow-y-auto space-y-3 bg-slate-50 text-xs">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`flex flex-col ${msg.sender === 'worker' ? 'items-end' : 'items-start'}`}>
                        <div className={`p-2.5 rounded-2xl max-w-[80%] ${
                          msg.sender === 'worker' 
                            ? 'bg-brand-navy text-white rounded-tr-none' 
                            : 'bg-white border border-brand-border text-brand-navy rounded-tl-none'
                        }`}>
                          <p>{msg.text}</p>
                        </div>
                        <span className="text-[9px] text-slate-400 mt-1">{msg.time}</span>
                      </div>
                    ))}
                  </div>

                  {/* Input bar */}
                  <div className="p-3 border-t border-slate-100 flex gap-2 bg-white">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={chatText}
                      onChange={(e) => setChatText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                      className="flex-grow px-3 py-2 bg-slate-50 border border-brand-border rounded-xl text-xs focus:outline-none focus:border-brand-orange"
                    />
                    <button
                      onClick={handleSendChatMessage}
                      className="px-3 py-2 bg-brand-navy hover:bg-brand-orange text-white text-xs font-bold rounded-xl transition-all"
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 4: EARNINGS */}
          {activeTab === 'earnings' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-extrabold text-brand-navy">Earnings Report Dashboard</h2>

              {/* Wallet Summary Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Balance */}
                <div className="bg-brand-navy text-white p-6 rounded-3xl border border-brand-navy/90 shadow-lg flex flex-col justify-between h-40">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Wallet Balance</p>
                    <Wallet className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white">₹{worker.wallet_balance.toLocaleString()}</h3>
                    <p className="text-[10px] text-slate-300 mt-1">Ready for direct bank transfer</p>
                  </div>
                </div>

                {/* Lifetime */}
                <div className="bg-white p-6 rounded-3xl border border-brand-border/60 shadow-sm flex flex-col justify-between h-40">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lifetime Earnings</p>
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-brand-navy">₹{(worker.wallet_balance + 6500).toLocaleString()}</h3>
                    <p className="text-[10px] text-slate-500 mt-1">Platform commissions deducted</p>
                  </div>
                </div>

                {/* Deductions breakdown */}
                <div className="bg-white p-6 rounded-3xl border border-brand-border/60 shadow-sm flex flex-col justify-between h-40">
                  <div className="space-y-2 text-xs">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Monthly Details</p>
                    <div className="flex justify-between text-brand-slate">
                      <span>Incentives / Bonuses:</span>
                      <strong className="text-emerald-500">+₹500</strong>
                    </div>
                    <div className="flex justify-between text-brand-slate">
                      <span>Commission (10%):</span>
                      <strong className="text-red-500">-₹650</strong>
                    </div>
                    <div className="flex justify-between text-brand-slate">
                      <span>Withdrawals:</span>
                      <strong className="text-brand-navy">₹0.00</strong>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-brand-navy hover:bg-brand-orange text-white text-xs font-bold rounded-xl transition-all shadow-sm">
                    Withdraw to HDFC
                  </button>
                </div>

              </div>

              {/* Weekly Performance Graph - Custom SVG */}
              <div className="bg-white p-6 rounded-3xl border border-brand-border/60 shadow-sm space-y-4">
                <div>
                  <h3 className="font-extrabold text-sm text-brand-navy uppercase tracking-wider">Weekly Revenue Analytics</h3>
                  <p className="text-xs text-slate-500">Earnings trend from completed booking calls in Mumbai</p>
                </div>

                {/* Custom SVG Bar Chart */}
                <div className="w-full h-64 border-b border-l border-brand-border flex items-end justify-between px-6 pt-4 relative">
                  
                  {/* Grid Lines */}
                  <div className="absolute inset-x-0 bottom-1/4 border-b border-dashed border-slate-100 pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-2/4 border-b border-dashed border-slate-100 pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-3/4 border-b border-dashed border-slate-100 pointer-events-none" />

                  {/* Monday */}
                  <div className="flex flex-col items-center gap-2 flex-grow">
                    <div className="w-8 bg-brand-navy/20 hover:bg-brand-navy transition-colors rounded-t-lg h-24" />
                    <span className="text-[10px] font-bold text-slate-400">Mon</span>
                  </div>

                  {/* Tuesday */}
                  <div className="flex flex-col items-center gap-2 flex-grow">
                    <div className="w-8 bg-brand-navy/20 hover:bg-brand-navy transition-colors rounded-t-lg h-12" />
                    <span className="text-[10px] font-bold text-slate-400">Tue</span>
                  </div>

                  {/* Wednesday */}
                  <div className="flex flex-col items-center gap-2 flex-grow">
                    <div className="w-8 bg-brand-navy/20 hover:bg-brand-navy transition-colors rounded-t-lg h-0" />
                    <span className="text-[10px] font-bold text-slate-400">Wed</span>
                  </div>

                  {/* Thursday */}
                  <div className="flex flex-col items-center gap-2 flex-grow">
                    <div className="w-8 bg-brand-navy/20 hover:bg-brand-navy transition-colors rounded-t-lg h-36" />
                    <span className="text-[10px] font-bold text-slate-400">Thu</span>
                  </div>

                  {/* Friday - Today (Peak) */}
                  <div className="flex flex-col items-center gap-2 flex-grow">
                    <div className="w-8 bg-brand-orange hover:bg-brand-orange/95 transition-colors rounded-t-lg h-48 relative group">
                      {/* Tooltip */}
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-brand-navy text-white text-[9px] font-bold py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
                        ₹1,850 Today
                      </span>
                    </div>
                    <span className="text-[10px] font-extrabold text-brand-orange">Fri</span>
                  </div>

                  {/* Saturday */}
                  <div className="flex flex-col items-center gap-2 flex-grow">
                    <div className="w-8 bg-brand-navy/10 rounded-t-lg h-0" />
                    <span className="text-[10px] font-bold text-slate-400">Sat</span>
                  </div>

                  {/* Sunday */}
                  <div className="flex flex-col items-center gap-2 flex-grow">
                    <div className="w-8 bg-brand-navy/10 rounded-t-lg h-0" />
                    <span className="text-[10px] font-bold text-slate-400">Sun</span>
                  </div>

                </div>

                <div className="flex justify-between items-center text-xs text-slate-500 pt-2 px-2">
                  <span>📅 Base: July 1 - July 3</span>
                  <span className="font-bold text-brand-navy">Peak Days: Friday</span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: BOOKING HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl font-extrabold text-brand-navy">Past Booking Archives</h2>
                
                {/* Filter list */}
                <div className="flex bg-slate-100 p-1 rounded-xl border border-brand-border w-fit">
                  {['today', 'week', 'month', 'year'].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setHistoryFilter(filter as 'today' | 'week' | 'month' | 'year')}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                        historyFilter === filter
                          ? 'bg-brand-navy text-white font-extrabold shadow-sm'
                          : 'text-brand-slate hover:text-brand-navy'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {filteredHistory.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-brand-border/60">
                  <History className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-400">No completed bookings found under this filter.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredHistory.map(job => (
                    <div key={job.id} className="bg-white rounded-3xl p-5 border border-brand-border/60 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-all duration-300">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-slate-100 text-slate-600 border border-slate-200">
                            {job.service_required}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold">Job: {job.id}</span>
                        </div>
                        <h4 className="font-extrabold text-base text-brand-navy mt-1.5">{job.customer_name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">📅 Completed on {job.date} • {job.preferred_time}</p>
                      </div>

                      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
                        <div className="text-left sm:text-right">
                          <p className="text-xs font-black text-brand-navy">₹{job.estimated_earnings}</p>
                          <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-0.5 mt-0.5">
                            ★ {job.customer_rating} Client Rating
                          </span>
                        </div>
                        <button className="px-3.5 py-2 border border-brand-border hover:bg-slate-50 text-brand-navy font-bold text-xs rounded-xl flex items-center gap-1 transition-all">
                          Invoice <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: SCHEDULE & AVAILABILITY */}
          {activeTab === 'schedule' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-extrabold text-brand-navy">Working Hours & Schedule</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Hours configuration */}
                <div className="bg-white p-6 rounded-3xl border border-brand-border/60 shadow-sm space-y-4">
                  <h3 className="font-extrabold text-sm text-brand-navy uppercase tracking-wider">Set Working Hours</h3>
                  
                  <div className="space-y-3">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
                      const isOff = worker.days_off.includes(day);
                      return (
                        <div key={day} className="flex items-center justify-between py-1 text-xs">
                          <span className="font-bold text-brand-navy w-24">{day}</span>
                          
                          <div className="flex items-center gap-3">
                            <span className="text-slate-500 font-medium">
                              {isOff ? 'Off Duty' : worker.working_hours[day] || '9 AM - 8 PM'}
                            </span>
                            
                            <button
                              type="button"
                              onClick={async () => {
                                let daysOff = [...worker.days_off];
                                if (isOff) {
                                  daysOff = daysOff.filter(d => d !== day);
                                } else {
                                  daysOff.push(day);
                                }
                                const updated = await db.updateWorker(worker.id, { days_off: daysOff });
                                setWorker(updated);
                              }}
                              className={`px-3 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                                isOff 
                                  ? 'bg-slate-100 text-slate-400 border-slate-200' 
                                  : 'bg-white hover:bg-slate-50 text-red-500 border-red-200'
                              }`}
                            >
                              {isOff ? 'Mark Active' : 'Mark Off'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Holiday & Vacation Mode */}
                <div className="space-y-6">
                  
                  {/* Vacation Mode Toggle */}
                  <div className="bg-white p-6 rounded-3xl border border-brand-border/60 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-extrabold text-sm text-brand-navy uppercase tracking-wider">Vacation Mode</h3>
                      
                      {/* Toggle visual */}
                      <button
                        onClick={async () => {
                          const updated = await db.updateWorker(worker.id, { vacation_mode: !worker.vacation_mode });
                          setWorker(updated);
                          
                          await db.createNotification({
                            user_id: worker.id,
                            title: updated.vacation_mode ? 'Vacation Mode Active ✈️' : 'Vacation Mode Disabled 🏠',
                            message: updated.vacation_mode 
                              ? 'Your schedule is paused. Clients will not be able to book services.' 
                              : 'Welcome back! You are now eligible to accept service requests.',
                          });
                          await loadWorkerData(worker.id);
                        }}
                        className={`w-12 h-6.5 rounded-full p-1 transition-colors cursor-pointer ${
                          worker.vacation_mode ? 'bg-brand-orange' : 'bg-slate-200'
                        }`}
                      >
                        <div className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform ${
                          worker.vacation_mode ? 'translate-x-5.5' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Enable vacation mode to pause all incoming job requests temporarily. Re-enable when you are ready to resume.
                    </p>
                  </div>

                  {/* Marked Holidays */}
                  <div className="bg-white p-6 rounded-3xl border border-brand-border/60 shadow-sm space-y-4">
                    <h3 className="font-extrabold text-sm text-brand-navy uppercase tracking-wider">Scheduled Holidays</h3>
                    
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        id="holidayDate"
                        className="flex-grow px-3.5 py-2 bg-slate-50 border border-brand-border rounded-xl text-xs"
                      />
                      <button
                        onClick={async () => {
                          const el = document.getElementById('holidayDate') as HTMLInputElement;
                          if (!el?.value) return;
                          
                          const holidays = [...worker.holidays];
                          if (!holidays.includes(el.value)) {
                            holidays.push(el.value);
                            const updated = await db.updateWorker(worker.id, { holidays });
                            setWorker(updated);
                            el.value = '';
                          }
                        }}
                        className="px-4 py-2 bg-brand-navy hover:bg-brand-orange text-white text-xs font-bold rounded-xl transition-all"
                      >
                        Add Holiday
                      </button>
                    </div>

                    <div className="space-y-2">
                      {worker.holidays.length === 0 ? (
                        <p className="text-xs text-slate-400 italic">No scheduled holidays.</p>
                      ) : (
                        worker.holidays.map(h => (
                          <div key={h} className="flex justify-between items-center py-1.5 border-b border-slate-50 text-xs">
                            <span className="font-semibold text-brand-navy">📅 {h}</span>
                            <button
                              onClick={async () => {
                                const holidays = worker.holidays.filter(x => x !== h);
                                const updated = await db.updateWorker(worker.id, { holidays });
                                setWorker(updated);
                              }}
                              className="text-[10px] font-bold text-red-500 hover:underline cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* TAB 7: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-extrabold text-brand-navy">Partner Profile Console</h2>
                <button
                  onClick={() => {
                    if (editProfileMode) {
                      handleSaveProfile();
                    } else {
                      setEditedProfile(worker);
                      setEditProfileMode(true);
                    }
                  }}
                  className="px-4 py-2.5 bg-brand-navy hover:bg-brand-orange text-white text-xs font-extrabold rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" /> {editProfileMode ? 'Save Profile' : 'Edit Profile'}
                </button>
              </div>

              {/* Profile Card */}
              <div className="bg-white rounded-3xl border border-brand-border/60 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3">
                
                {/* Photo & verification status */}
                <div className="p-8 bg-slate-50 border-r border-brand-border/50 text-center flex flex-col justify-center items-center gap-4">
                  {worker.photo ? (
                    <img src={worker.photo} alt={worker.name} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl" />
                  ) : (
                    <div className="w-32 h-32 bg-brand-navy/5 rounded-full flex items-center justify-center text-brand-navy border-4 border-white shadow-xl">
                      <User className="w-16 h-16" />
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-extrabold text-lg text-brand-navy leading-none">{worker.name}</h3>
                    <span className="text-[10px] text-slate-400 font-bold block mt-1.5 uppercase">AiroFox partner partner</span>
                  </div>

                  <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Aadhaar Verified
                  </div>
                </div>

                {/* Personal & payout details */}
                <div className="p-8 md:col-span-2 space-y-6">
                  
                  {editProfileMode ? (
                    // EDIT MODE
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-400">Full Name</label>
                        <input
                          type="text"
                          value={editedProfile.name || ''}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 bg-slate-50 border border-brand-border rounded-xl focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-400">Contact Number</label>
                        <input
                          type="text"
                          value={editedProfile.phone || ''}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-3 py-2 bg-slate-50 border border-brand-border rounded-xl focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-400">Bank Name</label>
                        <input
                          type="text"
                          value={editedProfile.bank_name || ''}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, bank_name: e.target.value }))}
                          className="w-full px-3 py-2 bg-slate-50 border border-brand-border rounded-xl focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-400">Bank Account Number</label>
                        <input
                          type="text"
                          value={editedProfile.account_no || ''}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, account_no: e.target.value }))}
                          className="w-full px-3 py-2 bg-slate-50 border border-brand-border rounded-xl focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <label className="font-bold text-slate-400">UPI ID</label>
                        <input
                          type="text"
                          value={editedProfile.upi_id || ''}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, upi_id: e.target.value }))}
                          className="w-full px-3 py-2 bg-slate-50 border border-brand-border rounded-xl focus:outline-none"
                        />
                      </div>
                    </div>
                  ) : (
                    // VIEW MODE
                    <div className="space-y-6 text-xs text-brand-slate">
                      <div>
                        <h4 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] mb-2.5">Basic Details</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <p><strong>Age:</strong> {worker.age} Years</p>
                          <p><strong>Gender:</strong> {worker.gender}</p>
                          <p><strong>Languages:</strong> {worker.languages.join(', ')}</p>
                          <p><strong>Experience:</strong> {worker.experience}</p>
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-4">
                        <h4 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] mb-2.5">Skills & Credentials</h4>
                        <div className="flex flex-wrap gap-2">
                          {worker.skills.map(s => (
                            <span key={s} className="px-3 py-1 bg-slate-100 rounded-xl font-semibold border border-brand-border/40">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-4">
                        <h4 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] mb-2.5">Payout & Bank Credentials</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <p><strong>Bank:</strong> {worker.bank_name}</p>
                          <p><strong>Account:</strong> {worker.account_no ? `•••• ${worker.account_no.slice(-4)}` : 'N/A'}</p>
                          <p className="col-span-2"><strong>UPI ID:</strong> {worker.upi_id}</p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

              </div>
            </div>
          )}

          {/* TAB 8: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-extrabold text-brand-navy font-sans">Reviews & Feedback</h2>

              {/* Review metrics dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="bg-white p-6 rounded-3xl border border-brand-border/60 shadow-sm text-center space-y-1">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Rating</h4>
                  <p className="text-3xl font-black text-brand-navy flex items-center justify-center gap-1">
                    ⭐ {worker.rating}
                  </p>
                  <p className="text-[10px] text-slate-400">Out of 5 stars feedback</p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-brand-border/60 shadow-sm text-center space-y-1">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Reviews</h4>
                  <p className="text-3xl font-black text-brand-navy">{reviews.length}</p>
                  <p className="text-[10px] text-slate-400">100% verified customer calls</p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-brand-border/60 shadow-sm text-center space-y-1">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Response Rate</h4>
                  <p className="text-3xl font-black text-brand-navy">98%</p>
                  <p className="text-[10px] text-emerald-500 font-bold">Excellent response score</p>
                </div>

              </div>

              {/* Review list */}
              <div className="space-y-4">
                {reviews.map(rev => (
                  <div key={rev.id} className="bg-white p-5 rounded-3xl border border-brand-border/60 shadow-sm space-y-3.5">
                    <div className="flex justify-between items-center text-xs">
                      <div>
                        <span className="font-extrabold text-brand-navy">{rev.reviewer}</span>
                        <span className="text-[10px] text-slate-400 font-semibold ml-2">• Verified Client</span>
                      </div>
                      <span className="text-slate-400">{rev.date}</span>
                    </div>

                    <div className="flex text-amber-500 gap-0.5">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    <p className="text-xs text-brand-slate leading-relaxed">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-extrabold text-brand-navy">Notifications & Updates</h2>
                <button
                  onClick={handleClearNotifications}
                  className="text-xs font-bold text-red-500 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Clear All Alerts
                </button>
              </div>

              {notifications.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-brand-border/60">
                  <Bell className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-400">All caught up! No notifications.</p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {notifications.map(notif => (
                    <div
                      key={notif.id}
                      onClick={() => handleMarkNotifRead(notif.id)}
                      className={`p-5 rounded-3xl border transition-all cursor-pointer flex justify-between items-start gap-4 hover:shadow-md duration-300 ${
                        notif.read 
                          ? 'bg-white border-brand-border/50 opacity-80' 
                          : 'bg-amber-50/30 border-amber-200'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {!notif.read && <span className="w-2 h-2 rounded-full bg-brand-orange" />}
                          <h4 className="font-bold text-xs text-brand-navy">{notif.title}</h4>
                        </div>
                        <p className="text-xs text-slate-500">{notif.message}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">{notif.date}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>

      {/* BOTTOM NAVIGATION BAR FOR MOBILE */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-brand-border md:hidden flex justify-around items-center py-2 shadow-[0_-2px_15px_rgba(0,0,0,0.06)] px-2">
        <button
          onClick={() => {
            setActiveTab('home');
            setMobileMenuOpen(false);
          }}
          className={`flex flex-col items-center gap-1.5 py-1 px-3 transition-all cursor-pointer ${
            activeTab === 'home' && !mobileMenuOpen
              ? 'text-brand-orange font-bold'
              : 'text-slate-400 font-semibold'
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span className="text-[9px] tracking-tight">Home</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('requests');
            setMobileMenuOpen(false);
          }}
          className={`flex flex-col items-center gap-1.5 py-1 px-3 transition-all cursor-pointer relative ${
            activeTab === 'requests' && !mobileMenuOpen
              ? 'text-brand-orange font-bold'
              : 'text-slate-400 font-semibold'
          }`}
        >
          <div className="relative">
            <Bell className="w-5 h-5" />
            {pendingRequests.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-orange text-white rounded-full text-[8px] font-extrabold w-4 h-4 flex items-center justify-center border border-white">
                {pendingRequests.length}
              </span>
            )}
          </div>
          <span className="text-[9px] tracking-tight">Requests</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('active');
            setMobileMenuOpen(false);
          }}
          className={`flex flex-col items-center gap-1.5 py-1 px-3 transition-all cursor-pointer relative ${
            activeTab === 'active' && !mobileMenuOpen
              ? 'text-brand-orange font-bold'
              : 'text-slate-400 font-semibold'
          }`}
        >
          <div className="relative">
            <Navigation className="w-5 h-5" />
            {activeJobs.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-orange text-white rounded-full text-[8px] font-extrabold w-4 h-4 flex items-center justify-center border border-white">
                {activeJobs.length}
              </span>
            )}
          </div>
          <span className="text-[9px] tracking-tight">Active</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('earnings');
            setMobileMenuOpen(false);
          }}
          className={`flex flex-col items-center gap-1.5 py-1 px-3 transition-all cursor-pointer ${
            activeTab === 'earnings' && !mobileMenuOpen
              ? 'text-brand-orange font-bold'
              : 'text-slate-400 font-semibold'
          }`}
        >
          <DollarSign className="w-5 h-5" />
          <span className="text-[9px] tracking-tight">Earnings</span>
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`flex flex-col items-center gap-1.5 py-1 px-3 transition-all cursor-pointer ${
            mobileMenuOpen
              ? 'text-brand-orange font-bold'
              : 'text-slate-400 font-semibold'
          }`}
        >
          <Menu className="w-5 h-5" />
          <span className="text-[9px] tracking-tight">More</span>
        </button>
      </div>

      {/* MOBILE MORE MENU DRAWER */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" 
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] p-6 max-h-[85vh] overflow-y-auto space-y-6 shadow-2xl border-t border-brand-border/60 animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header info */}
            <div className="flex items-center justify-between pb-4 border-b border-brand-border">
              <div className="flex items-center gap-3">
                {worker.photo ? (
                  <img src={worker.photo} alt={worker.name} className="w-12 h-12 rounded-full object-cover border-2 border-brand-orange" />
                ) : (
                  <div className="w-12 h-12 bg-brand-navy rounded-full flex items-center justify-center font-bold text-white uppercase">
                    {worker.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-brand-navy text-sm">{worker.name}</h4>
                  <p className="text-[10px] text-brand-slate font-semibold">Partner ID: {worker.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-brand-navy rounded-full transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'home', label: 'Dashboard', icon: <Briefcase className="w-5 h-5" /> },
                { id: 'requests', label: 'Requests', icon: <Bell className="w-5 h-5" />, badge: pendingRequests.length },
                { id: 'active', label: 'Active Jobs', icon: <Navigation className="w-5 h-5" />, badge: activeJobs.length },
                { id: 'earnings', label: 'Earnings', icon: <DollarSign className="w-5 h-5" /> },
                { id: 'history', label: 'History', icon: <History className="w-5 h-5" /> },
                { id: 'schedule', label: 'Availability', icon: <Calendar className="w-5 h-5" /> },
                { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
                { id: 'reviews', label: 'Reviews', icon: <Star className="w-5 h-5" /> },
                { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" />, badge: unreadNotifCount },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex flex-col items-center justify-center p-4.5 rounded-2xl border transition-all cursor-pointer relative ${
                    activeTab === item.id && !mobileMenuOpen
                      ? 'bg-brand-orange/15 border-brand-orange text-brand-orange font-bold' 
                      : 'bg-slate-50 border-brand-border/40 text-brand-navy hover:bg-slate-100'
                  }`}
                >
                  <div className={`${activeTab === item.id && !mobileMenuOpen ? 'text-brand-orange' : 'text-brand-navy/70'} mb-2`}>
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold tracking-tight text-center">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded-full text-[8px] font-extrabold bg-brand-orange text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Logout Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-2xl text-xs font-bold transition-all cursor-pointer"
              >
                <Power className="w-4 h-4" /> Logout Partner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MOBILE BOTTOM NAV ────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-brand-border/60 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex items-stretch" style={{ paddingBottom: 'env(safe-area-inset-bottom,0px)' }}>
        {[
          { id: 'home',    label: 'Home',     icon: <Briefcase className="w-5 h-5" /> },
          { id: 'requests', label: 'Requests', icon: <Bell className="w-5 h-5" />, badge: pendingRequests.length },
          { id: 'active',  label: 'Active',   icon: <Navigation className="w-5 h-5" />, badge: activeJobs.length },
          { id: 'earnings', label: 'Earnings', icon: <DollarSign className="w-5 h-5" /> },
          { id: 'profile', label: 'Profile',   icon: <User className="w-5 h-5" /> },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as typeof activeTab)}
            className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-1 relative transition-all ${
              activeTab === item.id ? 'text-brand-orange' : 'text-slate-400'
            }`}
          >
            <span className="relative">
              {item.icon}
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-brand-orange text-white text-[8px] font-extrabold rounded-full flex items-center justify-center border border-white">
                  {item.badge}
                </span>
              )}
            </span>
            <span className={`text-[9px] font-bold ${activeTab === item.id ? 'text-brand-orange' : 'text-slate-400'}`}>
              {item.label}
            </span>
            {activeTab === item.id && (
              <span className="absolute top-0 inset-x-0 h-0.5 bg-brand-orange rounded-b-full" />
            )}
          </button>
        ))}
      </nav>

    </div>
  );
}
