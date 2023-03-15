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
		<Navbar expand="lg" className="navbar">
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
				<Nav>
					{auth ? (
						<Link to="products" className="m-2">Home</Link>
					) : (
						<Link to="/" className="m-2">Home</Link>
					)}
					{auth ? (
						<> 
							<Button onClick={logout} size="sm" className="m-2">Log out</Button>
							<Link to="products" className="m-2">Products</Link>
							<Link to="cart" className="m-2">
								<CartFill />
								{!isEmpty && <span style={{ position: 'relative', left: '-21px', top: '-18px'}}>{totalItems}</span>}
                				<span style={{ marginLeft: !isEmpty ? '-13px': 0}}></span>
							</Link>
						</>
					) : (
						<Link to="/" className="m-2">Log in</Link>
					)}
				</Nav>
			</Container>
		</Navbar>
	);
}

export default NavLayout;