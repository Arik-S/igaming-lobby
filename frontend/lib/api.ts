const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function fetchSessions() {
  const res = await fetch(`${API_URL}/lobby-sessions`);
  if (!res.ok) throw new Error('Error fetching sessions');
  return res.json();
}

export async function reorderSessions(ids: number[]) {
  const res = await fetch(`${API_URL}/lobby-sessions/reorder`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-user-role': 'admin',
    },
    body: JSON.stringify({ ids }),
  });
  if (!res.ok) throw new Error('Error reordering sessions');
  return res.json();
}

export async function reorderGamesInSession(sessionId: number, ids: number[]) {
  const res = await fetch(`${API_URL}/lobby-sessions/${sessionId}/reorder-games`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-user-role': 'admin',
    },
    body: JSON.stringify({ ids }),
  });
  if (!res.ok) throw new Error('Error reordering games');
  return res.json();
}
