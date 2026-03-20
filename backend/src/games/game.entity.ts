import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { Provider } from '../providers/provider.entity';
import { Category } from '../categories/category.entity';
import { LobbySession } from '../lobby-sessions/lobby-session.entity';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  thumbnail: string;

  @ManyToOne(() => Provider, (provider) => provider.games)
  provider: Provider;

  @ManyToOne(() => Category, (category) => category.games)
  category: Category;

  @ManyToMany(() => LobbySession, (session) => session.games)
  sessions: LobbySession[];
}
