/* rinti-app.jsx — router */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "tabStyle": "multicolor",
  "cardStyle": "folder",
  "accent": "#00aaf3",
  "playful": true,
  "propuesta": "A",
  "tema": "marca"
}/*EDITMODE-END*/;

function Toast({ msg }) {
  if (!msg) return null;
  return <div className="toast" key={msg.id}><span className="toast-ico"><Icon name="check" size={16} stroke={2.6} /></span>{msg.text}</div>;
}

const NAV_TO_SCREEN = { inicio: 'inicio', tareas: 'tareas', elaborar: 'elaborar', vigentes: 'vigentes', obsoletos: 'obsoletos', listas: 'listas', taxonomia: 'taxonomia' };
const CRUMB = { inicio: ['Inicio'], tareas: ['Documentos', 'Mis Tareas'], elaborar: ['Documentos', 'Elaborar documento'], vigentes: ['Documentos', 'Documentos Vigentes'], obsoletos: ['Documentos', 'Documentos obsoletos'], listas: ['Administración', 'Listas de Distribución'], taxonomia: ['Administración', 'Taxonomía'] };

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = React.useState('inicio');
  const [params, setParams] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const logo = (window.__resources && window.__resources.rintiLogo) || (document.querySelector('meta[name="rinti-logo"]') || {}).content || 'assets/rinti-logo-hueso.png';

  const fire = React.useCallback((text) => {
    const m = { id: Date.now(), text }; setToast(m);
    clearTimeout(window.__tt); window.__tt = setTimeout(() => setToast(null), 2600);
  }, []);
  const navigate = React.useCallback((id, p = null) => {
    if (NAV_TO_SCREEN[id]) { setScreen(NAV_TO_SCREEN[id]); setParams(p); setTimeout(() => document.querySelector('.scroll')?.scrollTo(0, 0), 0); }
    else fire('Módulo en demostración');
  }, [fire]);
  const onNav = (navId) => NAV_TO_SCREEN[navId] ? navigate(navId) : fire('Módulo “' + [...NAV_DOCS, ...NAV_ADMIN].find(n => n.id === navId)?.label + '” — demo');

  const rootStyle = undefined;
  const tabColor = (def) => t.tabStyle === 'mono' ? 'var(--accent)' : def;

  return (
    <AppCtx.Provider value={{ fire, navigate, logo }}>
      <div className={'app card-' + t.cardStyle + ' tema-' + t.tema + (t.playful ? ' is-playful' : '')} style={rootStyle}>
        <Sidebar active={screen} setActive={onNav} />
        <main className="main">
          <TopBar crumb={CRUMB[screen]} />
          {screen === 'inicio' && <HomeScreen tabColor={tabColor} />}
          {screen === 'tareas' && <TareasScreen />}
          {screen === 'elaborar' && (t.propuesta === 'B' ? <NuevoScreenB params={params} /> : <NuevoScreen params={params} tabColor={tabColor} />)}
          {screen === 'vigentes' && <VigentesScreen />}
          {screen === 'obsoletos' && <ObsoletosScreen />}
          {screen === 'listas' && <ListasScreen />}
          {screen === 'taxonomia' && <TaxonomiaScreen />}
        </main>
        <Toast msg={toast} />
        <TweaksPanel>
          <TweakSection label="Pantalla Elaborar" />
          <TweakRadio label="Propuesta" value={t.propuesta} options={[{value:'A',label:'A · Pasos'},{value:'B',label:'B · Ruta'}]} onChange={(v) => setTweak('propuesta', v)} />
          <TweakSelect label="Tema de color (marca)" value={t.tema} options={[{value:'marca',label:'Marca'},{value:'calido',label:'Cálido'},{value:'fresco',label:'Fresco'},{value:'profundo',label:'Profundo'}]} onChange={(v) => setTweak('tema', v)} />
          <TweakSection label="Estilo dinámico" />
          <TweakToggle label="Animaciones lúdicas" value={t.playful} onChange={(v) => setTweak('playful', v)} />
          <TweakRadio label="Estilo de tarjeta" value={t.cardStyle} options={['folder', 'plano', 'contorno']} onChange={(v) => setTweak('cardStyle', v)} />
          <TweakRadio label="Color de pestañas" value={t.tabStyle} options={['multicolor', 'mono']} onChange={(v) => setTweak('tabStyle', v)} />
        </TweaksPanel>
      </div>
    </AppCtx.Provider>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
