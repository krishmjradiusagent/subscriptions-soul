// Sidebar navigation. Collapsible, with active state.

const { useState: useStateSB } = React;

function Sidebar({ page, onNavigate }) {
  const nav = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'customers', label: 'Customers', icon: 'users' },
    { id: 'analytics',  label: 'Analytics', icon: 'barChart' },
    { id: 'inbox',     label: 'Inbox',     icon: 'inbox',    badge: 4 },
    { id: 'invoices',  label: 'Invoices',  icon: 'file' },
    { id: 'settings',  label: 'Settings',  icon: 'settings' },
  ];

  return (
    <aside style={{
      width: 240, background: '#FAFAFA',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '18px 16px', borderBottom: '1px solid var(--border)' }}>
        <img src="../../assets/logo-dark.svg" alt="Radius" style={{ height: 24 }} />
      </div>

      {/* Workspace switcher */}
      <div style={{ padding: 12 }}>
        <button style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          padding: '8px 10px', background: '#fff',
          border: '1px solid var(--border)', borderRadius: 8,
          boxShadow: 'var(--shadow-xs)', cursor: 'pointer',
          fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 500,
        }}>
          <span style={{
            width: 24, height: 24, borderRadius: 6, background: '#5A5FF2',
            color: '#fff', display: 'inline-flex', alignItems: 'center',
            justifyContent: 'center', fontWeight: 700, fontSize: 12,
          }}>A</span>
          <span style={{ flex: 1, textAlign: 'left' }}>Acme Inc</span>
          <Icon name="chevronDown" size={14} />
        </button>
      </div>

      {/* Nav */}
      <nav style={{ padding: '0 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {nav.map(item => (
          <div
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '7px 10px', borderRadius: 6,
              cursor: 'pointer',
              background: page === item.id ? 'var(--accent)' : 'transparent',
              color: page === item.id ? 'var(--foreground)' : 'var(--muted-foreground)',
              fontFamily: 'var(--font-ui)', fontSize: 13,
              fontWeight: page === item.id ? 500 : 400,
            }}
            onMouseEnter={e => page !== item.id && (e.currentTarget.style.background = 'var(--accent)')}
            onMouseLeave={e => page !== item.id && (e.currentTarget.style.background = 'transparent')}
          >
            <Icon name={item.icon} size={16} />
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.badge && (
              <span style={{
                fontSize: 11, fontWeight: 600, background: 'var(--primary)',
                color: '#fff', padding: '0 6px', borderRadius: 30, minWidth: 18,
                height: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>{item.badge}</span>
            )}
          </div>
        ))}
      </nav>

      <div style={{ flex: 1 }} />

      {/* User card */}
      <div style={{ padding: 12, borderTop: '1px solid var(--border)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: 8, borderRadius: 8,
          cursor: 'pointer',
        }}>
          <Avatar initials="SD" color="#5A5FF2" fg="#fff" size="sm" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--foreground)' }}>Sofia Davis</div>
            <div style={{ fontSize: 11, color: 'var(--muted-foreground)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>sofia@acme.com</div>
          </div>
          <Icon name="moreHorizontal" size={14} />
        </div>
      </div>
    </aside>
  );
}

window.Sidebar = Sidebar;
