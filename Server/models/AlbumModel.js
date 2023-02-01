const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = new Schema(
    {
        title: String,
        artist: String,
        genres: [ {type : String} ],
        year: String,
        tracks: [ {type: String} ],
        type_of_media: [ {type: String}],
        price_per_day: Number,
        quantity: Number,
    });

const AlbumModel = mongoose.model("albums", AlbumSchema);

module.exports = AlbumModel;