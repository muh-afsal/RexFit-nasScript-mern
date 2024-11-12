import express from 'express';
import { getTrainerRequests, updateTrainerRequestStatus } from "../controllers/admin/trainerRequestsActions.js";
import { getAdminStats } from "../controllers/admin/getAdminStats.js";
import { blockUnblockMember,fetchAllMembers,checkUserStatus } from "../controllers/admin/manageMembers.js";
import { blockUnblockTrainer,checkTrainerStatus,fetchAllTrainers } from "../controllers/admin/manageTrainers.js";
import { programIncome ,programJoinedMembers} from "../controllers/program/getProgramIncome.js";

const router = express.Router();

router.get('/trainer-requests', getTrainerRequests);
router.patch("/trainer-requests/status", updateTrainerRequestStatus);
router.get("/stats", getAdminStats);
router.get("/income", programIncome);
router.get("/joined-members", programJoinedMembers);
router.get("/users", fetchAllMembers);
router.post("/blockUnblockUser", blockUnblockMember);
router.get('/checkUserStatus/:id', checkUserStatus);
router.get("/trainers", fetchAllTrainers);
router.post("/blockUnblocktrainer", blockUnblockTrainer);
router.get('/checktrainerStatus/:id', checkTrainerStatus);
 

export default router;