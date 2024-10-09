'use strict';

const { model, Schema } = require('mongoose');

const templateSchema = new Schema({
    tem_id: {
        type: Number,
        required: true
    },
    tem_name: {
        type: String,
        required: true
    },
    tem_html: {
        type: String,
        required: true
    },
    tem_status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, { timestamps: true });

module.exports = model('Template', templateSchema);