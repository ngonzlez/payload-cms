import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuario', plural: 'Usuarios' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'site'],
  },
  auth: true,
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      if ((user as any).role === 'admin') return true
      return { id: { equals: user.id } }
    },
    create: ({ req: { user } }) => (user as any)?.role === 'admin',
    update: ({ req: { user } }) => {
      if ((user as any)?.role === 'admin') return true
      return { id: { equals: user?.id } }
    },
    delete: ({ req: { user } }) => (user as any)?.role === 'admin',
  },
  fields: [
    {
      name: 'role',
      label: 'Rol',
      type: 'select',
      options: [
        { label: 'Administrador (vos)', value: 'admin' },
        { label: 'Cliente', value: 'client' },
      ],
      defaultValue: 'client',
      required: true,
    },
    {
      name: 'site',
      label: 'Site del cliente',
      type: 'text',
      admin: {
        description: 'Slug del site que puede gestionar (solo para rol Cliente). Ej: ferraso',
        condition: (data) => data.role === 'client',
      },
    },
  ],
}
