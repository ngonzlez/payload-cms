import type { CollectionConfig } from 'payload'

export const Sites: CollectionConfig = {
  slug: 'sites',
  labels: { singular: 'Site', plural: 'Sites' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'domain'],
    description: 'Un registro por cliente/landing page.',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => (user as any)?.role === 'admin',
    update: ({ req: { user } }) => (user as any)?.role === 'admin',
    delete: ({ req: { user } }) => (user as any)?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      label: 'Nombre del cliente',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Identificador único',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Ej: ferraso, cliente2 (solo letras y guiones)' },
    },
    {
      name: 'domain',
      label: 'Dominio',
      type: 'text',
      admin: { description: 'Ej: ferraso.com' },
    },
    {
      name: 'phone',
      label: 'Teléfono / WhatsApp',
      type: 'text',
      admin: { description: 'Solo números, sin + ni espacios. Ej: 595986348909' },
    },
    {
      name: 'email',
      label: 'Email de contacto',
      type: 'email',
    },
    {
      name: 'instagram',
      label: 'Instagram URL',
      type: 'text',
      admin: { description: 'URL completa. Ej: https://www.instagram.com/micliente/' },
    },
    {
      name: 'facebook',
      label: 'Facebook URL',
      type: 'text',
      admin: { description: 'URL completa. Ej: https://www.facebook.com/micliente' },
    },
  ],
}
