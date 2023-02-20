import express from "express";
import middleware from "../controllers/middlewareV2.js";

import listShowsController from "../controllers/listShowsController.js";
import listDatesController from "../controllers/listShowsController.js";
import getCategoriesController from '../controllers/getCategoriesController.js';
import getPicturesController from "../controllers/getPicturesController.js";
import getLieuController from "../controllers/getLieuController.js";

import addShowController from "../controllers/addShowController.js";
import addDateController from "../controllers/addDateController.js";
import showController from '../controllers/showController.js';
import getShowByIdController from '../controllers/getShowByIdController.js';

import addAdminController from "../controllers/addAdminController.js";
import loginController from "../controllers/loginControllerV2.js";
import uploadFile from '../controllers/uploadFile.js';
import updateImageSelected from '../controllers/updateImageSelected.js';

const router = express.Router();

router.get("/listshows", listShowsController);
router.get("/listdates", listDatesController);
router.get("/getpictures", getPicturesController);
router.get("/getCategories", getCategoriesController);
router.get("/getLieu", middleware, getLieuController) 

router.post("/addshow", addShowController);
router.post("/adddate", addDateController);
router.post("/show", showController)
router.post("/getShowById", getShowByIdController)

router.post("/addadmin", addAdminController);
router.post("/login", middleware, loginController) 
router.post("/uploadFile", uploadFile);
router.post("/selectedImage", updateImageSelected);



export default router;
