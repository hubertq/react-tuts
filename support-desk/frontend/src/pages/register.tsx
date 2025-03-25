import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { FaUser } from "react-icons/fa"
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { register, selectStatus, selectUser } from "../features/auth/authSlice"
import { Navigate, useNavigate } from "react-router"
import Spinner from "../components/spinner"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })

  const { name, email, password, password2 } = formData

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isLoading = useAppSelector(selectStatus)
  const user = useAppSelector(selectUser)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error("Passwords do not match.")
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
        .unwrap()
        .then(user => {
          toast.success(`Registered new user - ${user.name}`)
          navigate("/")
        })
        .catch(error => {
          toast.error(error.message)
        })
    }
  }

  if (user) return <Navigate to={"/"} />
  return (
    <>
      {isLoading && <Spinner />}
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              onChange={handleChange}
              placeholder="Confirm password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}
export default RegisterPage
