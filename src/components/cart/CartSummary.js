import { useCart } from "react-use-cart";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


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
  
            <Card className="cart-summary">
                <Card.Header>
                    <Card.Title>Order Summary</Card.Title>
                </Card.Header>
                {items.map((item) => (
                <Card.Body key={item.id}>
                    <Row>
                        <Col>
                            <Card.Text style={{ fontStyle: "italic"}}>{item.title}</Card.Text>
                        </Col>
                        <Col>
                            <Card.Text>Qty: {item.quantity}</Card.Text>
                        </Col>
                        <Col>
                            <Card.Text style={{ fontWeight: "bold"}}>${item.price}</Card.Text>
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