import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, CheckCircle, AlertCircle, Euro } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';

// Membership fee structure
// Monthly prices shown to users, annual prices charged (with discount)
const MEMBERSHIP_FEES = {
  individual: {
    monthly: 2.5,
    annual: 25, // Discounted from 30€ (2.5 * 12)
    savings: 5, // Savings when paying annually
  },
  corporate: {
    monthly: 25,
    annual: 250,
    savings: 50, // Savings when paying annually (25 * 12 = 300, but only 250)
  },
};

// Storage key for membership applications
const STORAGE_KEY = 'activelink_membership_applications';

// Function to save application to localStorage
const saveApplication = (applicationData) => {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const newApplication = {
      ...applicationData,
      id: Date.now().toString(),
      submitted_at: new Date().toISOString(),
      status: 'pending',
    };
    existing.push(newApplication);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    console.log('Membership application saved:', newApplication);
    console.log('All applications:', existing);
    return newApplication;
  } catch (error) {
    console.error('Error saving application:', error);
    throw error;
  }
};

// Function to get all applications (for admin/debugging)
export const getMembershipApplications = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (error) {
    console.error('Error reading applications:', error);
    return [];
  }
};

export default function MembershipForm() {
  const { t } = useTranslation();
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      membership_type: 'individual',
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
  const selectedMembershipType = watch('membership_type');
  const selectedFeeInfo = MEMBERSHIP_FEES[selectedMembershipType] || MEMBERSHIP_FEES.individual;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      // Save to localStorage
      const application = saveApplication({
        ...data,
        membership_fee: selectedFeeInfo.annual,
        membership_fee_monthly: selectedFeeInfo.monthly,
        membership_fee_savings: selectedFeeInfo.savings,
      });
      
      // TODO: Replace with actual API call when backend is ready
      // Example: await fetch('/api/membership-applications', { method: 'POST', body: JSON.stringify(application) });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Submission failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-[#0a0f2f]">{t.join.form.title}</h3>
        <p className="text-slate-500 mt-2">{t.join.form.subtitle}</p>
      </div>

      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h4 className="text-2xl font-bold text-[#0a0f2f] mb-2">{t.join.form.success.title}</h4>
            <p className="text-slate-600 mb-4">
              {t.join.form.success.message}
            </p>
            <div className="bg-[#f8cb2a]/10 border border-[#f8cb2a]/30 rounded-lg p-3 mb-4">
              <p className="text-sm text-[#0a0f2f]">
                <strong>{t.common.note || 'Note'}:</strong> {t.join.form.success.note}
              </p>
            </div>
            <button 
              onClick={() => setSubmitStatus(null)}
              className="text-[#0a0f2f] font-semibold hover:underline"
            >
              {t.join.form.success.submitAnother}
            </button>
          </motion.div>
        ) : (
          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit(onSubmit)} 
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">{t.join.form.fullName}</label>
                <input
                  {...register('full_name', { required: t.join.form.fullName + ' ' + (t.language === 'fi' ? 'on pakollinen' : 'is required') })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:border-[#f8cb2a] focus:bg-white focus:ring-0 transition-all"
                  placeholder="John Doe"
                />
                {errors.full_name && <span className="text-red-500 text-xs">{errors.full_name.message}</span>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">{t.join.form.email}</label>
                <input
                  type="email"
                  {...register('email', { required: t.join.form.email + ' ' + (t.language === 'fi' ? 'on pakollinen' : 'is required') })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:border-[#f8cb2a] focus:bg-white focus:ring-0 transition-all"
                  placeholder="john@example.com"
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">{t.join.form.phone}</label>
                <input
                  {...register('phone')}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:border-[#f8cb2a] focus:bg-white focus:ring-0 transition-all"
                  placeholder="+358 40 1234567"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">{t.join.form.membershipType}</label>
                <select
                  {...register('membership_type')}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:border-[#f8cb2a] focus:bg-white focus:ring-0 transition-all"
                >
                  <option value="individual">{t.join.pricing.individual.title}</option>
                  <option value="corporate">{t.join.pricing.corporate.title}</option>
                </select>
              </div>
            </div>

            {/* Membership Fee Display */}
            <div className="bg-[#f8cb2a]/10 border-2 border-[#f8cb2a]/30 rounded-xl p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Euro className="w-5 h-5 text-[#0a0f2f]" />
                    <span className="text-sm font-medium text-[#0a0f2f]">{t.join.pricing.title}</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-[#f8cb2a]/20">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-lg font-semibold text-[#0a0f2f]">
                      {selectedMembershipType === 'individual' 
                        ? t.join.pricing.individual.monthly 
                        : t.join.pricing.corporate.monthly}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">{t.language === 'fi' ? 'tai maksa vuosittain:' : 'or pay annually:'}</span>
                    <div className="text-right">
                      <div className="text-xl font-bold text-[#0a0f2f]">
                        {selectedMembershipType === 'individual' 
                          ? t.join.pricing.individual.annual 
                          : t.join.pricing.corporate.annual}
                      </div>
                      <div className="text-xs text-[#f8cb2a] font-semibold">
                        {selectedMembershipType === 'individual' 
                          ? t.join.pricing.individual.savings 
                          : t.join.pricing.corporate.savings}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-600">
                  {t.join.form.pricingNote}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">{t.join.form.message}</label>
              <textarea
                {...register('message')}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:border-[#f8cb2a] focus:bg-white focus:ring-0 transition-all resize-none"
                placeholder={t.join.form.messagePlaceholder}
              />
            </div>

            {submitStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span>{t.join.form.error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-[#0a0f2f] hover:bg-[#0a0f2f]/90 text-white rounded-xl font-bold text-lg md:text-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t.join.form.sending}
                </>
              ) : (
                t.join.form.submit
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}