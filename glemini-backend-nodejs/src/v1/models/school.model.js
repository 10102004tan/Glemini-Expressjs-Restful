'use strict';

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const schoolSchema = new Schema({
    district:{
        type: Schema.Types.ObjectId,
        ref: 'District',
        required: false,
        default:null,
    },
    province:{
        type: Schema.Types.ObjectId,
        ref: 'Province',
        required: false,
        default:null,
    },
    school_name: {
        type: String,
        required: true
    },
    isHidden: {
        type: Boolean,
        default: true
    },
    governing_body:{
        type: String,
        required: false,
        default: null
    }
}, {
    timestamps: true
});

// create index for school_name full text search
schoolSchema.index({school_name: 'text'});

module.exports = model('School', schoolSchema);