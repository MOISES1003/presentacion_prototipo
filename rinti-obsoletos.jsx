/* rinti-obsoletos.jsx — Documentos Obsoletos (vista Tabla) */

function ObsoletosScreen() {
  const { fire } = useApp();
  const [f, setF] = React.useState({ q: '', direccion: '', tipo: '', sector: '', producto: '' });
  const [kw, setKw] = React.useState([]);
  const [kwInput, setKwInput] = React.useState('');
  const set = (k, v) => setF({ ...f, [k]: v });

  const rows = OBSOLETOS.filter(d =>
    (d.name.toLowerCase().includes(f.q.toLowerCase()) || d.code.toLowerCase().includes(f.q.toLowerCase())) &&
    (!f.direccion || d.direccion === f.direccion) &&
    (!f.tipo || d.tipo === f.tipo) &&
    (!f.sector || d.sector === f.sector) &&
    (!f.producto || d.producto === f.producto) &&
    kw.every(k => (d.name + ' ' + d.tipoFull + ' ' + d.producto).toLowerCase().includes(k.toLowerCase()))
  );
  const activeCount = Object.values(f).filter(Boolean).length + kw.length;
  const clear = () => { setF({ q: '', direccion: '', tipo: '', sector: '', producto: '' }); setKw([]); setKwInput(''); };

  return (
    <div className="scroll is-obs">
      <PageHead
        title="Documentos obsoletos"
        sub="Utilice los filtros de búsqueda para localizar y consultar los documentos obsoletos disponibles."
        badge="Solo consulta"
        // right={<button className="btn btn-ghost" onClick={() => fire('Exportando a Excel…')}><Icon name="archive" size={16} stroke={1.9} /> Exportar a Excel</button>}
      />

      {/* FILTROS */}
      <div className="filter-card">
        <div className="filter-head">
          <span className="filter-ico filter-ico-obs"><Icon name="filter" size={16} stroke={2} /></span>
          <strong>Filtros</strong>
          {activeCount > 0 && <span className="filter-badge">{activeCount} activo{activeCount > 1 ? 's' : ''}</span>}
          {activeCount > 0 && <button className="filter-clear" onClick={clear}>Limpiar</button>}
        </div>
        <div className="filter-grid">
          <Field label="Buscar documento"><input className="inp" value={f.q} placeholder="Título o código…" onChange={(e) => set('q', e.target.value)} /></Field>
          <SelectField label="Dirección" value={f.direccion} onChange={(v) => set('direccion', v)} options={OBS_DIRECCION} placeholder="Seleccionar…" />
          <SelectField label="Tipo" value={f.tipo} onChange={(v) => set('tipo', v)} options={VIG_TIPO} placeholder="Seleccionar…" />
          <SelectField label="Sector" value={f.sector} onChange={(v) => set('sector', v)} options={OBS_SECTOR} placeholder="Seleccionar…" />
          <SelectField label="Producto" value={f.producto} onChange={(v) => set('producto', v)} options={OBS_PRODUCTO} placeholder="Seleccionar…" />
          <Field label="Palabras clave">
            <input className="inp" value={kwInput} placeholder="Ingrese palabra y presione ⏎"
              onChange={(e) => setKwInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && kwInput.trim()) { setKw([...kw, kwInput.trim()]); setKwInput(''); } }} />
          </Field>
        </div>
        {kw.length > 0 && (
          <div className="kw-chips">
            {kw.map((k, i) => <span key={i} className="kw-chip kw-chip-obs">{k}<button onClick={() => setKw(kw.filter((_, j) => j !== i))}><Icon name="plus" size={12} stroke={2.6} style={{ transform: 'rotate(45deg)' }} /></button></span>)}
          </div>
        )}
      </div>

      {/* AVISO */}
      <div className="obs-note">
        <Icon name="archive" size={17} stroke={1.9} />
        <span>Estos documentos <b>ya no son vigentes</b>. Se conservan solo para consulta histórica y trazabilidad; no deben usarse en operación.</span>
      </div>

      {/* RESULTADOS */}
      <div className="table-card">
        <div className="tbl-head">
          <span className="tbl-count"><b>{rows.length} resultados</b> encontrados</span>
        </div>
        <div className="tbl-scroll">
          <table className="tbl tbl-obs">
            <thead>
              <tr><th>Título</th><th className="th-c">Versión Obsoleta</th><th>Dirección</th><th>Tipo</th><th>Sector</th><th>Producto</th><th>Fecha Envío a Obsoletos</th><th className="th-c">Acciones</th></tr>
            </thead>
            <tbody>
              {rows.map((d) => (
                <tr key={d.code}>
                  <td>
                    <div className="tbl-title">
                      <span className="tbl-ico tbl-ico-obs"><Icon name="archive" size={18} stroke={1.7} /></span>
                      <div><span className="tbl-name">{d.name}</span><code>{d.code}</code></div>
                    </div>
                  </td>
                  <td className="th-c"><span className="ver-badge ver-badge-obs">{d.ver}</span></td>
                  <td className="td-mut">{d.direccion}</td>
                  <td><span className="ttag ttag-obs">{d.tipoFull}</span></td>
                  <td className="td-mut">{d.sector}</td>
                  <td className="td-mut">{d.producto}</td>
                  <td className="td-mut">{d.fecha}</td>
                  <td className="th-c"><button className="rowbtn-ver rowbtn-ver-obs" onClick={() => fire('Consultando “' + d.name + '” (' + d.ver + ', obsoleto)')}><Icon name="eye" size={15} stroke={1.9} /> Ver</button></td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={8} className="tbl-empty"><Icon name="search" size={28} stroke={1.6} /><b>Sin resultados</b><em>Ajusta los filtros</em></td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGER */}
      <div className="vig-pager">
        <div className="pager-show">Mostrar <select className="inp sel-mini"><option>10</option><option>25</option><option>50</option></select> por página</div>
        <div className="pager-right">
          <span>Página <b>1</b> de <b>1</b></span>
          <div className="pager">
            <button className="pg" disabled><Icon name="chevronLeft" size={14} stroke={2.4} /></button>
            <button className="pg is-on">1</button>
            <button className="pg" disabled><Icon name="chevronRight" size={14} stroke={2.4} /></button>
          </div>
        </div>
      </div>

      <footer className="foot">CRECE DOCs · Gestor Documental — RINTI</footer>
    </div>
  );
}

Object.assign(window, { ObsoletosScreen });
