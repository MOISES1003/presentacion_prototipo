/* screen_vigentes.jsx — Documentos vigentes (filtros + tabla) */

function VigentesScreen() {
  const { fire } = useApp();
  const [f, setF] = React.useState({ codigo: '', titulo: '', tipo: '', negocio: '', depto: '', area: '', cert: '' });
  const [applied, setApplied] = React.useState({ codigo: '', titulo: '', tipo: '', negocio: '', depto: '', area: '', cert: '' });
  const set = (k, v) => setF({ ...f, [k]: v });

  const rows = VIGENTES.filter(d =>
    d.code.toLowerCase().includes(applied.codigo.toLowerCase()) &&
    d.name.toLowerCase().includes(applied.titulo.toLowerCase()) &&
    (!applied.tipo || d.tipo === applied.tipo) &&
    (!applied.negocio || d.negocio === applied.negocio) &&
    (!applied.depto || d.depto === applied.depto) &&
    (!applied.area || d.area === applied.area) &&
    (!applied.cert || d.cert === applied.cert)
  );

  const tipoTab = { Procedimiento: 'var(--navy)', Manual: 'var(--blue)', Especificación: 'var(--coral)', Instrucción: 'var(--green)', Formulario: 'var(--yellow)', Plan: 'var(--yellow)', Política: 'var(--coral)' };
  const clear = () => { const e = { codigo: '', titulo: '', tipo: '', negocio: '', depto: '', area: '', cert: '' }; setF(e); setApplied(e); };
  const activeCount = Object.values(applied).filter(Boolean).length;

  return (
    <div className="scroll">
      <PageHead
        title="Documentos vigentes"
        sub="Repositorio aprobado y en circulación"
        badge={rows.length + ' documentos'}
        right={(
          <div className="page-head-actions">
            <button className="btn btn-ghost sm" onClick={() => fire('Exportando a Excel…')}>
              <Icon name="archive" size={16} stroke={1.9} /> Exportar
            </button>
          </div>
        )}
      />

      {/* Filtros */}
      <div className="filter-card">
        <div className="filter-head">
          <span className="filter-ico"><Icon name="filter" size={16} stroke={2} /></span>
          <strong>Filtros de búsqueda</strong>
          {activeCount > 0 && <span className="filter-badge">{activeCount} activo{activeCount > 1 ? 's' : ''}</span>}
        </div>
        <div className="filter-grid">
          <Field label="Código"><input className="inp inp-mono" value={f.codigo} placeholder="Ej. ROP-…" onChange={(e) => set('codigo', e.target.value)} /></Field>
          <Field label="Título"><input className="inp" value={f.titulo} placeholder="Nombre del documento" onChange={(e) => set('titulo', e.target.value)} /></Field>
          <SelectField label="Tipo documento" value={f.tipo} onChange={(v) => set('tipo', v)} options={TIPO_OPTS} placeholder="Todos" />
          <SelectField label="Negocio" value={f.negocio} onChange={(v) => set('negocio', v)} options={NEGOCIO_OPTS} placeholder="Todos" />
          <SelectField label="Departamento" value={f.depto} onChange={(v) => set('depto', v)} options={DEPTO_OPTS} placeholder="Todos" />
          <SelectField label="Área" value={f.area} onChange={(v) => set('area', v)} options={AREA_OPTS} placeholder="Todas" />
          <SelectField label="Certificación" value={f.cert} onChange={(v) => set('cert', v)} options={CERT_OPTS} placeholder="Todas" />
          <div className="filter-acts">
            <button className="btn btn-ghost sm" onClick={clear}>Limpiar</button>
            <button className="btn btn-solid sm" onClick={() => { setApplied({ ...f }); fire('Búsqueda aplicada'); }}>
              <Icon name="search" size={15} stroke={2.2} /> Buscar
            </button>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="table-card">
        <div className="tbl-scroll">
          <table className="tbl">
            <thead>
              <tr>
                <th className="th-acc">Acciones</th>
                <th>Código</th>
                <th>Título</th>
                <th>Tipo</th>
                <th>Negocio</th>
                <th>Departamento</th>
                <th>Área</th>
                <th>Certificación</th>
                <th>Emisión</th>
                <th className="th-c">Ver.</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((d) => (
                <tr key={d.code}>
                  <td className="td-acc">
                    <button className="rowbtn" title="Ver" onClick={() => fire('Viendo “' + d.name + '”')}><Icon name="eye" size={16} stroke={1.9} /></button>
                    <button className="rowbtn" title="Trazabilidad" onClick={() => fire('Trazabilidad de ' + d.code)}><Icon name="history" size={16} stroke={1.9} /></button>
                    <button className="rowbtn" title="Descargar" onClick={() => fire('Descargando ' + d.code)}><Icon name="archive" size={16} stroke={1.9} /></button>
                  </td>
                  <td><code className="td-code">{d.code}</code></td>
                  <td className="td-name">{d.name}</td>
                  <td><span className="ttag" style={{ '--tt': tipoTab[d.tipo] || 'var(--blue)' }}>{d.tipo}</span></td>
                  <td className="td-mut">{d.negocio}</td>
                  <td className="td-mut">{d.depto}</td>
                  <td className="td-mut">{d.area}</td>
                  <td>{d.cert === '—' ? <span className="td-dash">—</span> : <span className="cert-tag">{d.cert}</span>}</td>
                  <td className="td-mut">{d.fecha}</td>
                  <td className="th-c"><span className="ver-tag">v{d.ver}</span></td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={10} className="tbl-empty">
                  <Icon name="search" size={28} stroke={1.6} />
                  <b>Sin resultados</b>
                  <em>Ajusta los filtros e intenta de nuevo</em>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="tbl-foot">
          <span>Mostrando <b>{rows.length}</b> de <b>{VIGENTES.length}</b> documentos vigentes</span>
          <div className="pager">
            <button className="pg" disabled><Icon name="chevronLeft" size={15} stroke={2.4} /></button>
            <button className="pg is-on">1</button>
            <button className="pg">2</button>
            <button className="pg">3</button>
            <button className="pg"><Icon name="chevronRight" size={15} stroke={2.4} /></button>
          </div>
        </div>
      </div>

      <footer className="foot">CRECE DOCs · Gestor Documental — Documentos vigentes</footer>
    </div>
  );
}

Object.assign(window, { VigentesScreen });
