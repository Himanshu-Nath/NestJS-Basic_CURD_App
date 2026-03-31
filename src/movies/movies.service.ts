import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Movie } from './movies.schema';

@Injectable()
export class MoviesService {

    constructor(
        @InjectModel(Movie.name) private moviesModel: Model<Movie>,
    ) {}

    async getAllMovie(limit: number, skip: number) {
        // const safeLimit = Math.min(limit, 100);
        try {
            const [movies, total] = await Promise.all([
                this.moviesModel.find().skip(skip).limit(limit).lean(), // important (removes mongoose metadata)
                this.moviesModel.countDocuments()
            ])
            if(!movies) {
                throw new NotFoundException('No movies found')
            }
            return { total, limit: Number(limit), skip: Number(skip), count: movies.length, movies };
        } catch(err) {
            throw new InternalServerErrorException('Failed to fetch all Movies', err)
        }
    }

    async getMovieById(id: string) {
        try{
            const movie  = await this.moviesModel.findById(id);
            if(!movie) {
                throw new NotFoundException(`No Movie found with id ${id}`);
            }
            return movie;
        } catch(err) {
            throw new InternalServerErrorException('Failed to fetch Movie by Id', err)
        }
    }

}
