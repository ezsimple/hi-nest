import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Put,
  Body,
  Query,
} from '@nestjs/common';
import crypto from 'crypto';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
  // 중요: nest에서는 express 처럼 import를 직접 사용하지 않음.
  constructor(private readonly moviesService: MoviesService) {}

  @Get('all')
  getAllMovies(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('search')
  search(@Query('year') searchingYear: number): string {
    return `search year : ${searchingYear}`;
  }

  @Get(':id')
  getOneMovie(@Param('id') movieId: number): Movie {
    /* 실제변수명(id vs movieId) 은 달라도 됩니다. */
    return this.moviesService.getOne(movieId);
  }

  @Post()
  createOneMove(@Body() movieData): Movie[] {
    console.log(movieData);
    return this.moviesService.createOne(movieData);
  }

  @Put()
  updateAllMove(): string {
    /* @Put method는 모든 걸 업데이트 할 때 사용 */
    return 'update all movies';
  }

  @Patch(':id')
  updateOneMove(@Param('id') movieId: number): string {
    /* @Patch method는 일부 업데이트 할 때 사용 */
    const id = movieId.toString();
    return `update one movie id : ${id}`;
  }

  @Delete(':id')
  deleteOneMove(@Param('id') movieId: number): boolean {
    return this.moviesService.deleteOne(movieId);
  }

  // sha1은 단방향 hash로써 복호화 할 수 없습니다.
  sha1(data: number): string {
    return crypto
      .createHash('sha1')
      .update(data.toString(), 'binary')
      .digest('hex');
  }
}
