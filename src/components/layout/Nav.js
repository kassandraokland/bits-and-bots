import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { CartFill } from "react-bootstrap-icons";
import { useCart } from "react-use-cart";

function NavLayout() {
	const [auth, setAuth] = useContext(AuthContext);

	const history = useNavigate();
	
	function logout() {
		setAuth(null);
		history("/");
	}

	const {
        isEmpty,
        totalItems,
    } = useCart();

	return (
		<Navbar expand="sm" variant="dark" className="navbar">
			<Container>
				{auth ? (
					<Link to="products">
						<Navbar.Brand className="logo">Bits&Bots</Navbar.Brand>
					</Link>
				) : (
					<Link to="/">
						<Navbar.Brand className="logo">Bits&Bots</Navbar.Brand>
					</Link>
				)}
				<Navbar.Toggle aria-controls="basic-navbar-nav"/>
				<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
					<Nav className="nav-menu">
						{auth ? (
							<Nav.Item><Link to="products" >Home</Link></Nav.Item>
						) : (
							<Nav.Item ><Link to="/" >Home</Link></Nav.Item>
						)}
						{auth ? (
							<> 
								<Nav.Item ><Link to="products">Products</Link></Nav.Item>
								<Nav.Item><Button onClick={logout} size="sm" className=" btn--highlight">Log out</Button></Nav.Item>
								<Nav.Item className="pt-2 px-4"><Link to="cart">
									<CartFill />
									{!isEmpty && <span style={{ position: 'relative', left: '-13px', top: '-18px'}}>{totalItems}</span>}
									<span style={{ marginLeft: !isEmpty ? '-13px': 0}}></span>
								</Link></Nav.Item>
							</>
						) : 
							null
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

/**									{!isEmpty && <span style={{ position: 'relative', left: '-13px', top: '-18px'}}>{totalItems}</span>}
									<span style={{ marginLeft: !isEmpty ? '-13px': 0}}></span> */

export default NavLayout;