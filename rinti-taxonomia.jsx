/* rinti-taxonomia.jsx — Taxonomía y configuración (árbol + Flujo/Distribución) */

const TAX_KIND = {
  dir: { icon: "areas", color: "var(--navy)" },
  doc: { icon: "doc", color: "var(--blue)" },
  leaf: { icon: "folder", color: "var(--green)" },
};

function TaxNode({ node, depth, openMap, setOpen, selId, setSel }) {
  const hasKids = node.children && node.children.length > 0;
  const isOpen = openMap[node.id] ?? node.open ?? false;
  const k = TAX_KIND[node.kind] || TAX_KIND.leaf;
  const on = selId === node.id;
  return (
    <div className="tnode-wrap">
      <div
        className={"tnode" + (on ? " is-on" : "")}
        style={{ paddingLeft: 8 + depth * 18 }}
        onClick={() => setSel(node.id)}
      >
        <button
          className={"tnode-caret" + (hasKids ? "" : " is-hidden")}
          onClick={(e) => {
            e.stopPropagation();
            setOpen({ ...openMap, [node.id]: !isOpen });
          }}
        >
          <Icon
            name="chevronRight"
            size={13}
            stroke={2.6}
            style={{
              transform: isOpen ? "rotate(90deg)" : "none",
              transition: "transform .15s",
            }}
          />
        </button>
        <span className="tnode-ico" style={{ "--nc": k.color }}>
          <Icon name={k.icon} size={15} stroke={1.9} />
        </span>
        {node.warn && (
          <span className="tnode-warn">
            <Icon name="alert" size={13} stroke={2.2} />
          </span>
        )}
        <span className="tnode-label">{node.label}</span>
        <span className="tnode-code">{node.code}</span>
      </div>
      {hasKids && isOpen && (
        <div className="tnode-kids">
          {node.children.map((c) => (
            <TaxNode
              key={c.id}
              node={c}
              depth={depth + 1}
              openMap={openMap}
              setOpen={setOpen}
              selId={selId}
              setSel={setSel}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function flatten(nodes, acc = {}) {
  nodes.forEach((n) => {
    acc[n.id] = n;
    if (n.children) flatten(n.children, acc);
  });
  return acc;
}
function pathTo(nodes, id, trail = []) {
  for (const n of nodes) {
    const t = [...trail, n];
    if (n.id === id) return t;
    if (n.children) {
      const r = pathTo(n.children, id, t);
      if (r) return r;
    }
  }
  return null;
}

function FlowCol({ label, color, people, onAdd, onRemove }) {
  return (
    <div className="fcol">
      <div className="fcol-cap">
        <i className="fcol-dot" style={{ background: color }} />
        {label}
        <span className="fcol-n">{people.length}</span>
      </div>
      <div className="fcol-people">
        {people.map((p) => (
          <div key={p.id} className="fchip" style={{ "--fc": color }}>
            <span className="fchip-av">
              {p.name
                .replace(",", "")
                .split(/\s+/)
                .map((w) => w[0])
                .slice(0, 2)
                .join("")}
            </span>
            <span className="fchip-info">
              <b>{p.name}</b>
              <em>{p.cargo}</em>
            </span>
            <button className="fchip-x" onClick={() => onRemove(p)}>
              <Icon
                name="plus"
                size={13}
                stroke={2.6}
                style={{ transform: "rotate(45deg)" }}
              />
            </button>
          </div>
        ))}
        <button className="fchip-add" onClick={onAdd}>
          <Icon name="plus" size={15} stroke={2.4} /> Agregar
        </button>
      </div>
    </div>
  );
}

function TaxonomiaScreen() {
  const { fire } = useApp();
  const [openMap, setOpen] = React.useState({ n1: true, n1a: true });
  const [selId, setSel] = React.useState("n1a1");
  const [tab, setTab] = React.useState("flujo");
  const [flow, setFlow] = React.useState(() =>
    JSON.parse(JSON.stringify(TAX_FLOW)),
  );
  const [desc, setDesc] = React.useState("");
  const [dirty, setDirty] = React.useState(false);

  const nodes = flatten(TAX_TREE);
  const sel = nodes[selId] || TAX_TREE[0];
  const trail = pathTo(TAX_TREE, selId) || [sel];
  const fullCode = trail.map((n) => n.code).join("-");
  const pool = DIST_PEOPLE;

  const addTo = (role) => {
    const taken = new Set(
      Object.values(flow)
        .flat()
        .map((p) => p.id),
    );
    const cand = pool.find((p) => !taken.has(p.id));
    if (!cand) {
      fire("No hay más usuarios disponibles");
      return;
    }
    setFlow({
      ...flow,
      [role]: [
        ...flow[role],
        { id: cand.id, name: cand.name, cargo: cand.cargo },
      ],
    });
    setDirty(true);
  };
  const removeFrom = (role, p) => {
    setFlow({ ...flow, [role]: flow[role].filter((x) => x.id !== p.id) });
    setDirty(true);
  };

  return (
    <div className="scroll has-savebar">
      <PageHead
        title="Configuración de Flujos"
        sub="Flujo de revisión y lista de distribución por nodo (Dirección · Tipo · Sector )."
      />

      <div className="tax-wrap">
        {/* ÁRBOL */}
        <aside className="tree">
          <div className="tree-head">
            <span className="tree-title">
              <Icon name="taxonomy" size={16} stroke={1.9} /> Árbol de taxonomía
            </span>
            <span className="tree-warn">
              <Icon name="alert" size={13} stroke={2.2} /> incompletos 16
            </span>
          </div>
          <div className="tree-code">
            <span className="tree-code-lab">Código del nodo seleccionado</span>
            <span className="tree-code-val">
              {trail.map((n, i) => (
                <React.Fragment key={n.id}>
                  {i > 0 && <i>-</i>}
                  <b className={i === trail.length - 1 ? "cur" : ""}>
                    {n.code}
                  </b>
                </React.Fragment>
              ))}
            </span>
          </div>
          <div className="tree-body">
            {TAX_TREE.map((n) => (
              <TaxNode
                key={n.id}
                node={n}
                depth={0}
                openMap={openMap}
                setOpen={setOpen}
                selId={selId}
                setSel={setSel}
              />
            ))}
          </div>
        </aside>

        {/* CONFIG */}
        <section className="tax-main">
          <div className="tax-tabs">
            <button
              className={tab === "flujo" ? "is-on" : ""}
              onClick={() => setTab("flujo")}
            >
              <Icon name="edit" size={15} stroke={1.9} /> Flujo
            </button>
            <button
              className={tab === "dist" ? "is-on" : ""}
              onClick={() => setTab("dist")}
            >
              <Icon name="distribution" size={15} stroke={1.9} /> Distribución
            </button>
          </div>

          {tab === "flujo" ? (
            <div className="tax-panel">
              <div className="grid-2">
                <Field label="Nombre">
                  <input className="inp" value={sel.label} readOnly />
                </Field>
                <Field label="Código">
                  <input className="inp inp-mono" value={fullCode} readOnly />
                </Field>
              </div>
              <Field label="Descripción" hint="Opcional">
                <textarea
                  className="inp ta"
                  value={desc}
                  placeholder="Sin descripción…"
                  onChange={(e) => {
                    setDesc(e.target.value);
                    setDirty(true);
                  }}
                  rows={2}
                />
              </Field>

              <div className="tax-note">
                <Icon name="alert" size={16} stroke={2} /> Este flujo aplica a
                todos los documentos creados bajo este nodo.
              </div>

              <div className="flow-head">
                <Icon name="settings" size={17} stroke={1.9} /> Configuración
                del flujo
              </div>
              <div className="flow-cols">
                {/* <FlowCol
                  label="Elaboradores"
                  color="var(--green)"
                  people={flow.Elaboradores}
                  onAdd={() => addTo("Elaboradores")}
                  onRemove={(p) => removeFrom("Elaboradores", p)}
                />
                <span className="flow-arrow">
                  <Icon name="chevronRight" size={18} stroke={2.6} />
                </span> */}
                <FlowCol
                  label="Revisores"
                  color="var(--blue)"
                  people={flow.Revisores}
                  onAdd={() => addTo("Revisores")}
                  onRemove={(p) => removeFrom("Revisores", p)}
                />
                <span className="flow-arrow">
                  <Icon name="chevronRight" size={18} stroke={2.6} />
                </span>
                <FlowCol
                  label="Aprobador"
                  color="var(--coral)"
                  people={flow.Aprobador}
                  onAdd={() => addTo("Aprobador")}
                  onRemove={(p) => removeFrom("Aprobador", p)}
                />
              </div>
            </div>
          ) : (
            <div className="tax-panel">
              <div className="tax-note">
                <Icon name="alert" size={16} stroke={2} /> Las listas de
                distribución definen quién recibe los documentos publicados bajo
                este nodo.
              </div>
              <div className="taxdist-grid">
                {DIST_GROUPS.slice(0, 4).map((g) => (
                  <label
                    key={g.id}
                    className="taxdist"
                    style={{ "--gc": g.color }}
                  >
                    <span className="taxdist-check">
                      <Icon name="check" size={13} stroke={3} />
                    </span>
                    <span className="taxdist-ico">
                      <Icon name="distribution" size={18} stroke={1.9} />
                    </span>
                    <span className="taxdist-info">
                      <b>{g.name}</b>
                      <em>
                        {g.area} · {g.memberIds.length} miembros
                      </em>
                    </span>
                    <input
                      type="checkbox"
                      defaultChecked={g.id === "g1"}
                      onChange={() => setDirty(true)}
                      hidden
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          <div style={{
            display:"flex",
            alignItems:"center",
            justifyContent:"space-between",
            gap:"15px",
            padding: "10px",
            borderTop: "1px solid #E7E3D4"
          }}>
            <span className="savebar-msg">
              {dirty ? (
                <>
                  <i className="savebar-dot" /> Los cambios afectan solo
                  documentos nuevos
                </>
              ) : (
                <>
                  <Icon name="check" size={15} stroke={2.4} /> Sin cambios
                  pendientes
                </>
              )}
            </span>
            <div className="savebar-acts">
              <button
                className="btn btn-ghost sm"
                onClick={() => {
                  setFlow(JSON.parse(JSON.stringify(TAX_FLOW)));
                  setDesc("");
                  setDirty(false);
                  fire("Cambios descartados");
                }}
              >
                Cancelar
              </button>
              <button
                className={"btn btn-bright sm" + (dirty ? "" : " is-dim")}
                onClick={() => {
                  setDirty(false);
                  fire("Configuración guardada ✓");
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

Object.assign(window, { TaxonomiaScreen });
