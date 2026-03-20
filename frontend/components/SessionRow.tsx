import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { GameCard } from './GameCard';
import { LobbySession } from '@/lib/types';

interface Props {
  session: LobbySession;
}

export function SessionRow({ session }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: session.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-8">
      {/* Session Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-yellow-500 transition-colors"
          title="Arrastrar para reordenar sesión"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6-12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
          </svg>
        </div>
        <h2 className="text-white font-bold text-lg">{session.name}</h2>
        <span className="text-gray-500 text-sm">({session.games.length} juegos)</span>
        <div className="flex-1 h-px bg-white/10 ml-2" />
        <span className="text-yellow-500 text-sm cursor-pointer hover:text-yellow-400">
          Ver todo →
        </span>
      </div>

      {/* Games Row */}
      <SortableContext
        items={session.games.map((g) => g.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {session.games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
