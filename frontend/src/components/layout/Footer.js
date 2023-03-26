import { Nav, Navbar, Container } from "react-bootstrap";

export default function Footer() {
    return (
        <Navbar className="footer">
            <Container>
                <Nav>
                    <Nav.Item><p className="text-center">&copy; Bits&Bots</p></Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    )
}