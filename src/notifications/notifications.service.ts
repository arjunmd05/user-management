import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  notifyUserCreated(user: { id: number; email: string }) {
    console.log(
      `Notification: User created | id=${user.id}, email=${user.email}`,
    );

    return {
      message: 'Notification sent',
    };
  }
}
