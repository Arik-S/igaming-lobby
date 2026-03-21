'use client';

import { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { SessionRow } from '@/components/SessionRow';
import { LastWins } from '@/components/LastWins';
import { LobbySession } from '@/lib/types';
import { fetchSessions, reorderSessions, reorderGamesInSession } from '@/lib/api';

const tabs = [
  { label: 'Salón',       icon: '⚡' },
  { label: 'Slots',       icon: '🎰' },
  { label: 'Live Casino', icon: '📡' },
  { label: 'Crash',       icon: '✈️' },
  { label: 'Table Games', icon: '🃏' },
];

const sidebarNav = [
  {
    section: 'Originales',
    items: [
      { label: 'Crash',   icon: '🚀' },
      { label: 'Mines',   icon: '💣' },
      { label: 'Penalti', icon: '⚽' },
    ],
  },
  {
    section: 'Casino',
    items: [
      { label: 'Tragamonedas',    icon: '🎰', badge: 'HOT' },
      { label: 'Casino en Vivo',  icon: '🎲', badge: 'LIVE' },
      { label: 'Juegos en Vivo',  icon: '📡' },
      { label: 'Tabla de Juegos', icon: '🃏' },
    ],
  },
  {
    section: 'Páginas',
    items: [
      { label: 'FAQs',              icon: '📄' },
      { label: 'Invita a un amigo', icon: '👥' },
    ],
  },
];

export default function Home() {
  const [sessions, setSessions]       = useState<LobbySession[]>([]);
  const [loading, setLoading]         = useState(true);
  const [activeTab, setActiveTab]     = useState(0);
  const [search, setSearch]           = useState('');
  const [onlineCount, setOnlineCount] = useState(1247);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    fetchSessions().then(setSessions).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setOnlineCount((p) => Math.max(1100, Math.min(1400, p + Math.floor(Math.random() * 20) - 10)));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const sessionIds = sessions.map((s) => s.id);
    if (sessionIds.includes(Number(active.id)) && sessionIds.includes(Number(over.id))) {
      const oldIdx = sessions.findIndex((s) => s.id === active.id);
      const newIdx = sessions.findIndex((s) => s.id === over.id);
      const next = arrayMove(sessions, oldIdx, newIdx);
      setSessions(next);
      reorderSessions(next.map((s) => s.id));
      return;
    }
    for (const session of sessions) {
      const gameIds = session.games.map((g) => g.id);
      if (gameIds.includes(Number(active.id)) && gameIds.includes(Number(over.id))) {
        const oldIdx = session.games.findIndex((g) => g.id === active.id);
        const newIdx = session.games.findIndex((g) => g.id === over.id);
        const newGames = arrayMove(session.games, oldIdx, newIdx);
        setSessions((prev) =>
          prev.map((s) => s.id === session.id ? { ...s, games: newGames } : s)
        );
        reorderGamesInSession(session.id, newGames.map((g) => g.id));
        return;
      }
    }
  }

  const filteredSessions = sessions
    .map((s) => ({
      ...s,
      games: search
        ? s.games.filter(
            (g) =>
              g.name.toLowerCase().includes(search.toLowerCase()) ||
              g.provider.name.toLowerCase().includes(search.toLowerCase())
          )
        : s.games,
    }))
    .filter((s) => s.games.length > 0);

  return (
    <div style={{ minHeight: '100vh', background: '#060B14', display: 'flex', flexDirection: 'column' }}>

      {/* ── TOPBAR ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(6,11,20,0.97)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        height: 56, display: 'flex', alignItems: 'center',
        padding: '0 20px', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg,#FFB800,#FF8C00)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#1a0a00', fontWeight: 900, fontSize: 13 }}>iG</span>
          </div>
          <span style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: 18, color: 'white', letterSpacing: 1 }}>
            iGaming Lobby
          </span>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 8, padding: '0 12px', height: 36,
          flex: 1, maxWidth: 340,
        }}>
          <span style={{ color: '#64748b', fontSize: 13 }}>🔍</span>
          <input
            type="text"
            placeholder="Buscar juegos o proveedores..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ background: 'none', border: 'none', outline: 'none', color: 'white', fontSize: 12, width: '100%', fontFamily: 'inherit' }}
          />
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: '#4ade80' }}>
            <span className="live-dot" /> Admin Mode
          </div>
          <button style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'none', color: '#cbd5e1', padding: '6px 14px', borderRadius: 8, fontSize: 12, cursor: 'pointer' }}>
            Iniciar sesión
          </button>
          <button style={{ background: 'linear-gradient(135deg,#FFB800,#FF8C00)', border: 'none', color: '#1a0a00', padding: '6px 16px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
            Crear cuenta
          </button>
        </div>
      </header>

      <div className="layout-body">

        {/* ── SIDEBAR ── */}
        <aside className="sidebar">
          <div className="balance-card">
            <p style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>Saldo disponible</p>
            <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 20, fontWeight: 700, color: '#FFB800', marginTop: 2 }}>₲ 2.450.000</p>
            <button className="deposit-btn">+ Depositar</button>
          </div>

          <nav style={{ flex: 1, paddingTop: 8 }}>
            {sidebarNav.map((group) => (
              <div key={group.section}>
                <p style={{ padding: '12px 16px 4px', fontSize: 9, color: '#475569', textTransform: 'uppercase', letterSpacing: 2, fontWeight: 600 }}>
                  {group.section}
                </p>
                {group.items.map((item) => (
                  <a key={item.label} href="#" className="nav-item">
                    <span style={{ fontSize: 13, width: 18, textAlign: 'center' }}>{item.icon}</span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {'badge' in item && item.badge && (
                      <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 20, background: 'rgba(255,68,102,0.2)', color: '#FF6680', border: '1px solid rgba(255,68,102,0.3)' }}>
                        {item.badge}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            ))}
          </nav>

          <div style={{ padding: 16, borderTop: '1px solid rgba(255,255,255,0.04)', textAlign: 'center', fontSize: 10, color: '#475569', lineHeight: 1.6 }}>
            Juego responsable<br />
            <span style={{ color: 'rgba(255,184,0,0.5)' }}>+18 años · Licenciado</span>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main style={{ flex: 1, padding: '20px 24px', overflowX: 'hidden' }}>

          {/* Hero */}
          <div className="hero-banner">
            <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,184,0,0.1)', border: '1px solid rgba(255,184,0,0.2)', borderRadius: 20, padding: '4px 12px', marginBottom: 12 }}>
                <span className="live-dot" />
                <span style={{ color: '#FFB800', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2 }}>En Vivo Ahora</span>
              </div>
              <h1 style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 32, fontWeight: 700, lineHeight: 1.1, color: 'white', marginBottom: 8 }}>
                El mejor casino<br />
                <span style={{ background: 'linear-gradient(90deg,#FFB800,#FFD700,#FFF0A0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  online del Paraguay
                </span>
              </h1>
              <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 16 }}>
                Más de 3.000 juegos en vivo. Girá la rueda y reclamá tu bono.
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                <button style={{ background: 'linear-gradient(135deg,#FFB800,#FF8C00)', border: 'none', color: '#1a0a00', padding: '10px 22px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                  🎁 Reclamar Bono
                </button>
                <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '10px 22px', borderRadius: 8, fontSize: 12, cursor: 'pointer' }}>
                  ▶ Ver Torneos
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginLeft: 32, flexShrink: 0, position: 'relative', zIndex: 1 }}>
              <div className="stat-card">
                <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 22, fontWeight: 700, color: '#FFB800' }}>₲ 8.2M</p>
                <p style={{ fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 }}>Jackpot actual</p>
              </div>
              <div className="stat-card">
                <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 22, fontWeight: 700, color: '#FFB800' }}>
                  {onlineCount.toLocaleString('es-PY')}
                </p>
                <p style={{ fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 }}>Jugando ahora</p>
              </div>
            </div>
          </div>

          {/* Last Wins */}
          <LastWins />

          {/* Promo strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
            {[
              { cls: 'gold',   tag: '🎁 Bono de Bienvenida', title: '100% hasta ₲500.000', sub: 'En tu primer depósito',  cta: 'Reclamar →',    color: '#FFB800' },
              { cls: 'purple', tag: '🏆 Torneo Semanal',      title: '₲ 2.000.000 premios', sub: 'Top 50 jugadores ganan', cta: 'Ver tabla →',    color: '#CC88FF' },
              { cls: 'green',  tag: '⚡ Free Spins Diarios',  title: '50 Giros Gratis',      sub: 'En Sweet Bonanza hoy',  cta: 'Girar gratis →', color: '#00FF88' },
            ].map((p) => (
              <div key={p.cls} className={`promo-card ${p.cls}`}>
                <p style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: p.color, marginBottom: 6 }}>{p.tag}</p>
                <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 4 }}>{p.title}</p>
                <p style={{ fontSize: 11, color: '#64748b', marginBottom: 10 }}>{p.sub}</p>
                <p style={{ fontSize: 11, fontWeight: 700, color: p.color }}>{p.cta}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto' }} className="scrollbar-hide">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`tab-pill${activeTab === i ? ' active' : ''}`}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>

          {/* Admin tip */}
          <div className="admin-tip">
            <span>🎯</span>
            <span>
              <strong style={{ color: '#FFB800' }}>Modo Admin:</strong> Arrastrá el ícono <strong style={{ color: '#FFB800' }}>⠿</strong> para reordenar sesiones, y arrastrá los juegos para reordenarlos dentro de cada sesión.
            </span>
          </div>

          {/* Sessions */}
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
              <span style={{ fontFamily: 'Rajdhani,sans-serif', color: '#FFB800', fontSize: 18, letterSpacing: 3 }}>
                CARGANDO LOBBY...
              </span>
            </div>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={filteredSessions.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                {filteredSessions.map((session) => (
                  <SessionRow key={session.id} session={session} />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </main>
      </div>
    </div>
  );
}