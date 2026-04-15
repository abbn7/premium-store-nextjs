'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { ScrollAnimation } from '@/components/ui/ScrollAnimation';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email });

      if (error && error.code !== '23505') throw error;
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary dark:from-accent/20 dark:via-accent/10 dark:to-accent/20" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />

      <div className="relative container-custom section-padding">
        <ScrollAnimation>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Stay in the Loop
            </h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Join 5,000+ subscribers for exclusive deals, new arrivals, and
              insider access. Be the first to know.
            </p>

            {status === 'success' ? (
              <div className="flex items-center justify-center gap-2 text-green-300">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Welcome aboard! 🎉</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 rounded-full bg-white/10 border border-white/20 px-5 py-3.5 text-sm text-white placeholder:text-white/40 outline-none focus:bg-white/15 focus:border-white/40 transition-all backdrop-blur-sm"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary hover:bg-white/90 transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-dramatic"
                >
                  {status === 'loading' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <Send className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {status === 'error' && (
              <p className="mt-3 text-sm text-red-300">
                Something went wrong. Please try again.
              </p>
            )}

            <p className="mt-4 text-[10px] text-white/30">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
