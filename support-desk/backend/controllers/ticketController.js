const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const { default: mongoose } = require('mongoose')

// @desc Get user tickets
// @route GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
	// Get user tickets
	const tickets = await Ticket.find({ user: req.user.id })
	res.status(200).json(tickets)
})

// @desc Get user ticket
// @route GET /api/tickets/:id
// @access Private
const getTicket = asyncHandler(async (req, res) => {
	// Check if it's valid object ID
	const isValid = mongoose.Types.ObjectId.isValid(req.params.id)

	if (isValid) {
		// Get user ticket
		const ticket = await Ticket.findOne({
			user: req.user.id,
			_id: req.params.id,
		})

		if (!ticket) {
			res.status(404)
			throw new Error('Ticket not found.')
		}

		res.status(200).json(ticket)
	} else {
		res.status(400)
		throw new Error('Ticket ID provided is invalid.')
	}
})

// @desc Create new ticket
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
	const { product, description } = req.body

	if (!product || !description) {
		res.status(400)
		throw new Error('Please add a product and description')
	}

	// Create Ticket
	const ticket = await Ticket.create({
		product,
		description,
		user: req.user.id,
	})

	res.status(201).json(ticket)
})

// @desc Update ticket
// @route PATCH /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
	// Get user ticket
	const ticket = await Ticket.findOne({
		user: req.user.id,
		_id: req.params.id,
	})

	if (!ticket) {
		res.status(404)
		throw new Error('Ticket not found.')
	}

	// Update ticket document with provided fields.
	const updateKeys = Object.keys(req.body)

	updateKeys.forEach(
		updateKey => (ticket[updateKey] = req.body[updateKey])
	)
	await ticket.save()

	res.status(200).json(ticket)
})

// @desc Delete ticket
// @route DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
	const result = await Ticket.deleteOne({
		user: req.user.id,
		_id: req.params.id,
	})

	if (result.deletedCount === 0) {
		res.status(404)
		throw new Error('Ticket not found.')
	}

	res.status(200).json({ success: true })
})

module.exports = {
	getTickets,
	getTicket,
	updateTicket,
	deleteTicket,
	createTicket,
}
