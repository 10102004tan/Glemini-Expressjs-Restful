"use strict";

const { BadRequestError } = require("../cores/error.repsone");
const collectionModel = require("../models/collection.model");

class CollectionSevice {
  static create({ collection_name, user_id, quiz_ids }) {
    const collection = collectionModel.create({
      collection_name,
      quizzes: quiz_ids,
      user: user_id,
    });
    if (!collection) {
      return new BadRequestError("Create collection failed");
    }

    return collection;
  }

  static async getCollections({ user_id }) {
    const collections = await collectionModel.find({ user: user_id });

    if (!collections) {
      return new BadRequestError("Collections not found");
    }

    return collections;
  }

  static async getCollectionById({ collection_id }) {
    const collection = await collectionModel.findById(collection_id);
    if (!collection) {
      return new BadRequestError("Collection not found");
    }

    return collection;
  }

  static async addQuizToCollection({ collection_id, quiz_id }) {
    const collection = await collectionModel
      .findById(collection_id)
      .populate("quizzes");
    if (!collection) {
      return new BadRequestError("Collection not found");
    }

    if (!quiz_id) {
      return new BadRequestError("Quiz Id not found");
    }

    collection.quizzes.push(quiz_id);
    console.log(collection);
    collection.save();

    return collection;
  }

  static async removeQuizFromCollection({ collection_id, quiz_id }) {
    const collection = await collectionModel.findById(collection_id);
    if (!collection) {
      throw new BadRequestError("Collection not found");
    }

    if (!quiz_id) {
      throw new BadRequestError("Quiz Id not found");
    }

    collection.quizzes = collection.quizzes.filter(
      (quiz) => quiz.toString() !== quiz_id.toString()
    );

    console.log(collection.quizzes);

    await collection.save();
    return collection;
  }

  static async deleteCollection({ collection_id }) {
    const collection = await collectionModel.findByIdAndDelete(collection_id);
    if (!collection) {
      return new BadRequestError("Collection not found");
    }

    return collection;
  }

  static async updateCollection({ collection_id, collection_name, quiz_ids }) {
    const collection = await collectionModel.findByIdAndUpdate(collection_id, {
      collection_name,
      quizzes: quiz_ids,
    });
    if (!collection) {
      return new BadRequestError("Collection not found");
    }
    return collection;
  }
}

module.exports = CollectionSevice;
