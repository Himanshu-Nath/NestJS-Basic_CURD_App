import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InternalServerErrorException, NotFoundException, ConflictException, BadRequestException  } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Movie } from './movies.schema';
import { Type } from 'class-transformer';

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
                throw new NotFoundException('No movies found');
            }
            return { total, limit: Number(limit), skip: Number(skip), count: movies.length, movies };
        } catch(err) {
            throw new InternalServerErrorException('Failed to fetch all Movies', err)
        }
    }

    async getMovieById(id: string) {
        // You can actually remove try/catch entirely and let NestJS handle errors:
        if(!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid movie ID');
        }
        const movie  = await this.moviesModel.findById(id).exec();
        if(!movie) {
            throw new NotFoundException(`No Movie found with id ${id}`);
        }
        return movie;
    }

    async createMovie(createMovieDTO) {
        try {
            const exists = await this.moviesModel.findOne({ title : createMovieDTO.title }).exec();
            if (exists) {
                throw new ConflictException('CREATE ERROR: Title already exists');
            }
            const movie = new this.moviesModel(createMovieDTO);
            return await movie.save()
        } catch(err) {
            if (err instanceof ConflictException) {
                throw err;
            }
            throw new InternalServerErrorException('Failed to create new Movie', err)
        }
    }

    async deleteMovie(id) {
        // You can actually remove try/catch entirely and let NestJS handle errors:
        const movie  = await this.moviesModel.findByIdAndDelete(id).exec();
        if(!movie) {
            throw new NotFoundException(`No Movie found with id ${id}`);
        }
        return movie;        
    }
}
