"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setStatus({ type: 'error', message: 'Please enter both email and password.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    setTimeout(() => {
      setIsSubmitting(false);

      // Admin credentials from environment variables
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@airofox.com';
      const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

      if (
        formData.email.toLowerCase() === adminEmail.toLowerCase() &&
        formData.password === adminPassword
      ) {
        setIsSuccess(true);
        localStorage.setItem('af_admin_token', 'true');
        setStatus({ type: 'success', message: 'Authorized! Accessing Admin Dashboard...' });
        
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1200);
      } else {
        setStatus({
          type: 'error',
          message: 'Access Denied: Invalid administrator credentials.',
        });
      }
    }, 1200);
  };

  return (
    <div className="flex-grow flex items-center justify-center min-h-[90vh] relative overflow-hidden bg-slate-950 py-16 px-4">
      {/* Admin Dark Space BG Orbs */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-orange-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Back Link */}
        <Link href="/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-all text-xs font-bold mb-8">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Partner Login
        </Link>

        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-brand-orange mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Admin Console</h2>
          <p className="mt-2 text-slate-400 text-sm">
            Sign in to verify partner credentials and manage job allocations.
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-800 transition-all duration-300">
          {isSuccess ? (
            <div className="text-center py-8 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-950 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-800">
                <CheckCircle className="w-8 h-8 text-emerald-400 animate-[count-pop_0.5s_ease-out]" />
              </div>
              <h3 className="text-xl font-bold text-white">Verification Authorized!</h3>
              <p className="mt-2 text-slate-400 text-sm">
                Redirecting to dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-300 block" htmlFor="email">
                  Admin Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-4 flex items-center text-slate-500">
                    <Mail className="w-4 h-4" />
                  </span>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="admin@airofox.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-11 h-12 rounded-2xl border border-slate-800 bg-slate-950 text-white focus-visible:border-brand-orange focus-visible:ring-brand-orange/20 placeholder:text-slate-600"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-300 block" htmlFor="password">
                  Security Passkey
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-4 flex items-center text-slate-500">
                    <Lock className="w-4 h-4" />
                  </span>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-11 pr-11 h-12 rounded-2xl border border-slate-800 bg-slate-950 text-white focus-visible:border-brand-orange focus-visible:ring-brand-orange/20 placeholder:text-slate-600"
                    required
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-slate-500 hover:text-white transition-colors focus:outline-none"
                    disabled={isSubmitting}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Feedback Message */}
              {status.message && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-medium border ${
                    status.type === 'success'
                      ? 'bg-emerald-950/50 text-emerald-400 border-emerald-900/50'
                      : 'bg-red-950/50 text-red-400 border-red-900/50'
                  } animate-in fade-in slide-in-from-top-1`}
                >
                  {status.message}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-2xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer disabled:bg-slate-800 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Authorize Access
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
