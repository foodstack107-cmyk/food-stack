import { ObjectId } from '@/database/mongooseConfig';

import FaqModel from '@/models/faq.model';

interface FaqData {
  question: string;
  answer: string;
  isArchived?: boolean;
  createdBy?: string;
  modifiedBy?: string;
}

export const createFaq = async (faqData: FaqData, auth: { userId: string }) => {
  if (!faqData.question?.trim() || !faqData.answer?.trim()) {
    throw new Error('Question and Answer are required and cannot be empty');
  }

  const normalizedData = {
    question: faqData.question.trim(),
    answer: faqData.answer.trim(),
    isArchived: faqData.isArchived || false,
    createdBy: new ObjectId(auth.userId),
  };

  const existingFaq = await FaqModel.findOne({
    question: { $regex: new RegExp(normalizedData.question, 'i') },
  });

  if (existingFaq) {
    throw new Error('A similar FAQ already exists');
  }

  const faq = await FaqModel.create(normalizedData);

  return faq;
};

export const getFaqs = async () => {
  const faqs = await FaqModel.find({ isArchived: false }).sort({
    createdAt: -1,
  });
  return faqs;
};

export const getFaqById = async (id: string) => {
  const faq = await FaqModel.findById({ _id: new ObjectId(id) });
  if (!faq) throw new Error('FAQ not found');
  return faq;
};

export const updateFaq = async (
  id: string,
  faqData: FaqData,
  auth: { userId: string },
) => {
  const faq = await FaqModel.findByIdAndUpdate(
    { _id: new ObjectId(id) },
    { ...faqData, modifiedBy: new ObjectId(auth.userId) },
    { new: true, runValidators: true },
  );
  if (!faq) throw new Error('FAQ not found');
  return faq;
};

export const deleteFaq = async (id: string) => {
  const faq = await FaqModel.findByIdAndUpdate(
    { _id: new ObjectId(id) },
    { isArchived: true },
    { new: true },
  );
  if (!faq) throw new Error('FAQ not found');
  return faq;
};
