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
import { LobbySession, Game } from '@/lib/types';
import { fetchSessions, reorderSessions, reorderGamesInSession } from '@/lib/api';

export default function Home() {
  const [sessions, setSessions] = useState<LobbySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSession, setActiveSession] = useState<number | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    fetchSessions()
      .then(setSessions)
      .finally(() => setLoading(false));
  }, []);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // Reordenar sesiones
    const sessionIds = sessions.map((s) => s.id);
    if (sessionIds.includes(Number(active.id)) && sessionIds.includes(Number(over.id))) {
      const oldIndex = sessions.findIndex((s) => s.id === active.id);
      const newIndex = sessions.findIndex((s) => s.id === over.id);
      const newSessions = arrayMove(sessions, oldIndex, newIndex);
      setSessions(newSessions);
      reorderSessions(newSessions.map((s) => s.id));
      return;
    }

    // Reordenar juegos dentro de una sesión
    for (const session of sessions) {
      const gameIds = session.games.map((g) => g.id);
      if (gameIds.includes(Number(active.id)) && gameIds.includes(Number(over.id))) {
        const oldIndex = session.games.findIndex((g) => g.id === active.id);
        const newIndex = session.games.findIndex((g) => g.id === over.id);
        const newGames = arrayMove(session.games, oldIndex, newIndex);
        setSessions((prev) =>
          prev.map((s) =>
            s.id === session.id ? { ...s, games: newGames } : s
          )
        );
        reorderGamesInSession(session.id, newGames.map((g) => g.id));
        return;
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1923] flex items-center justify-center">
        <div className="text-yellow-500 text-xl animate-pulse">Cargando lobby...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1923]">
      {/* Header */}
      <header className="bg-[#0a1118] border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-sm">iG</span>
          </div>
          <span className="text-white font-bold text-xl">iGaming Lobby</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">Admin Mode</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
      </header>

      {/* Category Tabs */}
      <div className="bg-[#0a1118] border-b border-white/10 px-6">
        <div className="flex gap-6 overflow-x-auto">
          {['Salón', 'Slots', 'Live Casino', 'Crash', 'Table Games'].map((tab, i) => (
            <button
              key={tab}
              className={`py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                i === 0
                  ? 'border-yellow-500 text-yellow-500'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="px-6 py-8 max-w-7xl mx-auto">
        {/* Info Banner */}
        <div className="mb-8 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex items-center gap-3">
          <span className="text-yellow-500 text-xl">🎯</span>
          <p className="text-yellow-200 text-sm">
            <strong>Modo Admin:</strong> Arrastrá el ícono <strong>⠿</strong> para reordenar sesiones, y arrastrá los juegos para reordenarlos dentro de cada sesión.
          </p>
        </div>

        {/* Sessions with DnD */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sessions.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {sessions.map((session) => (
              <SessionRow key={session.id} session={session} />
            ))}
          </SortableContext>
        </DndContext>
      </main>
    </div>
  );
}
