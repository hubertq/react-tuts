import { ChangeEvent, FormEvent, useState } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { login, selectStatus, selectUser } from "../features/auth/authSlice"
import { Navigate, useNavigate } from "react-router"
import Spinner from "../components/spinner"

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData

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

    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
      .unwrap()
      .then(user => {
        toast.success(`Logged in as ${user.name}`)
        navigate("/")
      })
      .catch(error => {
        toast.error(error.message)
      })
  }

  if (user) return <Navigate to={"/"} />
  return (
    <>
      {isLoading && <Spinner />}
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please log in to get support</p>
      </section>

      <section className="form">
        <form onSubmit={handleSubmit}>
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
            <button className="btn btn-block">Login</button>
          </div>
        </form>
      </section>
    </>
  )
}
export default LoginPage
