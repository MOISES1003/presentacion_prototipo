/* rinti-data.jsx — catálogos CRECE DOCs · RINTI */

const ALL_DOCS = [
  { code: 'ROP-P-SI-00-001', name: 'Política de seguridad y salud en el trabajo', estado: 'En Revisión', tipo: 'Política' },
  { code: 'ROP-I-MF-00-001', name: 'Instructivo de arranque de línea de producción', estado: 'En Aprobación', tipo: 'Instrucción' },
  { code: 'RGH-P-CA-00-002', name: 'Política de gestión del talento humano', estado: 'En Elaboración', tipo: 'Política' },
  { code: 'ROP-M-SO-00-001', name: 'Manual de respuesta ante emergencias', estado: 'En Elaboración', tipo: 'Manual' },
  { code: 'RLO-I-LE-00-001', name: 'Instructivo de recepción de mercancías', estado: 'En Elaboración', tipo: 'Instrucción' },
];

const LECTURA = [
  { code: 'ROP-P-CA-00-001', name: 'Procedimiento de control de calidad', tipo: 'Procedimiento' },
  { code: 'ROP-M-MF-00-001', name: 'Manual de operaciones planta norte', tipo: 'Manual' },
  { code: 'ROP-E-CA-00-001', name: 'Especificación técnica Y-150', tipo: 'Especificación' },
  { code: 'RGH-P-CA-00-001', name: 'Procedimiento de inducción de personal', tipo: 'Procedimiento' },
  { code: 'ROP-I-LO-00-001', name: 'Instructivo de inventario semanal', tipo: 'Instrucción' },
];

const USERS = [
  { id: 1, name: 'José Salazar Ruiz', area: 'Calidad' },
  { id: 2, name: 'María Rodríguez Seminario', area: 'Operaciones' },
  { id: 3, name: 'Alberto Matos Andreu', area: 'Manufactura' },
  { id: 4, name: 'Juan José Torres Vega', area: 'Logística' },
  { id: 5, name: 'Lucía Fernández Paz', area: 'Gestión Humana' },
  { id: 6, name: 'Omar Postigo Vargas', area: 'Calidad' },
  { id: 7, name: 'Carla Benites Loayza', area: 'Seguridad' },
  { id: 8, name: 'Diego Cárdenas Ríos', area: 'Compras' },
  { id: 9, name: 'Patricia Ñahui Quispe', area: 'Almacén' },
  { id: 10, name: 'Renzo Villanueva Cruz', area: 'Mantenimiento' },
];

const TIPO_OPTS = ['Formulario', 'Instrucción', 'Especificación', 'Procedimiento', 'Plan', 'Manual', 'Política'];
const NEGOCIO_OPTS = ['Mascotas', 'Consumo Humano', 'Agro', 'Corporativo'];
const DEPTO_OPTS = ['Calidad', 'Manufactura', 'Almacén', 'Capacitación', 'SST', 'Compras', 'Mantenimiento', 'Logística'];
const AREA_OPTS = ['Aseguramiento', 'Producción', 'Talento', 'Inventarios', 'Distribución', 'Seguridad', 'I+D'];

