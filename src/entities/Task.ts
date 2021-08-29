/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import {
  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { Comment } from './Comment'
import { History } from './History'
import { User } from './User'

export enum TaskStatus {
  ACTIVE = 'active',
  WORKING = 'working',
  DONE = 'done'
}

@Entity({ name: 'tasks' })
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
    user: User

    @ManyToOne(() => History, (history) => history.tasks, { onDelete: 'CASCADE' })
    history: History

    @OneToMany(() => Comment, (comment) => comment.task)
    comments: Comment[]

    @Column()
    description: string

    @Column({
      type: 'enum',
      enum: TaskStatus,
      default: TaskStatus.ACTIVE,
    })
    status: TaskStatus
}
