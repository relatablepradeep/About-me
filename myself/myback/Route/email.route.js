import {Router} from 'express'
import {saveEmail} from '../controllers/email.controller.js'

const router=Router();



router.post('/saveEmail', saveEmail);




export default router;