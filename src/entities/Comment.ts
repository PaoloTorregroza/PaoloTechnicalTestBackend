import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
} from 'typeorm'
import { Task } from './Task'
import { User } from './User'

@Entity({ name: 'comments' })
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
    user: User

    @ManyToOne(() => Task, (task) => task.comments)
    task: Task
}