/* ===== Documentos Vigentes (columnas reales) ===== */
const VIGENTES = [
  { name: 'Procedimiento de control de calidad', code: 'ROP-P-CA-00-001', ver: 'v3', direccion: 'Operaciones', tipo: 'Procedimiento', tipoFull: 'Procedimiento / Estándar / Protocolo', sector: 'Calidad', producto: 'Extruídos', fecha: '02/05/2026' },
  { name: 'Manual de operaciones planta norte', code: 'ROP-M-MF-00-001', ver: 'v2', direccion: 'Operaciones', tipo: 'Manual', tipoFull: 'Manual', sector: 'Manufactura', producto: 'Húmedos', fecha: '05/05/2026' },
  { name: 'Especificación técnica Y-150', code: 'ROP-E-CA-00-001', ver: 'v4', direccion: 'Operaciones', tipo: 'Especificación', tipoFull: 'Especificación', sector: 'Calidad', producto: 'Galletas', fecha: '07/05/2026' },
  { name: 'Procedimiento de inducción de personal', code: 'RGH-P-CA-00-001', ver: 'v1', direccion: 'Gestión Humana', tipo: 'Procedimiento', tipoFull: 'Procedimiento / Estándar / Protocolo', sector: 'Calidad', producto: 'PetCare', fecha: '08/05/2026' },
  { name: 'Instructivo de inventario semanal', code: 'ROP-I-LO-00-001', ver: 'v2', direccion: 'Logística', tipo: 'Instructivo', tipoFull: 'Instructivo Estandar', sector: 'Logística Entrada', producto: 'Materiales de Empaque', fecha: '10/05/2026' },
  { name: 'Procedimiento de despacho y distribución', code: 'RLO-P-LE-00-003', ver: 'v4', direccion: 'Logística', tipo: 'Procedimiento', tipoFull: 'Procedimiento / Estándar / Protocolo', sector: 'Logística Salida', producto: 'Materiales de Empaque', fecha: '12/05/2026' },
  { name: 'Especificación de materia prima MP-22', code: 'ROP-E-MF-00-004', ver: 'v2', direccion: 'Operaciones', tipo: 'Especificación', tipoFull: 'Especificación', sector: 'Manufactura', producto: 'Extruídos', fecha: '15/05/2026' },
  { name: 'Manual de bienvenida e inducción', code: 'RGH-M-CA-00-002', ver: 'v3', direccion: 'Gestión Humana', tipo: 'Manual', tipoFull: 'Manual', sector: 'Talento', producto: 'PetCare', fecha: '18/05/2026' },
];

const VIG_DIRECCION = ['Operaciones', 'Gestión Humana', 'Logística', 'Comercial'];
const VIG_TIPO = ['Procedimiento', 'Manual', 'Especificación', 'Instructivo', 'Formulario', 'Plan', 'Política'];
const VIG_SECTOR = ['Calidad', 'Manufactura', 'Logística Entrada', 'Logística Salida', 'Talento', 'I+D'];
const VIG_PRODUCTO = ['Extruídos', 'Húmedos', 'Galletas', 'PetCare', 'Materiales de Empaque', 'Snacks'];
const TIPO_TAB = { Procedimiento: 'var(--navy)', Manual: 'var(--blue)', 'Especificación': 'var(--coral)', Instructivo: 'var(--green)', Formulario: 'var(--blue)', Plan: 'var(--green)', 'Política': 'var(--coral)' };

/* ===== Documentos Obsoletos ===== */
const OBSOLETOS = [
  { name: 'Procedimiento de mantenimiento preventivo', code: 'ROP-P-MT-00-001', ver: 'v3', direccion: 'Operaciones', tipo: 'Procedimiento', tipoFull: 'Procedimiento / Estándar / Protocolo', sector: 'Mantenimiento', producto: 'Extruídos', fecha: '24/05/2026' },
  { name: 'Especificación de equipos críticos de planta', code: 'ROP-E-MF-00-001', ver: 'v2', direccion: 'Operaciones', tipo: 'Especificación', tipoFull: 'Especificación', sector: 'Manufactura', producto: 'Materias Primas', fecha: '25/05/2026' },
  { name: 'Manual antiguo de procesos internos', code: 'RCA-M-PR-00-003', ver: 'v1', direccion: 'Producción', tipo: 'Manual', tipoFull: 'Manual', sector: 'Proyectos', producto: 'Treats', fecha: '14/02/2024' },
];
const OBS_DIRECCION = ['Operaciones', 'Producción', 'Logística', 'Comercial'];
const OBS_SECTOR = ['Mantenimiento', 'Manufactura', 'Proyectos', 'Calidad'];
const OBS_PRODUCTO = ['Extruídos', 'Materias Primas', 'Treats', 'Húmedos', 'Galletas'];

