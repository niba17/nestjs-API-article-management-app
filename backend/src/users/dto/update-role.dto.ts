import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/auth/enum/role.enum';

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
