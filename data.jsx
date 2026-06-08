/* data.jsx — catálogos y datos compartidos CRECE DOCs */

const ALL_DOCS = [
  { code: 'ROP-P-SI-00-001', name: 'Política de seguridad y salud en el trabajo', estado: 'En Revisión', tipo: 'Política' },
  { code: 'ROP-I-MF-00-001', name: 'Instructivo de arranque de línea de producción', estado: 'En Aprobación', tipo: 'Instrucción' },
  { code: 'RGH-P-CA-00-002', name: 'Política de gestión del talento humano', estado: 'En Elaboración', tipo: 'Política' },
  { code: 'ROP-M-SO-00-001', name: 'Manual de respuesta ante emergencias', estado: 'En Elaboración', tipo: 'Manual' },
  { code: 'RLO-I-LE-00-001', name: 'Instructivo de recepción de mercancías', estado: 'En Elaboración', tipo: 'Instrucción' },
  { code: 'ROP-P-CA-00-001', name: 'Procedimiento de control de calidad', estado: 'Vigente', tipo: 'Procedimiento' },
  { code: 'ROP-M-MF-00-001', name: 'Manual de operaciones planta norte', estado: 'Vigente', tipo: 'Manual' },
  { code: 'ROP-E-CA-00-001', name: 'Especificación técnica Y-150', estado: 'Vigente', tipo: 'Especificación' },
  { code: 'RGH-P-CA-00-001', name: 'Procedimiento de inducción de personal', estado: 'Vigente', tipo: 'Procedimiento' },
  { code: 'ROP-I-LO-00-001', name: 'Instructivo de inventario semanal', estado: 'Vigente', tipo: 'Instrucción' },
];

// Repositorio vigente (campos completos para la tabla)
const VIGENTES = [
  { code: 'ROP-P-CA-00-001', name: 'Procedimiento de control de calidad', tipo: 'Procedimiento', negocio: 'Operaciones', depto: 'Calidad', area: 'Aseguramiento', cert: 'ISO 9001', fecha: '12 / 03 / 2025', ver: '3.0' },
  { code: 'ROP-M-MF-00-001', name: 'Manual de operaciones planta norte', tipo: 'Manual', negocio: 'Operaciones', depto: 'Manufactura', area: 'Producción', cert: 'ISO 9001', fecha: '04 / 02 / 2025', ver: '2.1' },
  { code: 'ROP-E-CA-00-001', name: 'Especificación técnica producto Y-150', tipo: 'Especificación', negocio: 'Comercial', depto: 'Calidad', area: 'I+D', cert: 'ISO 9001', fecha: '21 / 01 / 2025', ver: '1.4' },
  { code: 'RGH-P-CA-00-001', name: 'Procedimiento de inducción de personal', tipo: 'Procedimiento', negocio: 'Gestión Humana', depto: 'Capacitación', area: 'Talento', cert: 'ISO 45001', fecha: '18 / 12 / 2024', ver: '2.0' },
  { code: 'ROP-I-LO-00-001', name: 'Instructivo de inventario semanal', tipo: 'Instrucción', negocio: 'Logística', depto: 'Almacén', area: 'Inventarios', cert: '—', fecha: '09 / 12 / 2024', ver: '1.2' },
  { code: 'RLO-P-LE-00-003', name: 'Procedimiento de despacho y distribución', tipo: 'Procedimiento', negocio: 'Logística', depto: 'Despacho', area: 'Distribución', cert: 'ISO 9001', fecha: '28 / 11 / 2024', ver: '4.0' },
  { code: 'ROP-F-SI-00-007', name: 'Formulario de inspección de seguridad', tipo: 'Formulario', negocio: 'Operaciones', depto: 'SST', area: 'Seguridad', cert: 'ISO 45001', fecha: '15 / 11 / 2024', ver: '1.0' },
  { code: 'RGH-M-CA-00-002', name: 'Manual de bienvenida e inducción', tipo: 'Manual', negocio: 'Gestión Humana', depto: 'Capacitación', area: 'Talento', cert: '—', fecha: '02 / 10 / 2024', ver: '3.2' },
  { code: 'ROP-E-MF-00-004', name: 'Especificación de materia prima MP-22', tipo: 'Especificación', negocio: 'Operaciones', depto: 'Compras', area: 'Abastecimiento', cert: 'ISO 9001', fecha: '20 / 09 / 2024', ver: '2.3' },
  { code: 'RLO-I-LE-00-001', name: 'Instructivo de recepción de mercancías', tipo: 'Instrucción', negocio: 'Logística', depto: 'Almacén', area: 'Recepción', cert: '—', fecha: '11 / 09 / 2024', ver: '1.1' },
  { code: 'ROP-P-MF-00-009', name: 'Procedimiento de mantenimiento preventivo', tipo: 'Procedimiento', negocio: 'Operaciones', depto: 'Mantenimiento', area: 'Activos', cert: 'ISO 9001', fecha: '30 / 08 / 2024', ver: '5.0' },
  { code: 'ROP-F-CA-00-012', name: 'Formulario de no conformidad', tipo: 'Formulario', negocio: 'Operaciones', depto: 'Calidad', area: 'Aseguramiento', cert: 'ISO 9001', fecha: '14 / 08 / 2024', ver: '2.0' },
];

