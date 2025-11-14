import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    ){}
    findAll(){
        return this.usersRepository.find();
    }
    findOne(id: number){
        return this.usersRepository.findOneBy({id});
    }
    create(userData: Partial<User>){
        const user = this.usersRepository.create(userData);
        return this.usersRepository.save(user);
    }
     async findByEmail(email: string) {
        return this.usersRepository.findOne({ where: { email } });
}

}
