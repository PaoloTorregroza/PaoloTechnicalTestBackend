import {
  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { Project } from './Project'
import { Task } from './Task'

@Entity({ name: 'histories' })
export class History {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @ManyToOne(() => Project, (project) => project.histories, { onDelete: 'CASCADE' })
    project: Project

    @OneToMany(() => Task, (task) => task.history)
    tasks: Task[]
}
