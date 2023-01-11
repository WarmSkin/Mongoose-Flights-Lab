import { Router } from 'express'
import * as flightsCtrl from '../controllers/flight.js'

const router = Router()

/* GET users listing. */
router.get('/', flightsCtrl.index)
router.get('/new', flightsCtrl.new)
router.get('/:id', flightsCtrl.show)
router.get('/:id/update', flightsCtrl.update)
router.post('/', flightsCtrl.create)
router.post('/:id/tickets', flightsCtrl.createTickets)
router.delete('/:id', flightsCtrl.delete)
router.delete('/:id/:tIndex', flightsCtrl.deleteTicket)
router.patch('/:id', flightsCtrl.modify)

export {
  router
}
