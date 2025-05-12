export type Product = {
    id: number | string;
    name: string;
    price: number;
    stock: number;
}

export type ProductForm = {
    name: string;
    price: number;
    stock: number;
}