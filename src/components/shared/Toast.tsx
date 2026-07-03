"use client";
import React, { useState, useEffect } from 'react';
import { CheckCircle, Info, XCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'error';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message: string;
}

// Global helper — call this anywhere in the app
export function showToast(type: ToastType, title: string, message: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('af-toast', {
    detail: { id: `toast-${Date.now()}`, type, title, message }
  }));
}

const ICONS = {
  success: <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
  info:    <Info        className="w-5 h-5 text-blue-400 flex-shrink-0" />,
  error:   <XCircle    className="w-5 h-5 text-red-400 flex-shrink-0" />,
};

const BORDER = {
  success: '#10b981',
  info:    '#60a5fa',
  error:   '#f87171',
};

export default function ToastProvider() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handler = (e: CustomEvent<ToastMessage>) => {
      const toast = e.detail;
      setToasts(prev => [toast, ...prev].slice(0, 5)); // max 5 at once
      // auto-dismiss after 4s
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id));
      }, 4000);
    };
    window.addEventListener('af-toast', handler as EventListener);
    return () => window.removeEventListener('af-toast', handler as EventListener);
  }, []);

  const dismiss = (id: string) =>
    setToasts(prev => prev.filter(t => t.id !== id));

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '90px',   // above mobile sticky bar
        right: '16px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '320px',
        width: 'calc(100vw - 32px)',
      }}
    >
      {toasts.map(toast => (
        <div
          key={toast.id}
          style={{
            background: 'rgba(15,23,42,0.96)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '14px',
            padding: '14px 16px',
            borderLeft: `4px solid ${BORDER[toast.type]}`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.28)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            animation: 'toast-in 0.35s cubic-bezier(0.4,0,0.2,1) both',
          }}
        >
          {ICONS[toast.type]}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontWeight: 700, fontSize: '13px', color: '#f1f5f9', margin: 0, lineHeight: 1.3 }}>
              {toast.title}
            </p>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '3px 0 0 0', lineHeight: 1.4 }}>
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => dismiss(toast.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#64748b',
              padding: '2px',
              flexShrink: 0,
              lineHeight: 1,
            }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}

      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
