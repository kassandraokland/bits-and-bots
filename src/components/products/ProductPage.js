import Heading from "../layout/Heading";
import ProductList from "./ProductList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ProductPage() {
	return (
		<Container>
			<Row>
				<Col>
					<Heading size="3" content="Products" />
				</Col>
			</Row>
				<ProductList />
		</Container>
	);
}