const mongoose = require("mongoose");
const validUrl = require("valid-url");
const shortid = require("shortid");
const express = require("express");
const router = express.Router();

require('../models/UrlShorten');
const UrlShorten = mongoose.model("UrlShorten");

const errorUrl = 'http://localhost/error';




router.get("/item", (req, res) => {
    const urlCode = req.params.code;
    const item = UrlShorten.findOne({ urlCode: urlCode });
    if (item) {
      return res.redirect(item.originalUrl);
    } else {
      return res.redirect(errorUrl);
    }
});


router.post("/item", async (req, res) => {

const originalUrl = req.body.originalUrl;
const shortBaseUrl = req.body.shortBaseUrl;

if (validUrl.isUri(shortBaseUrl)) {
} else {
  return res.status(401).send({
    message:"Invalid Base Url"
  });
}
const urlCode = shortid.generate();
const updatedAt = new Date();
if (validUrl.isUri(originalUrl)) {
  try {
    const item = await UrlShorten.findOne({ originalUrl: originalUrl });
    if (item) {
      res.status(200).send({item});
    } else {
      shortUrl = shortBaseUrl + "/" + urlCode;
      const item = new UrlShorten({
        originalUrl,
        shortUrl,
        urlCode,
        updatedAt
      });
      await item.save();
      res.status(200).send({item});
    }
  } catch (err) {
    res.status(401).send({message:"Invalid User Id"});
  }
} else {
  return res
    .status(401)
    .send(
      {message:"Invalid Original Url"}
    );
}
});


module.exports = router;





































