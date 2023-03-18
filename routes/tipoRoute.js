const express = require('express');

const router = express.Router();

const tipoController = require('../controllers/RegionController');

router.get("/tipos",tipoController.GetRegionsList);
router.get("/create-tipos", tipoController.GetCreateRegions);
router.post("/create-tipos", tipoController.PostCreateRegions);
router.get("/edit-tipos/:tipoId", tipoController.GetEditRegions);
router.post("/edit-tipos", tipoController.PostEditRegions);
router.post("/delete-tipos", tipoController.PostDeleteRegions);

module.exports = router;