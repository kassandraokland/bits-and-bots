import Heading from "../layout/Heading";
import Cart from "./GetCart";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function CartPage() {
	return (
		<Container className="py-5">
			<Cart />
		</Container>
	);
}