import type { CollectionConfig } from 'payload'
import { readBySite, writeBySite } from '../access/bySite'

export const Clients: CollectionConfig = {
  slug: 'clients',
  labels: { singular: 'Cliente', plural: 'Clientes' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'site', 'order'],
    description: 'Clientes habilitados de cada site.',
  },
  access: { read: readBySite, create: writeBySite, update: writeBySite, delete: writeBySite },
  fields: [
    {
      name: 'site',
      label: 'Site',
      type: 'relationship',
      relationTo: 'sites',
      required: true,
    },
    { name: 'name', label: 'Nombre', type: 'text', required: true },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    { name: 'order', label: 'Orden', type: 'number', defaultValue: 0 },
  ],
}
