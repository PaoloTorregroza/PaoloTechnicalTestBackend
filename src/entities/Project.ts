import {
  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { Company } from './Company'
import { History } from './History'

@Entity({ name: 'projects' })
export class Project {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => Company, (company) => company.projects, { onDelete: 'CASCADE' })
    company: Company

    @OneToMany(() => History, (history) => history.project)
    histories: History[]
}
