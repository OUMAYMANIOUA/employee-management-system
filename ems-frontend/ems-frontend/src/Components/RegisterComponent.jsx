import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import AuthService from "../services/AuthService"

const RegisterComponent = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [successful, setSuccessful] = useState(false)
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    setMessage("")
    setSuccessful(false)

    AuthService.register(firstName, lastName, email, password).then(
      (response) => {
        setMessage(response.data)
        setSuccessful(true)
        setTimeout(() => {
          navigate("/login")
        }, 2000)
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        setMessage(resMessage)
        setSuccessful(false)
      },
    )
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center w-100">
        <div className="col-md-7 col-lg-6">
          <div className="card modern-card shadow-sm">
            <div className="card-body p-4 fade-in">
              <div className="text-center mb-4">
                <i className="fas fa-user-plus fa-3x text-primary mb-3"></i>
                <h3 className="card-title text-primary">
                  <i className="fas fa-user-plus me-2"></i>
                  Inscription
                </h3>
                <p className="text-muted">Créez votre compte employé</p>
              </div>

              <form className="modern-form" onSubmit={handleRegister}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">
                        <i className="fas fa-user me-1"></i>
                        Prénom :
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        placeholder="Votre prénom"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">
                        <i className="fas fa-user me-1"></i>
                        Nom :
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">
                    <i className="fas fa-envelope me-1"></i>
                    Email :
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="votre@email.com"
                  />
                </div>

                <div className="form-group mb-4">
                  <label className="form-label">
                    <i className="fas fa-lock me-1"></i>
                    Mot de passe :
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Créez un mot de passe"
                  />
                </div>

                <button className="btn primary-btn w-100 py-2 mb-3" type="submit">
                  <i className="fas fa-user-plus me-2"></i>
                  S'inscrire
                </button>

                {message && (
                  <div
                    className={`alert ${successful ? "alert-success" : "alert-danger"} alert-modern mt-3`}
                    role="alert"
                  >
                    <i className={`fas ${successful ? "fa-check-circle" : "fa-exclamation-triangle"} me-2`}></i>
                    {message}
                  </div>
                )}

                <div className="text-center mt-3">
                  <small className="text-muted">
                    Déjà un compte ?{" "}
                    <Link to="/login" className="text-primary text-decoration-none">
                      Se connecter
                    </Link>
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterComponent
