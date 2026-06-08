/* components.jsx — Sidebar, TopBar, FolderCard, TypeBox, task & reading lists, form fields */

// Shared context: fire(text) toast + navigate(screenId)
const AppCtx = React.createContext({ fire: () => {}, navigate: () => {} });
const useApp = () => React.useContext(AppCtx);

const NAV_DOCS = [
  { id: 'inicio', label: 'Inicio', icon: 'grid' },
  { id: 'tareas', label: 'Mis Tareas', icon: 'tasks', badge: 8 },
  { id: 'elaborar', label: 'Elaborar Documento', icon: 'edit' },
  { id: 'vigentes', label: 'Documentos Vigentes', icon: 'search' },
  { id: 'traza', label: 'Trazabilidad', icon: 'history' },
  { id: 'obsoletos', label: 'Documentos obsoletos', icon: 'archive' },
];
const NAV_ADMIN = [
  { id: 'taxonomia', label: 'Taxonomía', icon: 'taxonomy' },
  { id: 'listas', label: 'Listas de Distribución', icon: 'distribution' },
  { id: 'tipodoc', label: 'Tipo de documento', icon: 'doctype' },
  { id: 'areas', label: 'Áreas', icon: 'areas' },
  { id: 'cargos', label: 'Cargos', icon: 'cargos' },
  { id: 'usuarios', label: 'Usuarios y Roles', icon: 'users' },
  { id: 'roles', label: 'Roles', icon: 'roles' },
];

function Sidebar({ active, setActive }) {
  const item = (n) => (
    <button
      key={n.id}
      className={'nav-item' + (active === n.id ? ' is-active' : '')}
      onClick={() => setActive(n.id)}
    >
      <span className="nav-ico"><Icon name={n.icon} size={19} stroke={1.9} /></span>
      <span className="nav-label">{n.label}</span>
      {n.badge ? <span className="nav-badge">{n.badge}</span> : null}
    </button>
  );
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark"><span>R</span></div>
        <div className="brand-text">
          <strong>CRECE DOCs</strong>
          <em>Gestor Documental</em>
        </div>
      </div>
      <nav className="nav">
        <p className="nav-head">Documentos</p>
        {NAV_DOCS.map(item)}
        <p className="nav-head">Administración</p>
        {NAV_ADMIN.map(item)}
      </nav>
    </aside>
  );
}

function TopBar({ crumb = ['Inicio'] }) {
  return (
    <header className="topbar">
      <div className="crumb">
        <span>CRECE DOCs</span>
        {crumb.map((c, i) => (
          <React.Fragment key={i}>
            <Icon name="chevronRight" size={15} stroke={2.2} />
            <span className={i === crumb.length - 1 ? 'crumb-here' : ''}>{c}</span>
          </React.Fragment>
        ))}
      </div>
      <div className="topbar-right">
        <button className="bell"><Icon name="bell" size={20} stroke={1.9} /><i className="dot" /></button>
        <div className="who">
          <div className="who-txt">
            <strong>María Quispe</strong>
            <em>Elaborador · Calidad</em>
          </div>
          <div className="who-av">MQ</div>
        </div>
      </div>
    </header>
  );
}

/* Signature floating folder-tab card */
function FolderCard({ icon, tab, title, sub, metric, onClick, big }) {
  return (
    <button
      className={'folder' + (big ? ' folder-big' : '')}
      style={{ '--tab': tab }}
      onClick={onClick}
    >
      <span className="folder-tab" />
      <span className="folder-panel">
        <span className="folder-top">
          <span className="folder-ico"><Icon name={icon} size={big ? 26 : 24} stroke={1.8} /></span>
          {metric != null && <span className="folder-metric">{metric}</span>}
        </span>
        <span className="folder-body">
          <span className="folder-title">{title}</span>
          {sub && <span className="folder-sub">{sub}</span>}
        </span>
        <span className="folder-go"><Icon name="arrowUpRight" size={16} stroke={2.2} /></span>
      </span>
    </button>
  );
}

/* Small type box for "Nuevos documentos" */
function TypeBox({ icon, label, tab, active, onClick }) {
  return (
    <button
      className={'tbox' + (active ? ' is-on' : '')}
      style={{ '--tab': tab }}
      onClick={onClick}
    >
      <span className="tbox-tab" />
      <span className="tbox-panel">
        <span className="tbox-ico"><Icon name={icon} size={26} stroke={1.7} /></span>
        <span className="tbox-label">{label}</span>
        <span className="tbox-plus"><Icon name="plus" size={14} stroke={2.6} /></span>
      </span>
    </button>
  );
}

