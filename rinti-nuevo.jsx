/* rinti-nuevo.jsx — Elaborar documento (constructor de flujo) */

function UserModal({ open, role, roleColor, selectedIds, onClose, onSave }) {
  const [picked, setPicked] = React.useState(selectedIds || []);
  const [fl, setFl] = React.useState("");
  const [fr, setFr] = React.useState("");
  React.useEffect(() => {
    if (open) setPicked(selectedIds || []);
  }, [open]);
  if (!open) return null;
  const ini = (n) =>
    n
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("");
  const available = USERS.filter(
    (u) =>
      !picked.includes(u.id) && u.name.toLowerCase().includes(fl.toLowerCase()),
  );
  const chosen = USERS.filter(
    (u) =>
      picked.includes(u.id) && u.name.toLowerCase().includes(fr.toLowerCase()),
  );
  return (
    <div className="modal-bg" onMouseDown={onClose}>
      <div
        className="modal"
        style={{ "--mc": roleColor }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <div className="modal-head-l">
            <Icon name="users" size={19} stroke={1.9} />
            <strong>Asignar {role}</strong>
          </div>
          <button className="modal-x" onClick={onClose}>
            <Icon
              name="plus"
              size={18}
              stroke={2.4}
              style={{ transform: "rotate(45deg)" }}
            />
          </button>
        </div>
        <div className="modal-body">
          <div className="dual">
            <div className="dual-col">
              <span className="dual-cap">
                Disponibles <i>{available.length}</i>
              </span>
              <div className="dual-search">
                <Icon name="search" size={15} stroke={2} />
                <input
                  value={fl}
                  placeholder="Filtrar…"
                  onChange={(e) => setFl(e.target.value)}
                />
              </div>
              <div className="dual-list">
                {available.map((u) => (
                  <button
                    key={u.id}
                    className="dual-item"
                    onClick={() => setPicked([...picked, u.id])}
                  >
                    <span className="dual-av">{ini(u.name)}</span>
                    <span className="dual-info">
                      <b>{u.name}</b>
                      <em>{u.area}</em>
                    </span>
                    <span className="dual-add">
                      <Icon name="plus" size={14} stroke={2.6} />
                    </span>
                  </button>
                ))}
                {available.length === 0 && (
                  <div className="dual-empty">Sin usuarios</div>
                )}
              </div>
            </div>
            <div className="dual-col">
              <span className="dual-cap">
                Seleccionados <i className="on">{picked.length}</i>
              </span>
              <div className="dual-search">
                <Icon name="search" size={15} stroke={2} />
                <input
                  value={fr}
                  placeholder="Filtrar…"
                  onChange={(e) => setFr(e.target.value)}
                />
              </div>
              <div className="dual-list">
                {chosen.map((u) => (
                  <button
                    key={u.id}
                    className="dual-item is-on"
                    onClick={() =>
                      setPicked(picked.filter((id) => id !== u.id))
                    }
                  >
                    <span className="dual-av">{ini(u.name)}</span>
                    <span className="dual-info">
                      <b>{u.name}</b>
                      <em>{u.area}</em>
                    </span>
                    <span className="dual-rm">
                      <Icon
                        name="plus"
                        size={14}
                        stroke={2.6}
                        style={{ transform: "rotate(45deg)" }}
                      />
                    </span>
                  </button>
                ))}
                {chosen.length === 0 && (
                  <div className="dual-empty">Agrega desde la izquierda</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="modal-foot">
          <span className="modal-count">
            {picked.length} seleccionado{picked.length !== 1 ? "s" : ""}
          </span>
          <div className="modal-acts">
            <button className="btn btn-ghost sm" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn btn-solid sm" onClick={() => onSave(picked)}>
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StageCard({ n, icon, label, color, ids, hint, onClick }) {
  const ini = (nm) =>
    nm
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("");
  const names = USERS.filter((u) => ids.includes(u.id));
  return (
    <button className="stage" style={{ "--sc": color }} onClick={onClick}>
      <span className="stage-tab" />
      <span className="stage-panel">
        <span className="stage-top">
          <span className="stage-step">Paso {n}</span>
          <span className="stage-count">{ids.length}</span>
        </span>
        <span className="stage-ico">
          <Icon name={icon} size={22} stroke={1.9} />
        </span>
        <span className="stage-label">{label}</span>
        <span className="stage-people">
          {names.length === 0 && <em className="stage-empty">{hint}</em>}
          {names.slice(0, 3).map((u) => (
            <span key={u.id} className="stage-av" title={u.name}>
              {ini(u.name)}
            </span>
          ))}
          {names.length > 3 && (
            <span className="stage-more">+{names.length - 3}</span>
          )}
        </span>
      </span>
    </button>
  );
}

function NuevoScreen({ params, tabColor }) {
  const { fire, navigate } = useApp();
  const [tipo, setTipo] = React.useState(params?.tipo || "");
  const [flujo, setFlujo] = React.useState("");
  const [codigo, setCodigo] = React.useState("");
  const [negocio, setNegocio] = React.useState("");
  const [depto, setDepto] = React.useState("");
  const [area, setArea] = React.useState("");
  const [confidencial, setConfidencial] = React.useState("No");
  const [descarga, setDescarga] = React.useState("No");

  const [comentario, setComentario] = React.useState("");
  const [files, setFiles] = React.useState([]);
  const [roles, setRoles] = React.useState({
    Elaboradores: [2],
    Revisores: [1, 6],
    Aprobadores: [],
    Distribución: [],
  });
  const [modal, setModal] = React.useState(null);
  const [done, setDone] = React.useState(false);

  const meta = {
    Elaboradores: { icon: "edit", color: "var(--blue)", hint: "Quién redacta" },
    Revisores: { icon: "eye", color: "var(--coral)", hint: "Quién revisa" },
    Aprobadores: {
      icon: "check",
      color: "var(--green)",
      hint: "Quién aprueba",
    },
    Distribución: {
      icon: "distribution",
      color: "var(--navy)",
      hint: "Quién recibe",
    },
  };
  const ready =
    tipo &&
    flujo &&
    codigo &&
    negocio &&
    roles.Revisores.length &&
    roles.Aprobadores.length;
  const steps = [
    !!tipo,
    !!(flujo && codigo && negocio),
    roles.Revisores.length > 0 && roles.Aprobadores.length > 0,
  ];
  const pct = Math.round((steps.filter(Boolean).length / steps.length) * 100);

  const launch = () => {
    if (!ready) {
      fire("Completa tipo, datos y participantes para iniciar");
      return;
    }
    setDone(true);
    setTimeout(() => {
      setDone(false);
      navigate("inicio");
    }, 2400);
  };

  return (
    <div className="scroll">
      <PageHead
        title="Elaborar documento"
        sub="Arma tu flujo en 3 pasos — nosotros guiamos el resto"
        badge="Nuevo flujo"
        onBack={() => navigate("inicio")}
      />

      {/* flow track */}
      <div className="track">
        {["Tipo de documento", "Datos del flujo", "Participantes"].map(
          (s, i) => (
            <React.Fragment key={s}>
              <div
                className={
                  "track-node" +
                  (steps[i] ? " is-done" : "") +
                  (i === steps.findIndex((x) => !x) ? " is-now" : "")
                }
              >
                <span className="track-dot">
                  {steps[i] ? (
                    <Icon name="check" size={15} stroke={3} />
                  ) : (
                    i + 1
                  )}
                </span>
                <span className="track-lab">{s}</span>
              </div>
              {i < 2 && (
                <span className={"track-line" + (steps[i] ? " is-done" : "")} />
              )}
            </React.Fragment>
          ),
        )}
        <div className="track-pct">
          <span style={{ width: pct + "%" }} />
        </div>
      </div>

      <div className="form-wrap">
        <div className="form-main">
          {/* 1 · tipo */}
          <div className="card-soft">
            <div className="card-soft-head">
              <span className="cs-num">1</span>
              <div>
                <h3>¿Qué vas a crear?</h3>
                <p>Elige el tipo de documento</p>
              </div>
            </div>
            <div className="type-pick">
              {TIPOS.map((tp) => (
                <button
                  key={tp.id}
                  className={"tpick" + (tipo === tp.label ? " is-on" : "")}
                  style={{ "--tab": tabColor(tp.tab) }}
                  onClick={() => setTipo(tp.label)}
                >
                  <span className="tpick-ico">
                    <Icon name={tp.icon} size={24} stroke={1.7} />
                  </span>
                  <span className="tpick-txt">
                    <b>{tp.label}</b>
                    <em>{tp.desc}</em>
                  </span>
                  <span className="tpick-check">
                    <Icon name="check" size={14} stroke={3} />
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2 · datos */}
          <div className="card-soft">
            <div className="card-soft-head">
              <span className="cs-num">2</span>
              <div>
                <h3>Datos del flujo</h3>
                <p>Nombre, código y clasificación</p>
              </div>
            </div>
            <div className="grid-2">
              <TextField
                label="Nombre del flujo"
                value={flujo}
                onChange={setFlujo}
                placeholder="Ej. Control de calidad — planta Lurín"
                required
              />
              <TextField
                label="Código de documento"
                value={codigo}
                onChange={setCodigo}
                placeholder="Ej. ROP-P-CA-00-001"
                required
                mono
              />
            </div>
            <div className="grid-3">
              <SelectField
                label="Dirección"
                value={negocio}
                onChange={setNegocio}
                options={NEGOCIO_OPTS}
                required
              />
              <SelectField
                label="Tipo de Documento"
                value={depto}
                onChange={setDepto}
                options={DEPTO_OPTS}
              />
              <SelectField
                label="Sector"
                value={area}
                onChange={setArea}
                options={AREA_OPTS}
              />
            </div>
          </div>

          {/* 3 · participantes */}
          <div className="card-soft">
            <div className="card-soft-head">
              <span className="cs-num">3</span>
              <div>
                <h3>¿Quién participa en el flujo?</h3>
                <p>Toca cada etapa para asignar personas</p>
              </div>
            </div>
            <div className="stage-grid">
              {Object.keys(meta).map((r, i) => (
                <React.Fragment key={r}>
                  <StageCard
                    n={i + 1}
                    label={r}
                    icon={meta[r].icon}
                    color={meta[r].color}
                    ids={roles[r]}
                    hint={meta[r].hint}
                    onClick={() => setModal(r)}
                  />
                  {i < 3 && (
                    <span className="stage-arrow">
                      <Icon name="chevronRight" size={18} stroke={2.6} />
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* opciones */}
          <div className="card-soft">
            <div className="card-soft-head">
              <span className="cs-num">4</span>
              <div>
                <h3>Toques finales</h3>
                <p>Confidencialidad, nota y adjuntos</p>
              </div>
            </div>
            <div className="grid-2" style={{
              marginBottom:"10px"
            }}>
              <Field label="¿Documento confidencial?">
                <Segmented
                  value={confidencial}
                  onChange={setConfidencial}
                  options={["No", "Sí"]}
                />
              </Field>

              <Field label="¿Permitir descarga?">
                <Segmented
                  onChange={setDescarga}
                  value={descarga}
                  options={["No", "Sí"]}
                />
              </Field>
            </div>
            <Field label="Editar Documento">
              <button
                className="outline"
                onClick={() =>
                  window.open(
                    "https://1drv.ms/w/c/055b39ea0f27a91d/IQCdhKLLE5fOSrLu5OYG6JHkAbFYAuBtYtFBjQoELrg2MJc?e=gH3aWT",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                  <Icon name="squareArrowOutUpRight" size={18} stroke={2.2} /> Editar en línea
              </button>
            </Field>
          </div>
        </div>

        {/* resumen */}
        <aside className="form-side">
          <div className="summary">
            <div
              className="sum-illu"
              style={{ "--c": ready ? "var(--green)" : "var(--blue)" }}
            >
              <Icon
                name={ready ? "sparkle" : "folder"}
                size={26}
                stroke={1.8}
              />
            </div>
            <h4>Tu flujo</h4>
            <ul className="sum-list">
              <li>
                <span>Tipo</span>
                <b>{tipo || "—"}</b>
              </li>
              <li>
                <span>Nombre</span>
                <b className="ell">{flujo || "—"}</b>
              </li>
              <li>
                <span>Código</span>
                <b className="mono">{codigo || "—"}</b>
              </li>
              <li>
                <span>Negocio</span>
                <b>{negocio || "—"}</b>
              </li>
              <li>
                <span>Confidencial</span>
                <b>{confidencial}</b>
              </li>
            </ul>
            <div className="sum-roles">
              {Object.keys(meta).map((r) => (
                <div key={r}>
                  <i className="dotc" style={{ background: meta[r].color }} />
                  {r}
                  <b>{roles[r].length}</b>
                </div>
              ))}
            </div>
            <div className="sum-prog">
              <span>Progreso del flujo</span>
              <div className="sum-bar">
                <i style={{ width: pct + "%" }} />
              </div>
              <em>{pct}% listo</em>
            </div>
            <button
              className={"btn btn-bright full" + (ready ? "" : " is-dim")}
              onClick={launch}
            >
              <Icon name="arrow" size={18} stroke={2.2} /> Iniciar flujo
            </button>
            <button
              className="btn btn-ghost full"
              onClick={() => fire("Borrador guardado")}
            >
              Guardar borrador
            </button>
          </div>
        </aside>
      </div>

      <UserModal
        open={!!modal}
        role={modal}
        roleColor={modal ? meta[modal].color : "var(--blue)"}
        selectedIds={modal ? roles[modal] : []}
        onClose={() => setModal(null)}
        onSave={(ids) => {
          setRoles({ ...roles, [modal]: ids });
          setModal(null);
          fire(ids.length + " persona(s) en " + modal);
        }}
      />

      {done && (
        <div className="celebrate">
          <div className="celebrate-card">
            <div className="celebrate-ring">
              <Icon name="check" size={40} stroke={3} />
            </div>
            <h3>¡Flujo iniciado! 🎉</h3>
            <p>“{flujo || "Nuevo documento"}” fue enviado a revisión.</p>
          </div>
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className={"confetti c" + (i % 4)}
              style={{
                left: 6 + i * 6.5 + "%",
                animationDelay: i * 0.06 + "s",
              }}
            />
          ))}
        </div>
      )}

      <footer className="foot">CRECE DOCs · Gestor Documental — RINTI</footer>
    </div>
  );
}

Object.assign(window, { NuevoScreen, UserModal });
