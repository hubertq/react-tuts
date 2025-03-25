const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')

// Re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)

const {
	getTickets,
	getTicket,
	createTicket,
	updateTicket,
	deleteTicket,
} = require('../controllers/ticketController')

router.route('/').get(protect, getTickets).post(protect, createTicket)
router
	.route('/:id')
	.get(protect, getTicket)
	.patch(protect, updateTicket)
	.delete(protect, deleteTicket)

module.exports = router
