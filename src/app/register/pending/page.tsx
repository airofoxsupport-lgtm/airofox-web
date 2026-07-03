"use client";
import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Clock, ShieldAlert, ArrowRight, Home, CheckCircle2, AlertCircle } from 'lucide-react';
import { db, WorkerProfile } from '@/lib/db';

function PendingContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [worker, setWorker] = useState<WorkerProfile | null>(null);

  useEffect(() => {
    if (!email) return;

    const checkStatus = async () => {
      const w = await db.getWorkerByEmail(email);
      if (w) {
        setWorker(w);
        if (w.status === 'approved') {
          localStorage.setItem('af_logged_worker', JSON.stringify(w));
        }
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 2000);
    return () => clearInterval(interval);
  }, [email]);

  const isApproved = worker?.status === 'approved';
  const isRejected = worker?.status === 'rejected';

  return (
    <div className="flex-grow flex items-center justify-center min-h-[90vh] relative overflow-hidden bg-brand-white py-16 px-4">
      {/* Background Orbs */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 rounded-full bg-brand-orange/10 blur-[100px] pointer-events-none animate-[pulse-green_6s_infinite]" />
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 rounded-full bg-brand-navy/10 blur-[100px] pointer-events-none animate-[pulse-navy_6s_infinite]" />

      <div className="w-full max-w-xl relative z-10 text-center">
        {/* Header */}
        <div className="mb-8">
          {isApproved ? (
            <div className="inline-flex p-4 rounded-3xl bg-green-50 border border-green-200 text-green-500 mb-4 animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>
          ) : isRejected ? (
            <div className="inline-flex p-4 rounded-3xl bg-red-50 border border-red-200 text-red-500 mb-4">
              <AlertCircle className="w-12 h-12" />
            </div>
          ) : (
            <div className="inline-flex p-4 rounded-3xl bg-amber-50 border border-amber-200 text-amber-500 mb-4 animate-[float-gentle_4s_infinite]">
              <Clock className="w-12 h-12" />
            </div>
          )}
          <h2 className="text-3xl font-extrabold text-brand-navy tracking-tight">
            {isApproved ? 'Application Approved!' : isRejected ? 'Verification Declined' : 'Application Submitted!'}
          </h2>
          <p className="mt-2 text-brand-slate text-sm">
            {isApproved 
              ? `Congratulations ${worker?.name || 'Partner'}, your partner account is now active!`
              : isRejected
              ? `We regret to inform you that your application has been declined.`
              : `Thank you for applying to be an AiroFox Service Partner, ${worker?.name || 'Partner'}.`}
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-brand-border/60 text-left mb-8">
          <h3 className="font-bold text-lg text-brand-navy mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-brand-orange" />
            Verification Status
          </h3>

          {/* Progress Steps */}
          <div className="relative pl-8 space-y-6 before:absolute before:left-3.5 before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-brand-border">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-8 top-0.5 w-7 h-7 rounded-full bg-brand-navy border border-brand-navy flex items-center justify-center text-white text-xs font-bold">
                ✓
              </div>
              <div>
                <h4 className="text-sm font-bold text-brand-navy">Partner Account Created</h4>
                <p className="text-xs text-brand-slate mt-0.5">Your basic profile, skills selection, and contact details are saved.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              {isApproved ? (
                <div className="absolute -left-8 top-0.5 w-7 h-7 rounded-full bg-brand-navy border border-brand-navy flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </div>
              ) : isRejected ? (
                <div className="absolute -left-8 top-0.5 w-7 h-7 rounded-full bg-red-500 border border-red-500 flex items-center justify-center text-white text-xs font-bold">
                  ✕
                </div>
              ) : (
                <div className="absolute -left-8 top-0.5 w-7 h-7 rounded-full bg-amber-500 border border-amber-500 flex items-center justify-center text-white text-xs font-bold animate-[pulse-green_1.5s_infinite]">
                  ⌛
                </div>
              )}
              <div>
                <h4 className={`text-sm font-bold ${isApproved ? 'text-brand-navy' : isRejected ? 'text-red-600' : 'text-amber-600'}`}>
                  {isApproved ? 'Profile Verified' : isRejected ? 'Verification Declined' : 'Verification Under Process'}
                </h4>
                <p className="text-xs text-brand-slate mt-0.5">
                  {isApproved
                    ? 'Our operations team has successfully verified your profile photo and contact details.'
                    : isRejected
                    ? 'Your application details did not meet our verification criteria.'
                    : 'Our operations team is verifying your age limit (18-65) and profile photo size (under 400KB).'}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              {isApproved ? (
                <div className="absolute -left-8 top-0.5 w-7 h-7 rounded-full bg-brand-orange border border-brand-orange flex items-center justify-center text-white text-xs font-bold">
                  🚀
                </div>
              ) : (
                <div className="absolute -left-8 top-0.5 w-7 h-7 rounded-full bg-white border border-brand-border flex items-center justify-center text-brand-slate/40 text-xs font-bold">
                  🔒
                </div>
              )}
              <div>
                <h4 className={`text-sm font-bold ${isApproved ? 'text-brand-orange' : 'text-brand-slate/60'}`}>
                  Ready to Earn
                </h4>
                <p className="text-xs text-brand-slate/60 mt-0.5">
                  {isApproved
                    ? 'You can now go online in your partner workspace and accept jobs immediately!'
                    : 'Once approved, your dashboard will unlock. You can start accepting jobs.'}
                </p>
              </div>
            </div>
          </div>

          {isApproved ? (
            <Link
              href="/worker/dashboard"
              className="w-full mt-8 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-orange hover:bg-brand-orange/95 text-white font-bold text-sm rounded-2xl shadow-lg transition-all duration-300 animate-pulse cursor-pointer"
            >
              Go to Partner Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          ) : isRejected ? (
            <div className="mt-8 bg-red-50 p-4.5 rounded-2xl border border-red-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-red-700">Account Restricted</p>
                <p className="text-[11px] text-red-600 mt-1">
                  Please contact partner helpline support to resolve this issue.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-8 bg-brand-white p-4.5 rounded-2xl border border-brand-border flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-brand-navy">Expected Review Duration</p>
                <p className="text-[11px] text-brand-slate mt-1">
                  Verification requests are typically processed within 1-2 hours. You can keep this page open for automatic update, or sign in directly once approved: <strong>{email || 'registered email'}</strong>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 border border-brand-border bg-white rounded-2xl text-brand-navy font-bold text-xs hover:bg-slate-50 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
          {!isApproved && (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-5 py-3 bg-brand-navy text-white rounded-2xl font-bold text-xs hover:bg-brand-orange transition-all cursor-pointer"
            >
              Sign In Portal
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RegisterPending() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-white flex items-center justify-center">
        <Clock className="w-8 h-8 animate-spin text-brand-orange" />
      </div>
    }>
      <PendingContent />
    </Suspense>
  );
}
