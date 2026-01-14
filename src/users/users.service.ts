import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly httpService: HttpService,
  ) {}

  async create(userData: Partial<User>) {
    const user = await this.userRepository.save(userData);

    await firstValueFrom(
      this.httpService.post('http://localhost:3002/notifications', {
        event: 'USER_CREATED',
        userId: user.id,
        email: user.email,
      }),
    );

    return user;
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  update(id: number, data: Partial<User>) {
    return this.userRepository.update(id, data);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
