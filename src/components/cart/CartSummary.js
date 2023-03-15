import { useCart } from "react-use-cart";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import Container from "react-bootstrap/Container";


export default function CartSummary() {
    const {
      isEmpty,
      items,
      cartTotal,
    } = useCart();

    console.log(items);
  
    if (isEmpty) return <p>Your cart is empty</p>;
  
    return (
        <>
  
            <Card>
                <Card.Header>
                    <Card.Title>Order Summary</Card.Title>
                </Card.Header>
                {items.map((item) => (
                <Card.Body key={item.id} style={{ width: '20rem' }} className="product">
                    <Row>
                        <Col>
                            <Card.Text>{item.title}</Card.Text>
                        </Col>
                        <Col>
                            <Card.Text>Qty: {item.quantity}</Card.Text>
                        </Col>
                        <Col>
                            <Card.Text>${item.price}</Card.Text>
                        </Col>   
                    </Row>
                </Card.Body>
                ))}
                <Card.Footer>
                    <Card.Text>Total: ${cartTotal}</Card.Text>
                </Card.Footer>
            </Card>
        </>
    );
  }