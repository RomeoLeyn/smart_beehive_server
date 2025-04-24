import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiaryModule } from './apiaries/apiary.module';
import { BeehiveModule } from './beehive/beehive.module';
import { MqttModule } from './mqtt/mqtt.module';
import { ReadingsModule } from './readings/readings.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // host: configService.get<string>('DB_HOST'),
        host: 'dpg-d0530t15pdvs73ajhov0-a',
        port: configService.get<number>('DB_PORT'),
        username: 'smart_bee_db_user',
        password: '8vHU2KZcdz32xu70fMtUq0UuQF5UFaEK',
        database: 'smartsmart_bee_db',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ApiaryModule,
    BeehiveModule,
    MqttModule,
    ReadingsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
