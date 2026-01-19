import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { Role } from './enum/role.enum';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerDto: RegisterDto): Promise<{ message: string }> {
    const hashPassword = await bcrypt.hash(registerDto.password, 10);

    const userEmail = await this.userRepository.findOneBy({
      email: registerDto.email,
    });

    // PERBAIKAN: Gunakan registerDto (instance), bukan RegisterDto (Class)
    // Serta gunakan properti name, bukan email
    const userName = await this.userRepository.findOneBy({
      name: registerDto.name,
    });

    if (userEmail) {
      throw new ConflictException('Email is already exist');
    }

    if (userName) {
      throw new ConflictException('Username is already exist');
    }

    const userDataCount = await this.userRepository.count();
    const roleUser: Role = userDataCount === 0 ? Role.ADMIN : Role.USER;

    const newUser = this.userRepository.create({
      ...registerDto,
      password: hashPassword,
      role: roleUser,
    });

    await this.userRepository.save(newUser);

    return {
      message: 'Register user berhasil',
    };
  }

  async loginUser(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatching = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  // PERBAIKAN: Menambahkan return null di akhir dan menangani jalur undefined
  async getUser(id: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      return null;
    }

    // Sensor password sebelum dikirim
    if (user.password) {
      user.password = '*************';
    }

    return user;
  }
}
