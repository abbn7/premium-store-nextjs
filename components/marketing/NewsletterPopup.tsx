'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Gift, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase';

export function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('store-newsletter-popup');
    if (hasSeenPopup) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem('store-newsletter-popup', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email });

      if (error) {
        if (error.code === '23505') {
          setMessage('You\'re already subscribed!');
          setStatus('success');
        } else {
          throw error;
        }
      } else {
        setMessage('Welcome! Check your inbox for a surprise 🎉');
        setStatus('success');
      }

      setTimeout(handleClose, 3000);
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Try again!');
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-[90%] max-w-md bg-white dark:bg-surface-card-dark rounded-2xl shadow-dramatic overflow-hidden"
          >
            {/* Header Accent */}
            <div className="h-1.5 bg-gradient-to-r from-accent via-gold to-accent" />

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-surface-light dark:hover:bg-surface-dark transition-colors z-10"
            >
              <X className="h-4 w-4 text-muted" />
            </button>

            <div className="p-8 text-center">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-4"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <Gift className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground-light dark:text-foreground-dark">
                    You&apos;re In! 🎉
                  </h3>
                  <p className="mt-2 text-sm text-muted">{message}</p>
                </motion.div>
              ) : (
                <>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                    <Mail className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground-light dark:text-foreground-dark">
                    Get 15% Off
                  </h3>
                  <p className="mt-2 text-sm text-muted max-w-xs mx-auto">
                    Join 5,000+ subscribers and get exclusive deals, new arrivals, and insider tips delivered to your inbox.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="input-field flex-1 text-sm"
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-accent px-5 whitespace-nowrap"
                    >
                      {status === 'loading' ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Subscribe'
                      )}
                    </button>
                  </form>

                  {status === 'error' && (
                    <p className="mt-2 text-xs text-accent">{message}</p>
                  )}

                  <p className="mt-4 text-[10px] text-muted/60">
                    No spam, ever. Unsubscribe anytime.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
