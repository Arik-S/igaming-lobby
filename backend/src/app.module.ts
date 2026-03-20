import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersModule } from './providers/providers.module';
import { CategoriesModule } from './categories/categories.module';
import { GamesModule } from './games/games.module';
import { LobbySessionsModule } from './lobby-sessions/lobby-sessions.module';
import { Provider } from './providers/provider.entity';
import { Category } from './categories/category.entity';
import { Game } from './games/game.entity';
import { LobbySession } from './lobby-sessions/lobby-session.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5433'),
      username: process.env.DB_USER ?? 'igaming',
      password: process.env.DB_PASSWORD ?? 'igaming123',
      database: process.env.DB_NAME ?? 'igaming_lobby',
      entities: [Provider, Category, Game, LobbySession],
      synchronize: true,
    }),
    ProvidersModule,
    CategoriesModule,
    GamesModule,
    LobbySessionsModule,
  ],
})
export class AppModule {}
