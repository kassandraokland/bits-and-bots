
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useCart } from "react-use-cart";

const ProductCard = (props) => {
    let { image, price, name, id} = props.data;
    const { addItem } = useCart();

    const addToCart = () =>{
        addItem(props.data);
    }

    return (
        <Card style={{ width: '18rem' }} className="m-3 product">
            <Card.Body>
                <Card.Img variant="top" src={image} />
                <Card.Text>{name}</Card.Text>
                <Card.Text>{price}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button size="sm" className="m-2"><Link to={`products/${id}`}>Details</Link></Button>
                <Button price={price} onClick={() => addToCart()} size="sm" className="m-2">Add to cart</Button>
            </Card.Footer>
        </Card>
    )
}

export default ProductCard;