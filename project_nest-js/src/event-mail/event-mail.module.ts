import { Module } from '@nestjs/common';
import { UserDocument } from 'src/user/model/user.schema';
import { MailerService } from '@nestjs-modules/mailer';
import { OnEvent } from '@nestjs/event-emitter';

@Module({})
export class EventMailModule {
  constructor(private readonly mailService: MailerService) {}
  /**
   * Metodo para enviar email de registro
   * @param user
   */
  @OnEvent('user.created')
  handleUserCreatedEvent(user: UserDocument) {
    console.log('___evento user created___', user);
    this.mailService.sendMail({
      to: user.email,
      subject: 'Bienvenido a nuestra plataforma',
      template: 'welcome',
      context: {
        name: user.name,
      },
    });
  }

  /**
   * Metodo para enviar email de inicio de sesion
   * @param user
   */
  @OnEvent('user.login')
  handleUserWelcomeEvent(user: any) {
    console.log('___evento login___', user);
    // aqui enviar email de bienvenida
  }
}
