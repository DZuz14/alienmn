'use client';
import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Mail,
  MessageSquare,
  Send,
  User,
  X,
} from 'lucide-react';
import { StarryNightSky } from '@/components';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type NotificationStatus = 'success' | 'error' | null;

interface Notification {
  status: NotificationStatus;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<Notification>({
    status: null,
    message: '',
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setNotification({ status: null, message: '' });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate random success/error for demo
      const isSuccess = Math.random() > 0.3;

      if (isSuccess) {
        setNotification({
          status: 'success',
          message:
            "Thank you! Your message has been sent successfully. We'll get back to you soon.",
        });

        // Reset form
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setNotification({
        status: 'error',
        message:
          'Oops! There was an error sending your message. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const closeNotification = () => {
    setNotification({ status: null, message: '' });
  };

  return (
    <StarryNightSky>
      <div className="max-w-md w-full mx-4">
        {/* Notification */}
        {notification.status && (
          <div
            className={`slide-down mb-6 p-4 rounded-lg border-l-4 flex items-start gap-3 ${
              notification.status === 'success'
                ? 'bg-green-100 border-green-500 text-green-800'
                : 'bg-yellow-100 border-yellow-500 text-yellow-800'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {notification.status === 'success' ? (
                <CheckCircle size={20} className="text-green-600" />
              ) : (
                <AlertCircle size={20} className="text-yellow-600" />
              )}
            </div>
            <p className="flex-1">{notification.message}</p>
            <button
              onClick={closeNotification}
              className="flex-shrink-0 ml-2 hover:opacity-70 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Contact Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl mb-2">Get in Touch</h2>
            <p className="text-white/80">
              Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block mb-2">
                <User className="inline w-4 h-4 mr-2" />
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/10 border backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all ${
                  errors.name ? 'border-red-400' : 'border-white/30'
                }`}
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="text-red-300 mt-1 fade-in">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block mb-2">
                <Mail className="inline w-4 h-4 mr-2" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/10 border backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all ${
                  errors.email ? 'border-red-400' : 'border-white/30'
                }`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-red-300 mt-1 fade-in">{errors.email}</p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block mb-2">
                <MessageSquare className="inline w-4 h-4 mr-2" />
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className={`w-full px-4 py-3 rounded-lg bg-white/10 border backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all resize-none ${
                  errors.message ? 'border-red-400' : 'border-white/30'
                }`}
                placeholder="Tell us about your project or question..."
              />
              {errors.message && (
                <p className="text-red-300 mt-1 fade-in">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </StarryNightSky>
  );
}
