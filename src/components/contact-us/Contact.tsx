'use client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import { CheckCircle, ChefHat, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';
import * as Yup from 'yup';

import { useCreateEnquiry } from '@/hooks/enquiry/mutate';

const contactSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
});

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const createEnquiry = useCreateEnquiry();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (
    values: FormValues,
    {
      setSubmitting,
      resetForm,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      resetForm: () => void;
    },
  ) => {
    try {
      // Map form values to enquiry format
      const enquiryData = {
        name: values.name,
        email: values.email,
        message: `Subject: ${values.subject}\n\n${values.message}`,
      };

      await createEnquiry.mutateAsync(enquiryData);

      // Reset form and show success message
      resetForm();
      setShowSuccess(true);

      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Enquiry submission failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0B1426] via-[#1A2744] to-[#2D4A7A] p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12'>
      <div className='max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12 sm:mb-16 px-2'
        >
          <motion.div
            className='flex items-center justify-center mb-6'
            whileHover={{ rotate: 10 }}
          >
            <ChefHat className='w-14 h-14 sm:w-16 sm:h-16 text-[#E8552D]' />
          </motion.div>
          <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#E8552D] mb-4 tracking-tight'>
            Let's Connect
          </h1>
          <p className='text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto px-4'>
            Your culinary journey begins with a conversation
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-14'>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='bg-black/30 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border border-[#E8552D]/20 shadow-[0_0_30px_rgba(245,158,11,0.1)]'
          >
            <h2 className='text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 md:mb-10'>
              Reach Out
            </h2>
            <div className='space-y-8 sm:space-y-10'>
              {[
                {
                  icon: (
                    <Phone className='w-6 h-6 sm:w-7 sm:h-7 text-[#E8552D]' />
                  ),
                  label: 'Phone',
                  value: '+91 000 000 0000',
                },
                {
                  icon: (
                    <Mail className='w-6 h-6 sm:w-7 sm:h-7 text-[#E8552D]' />
                  ),
                  label: 'Email',
                  value: 'example.com',
                },
                {
                  icon: (
                    <MapPin className='w-6 h-6 sm:w-7 sm:h-7 text-[#E8552D]' />
                  ),
                  label: 'Location',
                  value: 'VPO Tangra',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className='flex items-start sm:items-center space-x-4 sm:space-x-6 text-white group'
                >
                  <div className='bg-[#E8552D]/10 p-3 sm:p-4 rounded-2xl group-hover:bg-[#E8552D]/20 transition-all duration-300'>
                    {item.icon}
                  </div>
                  <div>
                    <p className='font-semibold text-lg'>{item.label}</p>
                    <p className='opacity-90 mt-1 text-sm sm:text-base'>
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='bg-black/30 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border border-[#E8552D]/20 shadow-[0_0_30px_rgba(245,158,11,0.1)]'
          >
            <h2 className='text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 md:mb-10'>
              Send Message
            </h2>

            {/* Success Message */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className='mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center space-x-3'
              >
                <CheckCircle className='w-6 h-6 text-green-400' />
                <p className='text-green-400 font-medium'>
                  Enquiry submitted successfully! We'll get back to you soon.
                </p>
              </motion.div>
            )}

            <Formik
              initialValues={{ name: '', email: '', subject: '', message: '' }}
              validationSchema={contactSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className='space-y-5 sm:space-y-6'>
                  {[
                    { name: 'name', type: 'text', placeholder: 'Your Name' },
                    { name: 'email', type: 'email', placeholder: 'Your Email' },
                    { name: 'subject', type: 'text', placeholder: 'Subject' },
                  ].map((field, idx) => (
                    <div key={idx}>
                      <Field
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        className='w-full px-5 py-4 rounded-2xl bg-[#E8552D]/5 border border-[#E8552D]/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#E8552D]/30 focus:border-transparent transition-all duration-300'
                      />
                      <ErrorMessage
                        name={field.name}
                        component='div'
                        className='text-[#E8552D] text-sm mt-2 ml-2'
                      />
                    </div>
                  ))}

                  <div>
                    <Field
                      as='textarea'
                      name='message'
                      placeholder='Your Message'
                      rows={4}
                      className='w-full px-5 py-4 rounded-2xl bg-[#E8552D]/5 border border-[#E8552D]/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#E8552D]/30 focus:border-transparent transition-all duration-300 resize-none'
                    />
                    <ErrorMessage
                      name='message'
                      component='div'
                      className='text-[#E8552D] text-sm mt-2 ml-2'
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full bg-[#E8552D] text-[#0B1426] py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:bg-[#E8552D]/90 transition-all duration-300 disabled:opacity-50 text-base sm:text-lg mt-2'
                  >
                    <Send className='w-5 h-5' />
                    <span>Send Message</span>
                  </motion.button>
                </Form>
              )}
            </Formik>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
