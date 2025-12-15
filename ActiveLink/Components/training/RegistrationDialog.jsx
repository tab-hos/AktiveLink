import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';

export default function RegistrationDialog({ program, isOpen, onClose }) {
  const { t } = useTranslation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      experience_level: 'beginner'
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement program registration API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />
        
        {/* Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-[#0a0f2f]">
                  {t.training.registerDialog.title.replace('{program}', program?.title || '')}
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  {t.training.registerDialog.description}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {isSuccess ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-[#0a0f2f]">{t.training.registerDialog.success.title}</h3>
                <p className="text-slate-500">
                  {t.training.registerDialog.success.message}
                </p>
                <button
                  onClick={handleClose}
                  className="mt-4 px-8 py-3 bg-[#0a0f2f] text-white rounded-lg font-semibold text-base hover:bg-[#0a0f2f]/90 transition-colors"
                >
                  {t.common.close}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label htmlFor="full_name" className="block text-sm font-medium text-slate-700">
                    {t.training.registerDialog.fullName}
                  </label>
                  <input
                    id="full_name"
                    {...register('full_name', { required: t.training.registerDialog.fullName + ' ' + (t.language === 'fi' ? 'on pakollinen' : 'is required') })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#f8cb2a] focus:bg-white focus:outline-none transition-all"
                  />
                  {errors.full_name && <span className="text-red-500 text-xs">{errors.full_name.message}</span>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                    {t.training.registerDialog.email}
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', { required: t.training.registerDialog.email + ' ' + (t.language === 'fi' ? 'on pakollinen' : 'is required') })}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#f8cb2a] focus:bg-white focus:outline-none transition-all"
                  />
                  {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                    {t.training.registerDialog.phone}
                  </label>
                  <input
                    id="phone"
                    {...register('phone', { required: t.training.registerDialog.phone + ' ' + (t.language === 'fi' ? 'on pakollinen' : 'is required') })}
                    placeholder="+358..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#f8cb2a] focus:bg-white focus:outline-none transition-all"
                  />
                  {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="experience_level" className="block text-sm font-medium text-slate-700">
                    {t.training.registerDialog.experienceLevel}
                  </label>
                  <select
                    id="experience_level"
                    {...register('experience_level')}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#f8cb2a] focus:bg-white focus:outline-none transition-all"
                  >
                    <option value="beginner">{t.training.registerDialog.beginner}</option>
                    <option value="intermediate">{t.training.registerDialog.intermediate}</option>
                    <option value="advanced">{t.training.registerDialog.advanced}</option>
                  </select>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold text-base hover:bg-slate-50 transition-colors"
                  >
                    {t.common.cancel}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-8 py-4 bg-[#0a0f2f] text-white rounded-xl font-semibold text-base hover:bg-[#0a0f2f]/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {t.training.registerDialog.confirm}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}