const TIPOS = [
  { id: 'formulario', label: 'Formulario', icon: 'formulario', tab: 'var(--blue)', desc: 'Registros y plantillas de captura' },
  { id: 'instruccion', label: 'Instrucción', icon: 'instruccion', tab: 'var(--green)', desc: 'Pasos puntuales de una tarea' },
  { id: 'especificacion', label: 'Especificación', icon: 'especificaciones', tab: 'var(--coral)', desc: 'Características técnicas y normas' },
  { id: 'procedimiento', label: 'Procedimiento', icon: 'procedimiento', tab: 'var(--navy)', desc: 'Proceso completo paso a paso' },
  { id: 'plan', label: 'Plan', icon: 'plan', tab: 'var(--yellow)', desc: 'Objetivos, fechas y responsables' },
  { id: 'manual', label: 'Manual', icon: 'manual', tab: 'var(--blue)', desc: 'Guía integral de un sistema' },
];

const ESTADO_PILL = { Vigente: 'green', 'En Revisión': 'blue', 'En Aprobación': 'coral', 'En Elaboración': 'green' };

/* ===== Mis Tareas ===== */
const TAREAS = [
  { name: 'Política de seguridad y salud en el trabajo', code: 'ROP-P-SI-00-001', tipo: 'Política', tipoFull: 'Política', ver: 'v5', autor: 'M. Quispe', estado: 'En Revisión', gerencia: 'Operaciones' },
  { name: 'Manual del sistema de gestión de calidad', code: 'ROP-M-CA-00-001', tipo: 'Manual', tipoFull: 'Manual', ver: 'v6', autor: 'C. Vega', estado: 'En Revisión', gerencia: 'Operaciones' },
  { name: 'Procedimiento de despacho y distribución', code: 'RLO-P-LS-00-001', tipo: 'Procedimiento', tipoFull: 'Procedimiento / Estándar / Protocolo', ver: 'v2', autor: 'L. Romero', estado: 'En Revisión', gerencia: 'Logística' },
  { name: 'Instructivo de arranque de línea de producción', code: 'ROP-I-MF-00-001', tipo: 'Instructivo', tipoFull: 'Instructivo Estándar', ver: 'v3', autor: 'M. Quispe', estado: 'En Aprobación', gerencia: 'Operaciones' },
  { name: 'Especificación de materias primas aprobadas', code: 'ROP-E-MP-00-001', tipo: 'Especificación', tipoFull: 'Especificación', ver: 'v2', autor: 'C. Vega', estado: 'En Aprobación', gerencia: 'Operaciones' },
  { name: 'Procedimiento de cierre contable mensual', code: 'RAF-P-CT-00-001', tipo: 'Procedimiento', tipoFull: 'Procedimiento / Estándar / Protocolo', ver: 'v1', autor: 'L. Romero', estado: 'En Aprobación', gerencia: 'Finanzas' },
  { name: 'Política de gestión del talento humano', code: 'RGH-P-CA-00-002', tipo: 'Política', tipoFull: 'Política', ver: 'v3', autor: 'M. Quispe', estado: 'En Elaboración', gerencia: 'Gestión Humana' },
  { name: 'Manual de respuesta ante emergencias', code: 'ROP-M-SO-00-001', tipo: 'Manual', tipoFull: 'Manual', ver: 'v4', autor: 'C. Vega', estado: 'En Elaboración', gerencia: 'Operaciones' },
  { name: 'Instructivo de recepción de mercancías', code: 'RLO-I-LE-00-001', tipo: 'Instructivo', tipoFull: 'Instructivo Estándar', ver: 'v1', autor: 'L. Romero', estado: 'En Elaboración', gerencia: 'Logística' },
];
const TAREAS_ATENDIDAS = [
  { name: 'Procedimiento de control de calidad', code: 'ROP-P-CA-00-001', tipo: 'Procedimiento', tipoFull: 'Procedimiento / Estándar / Protocolo', ver: 'v3', autor: 'M. Quispe', estado: 'Aprobado', gerencia: 'Operaciones' },
  { name: 'Formulario de inspección de seguridad', code: 'ROP-F-SI-00-007', tipo: 'Formulario', tipoFull: 'Formulario', ver: 'v1', autor: 'C. Vega', estado: 'Aprobado', gerencia: 'Operaciones' },
  { name: 'Manual de bienvenida e inducción', code: 'RGH-M-CA-00-002', tipo: 'Manual', tipoFull: 'Manual', ver: 'v3', autor: 'L. Romero', estado: 'Aprobado', gerencia: 'Gestión Humana' },
];
const TAREAS_LECTURA = [
  { name: 'Procedimiento de control de calidad', code: 'ROP-P-CA-00-001', ver: 'v3' },
  { name: 'Manual de operaciones planta norte', code: 'ROP-M-MF-00-001', ver: 'v2' },
  { name: 'Especificación técnica Y-150', code: 'ROP-E-CA-00-001', ver: 'v4' },
  { name: 'Procedimiento de inducción de personal', code: 'RGH-P-CA-00-001', ver: 'v1' },
  { name: 'Instructivo de inventario semanal', code: 'ROP-I-LO-00-001', ver: 'v2' },
  { name: 'Política de uso de equipos de protección', code: 'ROP-P-SI-00-004', ver: 'v1' },
  { name: 'Manual de bienvenida e inducción', code: 'RGH-M-CA-00-002', ver: 'v3' },
  { name: 'Procedimiento de despacho y distribución', code: 'RLO-P-LE-00-003', ver: 'v4' },
  { name: 'Especificación de materia prima MP-22', code: 'ROP-E-MF-00-004', ver: 'v2' },
  { name: 'Formulario de inspección de seguridad', code: 'ROP-F-SI-00-007', ver: 'v1' },
  { name: 'Instructivo de recepción de mercancías', code: 'RLO-I-LE-00-001', ver: 'v1' },
  { name: 'Procedimiento de mantenimiento preventivo', code: 'ROP-P-MT-00-009', ver: 'v5' },
];
const TAR_ESTADOS = ['En Revisión', 'En Aprobación', 'En Elaboración'];
const TAR_TIPOS = ['Política', 'Manual', 'Procedimiento', 'Instructivo', 'Especificación', 'Formulario'];
const TAR_GERENCIAS = ['Operaciones', 'Logística', 'Finanzas', 'Gestión Humana'];

