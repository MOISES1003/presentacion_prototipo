/* screen_home.jsx — pantalla Inicio */

function Highlight({ text, q }) {
  if (!q) return <span className="search-res-name">{text}</span>;
  const i = text.toLowerCase().indexOf(q);
  if (i < 0) return <span className="search-res-name">{text}</span>;
  return (
    <span className="search-res-name">
      {text.slice(0, i)}<mark>{text.slice(i, i + q.length)}</mark>{text.slice(i + q.length)}
    </span>
  );
}

function SearchBar() {
  const { fire, navigate } = useApp();
  const [q, setQ] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const ql = q.trim().toLowerCase();
  const results = ql
    ? ALL_DOCS.filter(d => d.name.toLowerCase().includes(ql) || d.code.toLowerCase().includes(ql)).slice(0, 6)
    : [];
  return (
    <div className="search" ref={ref}>
      <div className={'search-bar' + (open && q ? ' is-open' : '')}>
        <Icon name="search" size={21} stroke={2} />
        <input
          value={q}
          placeholder="Busca por código, nombre o tipo de documento…"
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
        />
        {q && <button className="search-clear" onClick={() => setQ('')}>✕</button>}
        <span className="search-hint"><kbd>⏎</kbd> buscar</span>
      </div>
      {open && q && (
        <div className="search-pop">
          {results.length === 0 && <div className="search-empty">Sin coincidencias para “{q}”.</div>}
          {results.map((d) => (
            <button key={d.code} className="search-res" onClick={() => { setOpen(false); navigate('vigentes'); }}>
              <span className="search-res-ico"><Icon name="doc" size={18} stroke={1.7} /></span>
              <span className="search-res-main">
                <Highlight text={d.name} q={ql} />
                <code>{d.code}</code>
              </span>
              <Pill tone={ESTADO_PILL[d.estado] || 'blue'}>{d.estado}</Pill>
            </button>
          ))}
          {ql && (
            <button className="search-foot" onClick={() => { setOpen(false); navigate('vigentes'); }}>
              <Icon name="filter" size={14} stroke={2} /> Ver todos los resultados en Documentos vigentes
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function HomeScreen({ t, tabColor }) {
  const { fire, navigate } = useApp();
  const ACCESOS = [
    { id: 'vigentes', icon: 'eye', tab: 'var(--blue)', title: 'Documentos vigentes', sub: 'Consulta el repositorio aprobado', metric: '1,284' },
    { id: 'lec', icon: 'read', tab: 'var(--coral)', title: 'Pendientes de lectura', sub: 'Asignados que aún no lees', metric: '4' },
    { id: 'elaborar', icon: 'edit', tab: 'var(--green)', title: 'En elaboración', sub: 'Borradores en tu poder', metric: '6' },
    { id: 'adm', icon: 'settings', tab: 'var(--navy)', title: 'Administración', sub: 'Taxonomía, áreas y usuarios', metric: null },
  ];
  const go = (id) => ['vigentes', 'elaborar'].includes(id) ? navigate(id) : fire('Módulo “' + id + '” — demo');
  const TAREAS = ALL_DOCS.slice(0, 5);
  const LECTURA = ALL_DOCS.slice(5, 10);

  return (
    <div className="scroll">
      <section className="hero">
        <div className="hero-row">
          <div className="hero-text">
            <h1>Hola, María <span className="wave">👋</span></h1>
            <p>Gestiona la elaboración, revisión y aprobación de tus documentos internos desde un solo lugar.</p>
          </div>
          <div className="hero-cta">
            <button className="btn btn-ghost" onClick={() => navigate('vigentes')}>
              <Icon name="eye" size={18} stroke={1.9} /> Consultar
            </button>
            <button className="btn btn-solid" onClick={() => navigate('elaborar')}>
              <Icon name="plus" size={18} stroke={2.4} /> Nuevo documento
            </button>
          </div>
        </div>
        {t.showSearch && <SearchBar />}
      </section>

      <section className="block">
        <SectionHead title="Accesos rápidos" sub="Lo que más usas, a un clic" />
        <div className="folder-grid">
          {ACCESOS.map((a) => (
            <FolderCard key={a.id} big icon={a.icon} tab={tabColor(a.tab)}
              title={a.title} sub={a.sub} metric={a.metric} onClick={() => go(a.id)} />
          ))}
        </div>
      </section>

      <section className="block">
        <SectionHead title="Nuevos documentos" sub="Elige un tipo y empieza la elaboración"
          action="Ver elaboración" onAction={() => navigate('elaborar')} />
        <div className="tbox-grid">
          {TIPOS.map((tp) => (
            <TypeBox key={tp.id} icon={tp.icon} label={tp.label} tab={tabColor(tp.tab)}
              onClick={() => navigate('elaborar', { tipo: tp.label })} />
          ))}
        </div>
        <div className="upload-note">
          <span className="upload-ico"><Icon name="folder" size={18} stroke={1.8} /></span>
          <p><strong>Carga opcional.</strong> Trabaja desde una plantilla y guarda localmente; cuando esté listo usa <b>Cargar documento</b> para subirlo.</p>
          <button className="btn btn-soft" onClick={() => navigate('elaborar')}>
            <Icon name="arrowUpRight" size={15} stroke={2.2} /> Cargar documento
          </button>
        </div>
      </section>

      <section className="cols">
        <div className="panel">
          <SectionHead title="Mis tareas pendientes" sub="Documentos esperando tu intervención"
            action="Ver todas" onAction={() => fire('Abriendo Mis Tareas…')} />
          <div className="list">
            {TAREAS.map((d) => <TaskRow key={d.code} d={d} onOpen={(x) => fire('Abriendo “' + x.name + '”')} />)}
          </div>
        </div>
        <div className="panel">
          <SectionHead title="Pendientes de lectura" sub="Asignados que aún no has leído"
            action="Ver todos" onAction={() => fire('Abriendo lecturas…')} />
          <div className="list">
            {LECTURA.map((d) => <ReadRow key={d.code} d={d} onRead={(x) => fire('Marcando “' + x.name + '” como leído…')} />)}
          </div>
        </div>
      </section>

      <footer className="foot">CRECE DOCs · Gestor Documental — Inicio</footer>
    </div>
  );
}

Object.assign(window, { HomeScreen, SearchBar });
