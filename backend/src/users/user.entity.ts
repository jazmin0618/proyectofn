import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

   @Column()
  name: string;

  @Column({ nullable: true })
  occupation: string; 

  @Column({ nullable: true })
  purpose: string; 
  
  @Column({ default: true })
  isActive: boolean;
}
