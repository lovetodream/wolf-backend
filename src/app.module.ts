import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { AppModule as ProjectAppModule } from './app/app.module';
import { AuthModule } from './auth/auth.module';
import { Request, Response } from 'express';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB, { dbName: 'wolf' }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      subscriptions: {
        'graphql-ws': true,
      },
      context: (req: Request, res: Response) => ({ req, res }),
    }),
    ProjectModule,
    ProjectAppModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
