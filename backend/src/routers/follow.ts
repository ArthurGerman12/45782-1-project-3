import { Router } from "express";
import { follow, getVacations, unfollow } from "../controllers/follow/controller";
import paramValidation from "../middlewares/param-validation";
import { followValidator, unfollowValidator } from "../controllers/follow/validaton";
import { forbidAdmins } from "../middlewares/forbid-admins";
import { createVacation, deleteVacation, updateVacation, getVacation, getReports } from "../controllers/admin/controller";
import { newVacationValidator, updateVacationValidator } from "../controllers/admin/validation";
import validation from "../middlewares/validation";
import requireRole from "../middlewares/require-role";

const router = Router();

//user routing 
router.get("/following",forbidAdmins, getVacations);
router.post("/follow/:id" ,forbidAdmins, paramValidation(followValidator), follow);
router.post("/unfollow/:id", forbidAdmins, paramValidation(unfollowValidator), unfollow);

//admin routing 
router.get('/vacation/:vacationId',requireRole("admin"), getVacation)
router.post('/create-vacation',requireRole("admin"), validation(newVacationValidator), createVacation);
router.delete('/delete-vacation/:vacationId',requireRole("admin"), deleteVacation)
router.patch("/update-vacation/:vacationId",requireRole("admin"), validation(updateVacationValidator), updateVacation);
router.get("/reports/vacations", requireRole("admin"), getReports)



export default router;
