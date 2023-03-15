import Heading from "../layout/Heading";
import LoginRegisterTabs from "../login/LoginRegisterTabs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function HomePage({ children }) {
	return (
		<>
			<Container>
				<Row>
					<Col>
						<Heading content="Shop the newest video games here." />
					</Col>
				</Row>
        		<Row>
					<Col></Col>
          			<Col md={5} xs="auto" className="m-5">
						<LoginRegisterTabs/>
          			</Col>
					<Col></Col>
        		</Row>
			</Container>
		</>
	);
}