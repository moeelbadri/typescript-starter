import { Body, Controller, Get, Param, Post, Session } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dtos/create-movie.dto';
@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Post()
  create(@Body() body: CreateMovieDto) {
    return this.moviesService.create(body.title, body.link);
  }

  @Get()
  findAll(@Session() session: Record<string, any>) {
    // console.log(session)
    return this.moviesService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: number,@Session() session: any) {
    console.log(session)
    const data = await this.moviesService.findOne(id);
    if(session.is_paid) {
      data.link = "https://player.stopandmovie.com" + data.link.split("stream")[1]
    }
    console.log(data)
    return this.moviesService.findOne(id);
  }
}
