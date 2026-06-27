// Seed script — correr con: node seed.mjs
// Requiere Payload corriendo en localhost:3000

const BASE = 'http://localhost:3000'

async function getToken() {
  const res = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD }),
  })
  const data = await res.json()
  return data.token
}

async function getSiteId(token, slug) {
  const res = await fetch(`${BASE}/api/sites?where[slug][equals]=${slug}`, {
    headers: { Authorization: `JWT ${token}` },
  })
  const data = await res.json()
  return data.docs?.[0]?.id
}

async function post(token, collection, body) {
  const res = await fetch(`${BASE}/api/${collection}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (data.errors) console.error(`Error en ${collection}:`, JSON.stringify(data.errors))
  else console.log(`✓ ${collection}: ${body.title || body.name || body.value}`)
}

async function main() {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    console.error('Usar: ADMIN_EMAIL=tu@email.com ADMIN_PASSWORD=tupass node seed.mjs')
    process.exit(1)
  }

  const SITE_SLUG = process.env.SITE_SLUG || 'ferraso'

  console.log('Obteniendo token...')
  const token = await getToken()
  if (!token) { console.error('Login fallido'); process.exit(1) }

  console.log(`Buscando site "${SITE_SLUG}"...`)
  const siteId = await getSiteId(token, SITE_SLUG)
  if (!siteId) { console.error(`Site "${SITE_SLUG}" no encontrado. Crealo primero en /admin`); process.exit(1) }
  console.log(`Site ID: ${siteId}`)

  const services = [
    {
      site: siteId,
      title: 'Habilitaciones',
      subtitle: 'MSPAS y Superintendencia de Salud',
      description: 'Gestionamos la habilitación de establecimientos dependientes del Ministerio de Salud Pública y Bienestar Social y la Superintendencia de Salud.',
      icon: 'Building2', order: 0,
      items: [
        { text: 'Clínicas y Consultorios' }, { text: 'Spas y Peluquerías' },
        { text: 'Odontología y Estética' }, { text: 'Centros médicos y afines' },
      ],
    },
    {
      site: siteId,
      title: 'Gestiones Municipales',
      subtitle: 'Trámites ante la Municipalidad',
      description: 'Realizamos todos los trámites municipales necesarios para la apertura y funcionamiento legal de tu establecimiento comercial.',
      icon: 'Landmark', order: 1,
      items: [
        { text: 'Patente Comercial' }, { text: 'Licencia Comercial' },
        { text: 'Aprobación de Planos de Obras' }, { text: 'Aprobación de Planos PCI' },
        { text: 'Permiso de Cartelería' },
      ],
    },
    {
      site: siteId,
      title: 'Asesoría Contable',
      subtitle: 'Gestión fiscal y contable integral',
      description: 'Nos encargamos de la gestión contable y fiscal para que cumplas con todas tus obligaciones tributarias sin complicaciones.',
      icon: 'Calculator', order: 2,
      items: [
        { text: 'Apertura y clausura de RUC' }, { text: 'Liquidación de IVA e IRP' },
        { text: 'IRE, IRPC y RSP' }, { text: 'Carga RG 90/21' },
      ],
    },
  ]

  const clientNames = [
    "Centro Vy'Aha", "Oasis Mujer Spa", "Sky Clínica Metabólica",
    "Vitalia Odontología Integral", "Bamboo Spa", "Clínica Domus Vitae",
    "Bonifaz Odonto Quality", "YA Comestóloga", "LG Clinic Estética & Medicina Integral",
    "Consultorio Biohealth", "Consultorio Odonto Life", "V+ Óptica",
    "Therma Spa", "Consultorio GL", "Peluquería Mai Beauty",
    "Clínica Centro Especializado de la Mujer", "Dra. Pamela Grau",
    "Clínica Pediátrica Raíces", "Dr. Blas Fleitas", "Lic. Karina Grau",
  ]

  const stats = [
    { site: siteId, value: '20+', label: 'Clientes habilitados', icon: 'Users', order: 0 },
    { site: siteId, value: '100%', label: 'Tasa de aprobación', icon: 'Award', order: 1 },
    { site: siteId, value: '3', label: 'Áreas de servicio', icon: 'Shield', order: 2 },
    { site: siteId, value: 'Ágil', label: 'Gestión eficiente', icon: 'Clock', order: 3 },
  ]

  console.log('\n→ Servicios')
  for (const s of services) await post(token, 'services', s)

  console.log('\n→ Clientes')
  for (let i = 0; i < clientNames.length; i++) {
    await post(token, 'clients', { site: siteId, name: clientNames[i], order: i })
  }

  console.log('\n→ Stats')
  for (const s of stats) await post(token, 'stats', s)

  console.log('\n✅ Seed completo')
}

main()
