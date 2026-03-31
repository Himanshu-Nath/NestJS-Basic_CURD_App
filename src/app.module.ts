import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URL') || 'mongodb://localhost:27017/sample_mfli',
        onConnectionCreate: (connection) => {
          connection.on('connected', ()=> {
            console.log('MongoDB connected successfully');
          });

          connection.on('disconnected', ()=> {
            console.log('MongoDB disconnected');
          });

          connection.on('error', (err)=> {
            console.log('MongoDB connection error:', err);
          });

          return connection;
        }
      }) // MongooseModule.forRoot(process.env.DB_URL || 'mongodb://localhost:27017/nestdb')
    }),
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
