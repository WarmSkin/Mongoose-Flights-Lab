import mongoose from "mongoose";

const Schema = mongoose.Schema;

const flightSchema = new Schema({
    airline: {type: String, enum: ['American', 'Southwest', 'United']},
    airport: {type: String, enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'], default : 'DEN'},
    flightNo: {type: Number, enum:[10,...9999]},
    departs: {type: Date, default: timestamps + 1},
},{
    timestamps: true
})

const Flight = mongoose.model('Flisht', flightSchema)

export {
    Flight
}