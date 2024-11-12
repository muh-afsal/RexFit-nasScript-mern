import express from 'express';

import {addProgram}  from '../controllers/trainer/addProgram.js';
import {fetchPrograms,handleAllow,isAllowed}  from '../controllers/trainer/managePrograms.js';
import {getTotalWorkoutHours}  from '../controllers/trainer/getWorkoutHours.js';

const router = express.Router();


router.post("/add-program", addProgram);
router.get("/programs", fetchPrograms);
router.post("/allowDisallowProgram", handleAllow);
router.get('/checkProgramStatus/:id', isAllowed);
router.get('/workout-hours', getTotalWorkoutHours);


export default router;