/* app.jsx — CRECE DOCs · router de pantallas */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "tabStyle": "multicolor",
  "cardStyle": "folder",
  "accent": "#00aaf3",
  "showSearch": true,
  "font": "Plus Jakarta Sans"
}/*EDITMODE-END*/;

// nav id → screen id
const NAV_TO_SCREEN = { inicio: 'inicio', elaborar: 'elaborar', vigentes: 'vigentes' };

function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div className="toast" key={msg.id}>
      <span className="toast-ico"><Icon name="check" size={16} stroke={2.6} /></span>
      {msg.text}
    </div>
  );
}

const CRUMB = {
  inicio: ['Inicio'],
  elaborar: ['Documentos', 'Nuevo documento'],
  vigentes: ['Documentos', 'Documentos vigentes'],
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = React.useState('inicio');
  const [params, setParams] = React.useState(null);
  const [toast, setToast] = React.useState(null);

  const fire = React.useCallback((text) => {
    const m = { id: Date.now(), text };
    setToast(m);
    clearTimeout(window.__tt);
    window.__tt = setTimeout(() => setToast(null), 2600);
  }, []);

  const navigate = React.useCallback((id, p = null) => {
    const target = NAV_TO_SCREEN[id];
    if (target) {
      setScreen(target);
      setParams(p);
      document.querySelector('.main')?.scrollTo(0, 0);
    } else {
      fire('Módulo en demostración');
    }
  }, [fire]);

  // sidebar active id mirrors screen
  const onNav = (navId) => {
    if (NAV_TO_SCREEN[navId]) navigate(navId);
    else { fire('Módulo “' + [...NAV_DOCS, ...NAV_ADMIN].find(n => n.id === navId)?.label + '” — demo'); }
  };

  const rootStyle = { '--accent': t.accent, fontFamily: `'${t.font}', system-ui, sans-serif` };
  const tabColor = (def) => t.tabStyle === 'mono' ? 'var(--accent)' : def;

  return (
    <AppCtx.Provider value={{ fire, navigate }}>
      <div className={'app card-' + t.cardStyle} style={rootStyle}>
        <Sidebar active={screen} setActive={onNav} />
        <main className="main">
          <TopBar crumb={CRUMB[screen]} />
          {screen === 'inicio' && <HomeScreen t={t} tabColor={tabColor} />}
          {screen === 'elaborar' && <NuevoScreen params={params} />}
          {screen === 'vigentes' && <VigentesScreen />}
        </main>

        <Toast msg={toast} />

        <TweaksPanel>
          <TweakSection label="Tarjetas flotantes" />
          <TweakRadio label="Estilo de tarjeta" value={t.cardStyle}
            options={['folder', 'plano', 'contorno']}
            onChange={(v) => setTweak('cardStyle', v)} />
          <TweakRadio label="Color de pestañas" value={t.tabStyle}
            options={['multicolor', 'mono']}
            onChange={(v) => setTweak('tabStyle', v)} />
          <TweakColor label="Acento" value={t.accent}
            options={['#00aaf3', '#0cca6b', '#ff795e', '#001b49']}
            onChange={(v) => setTweak('accent', v)} />
          <TweakSection label="Inicio" />
          <TweakToggle label="Buscador interactivo" value={t.showSearch}
            onChange={(v) => setTweak('showSearch', v)} />
          <TweakSelect label="Tipografía" value={t.font}
            options={['Plus Jakarta Sans', 'Hanken Grotesk', 'Onest', 'Figtree']}
            onChange={(v) => setTweak('font', v)} />
        </TweaksPanel>
      </div>
    </AppCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
