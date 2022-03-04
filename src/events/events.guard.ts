import { CanActivate, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';

@Injectable()
export default class EventsGuard implements CanActivate {
  private readonly logger = new Logger(EventsGuard.name);
  constructor(private jwtService: JwtService) {}

  canActivate(context: any): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    let bearerToken;
    if (context?.args[0]?.handshake?.headers?.authorization) {
      bearerToken = context.args[0].handshake.headers.authorization.split(' ')[1];
    } else {
      this.logger.warn('Not Authorized');
      return new Promise((resolve, reject) => {
        reject(false);
      });
    }

    try {
      const decoded = this.jwtService.verify(bearerToken) as any;
      return new Promise((resolve, reject) => {
        if (decoded.userId && decoded.userEmail) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    } catch (ex) {
      this.logger.debug(ex);
      return false;
    }
  }
}
