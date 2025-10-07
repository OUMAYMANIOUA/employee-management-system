
import { useNavigate } from "react-router-dom"
import AuthService from "../services/AuthService"

const HeaderComponent = () => {
  const navigate = useNavigate()
  const currentUser = AuthService.getCurrentUser()

  const handleLogout = () => {
    AuthService.logout()
    navigate("/login")
    window.location.reload()
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg modern-header shadow-sm py-2">
        <div className="container">
          <a href="/" className="navbar-brand">
            <i className="fas fa-users me-2"></i>
            Employee Management System
          </a>
          <div className="navbar-nav flex-row">
            {currentUser ? (
              <div className="d-flex align-items-center">
                <span className="text-light me-3">
                  <i className="fas fa-user me-1"></i>
                  Bienvenue, {currentUser?.firstName}
                  <span
                    className={`badge badge-modern ms-2 ${Array.isArray(currentUser?.roles) && currentUser.roles.includes("ROLE_MANAGER") ? "badge-manager" : "badge-user"}`}
                  >
                    {Array.isArray(currentUser?.roles) && currentUser.roles.includes("ROLE_MANAGER")
                      ? "Manager"
                      : "User"}
                  </span>
                </span>
                <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt me-1"></i>
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <button className="btn btn-outline-light btn-sm" onClick={() => navigate("/login")}>
                  <i className="fas fa-sign-in-alt me-1"></i>
                  Connexion
                </button>
                <button className="btn btn-light btn-sm" onClick={() => navigate("/register")}>
                  <i className="fas fa-user-plus me-1"></i>
                  Inscription
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default HeaderComponent
