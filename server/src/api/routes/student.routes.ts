import { Router } from 'express'
import {
  getAllVerifiendStudents,
  getPendingVerificationStudents,
  verifyStudent,
} from '../controllers/student.controller'

const router = Router()

router.get('/verified', getAllVerifiendStudents)
router.get('/pending', getPendingVerificationStudents)
router.put('/verify/:id', verifyStudent)

export default router