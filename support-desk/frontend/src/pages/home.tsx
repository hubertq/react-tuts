import { Link } from "react-router"
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa"

const HomePage = () => {
  return (
    <>
      <section className="heading">
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below</p>
      </section>

      <Link to={"/create-ticket"} className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Create New Ticket
      </Link>

      <Link to={"/tickets"} className="btn btn-block">
        <FaTicketAlt /> View My Tickets
      </Link>
    </>
  )
}
export default HomePage
