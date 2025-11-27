import { Router } from "express";
import { createVacation, updateVacation, deleteVacation } from '../controllers/admin/controller'
import { newVacationImageValidator, newVacationValidator, updateVacationValidator, getVacationValidator } from '../controllers/admin/validation'
import validation from "../middlewares/validation";
import fileValidation from "../middlewares/file-validation";
import fileUploader from "../middlewares/file-uploader";

const router = Router()


router.post('/create-vacation',fileUploader, fileValidation(newVacationImageValidator), validation(newVacationValidator), createVacation);
router.post('/delete-vacation/:vacationId', deleteVacation)
router.patch('/update-vacation/:vacationId',fileUploader, fileValidation(newVacationImageValidator), validation(updateVacationValidator), updateVacation)

export default router
