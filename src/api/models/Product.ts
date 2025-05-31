export interface Product {
  _id?: string;       // ID-ja opsionale, zakonisht string (p.sh. MongoDB ObjectId si string)
  title: string;      // Titulli i produktit
  body: string;       // Përshkrimi ose përmbajtja
  image?: string;     // URL ose rruga e imazhit, opsionale
  price?: number;     // Çmimi i produktit, opsional
}
