import type { Access } from 'payload'

export const readBySite: Access = ({ req: { user } }) => {
  if (!user) return true // público — la API es pública para el frontend
  if ((user as any).role === 'admin') return true
  const site = (user as any).site
  if (!site) return false
  return { 'site.slug': { equals: site } }
}

export const writeBySite: Access = ({ req: { user } }) => {
  if (!user) return false
  if ((user as any).role === 'admin') return true
  const site = (user as any).site
  if (!site) return false
  return { 'site.slug': { equals: site } }
}
