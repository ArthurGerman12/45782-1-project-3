import { Router } from "express";
import { follow, getVacations, unfollow } from "../controllers/follow/controller";
import paramValidation from "../middlewares/param-validation";
import { followValidator, unfollowValidator } from "../controllers/follow/validaton";
import { forbidAdmins } from "../middlewares/forbid-admins";

const router = Router()

router.get('/following', getVacations)
router.post('/follow/:id',forbidAdmins, paramValidation(followValidator), follow)
router.post('/unfollow/:id',forbidAdmins, paramValidation(unfollowValidator), unfollow)