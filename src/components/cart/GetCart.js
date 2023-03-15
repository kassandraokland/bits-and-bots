import { useCart } from "react-use-cart";
import Card from "react-bootstrap/Card";
import Heading from "../layout/Heading";
import Button from "react-bootstrap/Button";
import { ChevronRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

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
  
    if (isEmpty) return <p>Your cart is empty</p>;
  
    return (
      <>
        <Heading content={`My cart (${totalUniqueItems})`} />
  
        <ul>
          {items.map((item) => (
            <Card key={item.id} style={{ width: '18rem' }} className="product">
              <Card.Body>
                <Card.Img src={item.image} variant="top" />
                <Card.Text>$ {item.price}</Card.Text>
                <Card.Text>{item.title}</Card.Text>
              </Card.Body>
              <Card.Footer>
                  <div>
                    <Card.Text>Quantity</Card.Text>
                    <button
                    onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                    {item.quantity}
                    <button
                    onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  </div>
                  <hr/>
                  <Button onClick={() => removeItem(item.id)}>Remove</Button>
              </Card.Footer>
            </Card>
          ))}
        </ul>

        <Card>
          <Card.Text>Total: $ {cartTotal}</Card.Text>
          <hr/>
          <Button><Link to="checkout">Billing information</Link> <ChevronRight/></Button>
        </Card>
      </>
    );
  }