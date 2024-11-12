import express from 'express';

import { checkAdminVerification } from '../controllers/trainer/ReqVerificationAdmin.js';
import { searchUsers } from '../controllers/member/searchUsers.js';
import { savePersonalDetails,checkPersonalDetails } from '../controllers/member/personalDetails.js';
import { checkAttendance, markAttendance ,getDailyData} from '../controllers/member/dailyData.js';
import { getMemberStats,getWorkoutHoursPerDay } from '../controllers/member/getMemberStats.js'; 
import { getPrograms } from '../controllers/program/getPrograms.js'; 
import { joinProgram,getProgramDetails,getUserPrograms } from '../controllers/member/joinPrograms.js'; 
const router = express.Router();


router.get('/check-admin-verification', checkAdminVerification);
router.get("/search-users", searchUsers);
router.get("/personal-details/check", checkPersonalDetails);
router.post("/personal-details", savePersonalDetails);
router.post('/attendance', markAttendance);
router.get('/attendance/check', checkAttendance);
router.get('/stats', getMemberStats);
router.get('/daily-data', getDailyData);
router.get('/programs', getPrograms);
router.post('/join-program', joinProgram);
router.get('/programs-detail/:programId', getProgramDetails)
router.get('/user-programs', getUserPrograms);


export default router;