import { Project } from 'src/project/entities/project.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

export enum TodoStatus {
  NOT_STARTED = 'Not Started',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

@Entity({ name: 'todos' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
