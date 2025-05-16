type PermissionMap = Record<
  string, // page name
  Partial<Record<'read' | 'create' | 'edit' | 'delete', string[]>>
>

export const PAGE_PERMISSIONS: PermissionMap = {
//   dashboard: {
//     read: ['admin', 'staff'],
//   },
  products: {
    read: ['admin', 'staff'],
    create: ['admin', 'staff'],
    edit: ['admin', 'staff'],
    delete: ['admin', 'staff'],
  },
  orders: {
    read: ['admin', 'staff'],
    create: ['admin', 'staff'],
    edit: ['admin', 'staff'],
    delete: ['admin'],
  },
  users: {
    read: ['admin'],
    create: ['admin'],
    edit: ['admin'],
    delete: ['admin'],
  },
}
