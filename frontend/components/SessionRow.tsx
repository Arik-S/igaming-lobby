import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { GameCard } from './GameCard';
import { LobbySession } from '@/lib/types';

interface Props { session: LobbySession }

export function SessionRow({ session }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: session.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={{ ...style, marginBottom: 28 }}>
      <div className="section-header">
        <div {...attributes} {...listeners} className="drag-handle" title="Arrastrar para reordenar">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <circle cx="4" cy="3"  r="1.2"/><circle cx="10" cy="3"  r="1.2"/>
            <circle cx="4" cy="7"  r="1.2"/><circle cx="10" cy="7"  r="1.2"/>
            <circle cx="4" cy="11" r="1.2"/><circle cx="10" cy="11" r="1.2"/>
          </svg>
        </div>
        <div className="section-accent" />
        <span className="section-title-text">{session.name}</span>
        <span className="section-count">{session.games.length}</span>
        <div className="section-line" />
        <button className="section-more">Ver todo →</button>
      </div>

      <SortableContext items={session.games.map((g) => g.id)} strategy={horizontalListSortingStrategy}>
        <div className="games-row">
          {session.games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}