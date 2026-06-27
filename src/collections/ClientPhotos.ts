import type { CollectionConfig } from 'payload'
import { readBySite, writeBySite } from '../access/bySite'

export const ClientPhotos: CollectionConfig = {
  slug: 'client-photos',
  labels: { singular: 'Foto de cliente', plural: 'Fotos de clientes' },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'site', 'order'],
    description: 'Fotos del carrusel de cada site.',
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
    { name: 'photo', label: 'Foto', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'alt',
      label: 'Descripción',
      type: 'text',
      required: true,
      admin: { description: 'Ej: Habilitación aprobada — Clínica XYZ, Asunción' },
    },
    { name: 'order', label: 'Orden', type: 'number', defaultValue: 0 },
  ],
}
