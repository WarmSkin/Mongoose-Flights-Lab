import { Router } from 'express'
import * as flightCtrl from '../controllers/flight.js'

const router = Router()

/* GET users listing. */
router.get('/', flightCtrl.index)
router.get('/new', flightCtrl.new)
router.get('/:id', flightCtrl.show)
router.get('/:id/update', flightCtrl.update)
router.post('/', flightCtrl.create)
router.delete('/:id', flightCtrl.delete)
router.patch('/:id', flightCtrl.modify)

export {
  router
}