function TaskRow({ d, onOpen }) {
  return (
    <div className="trow">
      <span className="trow-ico"><Icon name="doc" size={20} stroke={1.7} /></span>
      <span className="trow-main">
        <span className="trow-top">
          <code>{d.code}</code>
          <span className={'pill pill-' + (ESTADO_PILL[d.estado] || 'blue')}>{d.estado}</span>
        </span>
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
      <span className="rrow-main">
        <span className="rrow-name">{d.name}</span>
        <code>{d.code}</code>
      </span>
      <button className="rrow-btn" onClick={() => onRead(d)}>Leer</button>
    </div>
  );
}

/* ── Section heading ── */
function SectionHead({ title, sub, action, onAction }) {
  return (
    <div className="sec-head">
      <div>
        <h2>{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {action && <button className="sec-link" onClick={onAction}>{action}<Icon name="arrowUpRight" size={15} stroke={2.2} /></button>}
    </div>
  );
}

/* ── Page header (screen title + back) ── */
function PageHead({ title, sub, badge, onBack, right }) {
  return (
    <div className="page-head">
      <div className="page-head-l">
        {onBack && (
          <button className="back-btn" onClick={onBack}>
            <Icon name="chevronLeft" size={18} stroke={2.4} />
          </button>
        )}
        <div>
          <div className="page-title-row">
            <h1>{title}</h1>
            {badge && <span className="page-badge">{badge}</span>}
          </div>
          {sub && <p>{sub}</p>}
        </div>
      </div>
      {right && <div className="page-head-r">{right}</div>}
    </div>
  );
}

/* ── Form fields ── */
function Field({ label, children, hint, required }) {
  return (
    <label className="field">
      <span className="field-lab">{label}{required && <i>*</i>}</span>
      {children}
      {hint && <span className="field-hint">{hint}</span>}
    </label>
  );
}

function TextField({ label, value, onChange, placeholder, required, mono }) {
  return (
    <Field label={label} required={required}>
      <input className={'inp' + (mono ? ' inp-mono' : '')} value={value} placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)} />
    </Field>
  );
}

function SelectField({ label, value, onChange, options, placeholder, required }) {
  return (
    <Field label={label} required={required}>
      <div className="sel-wrap">
        <select className={'inp sel' + (value ? '' : ' is-empty')} value={value}
          onChange={(e) => onChange && onChange(e.target.value)}>
          <option value="">{placeholder || 'Seleccionar…'}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <span className="sel-caret"><Icon name="chevronRight" size={15} stroke={2.4} /></span>
      </div>
    </Field>
  );
}

// Field with a trailing search button (Negocio / Departamento / Área)
function LookupField({ label, value, onChange, options, required, onLookup }) {
  return (
    <Field label={label} required={required}>
      <div className="sel-wrap">
        <select className={'inp sel' + (value ? '' : ' is-empty')} value={value}
          onChange={(e) => onChange && onChange(e.target.value)}>
          <option value="">Seleccionar…</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <button type="button" className="lookup-btn" onClick={onLookup}>
          <Icon name="search" size={15} stroke={2.2} />
        </button>
      </div>
    </Field>
  );
}

// Segmented control
function Segmented({ value, onChange, options }) {
  return (
    <div className="seg" style={{ '--n': options.length }}>
      <span className="seg-thumb" style={{ transform: `translateX(${options.findIndex(o => (o.value ?? o) === value) * 100}%)` }} />
      {options.map((o) => {
        const v = o.value ?? o, l = o.label ?? o;
        return (
          <button key={v} type="button" className={'seg-opt' + (v === value ? ' is-on' : '')}
            onClick={() => onChange(v)}>{l}</button>
        );
      })}
    </div>
  );
}

function Pill({ children, tone }) {
  return <span className={'pill pill-' + (tone || 'blue')}>{children}</span>;
}

Object.assign(window, {
  AppCtx, useApp,
  Sidebar, TopBar, FolderCard, TypeBox, TaskRow, ReadRow,
  SectionHead, PageHead, Field, TextField, SelectField, LookupField, Segmented, Pill,
  NAV_DOCS, NAV_ADMIN,
});
