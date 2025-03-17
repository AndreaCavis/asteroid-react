import {z} from "zod";

export const AVAILABLE_TYPES = ["bcaa", "beta alanine", "creatine", "whey protein"] as const;

export const AVAILABLE_BRANDS = ["Optimum Nutrition", "MyProtein", "Yamamoto Nutrition"] as const;

export const AVAILABLE_SORT = ["none", "price-asc", "price-desc"] as const;

export const ProductValidator = z.object({
    id: z.string(),
    imageUrl: z.string().regex(/^\/?public\/.+/, "Invalid image path"), // Ensures it starts with 'public/'
    brand: z.string(),
    name: z.string(),
    type: z.string(),
    suggested_use: z.string(),
    price: z.number().positive(),
  });

  export type Product = z.infer<typeof ProductValidator>;


// schema to enforce shape on back-end and full type safety on front-end
export const ProductFilterValidator = z.object({
    type: z.array(z.enum(AVAILABLE_TYPES)),
    brand: z.array(z.enum(AVAILABLE_BRANDS)),
    sort: z.enum(AVAILABLE_SORT),
    price: z.tuple([z.number(), z.number()])
});


// the price will also have a custom value, it will be handled separately
export type ProductState = Omit<z.infer<typeof ProductFilterValidator>, "price"> & {
    price: { isCustom: boolean, range: [number, number] }
}