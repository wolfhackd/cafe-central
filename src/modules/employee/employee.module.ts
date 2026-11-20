import { Module } from '@nestjs/common';
import { PasswordHasherModule } from '../../lib/PasswordHasher/bcrypt-password-hasher.module.js';
import { PrismaModule } from '../../prisma/prisma.module.js';
import { EmployeeController } from './employee.controller.js';
import { EmployeeRepository } from './employee.repository.js';
import { EmployeeService } from './employee.service.js';

@Module({
  imports: [PasswordHasherModule, PrismaModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository],
  exports: [EmployeeRepository],
})
export class EmployeeModule {}
