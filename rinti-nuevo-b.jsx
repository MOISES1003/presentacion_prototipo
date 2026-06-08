/* rinti-nuevo-b.jsx — Elaborar documento · Propuesta B (ruta vertical del flujo) */

function NuevoScreenB({ params }) {
  const { fire, navigate } = useApp();
  const [tipo, setTipo] = React.useState(params?.tipo || "");
  const [flujo, setFlujo] = React.useState("");
  const [codigo, setCodigo] = React.useState("");
  const [negocio, setNegocio] = React.useState("");
  const [depto, setDepto] = React.useState("");
  const [area, setArea] = React.useState("");
  const [confidencial, setConfidencial] = React.useState("No");
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

  const STAGES = [
    {
      key: "Elaboradores",
      icon: "edit",
      cssc: "var(--st1)",
      verb: "Redactan el documento",
    },
    {
      key: "Revisores",
      icon: "eye",
      cssc: "var(--st2)",
      verb: "Revisan y comentan",
    },
    {
      key: "Aprobadores",
      icon: "check",
      cssc: "var(--st3)",
      verb: "Aprueban y firman",
    },
    {
      key: "Distribución",
      icon: "distribution",
      cssc: "var(--st4)",
      verb: "Reciben la versión final",
    },
  ];
  const ini = (n) =>
    n
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("");
  const ready =
    tipo &&
    flujo &&
    codigo &&
    negocio &&
    roles.Revisores.length &&
    roles.Aprobadores.length;
  const assignedStages = STAGES.filter((s) => roles[s.key].length > 0).length;
  const pct = Math.round((assignedStages / STAGES.length) * 100);

  const launch = () => {
    if (!ready) {
      fire("Completa tipo, datos y al menos revisores y aprobadores");
      return;
    }
    setDone(true);
    setTimeout(() => {
      setDone(false);
      navigate("inicio");
    }, 2400);
  };

  return (
    <div className="scroll scroll-b">
      <PageHead
        title="Elaborar documento"
        sub="Define el documento y traza su ruta de aprobación"
        badge="Propuesta B"
        onBack={() => navigate("inicio")}
      />

      {/* doc header — tipo como píldoras + nombre/código */}
      <div className="bhead">
        <div className="bhead-row">
          <span className="bhead-lab">Tipo de documento</span>
          <div className="type-pills">
            {TIPOS.map((tp) => (
              <button
                key={tp.id}
                className={"tpill" + (tipo === tp.label ? " is-on" : "")}
                onClick={() => setTipo(tp.label)}
              >
                <Icon name={tp.icon} size={17} stroke={1.9} />
                {tp.label}
              </button>
            ))}
          </div>
        </div>
        <div className="bhead-grid">
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
      </div>

      <div className="bcols">
        {/* IZQUIERDA · datos + opciones */}
        <div className="bleft">
          <div className="card-soft">
            <div className="card-soft-head">
              <span className="cs-ico">
                <Icon name="taxonomy" size={18} stroke={1.9} />
              </span>
              <div>
                <h3>Clasificación</h3>
                <p>¿Dónde vive este documento?</p>
              </div>
            </div>
            <div className="grid-1">
              <SelectField
                label="Negocio"
                value={negocio}
                onChange={setNegocio}
                options={NEGOCIO_OPTS}
                required
              />
              <div className="grid-2">
                <SelectField
                  label="Departamento"
                  value={depto}
                  onChange={setDepto}
                  options={DEPTO_OPTS}
                />
                <SelectField
                  label="Área"
                  value={area}
                  onChange={setArea}
                  options={AREA_OPTS}
                />
              </div>
            </div>
          </div>

          <div className="card-soft">
            <div className="card-soft-head">
              <span className="cs-ico">
                <Icon name="settings" size={18} stroke={1.9} />
              </span>
              <div>
                <h3>Toques finales</h3>
                <p>Confidencialidad y adjuntos</p>
              </div>
            </div>
            <Field label="¿Documento confidencial?">
              <Segmented
                value={confidencial}
                onChange={setConfidencial}
                options={["No", "Sí"]}
              />
            </Field>
            <Field label="¿Permitir descarga?">
              <Segmented onChange={setConfidencial} options={["No", "Sí"]} />
            </Field>
          
          </div>
        </div>

        {/* DERECHA · ruta del documento (timeline) */}
        <div className="bright">
          <div className="route-card">
            <div className="route-top">
              <div>
                <h3>Ruta del documento</h3>
                <p>Toca cada etapa para asignar personas</p>
              </div>
              <div className="route-prog">
                <svg viewBox="0 0 36 36" className="ring">
                  <path
                    className="ring-bg"
                    d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
                  />
                  <path
                    className="ring-fg"
                    d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
                    style={{
                      strokeDasharray: 100,
                      strokeDashoffset: 100 - pct,
                    }}
                  />
                </svg>
                <span className="ring-txt">{pct}%</span>
              </div>
            </div>
            <div className="route">
              {STAGES.map((s, i) => {
                const names = USERS.filter((u) => roles[s.key].includes(u.id));
                const filled = names.length > 0;
                return (
                  <div
                    key={s.key}
                    className={"rstage" + (filled ? " is-filled" : "")}
                    style={{ "--rc": s.cssc }}
                  >
                    <div className="rstage-rail">
                      <span className="rstage-node">
                        {filled ? (
                          <Icon name="check" size={16} stroke={3} />
                        ) : (
                          <Icon name={s.icon} size={17} stroke={1.9} />
                        )}
                      </span>
                      {i < STAGES.length - 1 && (
                        <span className="rstage-line" />
                      )}
                    </div>
                    <button
                      className="rstage-card"
                      onClick={() => setModal(s.key)}
                    >
                      <div className="rstage-head">
                        <div className="rstage-title">
                          <span className="rstage-step">Paso {i + 1}</span>
                          <b>{s.key}</b>
                          <em>{s.verb}</em>
                        </div>
                        <span className="rstage-count">{names.length}</span>
                      </div>
                      <div className="rstage-people">
                        {names.length === 0 && (
                          <span className="rstage-add">
                            <Icon name="plus" size={14} stroke={2.6} /> Asignar
                            personas
                          </span>
                        )}
                        {names.slice(0, 5).map((u) => (
                          <span key={u.id} className="rstage-av" title={u.name}>
                            {ini(u.name)}
                          </span>
                        ))}
                        {names.length > 5 && (
                          <span className="rstage-more">
                            +{names.length - 5}
                          </span>
                        )}
                        {names.length > 0 && (
                          <span className="rstage-edit">
                            <Icon name="edit" size={13} stroke={2} />
                          </span>
                        )}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* barra de acción inferior */}
      <div className="actionbar">
        <div className="actionbar-info">
          <span
            className="ab-illu"
            style={{ "--c": ready ? "var(--green)" : "var(--accent)" }}
          >
            <Icon name={ready ? "sparkle" : "folder"} size={20} stroke={1.9} />
          </span>
          <div>
            <b>{flujo || "Nuevo flujo"}</b>
            <em>
              {tipo || "Sin tipo"} · {codigo || "sin código"} · {assignedStages}
              /4 etapas asignadas
            </em>
          </div>
        </div>
        <div className="actionbar-acts">
          <button
            className="btn btn-ghost"
            onClick={() => fire("Borrador guardado")}
          >
            Guardar borrador
          </button>
          <button
            className={"btn btn-bright" + (ready ? "" : " is-dim")}
            onClick={launch}
          >
            <Icon name="arrow" size={18} stroke={2.2} /> Iniciar flujo
          </button>
        </div>
      </div>

      <UserModal
        open={!!modal}
        role={modal}
        roleColor={
          modal
            ? (STAGES.find((s) => s.key === modal) || {}).cssc
            : "var(--accent)"
        }
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
            <p>“{flujo || "Nuevo documento"}” inició su ruta de aprobación.</p>
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

Object.assign(window, { NuevoScreenB });
