'use client';

import { useState } from 'react';

const navigation = [
  {
    section: 'Casino',
    items: [
      { label: 'Lobby',           icon: '🏠', badge: null,   badgeType: null,    href: '/',           active: true },
      { label: 'Tragamonedas',    icon: '🎰', badge: 'HOT',  badgeType: 'danger', href: '/slots' },
      { label: 'Casino en Vivo',  icon: '🎲', badge: 'LIVE', badgeType: 'danger', href: '/live' },
      { label: 'Mesas',           icon: '🃏', badge: null,   badgeType: null,    href: '/tables' },
      { label: 'Rascas',          icon: '🎱', badge: null,   badgeType: null,    href: '/scratch' },
    ],
  },
  {
    section: 'Originales',
    items: [
      { label: 'Aviator',  icon: '✈️', badge: 'NEW', badgeType: 'info',  href: '/aviator' },
      { label: 'Mines',    icon: '💣', badge: null,  badgeType: null,    href: '/mines' },
      { label: 'Crash',    icon: '🚀', badge: null,  badgeType: null,    href: '/crash' },
      { label: 'Penalti',  icon: '⚽', badge: null,  badgeType: null,    href: '/penalty' },
    ],
  },
  {
    section: 'Cuenta',
    items: [
      { label: 'Torneos',   icon: '🏆', badge: null, badgeType: null,    href: '/tournaments' },
      { label: 'Bonos',     icon: '🎁', badge: '3',  badgeType: 'danger', href: '/bonuses' },
      { label: 'Referidos', icon: '👥', badge: null, badgeType: null,    href: '/referrals' },
      { label: 'Historial', icon: '📊', badge: null, badgeType: null,    href: '/history' },
    ],
  },
];

const badgeStyles: Record<string, string> = {
  danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
  info:   'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25',
};

export function Sidebar() {
  const [balance] = useState('₲ 2.450.000');

  return (
    <aside className="w-[220px] flex-shrink-0 bg-[#070D18] border-r border-white/[0.05] flex flex-col min-h-screen sticky top-0 h-screen overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-yellow-500/10">

      {/* Logo */}
      <div className="px-4 py-5 border-b border-white/[0.04]">
        <div className="font-['Rajdhani'] text-[22px] font-bold tracking-widest bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-100 bg-clip-text text-transparent">
          ⚡ GOLDBET
        </div>
        <div className="text-[9px] text-slate-600 tracking-[3px] uppercase mt-0.5">
          Casino Online
        </div>
      </div>

      {/* Balance card */}
      <div className="mx-3 mt-3 p-3 bg-yellow-500/[0.07] border border-yellow-500/20 rounded-xl">
        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Saldo disponible</p>
        <p className="font-['Rajdhani'] text-[20px] font-bold text-yellow-500 mt-0.5">{balance}</p>
        <button className="mt-2 w-full py-1.5 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-[#1a0a00] text-[11px] font-bold uppercase tracking-wide hover:brightness-110 transition-all">
          + Depositar
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-2">
        {navigation.map((group) => (
          <div key={group.section} className="mb-1">
            <p className="px-4 pt-3 pb-1 text-[9px] text-slate-600 uppercase tracking-[2px] font-semibold">
              {group.section}
            </p>
            {group.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`
                  flex items-center gap-2.5 px-4 py-2 text-[12px] font-medium
                  border-l-2 transition-all duration-150 no-underline
                  ${item.active
                    ? 'border-yellow-500 bg-yellow-500/[0.06] text-yellow-400'
                    : 'border-transparent text-slate-400 hover:text-white hover:bg-white/[0.03] hover:border-yellow-500/30'
                  }
                `}
              >
                <span className="text-sm w-5 text-center">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge && item.badgeType && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${badgeStyles[item.badgeType]}`}>
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/[0.04] text-center">
        <p className="text-[10px] text-slate-600 leading-relaxed">
          Juego responsable<br />
          <span className="text-yellow-600/70">+18 años</span>
          {' · '}
          <span className="text-yellow-600/70">Licenciado</span>
        </p>
      </div>
    </aside>
  );
}