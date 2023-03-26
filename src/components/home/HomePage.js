import Heading from "../layout/Heading";
import LoginRegisterTabs from "../login/LoginRegisterTabs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CarouselSlider from "./Carousel";

export default function HomePage({ children }) {
	return (
		<>
			<Container>
				<Row>
					<Col></Col>
					<Col md={6} xs="auto" className="my-4">
						<Heading content="Shop the newest video games" />
					</Col>
					<Col></Col>
				</Row>
				<Row>
					<Col></Col>
					<Col md={8} xs="auto" className="">
					<CarouselSlider />
					</Col>
					<Col></Col>
				</Row>
        		<Row>
					<Col></Col>
          			<Col md={5} xs="auto" className="my-5">
						<LoginRegisterTabs/>
          			</Col>
					<Col></Col>
        		</Row>
			</Container>
		</>
	);
}