/* ===== Listas de Distribución ===== */
const DIST_PEOPLE = [
  { id: 101, name: 'Perez, Juan', cargo: 'Ejecutivo Ventas', area: 'Comercial' },
  { id: 102, name: 'Diaz, Luis', cargo: 'Analista Comercial', area: 'Comercial' },
  { id: 103, name: 'Pilar, Vanessa', cargo: 'Ejecutivo Sell Out', area: 'Comercial' },
  { id: 104, name: 'Riveros, Juan', cargo: 'Coordinador Estrategia', area: 'Estrategia' },
  { id: 105, name: 'Fernandez, Carla', cargo: 'Asesor Comercial', area: 'Zona Sur' },
  { id: 106, name: 'Sanchez, Ana', cargo: 'Asistente Proyectos', area: 'Manufactura' },
  { id: 107, name: 'Torres, Luis', cargo: 'Analista Planeamiento', area: 'Planificación' },
  { id: 108, name: 'Alvarez, Gisela', cargo: 'Coordinadora Estrategia', area: 'Estrategia' },
  { id: 109, name: 'Alzamora, Julio', cargo: 'Supervisor Distribución', area: 'Compras' },
  { id: 110, name: 'Quispe, Rosa', cargo: 'Analista Calidad', area: 'Calidad' },
  { id: 111, name: 'Mendoza, Hugo', cargo: 'Jefe Almacén', area: 'Logística' },
  { id: 112, name: 'Salas, Pedro', cargo: 'Operador Planta', area: 'Manufactura' },
];
const DIST_GROUPS = [
  { id: 'g1', name: 'Equipo Calidad', area: 'Operaciones', color: 'var(--blue)', memberIds: [106, 107, 108, 109] },
  { id: 'g2', name: 'Gerencias Operaciones', area: 'Operaciones', color: 'var(--navy)', memberIds: [104, 108, 110] },
  { id: 'g3', name: 'Equipo Gestión Humana', area: 'Gestión Humana', color: 'var(--green)', memberIds: [105, 106, 111] },
  { id: 'g4', name: 'Equipo Comercial', area: 'Ventas', color: 'var(--coral)', memberIds: [101, 102, 103, 105] },
  { id: 'g5', name: 'Dirección General', area: 'Corporativo', color: 'var(--navy)', memberIds: [104, 108] },
  { id: 'g6', name: 'Equipo Manufactura', area: 'Operaciones', color: 'var(--blue)', memberIds: [106, 112, 107, 109, 110] },
];

