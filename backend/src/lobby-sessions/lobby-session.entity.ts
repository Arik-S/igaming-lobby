import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Game } from '../games/game.entity';

@Entity('lobby_sessions')
export class LobbySession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  order: number;

  @ManyToMany(() => Game, (game) => game.sessions)
  @JoinTable({
    name: 'lobby_session_games',
    joinColumn: { name: 'session_id' },
    inverseJoinColumn: { name: 'game_id' },
  })
  games: Game[];
}
