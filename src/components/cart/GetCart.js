import { useCart } from "react-use-cart";
import Card from "react-bootstrap/Card";
import Heading from "../layout/Heading";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ChevronRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function Cart() {
    const {
      isEmpty,
      totalUniqueItems,
      items,
      updateItemQuantity,
      removeItem,
      cartTotal,
    } = useCart();

    console.log(items);
  
    if (isEmpty) return <p className="cart-alert">Oh no! Your cart is empty.</p>;
  
    return (
      <>
      <Container className="cart">
        <Row>
          <Heading content={`My cart (${totalUniqueItems})`} />
        </Row>
        <Row>
          <Col>
            <ul>
              {items.map((item) => (
                <Card key={item.id} style={{ width: '21rem' }} className="my-3">
                  <Card.Body as="Container">
                    <Row>
                      <Col xs={6}>
                        <Card.Img src={item.image} variant="top" />
                      </Col>
                      <Col xs="auto">
                        <Card.Text className="font-weight-bold">$ {item.price}</Card.Text>
                        <Card.Text className="font-weight-italics">{item.title}</Card.Text>
                          <div>
                            <Card.Text>Quantity</Card.Text>
                            <button
                              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="mx-1">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                      <Button className="btn--highlight" onClick={() => removeItem(item.id)}>Remove</Button>
                  </Card.Footer>
                </Card>
              ))}
            </ul>
          
          </Col>

          <Col className="cart-info__desktop">
            <Card style={{ width: '18rem' }} className="my-3 p-3">
              <Card.Text>Total: $ {cartTotal}</Card.Text>
              <hr/>
              <Link to="checkout"><Button className="btn--green">Billing information<ChevronRight/></Button></Link>
            </Card>
          </Col>

        </Row>
        <Row className="px-3">
          <Card className="my-3 p-3">
              <Card.Text className="font-weight-bold">Total: $ {cartTotal}</Card.Text>
              <hr/>
              <Link to="checkout"><Button className="btn--green float-end">Billing information<ChevronRight/></Button></Link>
          </Card>
        </Row>
      </Container>
    </>
  );
}