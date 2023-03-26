
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useCart } from "react-use-cart";
import useAxios from "../../hooks/useAxios";
import { useState, useEffect } from "react";

const ProductCard = () => {
    const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	//const [card, setCard] = useState(products);
    //let { image, price, name, id} = props.data;
    const { addItem } = useCart();

    /*const addToCart = () =>{
        addItem(props.data);
    }*/

	const http = useAxios();

	useEffect(function () {

		async function getMedia() {

			try {
				const response = await http.get(`/api/products?populate=*`);
				console.log("response", response);
				setProducts(response.data.data);
                console.log(response.data.data);
			} catch (error) {
				console.log(error);
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}

		getMedia();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) return <div>Loading products...</div>;

	if (error) return <div>{}</div>;

    return (
        <>
        {products.map((product) => {
            const {id, price, name, image} = product;
            return(
                <Card style={{ width: '18rem' }} className="m-3 product" key={id}>
                <Card.Body>
                    <Card.Img variant="top" src={image} />
                    <Card.Text>{name}</Card.Text>
                    <Card.Text>{price}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button size="sm" className="m-2"><Link to={`products/${id}`}>Details</Link></Button>
                    <Button price={price} onClick={() => addItem(product)} size="sm" className="m-2">Add to cart</Button>
                </Card.Footer>
            </Card>
            )

        })}
        </>
    )
}

export default ProductCard;