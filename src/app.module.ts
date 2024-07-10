import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
 import { AppController } from './app.controller';
 import { AppService } from './app.service';
 import { UsersModule } from './users/users.module';
 import { ReportsModule } from './reports/reports.module';
 import { User } from './users/user.entity';
 import { Report } from './reports/report.entity';
import { MoviesModule } from './movies/movies.module';
import { Movies } from './movies/movies.entity';
import { AuthModule } from './auth/auth.module';
// import { AuthService } from './auth/auth.service';
// import { AuthModule } from './auth/auth.module';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User,Report,Movies],
    synchronize: true,
  })
  ,UsersModule, ReportsModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
