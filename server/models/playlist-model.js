const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        userName: { type: String, required: true},
        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }], required: true },
        published: {
            type: Boolean, 
            required: true
        },
        views: {type: Number},
        likes: {type: Number},
        dislikes: {type: Number},
        datePublished: {type: Date},
        comments: {type: [{
            owner: String,
            content: String
        }]}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
