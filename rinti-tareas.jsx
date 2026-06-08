/* rinti-tareas.jsx — Mis Tareas (resumen + filtros + lista viva + lecturas) */

const TAR_TONE = { 'En Revisión': 'var(--blue)', 'En Aprobación': 'var(--coral)', 'En Elaboración': 'var(--green)', Aprobado: 'var(--green)' };
const TAR_PILL = { 'En Revisión': 'blue', 'En Aprobación': 'coral', 'En Elaboración': 'green', Aprobado: 'green' };

function autorIni(a) { return a.replace('.', '').split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase(); }

function TaskCard({ d, onOpen }) {
  const tone = TAR_TONE[d.estado] || 'var(--blue)';
  return (
    <div className="task" style={{ '--tone': tone }}>
      <span className="task-accent" />
      <span className="task-ico"><Icon name="doc" size={20} stroke={1.7} /></span>
      <span className="task-body">
        <span className="task-name">{d.name}</span>
        <span className="task-meta">
          <code>{d.code}</code>
          <span className="task-dot">·</span>
          <span className="task-tipo">{d.tipoFull}</span>
        </span>
      </span>
      <span className="task-ver">{d.ver}</span>
      <span className="task-autor"><span className="task-av">{autorIni(d.autor)}</span>{d.autor}</span>
      <span className={'pill pill-' + (TAR_PILL[d.estado] || 'blue')}>{d.estado}</span>
      <button className="task-btn" onClick={() => onOpen(d)}>Abrir</button>
    </div>
  );
}

function MiniSelect({ label, value, onChange, options, placeholder }) {
  return (
    <label className="field">
      <span className="field-lab">{label}</span>
      <div className="sel-wrap">
        <select className={'inp sel' + (value ? '' : ' is-empty')} value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">{placeholder || 'Todos'}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <span className="sel-caret"><Icon name="chevronRight" size={15} stroke={2.4} /></span>
      </div>
    </label>
  );
}

