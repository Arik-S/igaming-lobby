'use client';

const wins = [
  { user: 'Guest-6c4d27', game: 'Fortune Tiger',     amount: '₲150.000',   thumbnail: 'https://cdn.softswiss.net/i/s3/softswiss/FortuneTiger.png' },
  { user: 'Guest-ae8b3d', game: 'Fortune Mouse',      amount: '₲60.000',    thumbnail: 'https://cdn.softswiss.net/i/s3/softswiss/FortuneMouse.png' },
  { user: 'Guest-ab6e54', game: 'Sweet Bonanza',      amount: '₲200.000',   thumbnail: 'https://cdn.softswiss.net/i/s3/softswiss/SweetBonanza.png' },
  { user: 'Guest-0f77ab', game: 'Gates of Olympus',   amount: '₲500.000',   thumbnail: 'https://cdn.softswiss.net/i/s3/softswiss/GatesofOlympus.png' },
  { user: 'Guest-1a2b3c', game: 'Crazy Time',         amount: '₲1.000.000', thumbnail: 'https://cdn.softswiss.net/i/s3/softswiss/CrazyTime.png' },
  { user: 'Guest-9f8e7d', game: 'Aviator',            amount: '₲350.000',   thumbnail: 'https://cdn.softswiss.net/i/s3/softswiss/Aviator.png' },
  { user: 'Guest-5b4a3c', game: 'Starlight Princess', amount: '₲250.000',   thumbnail: 'https://cdn.softswiss.net/i/s3/softswiss/StarlightPrincess.png' },
];

export function LastWins() {
  return (
    <div className="ticker-bar">
      {/* Label */}
      <div className="ticker-label">
        <span style={{ fontSize: 14 }}>🏆</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#FFB800', textTransform: 'uppercase', letterSpacing: 1, lineHeight: 1.3 }}>
          Últimas<br />Ganancias
        </span>
      </div>

      {/* Track */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {/* Fade left */}
        <div style={{ position:'absolute',left:0,top:0,bottom:0,width:32,background:'linear-gradient(to right,#0A1020,transparent)',zIndex:10,pointerEvents:'none' }} />
        {/* Fade right */}
        <div style={{ position:'absolute',right:0,top:0,bottom:0,width:32,background:'linear-gradient(to left,#0A1020,transparent)',zIndex:10,pointerEvents:'none' }} />

        <div className="animate-ticker" style={{ display:'flex',gap:10,width:'max-content' }}>
          {[...wins, ...wins].map((win, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 8, padding: '6px 12px', flexShrink: 0,
              transition: 'border-color 0.2s',
            }}>
              <img
                src={win.thumbnail}
                alt={win.game}
                style={{ width: 28, height: 28, borderRadius: 5, objectFit: 'cover', flexShrink: 0 }}
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/28x28/0d1a28/FFB800?text=G' }}
              />
              <div>
                <div style={{ fontSize: 10, color: '#3A5A75', maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{win.user}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#E8F0F8', whiteSpace: 'nowrap' }}>{win.game}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#00FF88', whiteSpace: 'nowrap' }}>{win.amount}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}