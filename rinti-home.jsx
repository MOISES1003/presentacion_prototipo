/* rinti-home.jsx — pantalla Inicio (real, estilo dinámico) */

/* Indicador — estilo tablero plano (informa, no compite) */
function StatCard({ icon, tone, label, value, hint, onClick }) {
  return (
    <button className={'kpi kpi-' + tone} onClick={onClick}>
      <span className="kpi-ico"><Icon name={icon} size={20} stroke={1.9} /></span>
      <span className="kpi-body">
        <span className="kpi-label">{label}</span>
        <span className="kpi-value">{value}</span>
        {hint && <span className="kpi-hint">{hint}</span>}
      </span>
    </button>
  );
}

function TaskRow({ d, onOpen }) {
  return (
    <div className="trow">
      <span className="trow-ico"><Icon name="doc" size={20} stroke={1.7} /></span>
      <span className="trow-main">
        <span className="trow-top"><code>{d.code}</code><Pill tone={ESTADO_PILL[d.estado] || 'blue'}>{d.estado}</Pill></span>
        <span className="trow-name">{d.name}</span>
      </span>
      <button className="trow-btn" onClick={() => onOpen(d)}>Abrir</button>
    </div>
  );
}
function ReadRow({ d, onRead }) {
  return (
    <div className="rrow">
      <span className="rrow-ico"><Icon name="doc" size={19} stroke={1.7} /></span>
      <span className="rrow-main"><span className="rrow-name">{d.name}</span><code>{d.code}</code></span>
      <button className="rrow-btn" onClick={() => onRead(d)}>Leer</button>
    </div>
  );
}

/* Acceso ancho inferior — tarjeta flotante destacada */
function Shortcut({ icon, tab, title, desc, onClick }) {
  return (
    <button className="short" style={{ '--tab': tab }} onClick={onClick}>
      <span className="short-tab" />
      <span className="short-panel">
        <span className="short-ico"><Icon name={icon} size={26} stroke={1.8} /></span>
        <span className="short-body">
          <span className="short-title">{title}</span>
          <span className="short-desc">{desc}</span>
        </span>
        <span className="short-cta">Abrir <Icon name="arrow" size={15} stroke={2.3} /></span>
      </span>
    </button>
  );
}

function HomeScreen({ tabColor }) {
  const { fire, navigate } = useApp();
  const STATS = [
    { id: 'vig', icon: 'doc', tone: 'blue', label: 'Documentos vigentes', value: '1,284', hint: 'en circulación', go: () => navigate('vigentes') },
    { id: 'aten', icon: 'clock', tone: 'green', label: 'Pendientes de atención', value: '4', hint: 'requieren acción', go: () => fire('Abriendo pendientes de atención…') },
    { id: 'lec', icon: 'read', tone: 'navy', label: 'Pendientes de lectura', value: '4', hint: 'sin leer', go: () => fire('Abriendo lecturas…') },
    { id: 'venc', icon: 'alert', tone: 'coral', label: 'Por vencer (4 años)', value: '16', hint: 'próximos a renovar', go: () => fire('Abriendo documentos por vencer…') },
  ];
  return (
    <div className="scroll">
      {/* HERO */}
      <section className="hero">
        <div className="hero-card">
          <div className="hero-blob blob-1" /><div className="hero-blob blob-2" /><div className="hero-blob blob-3" />
          <div className="hero-content">
            <div className="hero-text">
              <h1>Hola, María Quispe <span className="wave">👋</span></h1>
              <p>Gestiona la elaboración, revisión y aprobación de tus documentos internos en un solo lugar.</p>
            </div>
            <div className="hero-cta">
              <button className="btn btn-light" onClick={() => navigate('vigentes')}><Icon name="eye" size={18} stroke={1.9} /> Consultar documentos</button>
              <button className="btn btn-bright" onClick={() => navigate('elaborar')}><Icon name="plus" size={18} stroke={2.4} /> Nuevo documento</button>
            </div>
          </div>
        </div>
      </section>

      {/* INDICADORES */}
      <section className="block">
        <div className="kpi-grid">
          {STATS.map((s) => <StatCard key={s.id} icon={s.icon} tone={s.tone} label={s.label} value={s.value} hint={s.hint} onClick={s.go} />)}
        </div>
      </section>

      {/* DOS COLUMNAS */}
      <section className="cols">
        <div className="panel">
          <SectionHead title="Mis tareas pendientes" sub="Documentos esperando tu intervención" action="Ver todas" onAction={() => fire('Abriendo Mis Tareas…')} />
          <div className="list">{ALL_DOCS.map((d) => <TaskRow key={d.code} d={d} onOpen={(x) => fire('Abriendo “' + x.name + '”')} />)}</div>
        </div>
        <div className="panel">
          <SectionHead title="Documentos pendientes de lectura" sub="Asignados que aún no han sido leídos" action="Ver todos" onAction={() => fire('Abriendo lecturas…')} />
          <div className="list">{LECTURA.map((d) => <ReadRow key={d.code} d={d} onRead={(x) => fire('Marcando “' + x.name + '” como leído…')} />)}</div>
        </div>
      </section>

      {/* ACCESOS INFERIORES */}
      <section className="block">
        <SectionHead title="Accesos rápidos" sub="Lo que más usas, a un clic" />
        <div className="short-grid">
          <Shortcut icon="edit" tab={tabColor('var(--green)')} title="Crear documento" desc="Inicia la elaboración de un nuevo procedimiento, manual o especificación." onClick={() => navigate('elaborar')} />
          <Shortcut icon="tasks" tab={tabColor('var(--blue)')} title="Mis tareas" desc="Revisa, aprueba o lee los documentos asignados a ti." onClick={() => fire('Abriendo Mis Tareas…')} />
          <Shortcut icon="eye" tab={tabColor('var(--coral)')} title="Buscar y consultar" desc="Encuentra documentos vigentes filtrando por taxonomía, autor o estado." onClick={() => navigate('vigentes')} />
        </div>
      </section>

      <footer className="foot">CRECE DOCs · Gestor Documental — RINTI</footer>
    </div>
  );
}

Object.assign(window, { HomeScreen });
