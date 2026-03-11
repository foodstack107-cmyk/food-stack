export interface ProductData {
  productName?: string;
  categories?: string;
  description?: string;
  price?: number | string;
  tags?: string[];
  image?: string;
  createdBy?: string;
  modifiedBy?: string;
  doordashLink?: string;
  uberEatsLink?: string;
  isActive?: boolean;
}