const USERS = [
  { id: 1, name: 'José Salazar Ruiz', area: 'Calidad' },
  { id: 2, name: 'María Rodríguez Seminario', area: 'Operaciones' },
  { id: 3, name: 'Alberto Matos Andreu', area: 'Manufactura' },
  { id: 4, name: 'Juan José Torres Seminario', area: 'Logística' },
  { id: 5, name: 'Lucía Fernández Paz', area: 'Gestión Humana' },
  { id: 6, name: 'Omar Postigo Vargas', area: 'Calidad' },
  { id: 7, name: 'Carla Benites Loayza', area: 'Seguridad' },
  { id: 8, name: 'Diego Cárdenas Ríos', area: 'Compras' },
  { id: 9, name: 'Patricia Ñahui Quispe', area: 'Almacén' },
  { id: 10, name: 'Renzo Villanueva Cruz', area: 'Mantenimiento' },
];

const TIPO_OPTS = ['Formulario', 'Instrucción', 'Especificación', 'Procedimiento', 'Plan', 'Manual', 'Política'];
const NEGOCIO_OPTS = ['Operaciones', 'Comercial', 'Logística', 'Gestión Humana'];
const DEPTO_OPTS = ['Calidad', 'Manufactura', 'Almacén', 'Capacitación', 'SST', 'Compras', 'Mantenimiento', 'Despacho'];
const AREA_OPTS = ['Aseguramiento', 'Producción', 'Talento', 'Inventarios', 'Distribución', 'Seguridad', 'I+D'];
const CERT_OPTS = ['ISO 9001', 'ISO 45001', 'ISO 14001', '—'];

const TIPOS = [
  { id: 'formulario', label: 'Formulario', icon: 'formulario', tab: 'var(--blue)' },
  { id: 'instruccion', label: 'Instrucción', icon: 'instruccion', tab: 'var(--green)' },
  { id: 'especificaciones', label: 'Especificaciones', icon: 'especificaciones', tab: 'var(--coral)' },
  { id: 'procedimiento', label: 'Procedimiento', icon: 'procedimiento', tab: 'var(--navy)' },
  { id: 'plan', label: 'Plan', icon: 'plan', tab: 'var(--yellow)' },
  { id: 'manual', label: 'Manual', icon: 'manual', tab: 'var(--blue)' },
];

const ESTADO_PILL = { Vigente: 'green', 'En Revisión': 'blue', 'En Aprobación': 'coral', 'En Elaboración': 'green' };

Object.assign(window, {
  ALL_DOCS, VIGENTES, USERS, TIPOS,
  TIPO_OPTS, NEGOCIO_OPTS, DEPTO_OPTS, AREA_OPTS, CERT_OPTS, ESTADO_PILL,
});
