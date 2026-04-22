// Settings — profile form, notification preferences, theme.

const { useState: useStateS } = React;

function Settings() {
  const [name,  setName]  = useStateS('Sofia Davis');
  const [email, setEmail] = useStateS('sofia@acme.com');
  const [bio,   setBio]   = useStateS('Product designer at Acme. Coffee in hand.');
  const [emails, setEmails] = useStateS(true);
  const [push,   setPush]   = useStateS(false);
  const [marketing, setMarketing] = useStateS(false);
  const [theme, setTheme] = useStateS('system');

  const Section = ({ title, desc, children }) => (
    <div className="r-card" style={{ padding: 24 }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 13, color: 'var(--muted-foreground)', marginTop: 2 }}>{desc}</div>
      </div>
      {children}
    </div>
  );

  const Row = ({ label, desc, children }) => (
    <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderTop: '1px solid var(--border)', gap: 16 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 500 }}>{label}</div>
        {desc && <div style={{ fontSize: 13, color: 'var(--muted-foreground)', marginTop: 2 }}>{desc}</div>}
      </div>
      {children}
    </div>
  );

  return (
    <div style={{ padding: 32, maxWidth: 800, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 className="r-h3" style={{ margin: 0 }}>Settings</h2>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 14, margin: '4px 0 0' }}>Manage your account settings and preferences.</p>
      </div>

      {/* Profile */}
      <Section title="Profile" desc="This is how others will see you on the site.">
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
          <Avatar size="lg" initials="SD" color="#5A5FF2" fg="#fff" />
          <div>
            <Button variant="outline" size="sm">Change avatar</Button>
            <div style={{ fontSize: 12, color: 'var(--muted-foreground)', marginTop: 6 }}>PNG or JPG. 1MB max.</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Name"><Input value={name} onChange={e=>setName(e.target.value)} /></Field>
          <Field label="Email"><Input value={email} onChange={e=>setEmail(e.target.value)} /></Field>
        </div>
        <div style={{ marginTop: 16 }}>
          <Field label="Bio"><textarea className="r-input" rows={3} value={bio} onChange={e=>setBio(e.target.value)} style={{ height: 80, padding: 10, resize: 'vertical', fontFamily: 'var(--font-body)' }} /></Field>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
          <Button variant="primary">Save changes</Button>
        </div>
      </Section>

      {/* Notifications */}
      <Section title="Notifications" desc="Choose what you want to be notified about.">
        <Row label="Product updates" desc="Release notes, maintenance windows, and status.">
          <Switch checked={emails} onChange={setEmails} />
        </Row>
        <Row label="Push notifications" desc="Get notified on your device when something happens.">
          <Switch checked={push} onChange={setPush} />
        </Row>
        <Row label="Marketing emails" desc="New features, tips, and occasional surveys.">
          <Switch checked={marketing} onChange={setMarketing} />
        </Row>
      </Section>

      {/* Theme */}
      <Section title="Appearance" desc="Customize the look and feel.">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { id: 'light',  label: 'Light',  bg: '#fff' },
            { id: 'dark',   label: 'Dark',   bg: '#0A0A0A' },
            { id: 'system', label: 'System', bg: 'linear-gradient(90deg,#fff 50%,#0A0A0A 50%)' },
          ].map(t => (
            <div
              key={t.id}
              onClick={() => setTheme(t.id)}
              style={{
                border: theme === t.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                borderRadius: 10, padding: 4, cursor: 'pointer',
              }}
            >
              <div style={{ background: t.bg, height: 72, borderRadius: 6, border: '1px solid var(--border)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8, fontSize: 13, fontWeight: 500 }}>
                <Radio checked={theme === t.id} onChange={() => setTheme(t.id)} />
                {t.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Danger */}
      <div className="r-card" style={{ padding: 24, borderColor: '#FCA5A5' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--destructive)' }}>Danger zone</div>
        <div style={{ fontSize: 13, color: 'var(--muted-foreground)', marginTop: 2, marginBottom: 16 }}>Permanently delete your account and all of its contents. This cannot be undone.</div>
        <Button variant="destructive"><Icon name="trash" size={14}/> Delete account</Button>
      </div>
    </div>
  );
}

window.Settings = Settings;
