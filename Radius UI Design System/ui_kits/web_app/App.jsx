// Top-level app — routes between pages, owns command palette.

const { useState: useStateA, useEffect: useEffectA } = React;

function CommandPalette({ open, onClose, onNavigate }) {
  const [q, setQ] = useStateA('');
  const items = [
    { icon: 'home',     label: 'Go to Dashboard',  page: 'dashboard' },
    { icon: 'users',    label: 'Go to Customers',  page: 'customers' },
    { icon: 'barChart', label: 'Go to Analytics',  page: 'analytics' },
    { icon: 'inbox',    label: 'Go to Inbox',      page: 'inbox' },
    { icon: 'file',     label: 'Go to Invoices',   page: 'invoices' },
    { icon: 'settings', label: 'Go to Settings',   page: 'settings' },
    { icon: 'plus',     label: 'Create new customer' },
    { icon: 'plus',     label: 'Create new invoice' },
    { icon: 'logout',   label: 'Sign out' },
  ].filter(i => i.label.toLowerCase().includes(q.toLowerCase()));

  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:'15vh', zIndex:100 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: 560, maxWidth:'90vw', background:'#fff', borderRadius:12, boxShadow:'var(--shadow-xl)', overflow:'hidden' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'14px 16px', borderBottom:'1px solid var(--border)' }}>
          <Icon name="search" size={16} style={{ color:'var(--muted-foreground)' }} />
          <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Type a command or search…" style={{ flex:1, border:0, outline:'none', fontSize:14, fontFamily:'var(--font-body)' }} />
          <Kbd>Esc</Kbd>
        </div>
        <div style={{ padding: 8, maxHeight: 360, overflow:'auto' }}>
          <div style={{ fontSize:11, fontWeight:500, color:'var(--muted-foreground)', padding:'6px 8px', textTransform:'uppercase', letterSpacing:'0.03em' }}>Suggestions</div>
          {items.length === 0 && <div style={{ padding:'20px 8px', fontSize:13, color:'var(--muted-foreground)', textAlign:'center' }}>No results found.</div>}
          {items.map((it, i) => (
            <div key={i}
                 onClick={() => { it.page && onNavigate(it.page); onClose(); }}
                 style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:6, cursor:'pointer', fontSize:13 }}
                 onMouseEnter={e => e.currentTarget.style.background='var(--accent)'}
                 onMouseLeave={e => e.currentTarget.style.background='transparent'}>
              <Icon name={it.icon} size={14} style={{ color:'var(--muted-foreground)' }} />
              <span style={{ flex:1 }}>{it.label}</span>
              {it.page && <Icon name="chevronRight" size={12} style={{ color:'var(--muted-foreground)' }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useStateA(() => localStorage.getItem('radius-page') || 'dashboard');
  const [cmd, setCmd]   = useStateA(false);

  useEffectA(() => { localStorage.setItem('radius-page', page); }, [page]);
  useEffectA(() => {
    const h = e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmd(c => !c); }
      if (e.key === 'Escape') setCmd(false);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  const Page = { dashboard: Dashboard, customers: Customers, settings: Settings }[page];

  return (
    <div className="r-app" style={{ display:'flex', height:'100vh', overflow:'hidden' }} data-screen-label={`${page}`}>
      <Sidebar page={page} onNavigate={setPage} />
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <Topbar page={page} onOpenCommand={() => setCmd(true)} />
        <main style={{ flex:1, overflow:'auto', background: 'var(--neutral-50)' }}>
          {Page ? <Page/> : (
            <div style={{ padding:32, color:'var(--muted-foreground)', fontSize:14 }}>
              <div className="r-card" style={{ padding: 48, textAlign: 'center' }}>
                <Icon name="inbox" size={40} style={{ color: 'var(--neutral-400)', marginBottom: 16 }} />
                <h3 style={{ margin: 0, fontFamily: 'var(--font-display)' }}>Nothing here yet</h3>
                <p style={{ marginTop: 8 }}>This page is a placeholder in the UI kit.</p>
                <div style={{ marginTop: 16 }}>
                  <Button variant="outline" onClick={()=>setPage('dashboard')}>Back to dashboard</Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      <CommandPalette open={cmd} onClose={()=>setCmd(false)} onNavigate={setPage} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
