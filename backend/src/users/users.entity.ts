import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

   @Column()
  name: string;

  @Column({ nullable: true }) // <-- SI NO EXISTE, AÑÁDELA
  foto: string;

  @Column({ nullable: true, name:'google_id' }) 
  googleId: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  career: string; 

  @Column({ nullable: true })
  study_level: string; 
  
  @Column({ default: true })
  isActive: boolean;

 

}
