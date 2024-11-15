"use strict";
const express = require("express");
const router = express.Router();
const { asynHandler } = require("../../auths/utils");
const collectionController = require("../../controllers/collection.controller");
const { authentication } = require("../../auths");

router.use(asynHandler(authentication));

router.post("/", asynHandler(collectionController.getCollections));
router.post("/create", asynHandler(collectionController.create));
router.post("/update", asynHandler(collectionController.updateCollection));
router.post("/delete", asynHandler(collectionController.deleteCollection));
router.post(
  "/get-details",
  asynHandler(collectionController.getCollectionById)
);
router.post("/add-quiz", asynHandler(collectionController.addQuizToCollection));
router.post(
  "/remove-quiz",
  asynHandler(collectionController.removeQuizFromCollection)
);

module.exports = router;
