import { useNavigate, useParams } from "react-router"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  closeTicket,
  getTicket,
  selectStatus,
  selectTicket,
} from "../features/tickets/ticketSlice"
import { FormEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"
import Spinner from "../components/spinner"
import BackButton from "../components/back-button"
import { FaPlus } from "react-icons/fa"
import { createNote, getNotes, selectNotes } from "../features/notes/noteSlice"
import NoteItem from "../components/note-item"
import Modal from "react-modal"

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}

Modal.setAppElement("#root")

const TicketPage = () => {
  const { ticketId } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState("")

  const ticket = useAppSelector(selectTicket)
  const notes = useAppSelector(selectNotes)
  const isLoading = useAppSelector(selectStatus)

  useEffect(() => {
    if (ticketId) {
      dispatch(getTicket(ticketId))
        .unwrap()
        .catch(error => {
          navigate("/notfound")
        })

      dispatch(getNotes(ticketId))
        .unwrap()
        .catch(error => {
          toast.error(error.message)
        })
    }
  }, [ticketId])

  const handleClose = () => {
    if (ticketId) {
      dispatch(closeTicket(ticketId))
        .unwrap()
        .then(() => {
          toast.success("Ticket Closed")
          navigate("/tickets")
        })
        .catch(error => {
          toast.error(error.message)
        })
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (ticketId) {
      dispatch(createNote({ noteText, ticketId }))
        .unwrap()
        .then(() => {
          setNoteText("")
          closeModal()
        })
        .catch(error => toast.error(error.message))
    }
  }

  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  if (!ticket || isLoading) return <Spinner />

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note text"
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes ? (
        notes.map(note => <NoteItem key={note._id} note={note} />)
      ) : (
        <Spinner />
      )}

      {ticket.status !== "closed" && (
        <button className="btn" onClick={openModal}>
          <FaPlus /> Add Note
        </button>
      )}

      {ticket.status !== "closed" && (
        <button onClick={handleClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  )
}
export default TicketPage
