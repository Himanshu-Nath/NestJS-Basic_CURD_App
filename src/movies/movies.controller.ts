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
        const data = await this.moviesService.getAllMovie(limit, skip);
        return { success: true, ...data };
    }

    // GET /movies/<ID>
    @Get(':id')
    async getMovieById(
        @Param('id') id: string
    ) {
        if(!id) {
            throw new NotFoundException('No movies found')
        }
        const data = await this.moviesService.getMovieById(id);
        return { status: true, data}
    }

    // POST /movies/add
    @Post('add')
    async createMovie(
        @Body() createMovieDTO: CreateMovieDTO
    ) {
        const data =  await this.moviesService.createMovie(createMovieDTO)
        return { status: true, data}
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
        const data =  await this.moviesService.deleteMovie(id)
        return { status: true, data}
    }
}
