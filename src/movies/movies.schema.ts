import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { platform } from "os";

@Schema({ collection: 'movies'})
export class Movie {
    @Prop()
    title: string;

    @Prop()
    plot: string;

    @Prop([String])
    genres: string[];

    @Prop()
    fullplot: string;

    @Prop()
    runtime: number;

    @Prop([String])
    cast: string[];

    @Prop([String])
    countries: string[];

    @Prop([String])
    directors: string[];

    @Prop()
    rated: string;

    @Prop()
    year: number;

    @Prop()
    released: Date;

    @Prop()
    num_mflix_comments: number;

    @Prop({
        type: {
        wins: Number,
        nominations: Number,
        text: String,
        },
        _id: false, // removes extra _id
    })
    awards: {
        wins: number;
        nominations: number;
        text: string;
    };

    @Prop({
        type: {
        rating: Number,
        votes: Number,
        id: Number,
        },
        _id: false, // removes extra _id
    })
    imdb: {
        rating: number;
        votes: number;
        id: number;
    };

    @Prop({
        type: {
        viewer: {
            rating: Number,
            numReviews: Number,
            meter: Number,
        },
        lastUpdated: Date,
        },
        _id: false, // removes extra _id
    })
    tomatoes: {
        viewer: {
        rating: number;
        numReviews: number;
        meter: number;
        };
        lastUpdated: Date;
    };

    @Prop()
    type: string;

    @Prop()
    lastupdated: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);