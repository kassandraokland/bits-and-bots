import Heading from "../layout/Heading";
import CartSummary from "./CartSummary";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckoutInfo from "./CheckoutInfo";
import CheckoutForm from "./CheckoutForm";

export default function CheckoutPage() {
	return (
		<Container>
			<Row>
				<Col className="m-5">
                    <Heading content="Checkout"/>
                    <CartSummary />
                    <CheckoutForm />
				</Col>
			</Row>
		</Container>
	);
}

/**                    <CartSummary />
                    <CheckoutForm /> */