import { ObjectId } from '@/database/mongooseConfig';

import { EnquiryData } from '@/interface/enquiry.interface';
import Enquiry from '@/models/enquiry.model';
import { sendEmail } from '@/services/email.service';
import { EnquiryNotificationTemplate } from '@/templates/EnquiryNotification';

export const createEnquiry = async (enquiryData: EnquiryData) => {
  const enquiry = await Enquiry.create({
    ...enquiryData,
    phone: enquiryData.phone || 'Not provided',
  });

  // Send notification email
  try {
    const notificationEmail =
      process.env.NOTIFICATION_EMAIL || 'shiv0803shakti@gmail.com';
    const emailTemplate = EnquiryNotificationTemplate({
      name: enquiryData.name,
      email: enquiryData.email,
      phone: enquiryData.phone || 'Not provided',
      message: enquiryData.message,
      submittedAt: new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'short',
      }),
    });

    await sendEmail(
      [notificationEmail],
      `New Enquiry from ${enquiryData.name} - Food Stack Food Delivery`,
      emailTemplate,
      [],
    );
  } catch (emailError) {
    console.error('Failed to send enquiry notification email:', emailError);
    // Don't throw error to avoid breaking enquiry creation
  }

  return enquiry;
};

export const getAllEnquiries = async () => {
  const enquiries = await Enquiry.find({ isDeleted: false }).sort({
    createdAt: -1,
  });
  return enquiries;
};

export const getEnquiryById = async (id: string) => {
  const enquiry = await Enquiry.findById({ _id: new ObjectId(id) });
  if (!enquiry) throw new Error('Enquiry not found');
  return enquiry;
};

export const deleteEnquiryById = async (id: string) => {
  const deletedEnquiry = await Enquiry.findByIdAndUpdate(
    {
      _id: new ObjectId(id),
    },
    { isDeleted: true },
    { new: true },
  );
  if (!deletedEnquiry) throw new Error('Enquiry not found');

  return true;
};
interface WeeklyEnquiryTrend {
  name: string;
  enquiries: number;
}

// Get weekly enquiry trend
export const getWeeklyEnquiryTrend = async (): Promise<
  WeeklyEnquiryTrend[]
> => {
  const weeklyData = await Enquiry.aggregate([
    {
      $match: {
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: {
          $week: '$createdAt',
        },
        enquiries: { $sum: 1 },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $project: {
        name: {
          $concat: ['Week ', { $toString: '$_id' }],
        },
        enquiries: 1,
        _id: 0,
      },
    },
  ]);

  return weeklyData;
};
