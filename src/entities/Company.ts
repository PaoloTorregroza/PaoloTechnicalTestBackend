import {
  Entity, Column, PrimaryColumn, OneToMany,
} from 'typeorm'
import { Project } from './Project'
import { User } from './User'

@Entity({ name: 'companies' })
export class Company {
    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @Column()
    mail: string

    @Column()
    phone: string

    @OneToMany(() => User, (user) => user.company)
    users: User[];

    @OneToMany(() => Project, (project) => project.company)
    projects: Project[]
}
