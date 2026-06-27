import type { CollectionConfig } from 'payload'
import { readBySite, writeBySite } from '../access/bySite'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Servicio', plural: 'Servicios' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'site', 'order'],
    description: 'Servicios de cada cliente.',
  },
  access: { read: readBySite, create: writeBySite, update: writeBySite, delete: writeBySite },
  fields: [
    {
      name: 'site',
      label: 'Site',
      type: 'relationship',
      relationTo: 'sites',
      required: true,
      admin: { description: 'Cliente al que pertenece este servicio.' },
    },
    { name: 'title', label: 'Título', type: 'text', required: true },
    { name: 'subtitle', label: 'Subtítulo', type: 'text', required: true },
    { name: 'description', label: 'Descripción', type: 'textarea', required: true },
    {
      name: 'items',
      label: 'Ítems',
      type: 'array',
      minRows: 1,
      fields: [{ name: 'text', label: 'Ítem', type: 'text', required: true }],
    },
    {
      name: 'icon',
      label: 'Ícono',
      type: 'select',
      options: [
        { label: 'Edificio', value: 'Building2' },
        { label: 'Municipalidad', value: 'Landmark' },
        { label: 'Contabilidad', value: 'Calculator' },
        { label: 'Documento', value: 'FileText' },
        { label: 'Escudo', value: 'Shield' },
      ],
      defaultValue: 'FileText',
    },
    {
      name: 'image',
      label: 'Imagen (opcional)',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    { name: 'order', label: 'Orden', type: 'number', defaultValue: 0 },
  ],
}
