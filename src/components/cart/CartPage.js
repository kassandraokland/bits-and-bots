import Heading from "../layout/Heading";
import Cart from "./GetCart";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function CartPage() {
	return (
		<Container>
			<Row>
				<Col xs="auto" className="m-5">
					<Cart />
				</Col>
			</Row>
		</Container>
	);
}