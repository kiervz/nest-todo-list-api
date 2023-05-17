import { Project } from 'src/entities/project';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user';
import { UserDto } from 'src/user/dto/user.dto';
import { ProjectDto } from 'src/project/dto/project.dto';
import { TodoStatus } from 'src/utils';

@Entity({ name: 'todos' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: UserDto;

  @Column({ nullable: true })
  project_id: number;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: ProjectDto;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.NOT_STARTED,
  })
  status: TodoStatus;

  @Column('date')
  due_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
