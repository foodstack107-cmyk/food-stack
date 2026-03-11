import { mongoose, Schema } from '@/database/mongooseConfig';

export function getOrCreateModel<T>(
  modelName: string,
  schema: Schema,
): mongoose.Model<T> {
  if (mongoose.models[modelName]) {
    return mongoose.model<T>(modelName);
  }
  return mongoose.model<T>(modelName, schema);
}
