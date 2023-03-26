import Heading from "../layout/Heading";
import CartSummary from "./CartSummary";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckoutForm from "./CheckoutForm";

export default function CheckoutPage() {
	return (
		<Container className="checkout">
			<Row className="m-3">
				<Heading content="Checkout"/>
			</Row>
			<Row>
				<Col xs={11} sm={10} md={5} lg={4} className="m-2">
                    <CartSummary />
				</Col>
				<Col xs={11} sm={10} md={6} lg={6} className="m-2">
                    <CheckoutForm />
				</Col>
			</Row>
		</Container>
	);
}

/**                    <CartSummary />
                    <CheckoutForm /> */