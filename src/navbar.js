import { Link } from 'react-router-dom';
function Navbar() {

  return (
    <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    {/* <a className="navbar-brand" href="/title"  >Name Here</a> */}

    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

     <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ride-calendar">Ride Calendar</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/suggest-rides">Suggest Rides</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
    </div>
</nav>

  );
}

export default Navbar;