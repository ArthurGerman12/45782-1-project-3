import { Router } from "express";
import { follow, getVacations, unfollow } from "../controllers/follow/controller";
import paramValidation from "../middlewares/param-validation";
import { followValidator, unfollowValidator } from "../controllers/follow/validaton";
import { forbidAdmins } from "../middlewares/forbid-admins";
import fileUploader from "../middlewares/file-uploader";
import { createVacation, deleteVacation, updateVacation } from "../controllers/admin/controller";
import fileValidation from "../middlewares/file-validation";
import { newVacationImageValidator, newVacationValidator, updateVacationValidator } from "../controllers/admin/validation";
import validation from "../middlewares/validation";
import requireRole from "../middlewares/require-role";

const router = Router();

// block admins for any follow-related route

router.get("/following",forbidAdmins, getVacations);
router.post("/follow/:id" ,forbidAdmins, paramValidation(followValidator), follow);
router.post("/unfollow/:id", forbidAdmins, paramValidation(unfollowValidator), unfollow);

router.post('/create-vacation',requireRole("admin"),fileUploader, fileValidation(newVacationImageValidator), validation(newVacationValidator), createVacation);
router.post('/delete-vacation/:vacationId',requireRole("admin"), deleteVacation)
router.patch('/update-vacation/:vacationId', requireRole("admin"), fileUploader, fileValidation(newVacationImageValidator), validation(updateVacationValidator), updateVacation)


export default router;
