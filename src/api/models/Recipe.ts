export interface Recipe {
  _id?: string;
  title: string;
  body: string;
  image?: string; // URL ose path i fotos
  createdAt?: Date;
}
