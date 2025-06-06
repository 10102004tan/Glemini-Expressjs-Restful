'use strict';

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    user_fullname: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
    },
    user_password: {
      type: String,
      required: true,
    },
    // user_type:{
    //     type:String,
    //     enum:['teacher','student'],
    //     required:true,
    //     default:'student'
    // },
    user_role: {
      type: mongoose.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    user_phone: {
      type: String,
      default: '',
    },
    user_avatar: {
      type: String,
      default: '',
    },
    user_schoolIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'School',
        default: [],
      },
    ],
    user_status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', function (next) {
  // set user avatar
  if (!this.user_avatar) {
    const firtName = this.user_fullname.split(' ')[0];
    this.user_avatar = `https://ui-avatars.com/api/?name=${firtName}size=128`;
  }
  next();
});

module.exports = model('User', userSchema);
