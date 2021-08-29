import {
  Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToOne, OneToMany, Unique,
} from 'typeorm'
import * as bcrypt from 'bcrypt'
import config from '../utils/apiConfig'
import { Company } from './Company'
import { Comment } from './Comment'
import { Task } from './Task'

@Unique(['mail'])
@Unique(['username'])
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  username: string

  @Column()
  mail: string

  @Column()
  password: string

  @ManyToOne(() => Company, (company) => company.users, { onDelete: 'SET NULL' })
  company: Company

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[]

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[]

  @BeforeInsert()
  encryptPassword() {
    try {
      this.password = bcrypt.hashSync(this.password, config.saltRounds)
    } catch (e) {
      console.log('Error encrypting password')
    }
  }

  public checkUnencryptedPassword(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password)
  }
}
