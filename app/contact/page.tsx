import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Premium Store',
  description: 'Get in touch with our support team.',
};

export default function ContactPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen py-20">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-display text-4xl sm:text-5xl font-black text-foreground-light dark:text-foreground-dark mb-6">
            Get in Touch
          </h1>
          <p className="text-muted text-lg">
            Whether you have a question about our products, shipping, returns, or anything else, our team is ready to answer all your questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="font-display text-2xl font-bold mb-6">Contact Information</h2>
            
            <div className="flex gap-4 items-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 flex-shrink-0">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Our Location</h3>
                <p className="text-muted">123 Premium Avenue, Suite 100<br />New York, NY 10001, USA</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 flex-shrink-0">
                <Mail className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                <p className="text-muted text-sm mb-1">For general inquiries:</p>
                <a href="mailto:support@store.com" className="font-medium hover:text-accent transition-colors block">support@store.com</a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 flex-shrink-0">
                <Phone className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                <a href="tel:+1234567890" className="font-medium hover:text-accent transition-colors block">+1 (234) 567-890</a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 flex-shrink-0">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Working Hours</h3>
                <p className="text-muted">Monday - Friday: 9AM - 8PM<br />Saturday - Sunday: 10AM - 5PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-surface-card-dark rounded-2xl shadow-dramatic border border-border-light dark:border-border-dark p-8">
            <h2 className="font-display text-2xl font-bold mb-6">Send us a message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input type="text" className="input-field" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input type="text" className="input-field" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input type="email" className="input-field" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input type="text" className="input-field" placeholder="How can we help?" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea rows={5} className="input-field resize-none" placeholder="Write your message here..."></textarea>
              </div>
              <button className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
