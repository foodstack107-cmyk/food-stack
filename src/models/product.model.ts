import { mongoose, ObjectId, Schema } from '@/database/mongooseConfig';

interface IProduct extends Document {
  productName: string;
  categories: mongoose.Types.ObjectId;
  description: string;
  price: string;
  tags: mongoose.Types.ObjectId[];
  image: string;
  createdBy: mongoose.Types.ObjectId;
  doordashLink: string;
  uberEatsLink: string;
  modifiedBy: mongoose.Types.ObjectId;
  isActive: boolean;
}

const ProductSchema: Schema = new Schema(
  {
    productName: { type: String, required: true },
    categories: { type: ObjectId, ref: 'Category' },
    description: { type: String, required: true },
    price: { type: String, required: true },
    tags: [{ type: ObjectId, ref: 'DietaryTags' }],
    image: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doordashLink: { type: String },
    uberEatsLink: { type: String },
    modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Product =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
