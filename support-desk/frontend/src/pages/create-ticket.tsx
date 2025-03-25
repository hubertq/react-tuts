import { ChangeEvent, FormEvent, useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectUser } from "../features/auth/authSlice"
import { isSelectInput, isTextInput } from "../../guards"
import {
  createTicket,
  selectStatus,
  TicketType,
} from "../features/tickets/ticketSlice"
import { toast } from "react-toastify"
import Spinner from "../components/spinner"
import { useNavigate } from "react-router"

const products = ["iPhone", "Macbook Pro", "iMac", "iPad"]

type formDataType = Pick<TicketType, "user" | "product" | "description">

const CreateTicketPage = () => {
  const user = useAppSelector(selectUser)
  const isLoading = useAppSelector(selectStatus)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState<formDataType>({
    user: user?._id || "",
    product: "iPhone",
    description: "",
  })

  const { product, description } = formData

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>,
  ) => {
    if (isTextInput(e)) {
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
      }))
    }

    if (isSelectInput(e)) {
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
      }))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(createTicket(formData))
      .unwrap()
      .then(() => {
        navigate("/tickets")
        toast.success("New ticket created!")
      })
      .catch(error => {
        toast.error(error.message)
      })
  }
  return (
    <>
      {isLoading && <Spinner />}
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input
            type="text"
            className="form-control"
            value={user?.name}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Customer Email</label>
          <input
            type="email"
            className="form-control"
            value={user?.email}
            disabled
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={handleChange}
            >
              {products.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}
export default CreateTicketPage
