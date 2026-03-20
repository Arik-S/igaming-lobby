import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Provider } from './providers/provider.entity';
import { Category } from './categories/category.entity';
import { Game } from './games/game.entity';
import { LobbySession } from './lobby-sessions/lobby-session.entity';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const providerRepo = app.get(getRepositoryToken(Provider));
  const categoryRepo = app.get(getRepositoryToken(Category));
  const gameRepo = app.get(getRepositoryToken(Game));
  const sessionRepo = app.get(getRepositoryToken(LobbySession));

  // Limpiar tablas
  await sessionRepo.query('DELETE FROM lobby_session_games');
  await sessionRepo.query('DELETE FROM lobby_sessions');
  await gameRepo.query('DELETE FROM games');
  await providerRepo.query('DELETE FROM providers');
  await categoryRepo.query('DELETE FROM categories');

  // Providers
  const providers = await providerRepo.save([
    { name: 'PG Soft', description: 'Proveedor de slots asiáticos' },
    { name: 'Pragmatic Play', description: 'Proveedor líder de slots' },
    { name: 'Evolution', description: 'Proveedor de casino en vivo' },
    { name: 'Hacksaw Gaming', description: 'Proveedor de slots innovadores' },
  ]);

  // Categories
  const categories = await categoryRepo.save([
    { name: 'Slots' },
    { name: 'Live Casino' },
    { name: 'Crash' },
    { name: 'Table Games' },
  ]);

  // Games
  const games = await gameRepo.save([
    { name: 'Fortune Tiger', thumbnail: 'https://placehold.co/200x200/FF6B35/white?text=Fortune+Tiger', provider: providers[0], category: categories[0] },
    { name: 'Fortune Ox', thumbnail: 'https://placehold.co/200x200/FF6B35/white?text=Fortune+Ox', provider: providers[0], category: categories[0] },
    { name: 'Fortune Mouse', thumbnail: 'https://placehold.co/200x200/FF6B35/white?text=Fortune+Mouse', provider: providers[0], category: categories[0] },
    { name: 'Fortune Rabbit', thumbnail: 'https://placehold.co/200x200/FF9500/white?text=Fortune+Rabbit', provider: providers[0], category: categories[0] },
    { name: 'Sweet Bonanza', thumbnail: 'https://placehold.co/200x200/E91E8C/white?text=Sweet+Bonanza', provider: providers[1], category: categories[0] },
    { name: 'Gates of Olympus', thumbnail: 'https://placehold.co/200x200/9C27B0/white?text=Gates+Olympus', provider: providers[1], category: categories[0] },
    { name: 'Big Bass Bonanza', thumbnail: 'https://placehold.co/200x200/2196F3/white?text=Big+Bass', provider: providers[1], category: categories[0] },
    { name: 'Starlight Princess', thumbnail: 'https://placehold.co/200x200/E91E63/white?text=Starlight', provider: providers[1], category: categories[0] },
    { name: 'Lightning Roulette', thumbnail: 'https://placehold.co/200x200/FFD700/black?text=Lightning+Roulette', provider: providers[2], category: categories[1] },
    { name: 'Crazy Time', thumbnail: 'https://placehold.co/200x200/FF4444/white?text=Crazy+Time', provider: providers[2], category: categories[1] },
    { name: 'Monopoly Live', thumbnail: 'https://placehold.co/200x200/4CAF50/white?text=Monopoly', provider: providers[2], category: categories[1] },
    { name: 'Aviator', thumbnail: 'https://placehold.co/200x200/F44336/white?text=Aviator', provider: providers[3], category: categories[2] },
  ]);

  // Lobby Sessions
  await sessionRepo.save([
    {
      name: 'Populares y Destacados',
      order: 0,
      games: [games[0], games[4], games[5], games[9], games[11], games[8]],
    },
    {
      name: 'PG Soft',
      order: 1,
      games: [games[0], games[1], games[2], games[3]],
    },
    {
      name: 'Pragmatic Play',
      order: 2,
      games: [games[4], games[5], games[6], games[7]],
    },
    {
      name: 'Casino en Vivo',
      order: 3,
      games: [games[8], games[9], games[10]],
    },
  ]);

  console.log('✅ Seed completado exitosamente!');
  await app.close();
}

seed().catch((err) => {
  console.error('❌ Error en seed:', err);
  process.exit(1);
});
