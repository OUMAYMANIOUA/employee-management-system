import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import AuthService from "../services/AuthService"

const LoginComponent = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    AuthService.login(email, password).then(
      () => {
        navigate("/employees")
        window.location.reload()
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        setLoading(false)
        setMessage(resMessage)
      },
    )
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center w-100">
        <div className="col-md-6 col-lg-5">
          <div className="card modern-card shadow-sm">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <i className="fas fa-users fa-3x text-primary mb-3"></i>
                <h3 className="card-title text-primary">
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Connexion
                </h3>
                <p className="text-muted">Accédez à votre espace employés</p>
              </div>

              <form className="modern-form" onSubmit={handleLogin}>
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
                    placeholder="Votre mot de passe"
                  />
                </div>

                <button className="btn primary-btn w-100 py-2 mb-3" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="modern-spinner me-2"></span>
                      Connexion...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Se connecter
                    </>
                  )}
                </button>

                {message && (
                  <div className="alert alert-danger alert-modern mt-3" role="alert">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {message}
                  </div>
                )}

                <div className="text-center mt-3">
                  <small className="text-muted">
                    Nouveau ici ?{" "}
                    <Link to="/register" className="text-primary text-decoration-none">
                      Créer un compte
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

export default LoginComponent
