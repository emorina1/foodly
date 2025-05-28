// pages/api/products/index.ts
import { createProduct, getProducts } from "@/api/services/Product";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const newProduct = req.body;
      const result = await createProduct(newProduct);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  } else if (req.method === "GET") {
    try {
      const products = await getProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(405).json({ message: "The request method is not supported." });
  }
}