function TareasScreen() {
  const { fire } = useApp();
  const [tab, setTab] = React.useState('no');
  const [readExp, setReadExp] = React.useState(false);
  const [q, setQ] = React.useState('');
  const [estado, setEstado] = React.useState('');
  const [tipo, setTipo] = React.useState('');
  const [gerencia, setGerencia] = React.useState('');
  const [lecturas, setLecturas] = React.useState(TAREAS_LECTURA);

  const base = tab === 'no' ? TAREAS : TAREAS_ATENDIDAS;
  const counts = TAR_ESTADOS.map(e => ({ e, n: TAREAS.filter(t => t.estado === e).length }));

  const rows = base.filter(d =>
    (d.name.toLowerCase().includes(q.toLowerCase()) || d.code.toLowerCase().includes(q.toLowerCase())) &&
    (!estado || d.estado === estado) &&
    (!tipo || d.tipo === tipo) &&
    (!gerencia || d.gerencia === gerencia)
  );

  return (
    <div className="scroll">
      <PageHead title="Mis Tareas" sub="Documentos que requieren tu intervención: elaboración, revisión, aprobación o lectura." />

      {/* RESUMEN por estado (filtros rápidos) */}
      <div className="tar-summary">
        <button className={'sumcard sumcard-all' + (estado === '' ? ' is-on' : '')} onClick={() => setEstado('')}>
          <span className="sumcard-n">{TAREAS.length}</span>
          <span className="sumcard-l">Todas mis tareas</span>
          <span className="sumcard-ico"><Icon name="tasks" size={18} stroke={1.9} /></span>
        </button>
        {counts.map(({ e, n }) => (
          <button key={e} className={'sumcard' + (estado === e ? ' is-on' : '')} style={{ '--tone': TAR_TONE[e] }} onClick={() => setEstado(estado === e ? '' : e)}>
            <span className="sumcard-tab" />
            <span className="sumcard-n">{n}</span>
            <span className="sumcard-l">{e}</span>
            <span className="sumcard-ico"><Icon name={e === 'En Aprobación' ? 'check' : e === 'En Revisión' ? 'eye' : 'edit'} size={18} stroke={1.9} /></span>
          </button>
        ))}
      </div>

      <div className="tar-grid">
        {/* MAIN */}
        <div className="tar-main">
          {/* filtros */}
          <div className="tar-filters">
            <label className="tar-search">
              <Icon name="search" size={19} stroke={2} />
              <input value={q} placeholder="Buscar por título o código…" onChange={(e) => setQ(e.target.value)} />
              {q && <button className="search-clear" onClick={() => setQ('')}>✕</button>}
            </label>
            <MiniSelect label="Estado" value={estado} onChange={setEstado} options={TAR_ESTADOS} />
            <MiniSelect label="Tipo documento" value={tipo} onChange={setTipo} options={TAR_TIPOS} />
            <MiniSelect label="Gerencia" value={gerencia} onChange={setGerencia} options={TAR_GERENCIAS} />
          </div>

          {/* tabs */}
          <div className="tar-tabbar">
            <div className="tar-tabs">
              <button className={tab === 'no' ? 'is-on' : ''} onClick={() => setTab('no')}><Icon name="clock" size={16} stroke={1.9} /> No atendidas <span className="tar-tab-n">{TAREAS.length}</span></button>
              <button className={tab === 'si' ? 'is-on' : ''} onClick={() => setTab('si')}><Icon name="check" size={16} stroke={2.2} /> Atendidas <span className="tar-tab-n">{TAREAS_ATENDIDAS.length}</span></button>
            </div>
            <span className="tar-count"><b>{rows.length}</b> {tab === 'no' ? 'sin atender' : 'atendidas'}</span>
          </div>

          <div className="tar-list-head">
            <h3>{tab === 'no' ? 'Mis tareas pendientes' : 'Tareas atendidas'}</h3>
            <p>{tab === 'no' ? 'Documentos esperando tu intervención' : 'Documentos que ya completaste'}</p>
          </div>

          <div className="task-list">
            {rows.map((d) => <TaskCard key={d.code} d={d} onOpen={(x) => fire('Abriendo “' + x.name + '”')} />)}
            {rows.length === 0 && <div className="vig-empty"><Icon name="search" size={28} stroke={1.6} /><b>Sin tareas</b><em>Ajusta los filtros o cambia de pestaña</em></div>}
          </div>

          {/* pager */}
          <div className="vig-pager">
            <div className="pager-show">Mostrar <select className="inp sel-mini"><option>10</option><option>25</option></select> por página</div>
            <div className="pager-right">
              <span>Página <b>1</b> de <b>1</b></span>
              <div className="pager">
                <button className="pg" disabled><Icon name="chevronLeft" size={14} stroke={2.4} /></button>
                <button className="pg is-on">1</button>
                <button className="pg" disabled><Icon name="chevronRight" size={14} stroke={2.4} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* LECTURAS */}
        <aside className="tar-read">
          <div className="read-head">
            <div>
              <h3>Pendientes de lectura</h3>
              <p>Asignados que aún no has leído</p>
            </div>
            <span className="read-badge">{lecturas.length}</span>
          </div>
          <div className={'read-list' + (readExp ? ' is-scroll' : '')}>
            {(readExp ? lecturas : lecturas.slice(0, 4)).map((d) => (
              <div key={d.code} className="readcard">
                <span className="readcard-ico"><Icon name="read" size={18} stroke={1.7} /></span>
                <span className="readcard-body">
                  <span className="readcard-name">{d.name}</span>
                  <span className="readcard-meta"><code>{d.code}</code><span className="readcard-ver">{d.ver}</span></span>
                </span>
                <button className="readcard-btn" onClick={() => { setLecturas(lecturas.filter(x => x.code !== d.code)); fire('“' + d.name + '” marcado como leído'); }}>Leer</button>
              </div>
            ))}
            {lecturas.length === 0 && <div className="read-empty"><Icon name="check" size={24} stroke={2} /><b>¡Todo al día!</b><em>No tienes lecturas pendientes</em></div>}
          </div>
          {lecturas.length > 4 && (
            <button className="read-all" onClick={() => setReadExp(!readExp)}>
              {readExp ? 'Ver menos' : 'Ver todas (' + lecturas.length + ')'}
              <Icon name="chevronRight" size={15} stroke={2.4} style={{ transform: readExp ? 'rotate(-90deg)' : 'rotate(90deg)', transition: 'transform .15s' }} />
            </button>
          )}
        </aside>
      </div>

      <footer className="foot">CRECE DOCs · Gestor Documental — RINTI</footer>
    </div>
  );
}

Object.assign(window, { TareasScreen });
