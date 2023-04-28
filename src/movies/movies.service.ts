import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    // movies.id 는 number형으로 선언되어 있음.
    // +id는 string을 number로 변경해주는 기능을 함.
    const movie = this.movies.find((movies) => movies.id === +id);

    if (!movie) {
      // NestJS에서는 Exception에 대한 정의도 되어 있어서, 사용하기만 하면 됨.
      // errorCode : 404 를 보내게 됨.
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }

    return movie;
  }

  deleteOne(id: number): boolean {
    this.getOne(id); // 없으면, 404 Excepiton이 발생함.
    return this.movies.filter((movies) => movies.id !== +id).length > 0;
  }

  createOne(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
    return this.movies;
  }

  updateOne(id: number, updateData) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.createOne({ movie, ...updateData });
  }
}
