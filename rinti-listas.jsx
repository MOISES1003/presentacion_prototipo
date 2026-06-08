/* rinti-listas.jsx — Listas de Distribución (grupos + transferencia) */

function ini(name) {
  // "Apellido, Nombre" -> AN ; "Nombre Apellido" -> NA
  const parts = name.replace(",", "").split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase();
}
function avColor(id) {
  const cols = ["var(--blue)", "var(--green)", "var(--coral)", "var(--navy)"];
  return cols[id % cols.length];
}

function PersonRow({ p, side, onMove }) {
  return (
    <button className={"prow prow-" + side} onClick={() => onMove(p)}>
      <span className="prow-av" style={{ "--av": avColor(p.id) }}>
        {ini(p.name)}
      </span>
      <span className="prow-info">
        <b>{p.name}</b>
        <em>
          {p.cargo} · {p.area}
        </em>
      </span>
      <span className={"prow-act prow-act-" + side}>
        <Icon
          name={side === "left" ? "chevronRight" : "chevronLeft"}
          size={15}
          stroke={2.6}
        />
      </span>
    </button>
  );
}

function ListasScreen() {
  const { fire } = useApp();
  const [groupId, setGroupId] = React.useState(DIST_GROUPS[0].id);
  const [members, setMembers] = React.useState(() =>
    Object.fromEntries(DIST_GROUPS.map((g) => [g.id, [...g.memberIds]])),
  );
  const [qGroup, setQGroup] = React.useState("");
  const [qL, setQL] = React.useState("");
  const [qR, setQR] = React.useState("");
  const [dirty, setDirty] = React.useState(false);

  const group = DIST_GROUPS.find((g) => g.id === groupId);
  const memberIds = members[groupId] || [];
  const available = DIST_PEOPLE.filter(
    (p) =>
      !memberIds.includes(p.id) &&
      (p.name + p.cargo + p.area).toLowerCase().includes(qL.toLowerCase()),
  );
  const current = DIST_PEOPLE.filter(
    (p) =>
      memberIds.includes(p.id) &&
      (p.name + p.cargo + p.area).toLowerCase().includes(qR.toLowerCase()),
  );
  const groups = DIST_GROUPS.filter((g) =>
    g.name.toLowerCase().includes(qGroup.toLowerCase()),
  );

  const add = (p) => {
    setMembers({ ...members, [groupId]: [...memberIds, p.id] });
    setDirty(true);
  };
  const remove = (p) => {
    setMembers({
      ...members,
      [groupId]: memberIds.filter((id) => id !== p.id),
    });
    setDirty(true);
  };
  const addAll = () => {
    setMembers({
      ...members,
      [groupId]: [...new Set([...memberIds, ...available.map((p) => p.id)])],
    });
    setDirty(true);
  };
  const removeAll = () => {
    setMembers({
      ...members,
      [groupId]: memberIds.filter(
        (id) => !current.map((p) => p.id).includes(id),
      ),
    });
    setDirty(true);
  };

  return (
    <div className="scroll has-savebar">
      <PageHead
        title="Grupos de distribución"
        sub="Mantenimiento de distribución de documentos por grupos y usuarios"
        right={
          <button
            className="btn btn-bright"
            onClick={() => fire("Nuevo grupo de distribución")}
          >
            <Icon name="plus" size={17} stroke={2.4} /> Nuevo grupo
          </button>
        }
      />

      <div className="dist-wrap">
        {/* RAIL de grupos */}
        <aside className="grail">
          <div className="grail-search">
            <Icon name="search" size={16} stroke={2} />
            <input
              value={qGroup}
              placeholder="Buscar grupo…"
              onChange={(e) => setQGroup(e.target.value)}
            />
          </div>
          <div className="grail-list">
            {groups.map((g) => {
              const cnt = (members[g.id] || []).length;
              const on = g.id === groupId;
              return (
                <button
                  key={g.id}
                  className={"gcard" + (on ? " is-on" : "")}
                  style={{ "--gc": g.color }}
                  onClick={() => {
                    setGroupId(g.id);
                    setQL("");
                    setQR("");
                  }}
                >
                  <span className="gcard-tab" />
                  <span className="gcard-panel">
                    <span className="gcard-ico">
                      <Icon name="distribution" size={18} stroke={1.9} />
                    </span>
                    <span className="gcard-info">
                      <b>{g.name}</b>
                      <em>{g.area}</em>
                    </span>
                    <span className="gcard-count">{cnt}</span>
                  </span>
                </button>
              );
            })}
            {groups.length === 0 && (
              <div className="grail-empty">Sin grupos</div>
            )}
          </div>
        </aside>

        {/* PANEL transferencia */}
        <section className="dist-main">
          <div className="ghead" style={{ "--gc": group.color }}>
            <div className="ghead-blob" />
            <div className="ghead-l">
              <span className="ghead-ico">
                <Icon name="distribution" size={24} stroke={1.9} />
              </span>
              <div>
                <h3>{group.name}</h3>
                <p>
                  Área: {group.area} · {memberIds.length} miembros
                </p>
              </div>
            </div>
          </div>

          <div className="transfer">
            <div className="tcol">
              <div className="tcol-head">
                <span className="tcol-cap">
                  <Icon name="users" size={16} stroke={1.9} /> Usuarios
                  disponibles <i>{available.length}</i>
                </span>
                <button
                  className="tcol-all"
                  onClick={addAll}
                  disabled={!available.length}
                >
                  Agregar todos »
                </button>
              </div>
              <div className="tcol-search">
                <Icon name="search" size={14} stroke={2} />
                <input
                  value={qL}
                  placeholder="Filtrar…"
                  onChange={(e) => setQL(e.target.value)}
                />
              </div>
              <div className="tcol-list">
                {available.map((p) => (
                  <PersonRow key={p.id} p={p} side="left" onMove={add} />
                ))}
                {available.length === 0 && (
                  <div className="tcol-empty">
                    <Icon name="check" size={22} stroke={2} />
                    <span>Todos asignados</span>
                  </div>
                )}
              </div>
            </div>

            <div className="tmid">
              <span className="tmid-line" />
              <span className="tmid-badge">
                <Icon name="arrow" size={18} stroke={2.2} />
              </span>
              <span className="tmid-line" />
            </div>

            <div className="tcol tcol-on">
              <div className="tcol-head">
                <span className="tcol-cap">
                  <Icon name="check" size={16} stroke={2.4} /> Miembros actuales{" "}
                  <i className="on">{current.length}</i>
                </span>
                <button
                  className="tcol-all"
                  onClick={removeAll}
                  disabled={!current.length}
                >
                  « Quitar todos
                </button>
              </div>
              <div className="tcol-search">
                <Icon name="search" size={14} stroke={2} />
                <input
                  value={qR}
                  placeholder="Filtrar…"
                  onChange={(e) => setQR(e.target.value)}
                />
              </div>
              <div className="tcol-list">
                {current.map((p) => (
                  <PersonRow key={p.id} p={p} side="right" onMove={remove} />
                ))}
                {current.length === 0 && (
                  <div className="tcol-empty">
                    <Icon name="users" size={22} stroke={1.8} />
                    <span>Agrega usuarios desde la izquierda</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SAVE BAR */}
          <div
            style={{
              background: "white",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "15px",
              padding: "10px",
              borderTop: "1px solid #E7E3D4",
            }}
          >
            <span className="savebar-msg">
              {dirty ? (
                <>
                  <i className="savebar-dot" /> Cambios en distribución aún no
                  guardados
                </>
              ) : (
                <>
                  <Icon name="check" size={15} stroke={2.4} /> Todo guardado
                </>
              )}
            </span>
            <div className="savebar-acts">
              <button
                className="btn btn-ghost sm"
                onClick={() => {
                  setMembers(
                    Object.fromEntries(
                      DIST_GROUPS.map((g) => [g.id, [...g.memberIds]]),
                    ),
                  );
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
                  fire("Distribución guardada ✓");
                }}
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

Object.assign(window, { ListasScreen });
