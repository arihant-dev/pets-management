import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [PetsModule, 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'pets',
      entities: [PetsModule],
      synchronize: true,
      autoLoadEntities: true,
  })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
