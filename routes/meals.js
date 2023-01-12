import { Router } from 'express'
import * as mealsCtrl from '../controllers/meal.js'

const router = Router()

/* GET users listing. */
router.get('/new', mealsCtrl.new)
router.post('/', mealsCtrl.create)

export {
  router
}
