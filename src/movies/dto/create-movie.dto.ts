import { IsEmail, IsNotEmpty, IsString, IsNumber, MinLength, IsArray, IsDate } from "class-validator";
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

    @IsString()
    rated: string;

    @IsNumber()
    year: number;

    @IsDate()
    @Type(() => Date)
    released: Date;

    @IsNumber()
    num_mflix_comments: number;

    awards: {
        wins: number;
        nominations: number;
        text: string;
    };

    imdb: {
        rating: number;
        votes: number;
        id: number;
    };

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