/* ===== Taxonomía (árbol) ===== */
// kind: dir (edificio) | doc (documento) | leaf (tag/nodo final)
const TAX_TREE = [
  { id: 'n1', code: 'IN', label: 'Gerencia Corporativa', kind: 'dir', warn: true, open: true, children: [
    { id: 'n1a', code: 'E', label: 'Especificación', kind: 'doc', warn: true, open: true, children: [
      { id: 'n1a1', code: 'LS', label: 'Logística Salida', kind: 'leaf' },
      { id: 'n1a2', code: 'MT', label: 'Mantenimiento', kind: 'leaf' },
      { id: 'n1a3', code: 'TI', label: 'Tecnología de Información', kind: 'leaf' },
      { id: 'n1a4', code: 'AU', label: 'Auditoría', kind: 'leaf', warn: true },
    ]},
    { id: 'n1b', code: 'N', label: 'Programa / Plan', kind: 'doc', children: [] },
    { id: 'n1c', code: 'G', label: 'Guía', kind: 'doc', children: [] },
  ]},
  { id: 'n2', code: 'AD', label: 'Administración', kind: 'dir', warn: true, children: [] },
  { id: 'n3', code: 'AF', label: 'Finanzas', kind: 'dir', warn: true, children: [] },
  { id: 'n4', code: 'OP', label: 'Operaciones', kind: 'dir', warn: true, children: [] },
  { id: 'n5', code: 'LO', label: 'Logística', kind: 'dir', warn: true, children: [] },
  { id: 'n6', code: 'CO', label: 'Compras', kind: 'dir', warn: true, children: [] },
  { id: 'n7', code: 'GH', label: 'Gestión Humana', kind: 'dir', warn: true, children: [] },
  { id: 'n8', code: 'MK', label: 'Marketing', kind: 'dir', warn: true, children: [] },
  { id: 'n9', code: 'VT', label: 'Ventas', kind: 'dir', warn: true, children: [] },
];
const TAX_FLOW = {
  Elaboradores: [{ id: 106, name: 'Sanchez, Ana', cargo: 'Asistente Proyectos' }],
  Revisores: [{ id: 101, name: 'Perez, Juan', cargo: 'Ejecutivo Ventas' }, { id: 108, name: 'Alvarez, Gisela', cargo: 'Coord. Estrategia' }, { id: 104, name: 'Riveros, Juan', cargo: 'Coord. Estrategia' }],
  Aprobador: [{ id: 200, name: 'Torres, Alberto', cargo: 'Director General' }],
};

Object.assign(window, {
  ALL_DOCS, LECTURA, USERS, TIPOS,
  TIPO_OPTS, NEGOCIO_OPTS, DEPTO_OPTS, AREA_OPTS, ESTADO_PILL,
  VIGENTES, VIG_DIRECCION, VIG_TIPO, VIG_SECTOR, VIG_PRODUCTO, TIPO_TAB,
  OBSOLETOS, OBS_DIRECCION, OBS_SECTOR, OBS_PRODUCTO,
  DIST_PEOPLE, DIST_GROUPS, TAX_TREE, TAX_FLOW,
  TAREAS, TAREAS_ATENDIDAS, TAREAS_LECTURA, TAR_ESTADOS, TAR_TIPOS, TAR_GERENCIAS,
});
