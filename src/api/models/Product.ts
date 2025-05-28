export interface Product {
  _id?: string;
  title: string;
  body: string;
  image?: string; // 🔥 image URL
  createdAt?: Date;
}
