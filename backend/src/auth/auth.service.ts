import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { Role } from './enum/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async registerUser(registerDto: RegisterDto): Promise<{ message: string }> {
    const hashPassword = await bcrypt.hash(registerDto.password, 10);

    const userEmail = await this.userRepository.findOneBy({
      email: registerDto.email,
    });

    const userName = await this.userRepository.findOneBy({
      email: RegisterDto.name,
    });

    if (userEmail) {
      throw new ConflictException('Email is already exist');
    }

    if (userName) {
      throw new ConflictException('Username is already exist');
    }

    const userData = await this.userRepository.find();
    const roleUser: Role = userData.length === 0 ? Role.ADMIN : Role.USER;

    const newUser = this.userRepository.create({
      ...registerDto,
      password: hashPassword,
      role: roleUser,
    });

    await this.userRepository.save(newUser);

    return {
      message: 'Register user barhasil',
    };
  }
}
