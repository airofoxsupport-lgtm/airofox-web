"use client";
import { useRouter } from 'next/navigation';
import { db } from '@/lib/db';

export function useProtectedAction() {
  const router = useRouter();

  const handleProtectedAction = async (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    actionType: 'call' | 'whatsapp' | 'book',
    serviceName: string = 'a service'
  ) => {
    const userStr = typeof window !== 'undefined' ? localStorage.getItem('af_logged_user') : null;
    
    if (!userStr) {
      e.preventDefault();
      router.push('/login');
      return;
    }

    const user = JSON.parse(userStr);

    if (actionType === 'whatsapp') {
      e.preventDefault();
      const message = `Hi AiroFox, I need help with ${serviceName}.\n\nMy Details:\nName: ${user.name}\nEmail: ${user.email}`;
      const url = `https://wa.me/919326065836?text=${encodeURIComponent(message)}`;
      
      // Log an admin notification in Supabase
      try {
        await db.createNotification({
          user_id: 'admin',
          title: 'WhatsApp Inquiry',
          message: `${user.name} (${user.email}) initiated a WhatsApp chat regarding ${serviceName}.`,
        });
      } catch (err) {
        console.error('Failed to log WhatsApp notification', err);
      }

      window.open(url, '_blank');
    }
    // For 'call' and 'book', if user is logged in, let the default action proceed.
  };

  return { handleProtectedAction };
}
