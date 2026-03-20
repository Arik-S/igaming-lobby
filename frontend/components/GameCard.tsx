import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Game } from '@/lib/types';

interface Props {
  game: Game;
}

export function GameCard({ game }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: game.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex-shrink-0 w-36 cursor-grab active:cursor-grabbing group"
    >
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:border-yellow-500/50 hover:bg-white/10 transition-all duration-200">
        {game.thumbnail ? (
          <img
            src={game.thumbnail}
            alt={game.name}
            className="w-full h-24 object-cover"
            draggable={false}
          />
        ) : (
          <div className="w-full h-24 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
            <span className="text-2xl">🎮</span>
          </div>
        )}
        <div className="p-2">
          <p className="text-white text-xs font-medium truncate">{game.name}</p>
          <p className="text-gray-400 text-xs truncate">{game.provider.name}</p>
        </div>
      </div>
    </div>
  );
}
