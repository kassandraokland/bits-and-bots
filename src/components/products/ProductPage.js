import Heading from "../layout/Heading";
//import ProductList from "./ProductList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import FilterButtons from "./FilterButtons";


export default function ProductPage({data}) {
	return (
		<Container>
			<Row>
				<Col>
					<Heading size="3" content="Products" />
				</Col>
			</Row>
			<Row>
				<FilterButtons />
			</Row>
		</Container>
	);
}