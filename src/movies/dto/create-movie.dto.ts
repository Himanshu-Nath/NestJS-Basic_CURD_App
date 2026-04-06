import { IsEmail, IsNotEmpty, IsString, IsNumber, MinLength, IsArray, IsDate,IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class CreateMovieDTO {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    plot: string;

    @IsArray()
    @IsString({ each: true })
    genres: string[];

    @IsString()
    fullplot: string;

    @IsString()
    poster: string;

    @IsNumber()
    runtime: number;

    @IsArray()
    @IsString({ each: true })
    cast: string[];

    @IsArray()
    @IsString({ each: true })
    countries: string[];

    @IsArray()
    @IsString({ each: true })
    directors: string[];

    @IsArray()
    @IsString({ each: true })
    languages: string[];

    @IsArray()
    @IsString({ each: true })
    writers: string[];

    @IsString()
    rated: string;

    @IsNumber()
    year: number;

    @IsDate()
    @Type(() => Date)
    released: Date;

    @IsNumber()
    num_mflix_comments: number;

    @IsOptional()
    awards: {
        wins: number;
        nominations: number;
        text: string;
    };

    @IsOptional()
    imdb: {
        rating: number;
        votes: number;
        id: number;
    };

    @IsOptional()
    tomatoes: {
        viewer: {
        rating: number;
        numReviews: number;
        meter: number;
        };
        lastUpdated: Date;
    };

    @IsString()
    type: string;

    @IsString()
    lastupdated: string;
}