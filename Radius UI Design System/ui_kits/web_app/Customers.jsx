// Customers — filterable data table with selection and pagination.

const { useState: useStateC, useMemo } = React;

const CUSTOMERS = [
  { id: 1,  name: 'Olivia Martin',     email: 'olivia.martin@email.com',    plan: 'Pro',      status: 'Active',    spend: 1999.00, color:'#EC4899' },
  { id: 2,  name: 'Jackson Lee',       email: 'jackson.lee@email.com',      plan: 'Team',     status: 'Active',    spend: 39.00,  color:'#5A5FF2' },
  { id: 3,  name: 'Isabella Nguyen',   email: 'isabella.nguyen@email.com',  plan: 'Pro',      status: 'Active',    spend: 299.00, color:'#15A296' },
  { id: 4,  name: 'William Kim',       email: 'will@email.com',             plan: 'Free',     status: 'Inactive',  spend: 0.00,    color:'#F59E0B' },
  { id: 5,  name: 'Sofia Davis',       email: 'sofia.davis@email.com',      plan: 'Team',     status: 'Active',    spend: 99.00,  color:'#06B6D4' },
  { id: 6,  name: 'Emma Wilson',       email: 'emma@acme.com',              plan: 'Pro',      status: 'Pending',   spend: 49.00,  color:'#8B5CF6' },
  { id: 7,  name: 'Noah Garcia',       email: 'noah.g@email.com',           plan: 'Free',     status: 'Active',    spend: 0.00,    color:'#84CC16' },
  { id: 8,  name: 'Ava Rodriguez',     email: 'ava.rodriguez@email.com',    plan: 'Pro',      status: 'Active',    spend: 149.00, color:'#F43F5E' },
];

function StatusBadge({ s }) {
  if (s === 'Active')   return <Badge variant="success">Active</Badge>;
  if (s === 'Pending')  return <Badge variant="warning">Pending</Badge>;
  if (s === 'Inactive') return <Badge variant="outline">Inactive</Badge>;
  return <Badge>{s}</Badge>;
}

function Customers() {
  const [query, setQuery] = useStateC('');
  const [selected, setSelected] = useStateC(new Set());
  const [tab, setTab] = useStateC('all');

  const filtered = useMemo(() => {
    let rows = CUSTOMERS;
    if (tab !== 'all') rows = rows.filter(r => r.status.toLowerCase() === tab);
    if (query) rows = rows.filter(r => (r.name + r.email).toLowerCase().includes(query.toLowerCase()));
    return rows;
  }, [query, tab]);

  const allSelected = filtered.length && filtered.every(r => selected.has(r.id));
  const toggleAll = () => {
    const n = new Set(selected);
    if (allSelected) filtered.forEach(r => n.delete(r.id));
    else filtered.forEach(r => n.add(r.id));
    setSelected(n);
  };
  const toggle = id => {
    const n = new Set(selected);
    n.has(id) ? n.delete(id) : n.add(id);
    setSelected(n);
  };

  return (
    <div style={{ padding: 32, maxWidth: 1200 }}>
      {/* Page header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 className="r-h3" style={{ margin: 0 }}>Customers</h2>
          <p style={{ color: 'var(--muted-foreground)', fontSize: 14, margin: '4px 0 0' }}>Manage your customers and their subscriptions.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="outline"><Icon name="download" size={14}/> Export</Button>
          <Button variant="primary"><Icon name="plus" size={14} /> Add customer</Button>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <Tabs
          items={[{value:'all',label:'All'},{value:'active',label:'Active'},{value:'pending',label:'Pending'},{value:'inactive',label:'Inactive'}]}
          value={tab} onChange={setTab}
        />
        <div style={{ flex: 1 }} />
        <div style={{ position: 'relative', width: 260 }}>
          <Icon name="search" size={14} style={{ position: 'absolute', left: 10, top: 11, color: 'var(--muted-foreground)' }} />
          <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Filter customers…" style={{ paddingLeft: 32 }} />
        </div>
        <Button variant="outline"><Icon name="filter" size={14} /> Filter</Button>
      </div>

      {/* Bulk actions */}
      {selected.size > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '10px 14px', background: 'var(--muted)',
          borderRadius: 8, marginBottom: 8, fontSize: 13,
        }}>
          <span style={{ fontWeight: 500 }}>{selected.size} selected</span>
          <div style={{ flex: 1 }} />
          <Button variant="outline" size="sm">Change plan</Button>
          <Button variant="outline" size="sm" style={{ color: 'var(--destructive)' }}>
            <Icon name="trash" size={14}/> Delete
          </Button>
        </div>
      )}

      {/* Table */}
      <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
        <table className="r-table">
          <thead>
            <tr>
              <th style={{ width: 36 }}><Checkbox checked={allSelected} onChange={toggleAll} /></th>
              <th>Customer</th>
              <th>Plan</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Spend</th>
              <th style={{ width: 36 }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id}
                  onClick={() => toggle(r.id)}
                  style={{ cursor: 'pointer', background: selected.has(r.id) ? 'var(--muted)' : 'transparent' }}>
                <td><Checkbox checked={selected.has(r.id)} onChange={() => toggle(r.id)} /></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar size="sm" initials={r.name.split(' ').map(n=>n[0]).join('')} color={r.color} fg="#fff" />
                    <div>
                      <div style={{ fontWeight: 500 }}>{r.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>{r.email}</div>
                    </div>
                  </div>
                </td>
                <td><Badge variant={r.plan === 'Pro' ? 'default' : r.plan === 'Team' ? 'secondary' : 'outline'}>{r.plan}</Badge></td>
                <td><StatusBadge s={r.status} /></td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}>${r.spend.toFixed(2)}</td>
                <td>
                  <Dropdown trigger={
                    <button className="r-btn r-btn-ghost r-btn-icon" aria-label="more" onClick={e=>e.stopPropagation()}>
                      <Icon name="moreHorizontal" size={16} />
                    </button>
                  } align="end">
                    <MenuItem><Icon name="pencil" size={14}/> Edit</MenuItem>
                    <MenuItem><Icon name="mail"  size={14}/> Email customer</MenuItem>
                    <MenuItem destructive><Icon name="trash" size={14}/> Delete</MenuItem>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / pagination */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, fontSize: 13, color: 'var(--muted-foreground)' }}>
        <div>{selected.size} of {filtered.length} row(s) selected.</div>
        <div style={{ display: 'flex', gap: 6 }}>
          <Button variant="outline" size="sm" disabled><Icon name="chevronLeft" size={14}/> Previous</Button>
          <Button variant="outline" size="sm">Next <Icon name="chevronRight" size={14}/></Button>
        </div>
      </div>
    </div>
  );
}

window.Customers = Customers;
