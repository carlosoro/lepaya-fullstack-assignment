import { NavLink, Route, Routes } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { routes } from './routes';

function App() {
  return (
    <>
      <Container className='d-grid gap-5'>
        <Navbar expand='lg' className='bg-body-tertiary'>
          <Container>
            <Navbar.Brand>
              <NavLink to='/' className='text-decoration-none'>
                <h1>Chocolate Inc</h1>
              </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto position-absolute end-0'>
                <Nav.Link>
                  <NavLink
                    to='/'
                    className={({ isActive }) =>
                      isActive
                        ? 'fw-bold text-decoration-none'
                        : 'text-muted text-decoration-none'
                    }
                  >
                    Reports
                  </NavLink>
                </Nav.Link>
                <Nav.Link>
                  <NavLink
                    to='/purchases'
                    className={({ isActive }) =>
                      isActive
                        ? 'fw-bold text-decoration-none'
                        : 'text-muted text-decoration-none'
                    }
                  >
                    Purchases
                  </NavLink>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Container>
    </>
  );
}

export default App;