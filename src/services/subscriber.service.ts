import Subscriber from '@/models/subscriber.model';

export const createSubscriber = async ({ email }: { email: string }) => {
  if (!email) {
    throw new Error('Email is required');
  }

  const existingSubscriber = await Subscriber.findOne({ email }).lean().exec();

  if (existingSubscriber) {
    await Subscriber.deleteOne({ email });
  }

  const subscriberData = {
    email,
    blogNotification: true,
  };

  const newSubscriber = await Subscriber.create(subscriberData);

  if (!newSubscriber) {
    throw new Error('Failed to create subscriber');
  }

  return newSubscriber;
};

export const getSubscribers = async () => {
  const subscribers = await Subscriber.find({ blogNotification: true })
    .lean()
    .exec();

  if (!subscribers) {
    throw new Error('Failed to fetch subscribers');
  }

  return subscribers;
};
