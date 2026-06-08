/* screen_nuevo.jsx — Nuevo documento (Iniciar flujo) + modal de usuarios */

// Dual-list user picker modal
function UserModal({ open, role, roleColor, selectedIds, onClose, onSave }) {
  const [picked, setPicked] = React.useState(selectedIds || []);
  const [filterL, setFilterL] = React.useState('');
  const [filterR, setFilterR] = React.useState('');
  React.useEffect(() => { if (open) setPicked(selectedIds || []); }, [open]);
  if (!open) return null;

  const available = USERS.filter(u => !picked.includes(u.id) && u.name.toLowerCase().includes(filterL.toLowerCase()));
  const chosen = USERS.filter(u => picked.includes(u.id) && u.name.toLowerCase().includes(filterR.toLowerCase()));

  return (
    <div className="modal-bg" onMouseDown={onClose}>
      <div className="modal" style={{ '--mc': roleColor }} onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-head-l">
            <Icon name="users" size={19} stroke={1.9} />
            <strong>Seleccionar {role}</strong>
          </div>
          <button className="modal-x" onClick={onClose}><Icon name="plus" size={18} stroke={2.4} style={{ transform: 'rotate(45deg)' }} /></button>
        </div>
        <div className="modal-body">
          <div className="dual">
            <div className="dual-col">
              <span className="dual-cap">Usuarios disponibles <i>{available.length}</i></span>
              <div className="dual-search"><Icon name="search" size={15} stroke={2} /><input value={filterL} placeholder="Filtrar…" onChange={e => setFilterL(e.target.value)} /></div>
              <div className="dual-list">
                {available.map(u => (
                  <button key={u.id} className="dual-item" onClick={() => setPicked([...picked, u.id])}>
                    <span className="dual-av">{u.name.split(' ').map(w => w[0]).slice(0, 2).join('')}</span>
                    <span className="dual-info"><b>{u.name}</b><em>{u.area}</em></span>
                    <span className="dual-add"><Icon name="plus" size={14} stroke={2.6} /></span>
                  </button>
                ))}
                {available.length === 0 && <div className="dual-empty">Sin usuarios</div>}
              </div>
            </div>
            <div className="dual-col">
              <span className="dual-cap">Seleccionados <i className="on">{picked.length}</i></span>
              <div className="dual-search"><Icon name="search" size={15} stroke={2} /><input value={filterR} placeholder="Filtrar…" onChange={e => setFilterR(e.target.value)} /></div>
              <div className="dual-list">
                {chosen.map(u => (
                  <button key={u.id} className="dual-item is-on" onClick={() => setPicked(picked.filter(id => id !== u.id))}>
                    <span className="dual-av">{u.name.split(' ').map(w => w[0]).slice(0, 2).join('')}</span>
                    <span className="dual-info"><b>{u.name}</b><em>{u.area}</em></span>
                    <span className="dual-rm"><Icon name="plus" size={14} stroke={2.6} style={{ transform: 'rotate(45deg)' }} /></span>
                  </button>
                ))}
                {chosen.length === 0 && <div className="dual-empty">Agrega usuarios desde la izquierda</div>}
              </div>
            </div>
          </div>
        </div>
        <div className="modal-foot">
          <span className="modal-count">{picked.length} seleccionado{picked.length !== 1 ? 's' : ''}</span>
          <div className="modal-acts">
            <button className="btn btn-ghost sm" onClick={onClose}>Cancelar</button>
            <button className="btn btn-solid sm" onClick={() => onSave(picked)}>Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Role selector card (Revisores / Aprobadores / Lista de distribución)
function RoleCard({ icon, label, color, ids, onClick }) {
  const names = USERS.filter(u => ids.includes(u.id));
  return (
    <button className="role-card" style={{ '--rc': color }} onClick={onClick}>
      <span className="role-tab" />
      <span className="role-panel">
        <span className="role-top">
          <span className="role-ico"><Icon name={icon} size={20} stroke={1.9} /></span>
          <span className="role-label">{label}</span>
          <span className="role-count">{ids.length}</span>
        </span>
        <span className="role-people">
          {names.length === 0 && <em className="role-empty">Sin asignar — clic para agregar</em>}
          {names.slice(0, 4).map(u => (
            <span key={u.id} className="role-chip"><span className="role-av">{u.name.split(' ').map(w => w[0]).slice(0, 2).join('')}</span>{u.name.split(' ')[0]} {u.name.split(' ')[1]?.[0]}.</span>
          ))}
          {names.length > 4 && <span className="role-more">+{names.length - 4}</span>}
        </span>
      </span>
    </button>
  );
}

function NuevoScreen({ params }) {
  const { fire, navigate } = useApp();
  const [codigo, setCodigo] = React.useState('');
  const [tipo, setTipo] = React.useState(params?.tipo || '');
  const [negocio, setNegocio] = React.useState('');
  const [depto, setDepto] = React.useState('');
  const [area, setArea] = React.useState('');
  const [enviarA, setEnviarA] = React.useState('Revisión');
  const [confidencial, setConfidencial] = React.useState('No');
  const [comentario, setComentario] = React.useState('');
  const [files, setFiles] = React.useState([]);
  const [roles, setRoles] = React.useState({ Revisores: [1, 2], Aprobadores: [6], 'Lista de distribución': [] });
  const [modal, setModal] = React.useState(null);

  const roleMeta = {
    'Revisores': { icon: 'roles', color: 'var(--coral)' },
    'Aprobadores': { icon: 'check', color: 'var(--green)' },
    'Lista de distribución': { icon: 'distribution', color: 'var(--navy)' },
  };

  const ready = codigo && tipo && negocio && roles.Revisores.length && roles.Aprobadores.length;

  return (
    <div className="scroll">
      <PageHead
        title="Nuevo documento"
        sub="Iniciar flujo de elaboración y aprobación"
        badge="En elaboración"
        onBack={() => navigate('inicio')}
      />

      <div className="form-wrap">
        <div className="form-main">
          {/* Datos del documento */}
          <div className="card-soft">
            <div className="card-soft-head">
              <span className="cs-num">1</span>
              <div><h3>Datos del documento</h3><p>Identificación y clasificación</p></div>
            </div>
            <div className="grid-2">
              <TextField label="Código de documento" value={codigo} onChange={setCodigo} placeholder="Ej. ROP-M-CA-00-001" required mono />
              <SelectField label="Tipo de documento" value={tipo} onChange={setTipo} options={TIPO_OPTS} required />
            </div>
            <div className="grid-3">
              <LookupField label="Dirección" value={negocio} onChange={setNegocio} options={NEGOCIO_OPTS} required onLookup={() => fire('Buscar dirección')} />
              <LookupField label="Tipo de Documento" value={depto} onChange={setDepto} options={DEPTO_OPTS} onLookup={() => fire('Buscar tipo de documento')} />
              <LookupField label="Sector" value={area} onChange={setArea} options={AREA_OPTS} onLookup={() => fire('Buscar Sector..')} />
            </div>
          </div>

          {/* Participantes */}
          <div className="card-soft">
            <div className="card-soft-head">
              <span className="cs-num">2</span>
              <div><h3>Participantes del flujo</h3><p>Asigna quién revisa, aprueba y recibe el documento</p></div>
            </div>
            <div className="role-grid">
              {Object.keys(roleMeta).map(r => (
                <RoleCard key={r} label={r} icon={roleMeta[r].icon} color={roleMeta[r].color}
                  ids={roles[r]} onClick={() => setModal(r)} />
              ))}
            </div>
          </div>

          {/* Opciones */}
          <div className="card-soft">
            <div className="card-soft-head">
              <span className="cs-num">3</span>
              <div><h3>Opciones de envío</h3><p>Define el destino y la confidencialidad</p></div>
            </div>
            <div className="grid-2">
              <Field label="Enviar documento a">
                <Segmented value={enviarA} onChange={setEnviarA} options={['Revisión', 'Aprobación']} />
              </Field>
              <Field label="Documento confidencial">
                <Segmented value={confidencial} onChange={setConfidencial} options={['No', 'Sí']} />
              </Field>
            </div>
            <Field label="Comentario / Certificación" hint="Opcional — visible para revisores y aprobadores">
              <textarea className="inp ta" value={comentario} onChange={(e) => setComentario(e.target.value)}
                placeholder="Agrega notas, alcance o certificación aplicable (ISO 9001, ISO 45001…)" rows={3} />
            </Field>
            <Field label="Adjuntar archivos">
              <div className="drop" onClick={() => { const n = files.length + 1; setFiles([...files, { id: Date.now(), name: 'documento_' + n + '.pdf' }]); fire('Archivo adjuntado'); }}>
                <span className="drop-ico"><Icon name="plus" size={20} stroke={2.4} /></span>
                <span className="drop-txt"><b>Agregar archivo</b><em>Arrastra aquí o haz clic para seleccionar</em></span>
              </div>
              {files.length > 0 && (
                <div className="file-chips">
                  {files.map(f => (
                    <span key={f.id} className="file-chip">
                      <Icon name="doc" size={14} stroke={1.9} />{f.name}
                      <button onClick={() => setFiles(files.filter(x => x.id !== f.id))}><Icon name="plus" size={13} stroke={2.6} style={{ transform: 'rotate(45deg)' }} /></button>
                    </span>
                  ))}
                </div>
              )}
            </Field>
          </div>
        </div>

        {/* Resumen lateral */}
        <aside className="form-side">
          <div className="summary">
            <h4>Resumen</h4>
            <ul className="sum-list">
              <li><span>Código</span><b className="mono">{codigo || '—'}</b></li>
              <li><span>Tipo</span><b>{tipo || '—'}</b></li>
              <li><span>Negocio</span><b>{negocio || '—'}</b></li>
              <li><span>Enviar a</span><Pill tone={enviarA === 'Aprobación' ? 'coral' : 'blue'}>{enviarA}</Pill></li>
              <li><span>Confidencial</span><b>{confidencial}</b></li>
            </ul>
            <div className="sum-roles">
              <div><i className="dotc" style={{ background: 'var(--coral)' }} />Revisores<b>{roles.Revisores.length}</b></div>
              <div><i className="dotc" style={{ background: 'var(--green)' }} />Aprobadores<b>{roles.Aprobadores.length}</b></div>
              <div><i className="dotc" style={{ background: 'var(--navy)' }} />Distribución<b>{roles['Lista de distribución'].length}</b></div>
            </div>
            <div className="sum-prog">
              <span>Progreso</span>
              <div className="sum-bar"><i style={{ width: ready ? '100%' : '55%' }} /></div>
            </div>
            <button className={'btn btn-solid full' + (ready ? '' : ' is-dim')} onClick={() => { fire(ready ? 'Flujo iniciado ✓ Documento enviado a ' + enviarA : 'Completa código, tipo, negocio y participantes'); if (ready) setTimeout(() => navigate('vigentes'), 900); }}>
              <Icon name="arrow" size={18} stroke={2.2} /> Iniciar flujo
            </button>
            <button className="btn btn-ghost full" onClick={() => fire('Borrador guardado')}>Guardar borrador</button>
            <button className="btn btn-text full" onClick={() => navigate('inicio')}>Cancelar</button>
          </div>
        </aside>
      </div>

      <UserModal
        open={!!modal} role={modal} roleColor={modal ? roleMeta[modal].color : 'var(--blue)'}
        selectedIds={modal ? roles[modal] : []}
        onClose={() => setModal(null)}
        onSave={(ids) => { setRoles({ ...roles, [modal]: ids }); setModal(null); fire(ids.length + ' usuario(s) en ' + modal); }}
      />
    </div>
  );
}

Object.assign(window, { NuevoScreen });
