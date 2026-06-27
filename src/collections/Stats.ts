import type { CollectionConfig } from 'payload'
import { readBySite, writeBySite } from '../access/bySite'

export const Stats: CollectionConfig = {
  slug: 'stats',
  labels: { singular: 'Estadística', plural: 'Estadísticas' },
  admin: {
    useAsTitle: 'value',
    defaultColumns: ['value', 'label', 'site', 'order'],
    description: 'Estadísticas de cada site.',
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
    { name: 'value', label: 'Valor (ej: 20+)', type: 'text', required: true },
    { name: 'label', label: 'Etiqueta', type: 'text', required: true },
    {
      name: 'icon',
      label: 'Ícono',
      type: 'select',
      options: [
        { label: 'Usuarios', value: 'Users' },
        { label: 'Premio', value: 'Award' },
        { label: 'Escudo', value: 'Shield' },
        { label: 'Reloj', value: 'Clock' },
        { label: 'Estrella', value: 'Star' },
      ],
      defaultValue: 'Star',
    },
    { name: 'order', label: 'Orden', type: 'number', defaultValue: 0 },
  ],
}
