import { Link } from "react-router"
import { TicketType } from "../features/tickets/ticketSlice"

type Props = {
  ticket: TicketType
}

const TicketItem = ({ ticket }: Props) => {
  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt).toLocaleString("en-US")}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link to={`/ticket/${ticket._id}`} className="btn btn-reverse btn-sm">
        View
      </Link>
    </div>
  )
}

export default TicketItem
