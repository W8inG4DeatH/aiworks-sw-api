import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comix } from './comix.entity';
import { ComixService } from './comix.service';
import { ComixController } from './comix.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Comix])],
  providers: [ComixService],
  controllers: [ComixController],
})
export class ComixModule {}