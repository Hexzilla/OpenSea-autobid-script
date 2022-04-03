const express = require('express')
const model = require('mongoose')
const Collection = require('../models/collection');
const opensea = require('../services/opensea')

const router = express.Router();
const CollectionModel = model<Collection>('Collection')

router.get('/collections', async (req, res) => {
  let offset = 0, limit = 300;
  while (true) {
    const result = await opensea.collections(offset, limit);
    if (!result || result.length <= 0) {
      break;
    }

    const models = result.map((collect) => ({
      updateOne: {
        filter: {
          slug: collect.slug,
        },
        update: {
          $set: collect,
        },
        upsert: true
      }
    }))

    try {
      await CollectionModel.bulkWrite(models);
    } catch (err) {
      console.error(err);
    }

    offset += result.length;
  }
  res.json({ success: true })
});

router.get('/collection/assets', async (req, res) => {
  await collectionService.getAssets(req.slug);
  res.json({ success: true })
});

module.exports = router;
