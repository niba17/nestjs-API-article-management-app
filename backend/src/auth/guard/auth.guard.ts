import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstant } from '../constants';

// Definisikan interface untuk payload JWT Anda
interface JwtPayload {
  sub: number;
  email: string;
  role: string;
  // tambahkan field lain sesuai isi token Anda
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Berikan tipe pada request agar tidak dianggap 'any'
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // Definisikan tipe hasil verifyAsync sebagai JwtPayload
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: jwtConstant.secret,
      });

      // Assign ke properti user. Agar TypeScript tidak komplain,
      // kita casting request sebagai 'any' hanya saat assignment
      // atau gunakan module augmentation.
      (request as any)['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
