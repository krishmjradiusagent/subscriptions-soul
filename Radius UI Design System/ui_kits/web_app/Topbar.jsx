function Topbar({ page, onOpenCommand }) {
  const crumbs = { dashboard: 'Dashboard', customers: 'Customers', analytics: 'Analytics', inbox: 'Inbox', invoices: 'Invoices', settings: 'Settings' };
  return (
    <header style={{
      height: 64, padding: '0 24px',
      borderBottom: '1px solid var(--border)',
      background: '#fff',
      display: 'flex', alignItems: 'center', gap: 16,
    }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600 }}>
        {crumbs[page] || 'Dashboard'}
      </div>
      <div style={{ flex: 1 }} />
      <button onClick={onOpenCommand} style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        height: 32, padding: '0 10px 0 10px',
        background: 'var(--muted)', border: '1px solid var(--border)',
        borderRadius: 8, cursor: 'pointer',
        fontSize: 13, color: 'var(--muted-foreground)',
        minWidth: 220,
      }}>
        <Icon name="search" size={14} />
        <span style={{ flex: 1, textAlign: 'left' }}>Search…</span>
        <Kbd>⌘K</Kbd>
      </button>
      <button className="r-btn r-btn-outline r-btn-icon" aria-label="Notifications" style={{ position: 'relative' }}>
        <Icon name="bell" size={16} />
        <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: '50%', background: 'var(--destructive)', border: '1.5px solid #fff' }} />
      </button>
      <Button variant="primary" size="sm"><Icon name="plus" size={14} /> New</Button>
    </header>
  );
}

window.Topbar = Topbar;
