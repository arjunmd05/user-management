import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(userData: Partial<User>) {
    const user = await this.userRepository.save(userData);

    this.notificationsService.notifyUserCreated({
      id: user.id,
      email: user.email,
    });

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

  async findAllForReports() {
    return this.userRepository.find({
      select: ['id', 'name', 'email'],
    });
  }
}
