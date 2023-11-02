const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { setGlobalOptions } = require("firebase-functions/v2/options");
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();

exports.generateThumbnail = onDocumentCreated(
  "/Data/Portfolio/video/{documentId}",
  (event) => {
    // Grab the current value of what was written to Firestore.
    const original = event.data.data().original;
    
  }
);