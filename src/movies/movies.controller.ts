import { Controller, Get, Post, Put, Delete, Query, Param, Body } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-user.dto';


@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    // GET /movies?limit=5&skip=0
    @Get()
    async getAllMovie(
        @Query('limit') limit: number,
        @Query('skip') skip: number
    ) {
        limit = limit || 25;
        skip = skip || 0;
        return await this.moviesService.getAllMovie(limit, skip);
    }

    // GET /movies/<ID>
    @Get(':id')
    async getMovieById(
        @Param('id') id: string
    ) {
        if(!id) {
            throw new NotFoundException('No movies ID found');
        }
        return await this.moviesService.getMovieById(id);
    }

    // POST /movies/add
    @Post('add')
    async createMovie(
        @Body() createMovieDTO: CreateMovieDTO
    ) {
        return await this.moviesService.createMovie(createMovieDTO);
    }

    @Put(':id')
    async updateMovieById(
        @Param('id') id: string,
        @Body() updateMovieDTO: UpdateMovieDTO
    ) {

    }

    // DELETE http://127.0.0.1:3000/movies/69d3f9d3513ad35084968cac
    @Delete(':id')
    async deleteMovieById(
        @Param('id') id: string
    ) {
        return await this.moviesService.deleteMovie(id);
    }
}
