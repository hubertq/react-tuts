const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')

// @desc Get ticket notes
// @route GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
	// Get user ticket
	const ticket = await Ticket.findById(req.params.ticketId)

	if (!ticket) {
		res.status(404)
		throw new Error('Ticket not found')
	}

	if (ticket && ticket.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error('User not authorized')
	}

	const notes = await Note.find({ ticket: req.params.ticketId })
	res.status(200).json(notes)
})

// @desc Create ticket note
// @route POST /api/tickets:ticketId
// @access Private
const createNote = asyncHandler(async (req, res) => {
	// Get user ticket
	const ticketData = await Ticket.findById(req.params.ticketId)

	if (!ticketData) {
		res.status(404)
		throw new Error('Ticket not found')
	}

	if (ticketData && ticketData.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error('User not authorized')
	}

	const note = await Note.create({
		text: req.body.text,
		isStaff: false,
		ticket: req.params.ticketId,
		user: req.user.id,
	})

	res.status(200).json(note)
})

module.exports = {
	getNotes,
	createNote,
}
