import { Module } from '@nestjs/common';
import { AmoozeshService } from './amoozesh.service';
import { AmoozeshController } from './amoozesh.controller';
import { UsersModule } from 'src/users/users.module';
import { AmoozeshRepository } from './amoozesh.repository';

@Module({
  providers: [AmoozeshService, AmoozeshRepository],
  controllers: [AmoozeshController],
  imports: [UsersModule]
})
export class AmoozeshModule {}
