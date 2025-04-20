"use strict"

const {model,Schema} = require('mongoose');

const kvStoreSchema = new Schema({
    key:{
        type:String,
        required:true,
        unique:true
    },
    value:{
        type:Schema.Types.Mixed,
        required:true
    },
    expiresAt:{
        type:Date,
        default:null
    },
},{
    timestamps:true
})

// kvStoreSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // Auto-delete expired documents
kvStoreSchema.index({ key: 1 }, { unique: true }); // Ensure unique index on key

module.exports = model('KvStore',kvStoreSchema);