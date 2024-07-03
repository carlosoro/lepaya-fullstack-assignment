import { Route, Routes } from "react-router-dom";
import Report from "./screens/Report";
import FruitPurchase from "./screens/FruitPurchase";
import { Container, Nav, Navbar } from "react-bootstrap";
import { routes } from "./routes";

function App() {

  return (
    <>
      <Container>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/">Chocolate Inc</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Reports</Nav.Link>
                <Nav.Link href="/purchases">Purchases</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          {routes.map((route, index) =>
            <Route key={index} path={route.path} element={route.element} />
          )}
        </Routes>
      </Container>
    </>
  )
}

export default App
