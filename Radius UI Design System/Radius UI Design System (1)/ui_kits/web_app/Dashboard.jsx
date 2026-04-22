// Dashboard page — KPI cards, chart, recent activity.

function KpiCard({ label, value, delta, positive }) {
  return (
    <div className="r-card" style={{ padding: 20 }}>
      <div style={{ fontSize: 13, color: 'var(--muted-foreground)', fontWeight: 500 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 8 }}>{value}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 2,
          fontSize: 12, fontWeight: 600,
          color: positive ? '#15A296' : 'var(--destructive)',
        }}>
          <Icon name={positive ? 'arrowUp' : 'arrowDown'} size={12} stroke={2.5} />
          {delta}
        </span>
        <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>vs. last month</span>
      </div>
    </div>
  );
}

function LineChart() {
  // Simple SVG line. Not a real chart library — but visually on-brand.
  const data = [30, 42, 38, 55, 48, 62, 58, 72, 70, 82, 75, 90];
  const w = 620, h = 180, pad = 20;
  const max = 100, min = 0;
  const stepX = (w - pad * 2) / (data.length - 1);
  const ptY = v => h - pad - ((v - min) / (max - min)) * (h - pad * 2);
  const points = data.map((v, i) => `${pad + i * stepX},${ptY(v)}`).join(' ');
  const area = `M ${pad},${h - pad} L ${points.replace(/ /g, ' L ')} L ${w - pad},${h - pad} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 220 }}>
      <defs>
        <linearGradient id="chartFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5A5FF2" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#5A5FF2" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* grid */}
      {[0.25, 0.5, 0.75, 1].map(t => (
        <line key={t} x1={pad} x2={w - pad} y1={pad + (h - pad * 2) * t} y2={pad + (h - pad * 2) * t} stroke="#F5F5F5" strokeWidth="1" />
      ))}
      <path d={area} fill="url(#chartFade)" />
      <polyline points={points} fill="none" stroke="#5A5FF2" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {data.map((v, i) => (
        <circle key={i} cx={pad + i * stepX} cy={ptY(v)} r="3" fill="#fff" stroke="#5A5FF2" strokeWidth="2" />
      ))}
    </svg>
  );
}

function Dashboard() {
  const activity = [
    { who: 'Olivia Martin', initials: 'OM', color: '#EC4899', action: 'paid invoice', target: 'INV-0241', time: '2m ago', amount: '+$1,999.00' },
    { who: 'Jackson Lee',   initials: 'JL', color: '#5A5FF2', action: 'created project', target: 'Acme rebrand', time: '15m ago' },
    { who: 'Isabella Nguyen', initials: 'IN', color: '#15A296', action: 'added to team', target: 'Design', time: '1h ago' },
    { who: 'William Kim',   initials: 'WK', color: '#F59E0B', action: 'refunded invoice', target: 'INV-0238', time: '3h ago', amount: '-$99.00' },
    { who: 'Sofia Davis',   initials: 'SD', color: '#06B6D4', action: 'shipped release', target: 'v1.4.0', time: 'Yesterday' },
  ];
  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1200 }}>
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <KpiCard label="Total revenue" value="$45,231.89" delta="+20.1%" positive />
        <KpiCard label="Subscriptions" value="+2,350" delta="+180.1%" positive />
        <KpiCard label="Sales"         value="+12,234" delta="+19%" positive />
        <KpiCard label="Active now"    value="+573"    delta="-3.2%" />
      </div>

      {/* Chart + activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <div className="r-card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600 }}>Overview</div>
              <div style={{ fontSize: 13, color: 'var(--muted-foreground)', marginTop: 2 }}>Revenue by month</div>
            </div>
            <Tabs items={[{value:'month',label:'Month'},{value:'quarter',label:'Quarter'},{value:'year',label:'Year'}]} value="month" onChange={() => {}} />
          </div>
          <div style={{ marginTop: 16 }}><LineChart /></div>
        </div>
        <div className="r-card" style={{ padding: 20 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600 }}>Recent activity</div>
          <div style={{ fontSize: 13, color: 'var(--muted-foreground)', marginTop: 2, marginBottom: 16 }}>265 actions this month</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {activity.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Avatar size="sm" initials={a.initials} color={a.color} fg="#fff" />
                <div style={{ flex: 1, minWidth: 0, fontSize: 13 }}>
                  <div style={{ color: 'var(--foreground)' }}>
                    <strong style={{ fontWeight: 500 }}>{a.who}</strong> {a.action} <strong style={{ fontWeight: 500 }}>{a.target}</strong>
                  </div>
                  <div style={{ color: 'var(--muted-foreground)', fontSize: 12 }}>{a.time}</div>
                </div>
                {a.amount && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, color: a.amount.startsWith('+') ? '#15A296' : 'var(--destructive)' }}>{a.amount}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

window.Dashboard = Dashboard;
