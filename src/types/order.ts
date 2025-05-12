export type OrderItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export type Order = {
    id: number;
    orderNumber: number;
    customer: string;
    date: string;
    items: OrderItem[];
    total: number;
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
}