import mongoose from "mongoose";

const Schema = mongoose.Schema;

const flightSchema = new Schema({
    airline: {type: String, enum: ['American', 'Southwest', 'United']},
    airport: {type: String, enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'], default : 'DEN'},
    flightNo: {type: Number, min: 10, max: 9999},
    departs: {type: Date,
         default: function() {
            const today = new Date();
            console.log(today);
            const oneYearLater = today.getFullYear() + 1;
            console.log(oneYearLater);
            today.setFullYear(oneYearLater);
            return today;
         }}
            //  "2024-01-09"},
},{
    timestamps: true
})

const Flight = mongoose.model('Flisht', flightSchema)

export {
    Flight
}