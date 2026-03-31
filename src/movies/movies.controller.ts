import { Controller, Get, Post, Put, Delete, Query, Param } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { MoviesService } from './movies.service';

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

    @Post()
    createMovie() {

    }

    @Put(':id')
    updateMovieById() {

    }

    @Delete(':id')
    deleteMovieById() {

    }
}
