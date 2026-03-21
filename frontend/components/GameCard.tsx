'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Game } from '@/lib/types';

interface Props {
  game: Game;
  tag?: 'hot' | 'new' | 'jackpot' | '';
  jackpotAmount?: string;
}

export function GameCard({ game, tag = '', jackpotAmount }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: game.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 50 : undefined,
  };

  const placeholder = `https://placehold.co/158x158/0d1a28/FFB800?text=${encodeURIComponent(game.name[0])}`;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="game-card-wrap">
      <div className="game-card-inner">
        <div className="game-card-img">
          {game.thumbnail ? (
            <img
              src={game.thumbnail}
              alt={game.name}
              draggable={false}
              onError={(e) => { (e.target as HTMLImageElement).src = placeholder }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              background: 'linear-gradient(135deg,rgba(255,184,0,0.08),rgba(255,140,0,0.04))',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48,
            }}>🎮</div>
          )}

          <div className="game-overlay">
            <button className="game-play-btn">▶ Jugar Ahora</button>
          </div>

          <div className="game-cat-badge">{game.category.name}</div>

          {tag === 'hot'    && <div className="game-tag-hot">HOT 🔥</div>}
          {tag === 'new'    && <div className="game-tag-new">NEW ✨</div>}
          {tag === 'jackpot' && (
            <div style={{ position:'absolute',top:8,right:8,background:'rgba(255,184,0,0.9)',color:'#1a0a00',fontSize:9,fontWeight:800,padding:'3px 8px',borderRadius:20,zIndex:2 }}>JP 💰</div>
          )}
          {tag === 'jackpot' && jackpotAmount && (
            <div style={{ position:'absolute',bottom:0,left:0,right:0,background:'linear-gradient(135deg,rgba(255,184,0,0.92),rgba(255,140,0,0.92))',padding:'4px 8px',textAlign:'center',zIndex:2,fontFamily:'Rajdhani,sans-serif',fontSize:13,fontWeight:700,color:'#1a0a00' }}>
              {jackpotAmount}
            </div>
          )}
        </div>

        <div className="game-info">
          <div className="game-name">{game.name}</div>
          <div className="game-provider">{game.provider.name}</div>
        </div>
      </div>
    </div>
  );
}