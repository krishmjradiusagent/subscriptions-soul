// Shared React primitives built on the Radius UI tokens.
// All styling lives in ../../colors_and_type.css + ../../components.css.
// This file just exposes ergonomic React wrappers.

const { useState, useEffect, useRef } = React;

function cx(...args) { return args.filter(Boolean).join(' '); }

// ------------------------------ Button ------------------------------
function Button({ variant = 'primary', size, className, children, ...rest }) {
  return (
    <button
      className={cx('r-btn', `r-btn-${variant}`, size && `r-btn-${size}`, className)}
      {...rest}
    >
      {children}
    </button>
  );
}

// ------------------------------ Badge -------------------------------
function Badge({ variant = 'secondary', className, children }) {
  return <span className={cx('r-badge', `r-badge-${variant}`, className)}>{children}</span>;
}

// ------------------------------ Card --------------------------------
function Card({ className, children, padded = true, style }) {
  return <div className={cx('r-card', className)} style={{ padding: padded ? 24 : 0, ...style }}>{children}</div>;
}

// ------------------------------ Input -------------------------------
function Input({ className, ...rest }) {
  return <input className={cx('r-input', className)} {...rest} />;
}

function Label({ className, children, htmlFor }) {
  return <label htmlFor={htmlFor} className={cx('r-label', className)}>{children}</label>;
}

function Field({ label, children, hint }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <Label>{label}</Label>}
      {children}
      {hint && <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>{hint}</span>}
    </div>
  );
}

// ------------------------------ Avatar ------------------------------
function Avatar({ size, initials, src, color = 'var(--muted)', fg = 'var(--muted-foreground)' }) {
  return (
    <div
      className={cx('r-avatar', size && `r-avatar-${size}`)}
      style={{ background: color, color: fg }}
    >
      {src ? <img src={src} alt="" /> : initials}
    </div>
  );
}

// ------------------------------ Switch ------------------------------
function Switch({ checked, onChange }) {
  return (
    <span
      className={cx('r-switch', checked && 'on')}
      onClick={() => onChange && onChange(!checked)}
      role="switch"
      aria-checked={checked}
    />
  );
}

// ------------------------------ Checkbox ----------------------------
function Checkbox({ checked, onChange }) {
  return (
    <span
      className={cx('r-checkbox', checked && 'on')}
      onClick={(e) => { e.stopPropagation(); onChange && onChange(!checked); }}
      role="checkbox"
      aria-checked={checked}
    >
      {checked && <Icon name="check" stroke={3} />}
    </span>
  );
}

// ------------------------------ Radio -------------------------------
function Radio({ checked, onChange }) {
  return <span className={cx('r-radio', checked && 'on')} onClick={() => onChange && onChange(true)} />;
}

// ------------------------------ Tabs --------------------------------
function Tabs({ items, value, onChange }) {
  return (
    <div className="r-tabs">
      {items.map(item => (
        <div
          key={item.value}
          className={cx('r-tab', value === item.value && 'active')}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}

// ------------------------------ Kbd ---------------------------------
function Kbd({ children }) { return <kbd className="r-kbd">{children}</kbd>; }

// ------------------------------ Progress ----------------------------
function Progress({ value = 0 }) {
  return (
    <div className="r-progress">
      <div className="r-progress-bar" style={{ width: `${value}%` }} />
    </div>
  );
}

// ------------------------------ Separator ---------------------------
function Separator({ style }) { return <hr className="r-separator" style={style} />; }

// ------------------------------ Dialog ------------------------------
function Dialog({ open, onClose, children, width = 480 }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 50, animation: 'rFadeIn 150ms',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 12, width, maxWidth: '90vw',
          boxShadow: 'var(--shadow-xl)', padding: 24,
          animation: 'rDialogIn 200ms ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ------------------------------ Dropdown ----------------------------
function Dropdown({ trigger, children, align = 'start' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    function handler(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <span onClick={() => setOpen(o => !o)}>{trigger}</span>
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'absolute', top: 'calc(100% + 4px)',
            [align === 'end' ? 'right' : 'left']: 0,
            minWidth: 180, background: '#fff',
            border: '1px solid var(--border)', borderRadius: 8,
            boxShadow: 'var(--shadow-md)', padding: 4, zIndex: 20,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
function MenuItem({ children, onClick, destructive }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '6px 8px', fontSize: 13, borderRadius: 4, cursor: 'pointer',
        color: destructive ? 'var(--destructive)' : 'var(--foreground)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--accent)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      {children}
    </div>
  );
}

// Share across modules.
Object.assign(window, {
  cx, Button, Badge, Card, Input, Label, Field, Avatar,
  Switch, Checkbox, Radio, Tabs, Kbd, Progress, Separator,
  Dialog, Dropdown, MenuItem,
});
