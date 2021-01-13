const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            required: 'Enter a note title'
        },
        body: {
            type: String,
            trim: true,
            required: 'Enter a note body'
        },
        date: {
            type: Date,
            default: () => new Date()
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
