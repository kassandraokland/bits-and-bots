import Heading from "../layout/Heading";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FilterButtons from "./FilterButtons";


export default function ProductPage() {
	return (
		<Container className="product-page">
			<Row xs={10} sm={12} md={9} lg={7} className="mx-auto">
				<Col className="mt-3 mb-1">
					<Heading size="3" content="Products" />
				</Col>
			</Row>
			<Row xs={10} sm={12} md={9} lg={7} className="mx-auto">
				<FilterButtons />
			</Row>
		</Container>
	);
}