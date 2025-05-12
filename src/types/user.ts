export type Role = 'admin' | 'staff' | 'customer'

export type User = {
    id: string | number;
    name: string;
    email: string;
    role: Role;
    extraPermissions?: string[];
}

export const rolePermissions = {
    admin: ['view_products', 'edit_products', 'view_orders', 'edit_orders', 'manage_users'],
    staff: ['view_products', 'edit_products', 'view_orders', 'edit_orders'],
    customer: [],
}

export type UserForm = {
    id?: string
    name: string
    email: string
    password?: string
    role: Role
  }