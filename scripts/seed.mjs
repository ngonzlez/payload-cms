/**
 * Seed script — carga datos iniciales de un cliente en Payload CMS.
 *
 * Uso:
 *   PAYLOAD_URL=https://cms.cliente.com \
 *   SEED_EMAIL=admin@email.com \
 *   SEED_PASSWORD=tupassword \
 *   node scripts/seed.mjs
 *
 * Para local:
 *   PAYLOAD_URL=http://localhost:3000 SEED_EMAIL=... SEED_PASSWORD=... node scripts/seed.mjs
 */

const PAYLOAD_URL = process.env.PAYLOAD_URL?.replace(/\/$/, '') || 'http://localhost:3000'
const EMAIL = process.env.SEED_EMAIL
const PASSWORD = process.env.SEED_PASSWORD

if (!EMAIL || !PASSWORD) {
  console.error('Faltan SEED_EMAIL y/o SEED_PASSWORD')
  process.exit(1)
}

// ─── CONFIGURACIÓN DEL CLIENTE ────────────────────────────────────────────────
// Editá este bloque para cada cliente nuevo antes de correr el script.

const SITE_SLUG = 'ferraso'  // debe coincidir con el Site ya creado en Payload

const SERVICES = [
  {
    title: 'Habilitación',
    subtitle: 'Gestión de habilitación de establecimientos',
    description: 'Gestión de habilitación de establecimientos dependientes del Ministerio de Salud y Superintendencia de Salud.',
    icon: 'Shield',
    order: 1,
    items: [
      { text: 'Clínica' },
      { text: 'Consultorio' },
      { text: 'Spa' },
      { text: 'Peluquería' },
      { text: 'Odontología' },
      { text: 'Estética' },
      { text: 'Y afines' },
    ],
  },
  {
    title: 'Gestiones Municipales',
    subtitle: 'Trámites y permisos municipales',
    description: 'Gestionamos todos los trámites y permisos municipales para que tu establecimiento opere sin inconvenientes.',
    icon: 'Landmark',
    order: 2,
    items: [
      { text: 'Patente comercial' },
      { text: 'Licencia comercial' },
      { text: 'Aprobación de planos de obras' },
      { text: 'Aprobación de planos PCI' },
      { text: 'Permiso de cartelería' },
    ],
  },
  {
    title: 'Asesoría Contable',
    subtitle: 'Gestión contable y fiscal',
    description: 'Nos encargamos de la gestión contable y fiscal para que cumplas con todas tus obligaciones.',
    icon: 'Calculator',
    order: 3,
    items: [
      { text: 'Apertura y clausura de RUC' },
      { text: 'Liquidación de impuestos — IVA, IRP, IRE' },
      { text: 'IRPC · RSP · Carga RG 90/21' },
    ],
  },
]

const STATS = [
  { value: '20+', label: 'Clientes habilitados', icon: 'Users', order: 1 },
  { value: '5+', label: 'Años de experiencia', icon: 'Award', order: 2 },
  { value: '100%', label: 'Trámites exitosos', icon: 'CheckCircle', order: 3 },
]

// ─── HELPERS ──────────────────────────────────────────────────────────────────

async function api(path, options = {}) {
  const res = await fetch(`${PAYLOAD_URL}/api${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`${path} → ${res.status}: ${JSON.stringify(data.errors ?? data)}`)
  return data
}

function log(msg) { console.log(`  ${msg}`) }
function ok(msg)  { console.log(`  ✓ ${msg}`) }
function err(msg) { console.error(`  ✗ ${msg}`) }

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\nSeed → ${PAYLOAD_URL}\n`)

  // 1. Login
  log('Autenticando...')
  const { token } = await api('/users/login', {
    method: 'POST',
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  const auth = { Authorization: `JWT ${token}` }
  ok('Autenticado')

  // 2. Obtener Site
  log(`Buscando site "${SITE_SLUG}"...`)
  const sitesRes = await api(`/sites?where[slug][equals]=${SITE_SLUG}&limit=1`, { headers: auth })
  const site = sitesRes.docs?.[0]
  if (!site) {
    err(`Site "${SITE_SLUG}" no encontrado. Crealo primero en el admin.`)
    process.exit(1)
  }
  ok(`Site encontrado: ${site.name} (id: ${site.id})`)

  // 3. Servicios
  console.log('\nCreando servicios...')
  for (const s of SERVICES) {
    try {
      await api('/services', {
        method: 'POST',
        headers: auth,
        body: JSON.stringify({ ...s, site: site.id }),
      })
      ok(s.title)
    } catch (e) {
      err(`${s.title}: ${e.message}`)
    }
  }

  // 4. Stats
  console.log('\nCreando estadísticas...')
  for (const s of STATS) {
    try {
      await api('/stats', {
        method: 'POST',
        headers: auth,
        body: JSON.stringify({ ...s, site: site.id }),
      })
      ok(s.label)
    } catch (e) {
      err(`${s.label}: ${e.message}`)
    }
  }

  console.log('\n✅ Seed completado.\n')
}

main().catch(e => { console.error('\n❌', e.message); process.exit(1) })
