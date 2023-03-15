import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Card from "react-bootstrap/Card";
import { BASE_URL } from "../../constants/api";
import Button from "react-bootstrap/Button";
import { useCart } from "react-use-cart";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import ProductCard from "./ProductCard";

export default function ProductList() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const http = useAxios();

	const { 
		addItem,
	 } = useCart();
	

	useEffect(function () {

		async function getMedia() {

			try {
				const response = await http.get(`/api/products?populate=*`);
				console.log("response", response);
				setProducts(response.data);
                console.log(response.data);
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

	if (loading) return <div>Loading posts...</div>;

	if (error) return <div>{}</div>;


	return (
		<>
			<Row>

			{products.data.map((item) => {

				console.log(item);
				
				const productData = {
					id: item.id,
					price: item.attributes.price,
					title: item.attributes.name,
					image: BASE_URL + item.attributes.image.data.attributes.url,
				}
				
				let id = item.id;
				let name = item.attributes.name;
				let price = item.attributes.price;

				const image = BASE_URL + item.attributes.image.data.attributes.url;

				return(
					<Card 
						key={id}
						as={Col}
						style={{ minWidth: '14rem', maxWidth: '18rem', padding: "0" }} 
						className="m-3 product"
					>
						<Card.Body>
							<Card.Img variant="top" src={image} />
							<Card.Text id="name" name="name" value={name}>{name}</Card.Text>
							<Card.Text id="price" name="price" value={price}>${price}</Card.Text>
						</Card.Body>
						<Card.Footer>
							<Button size="sm" className="m-2"><Link to={`/products/${item.id}`}>Details</Link></Button>
							<Button onClick={() => addItem(productData)} size="sm" className="m-2">Add to cart</Button>
						</Card.Footer>
					</Card>
				);
			})}

			</Row>
		</>
	);
}

/**<Link to={`/products/${product.id}`}>{product.attributes.name}</Link> */

/**	return (
		<ul className="products">
			{products.map((media) => {
				return (
					<li key={media.id}>
                        <Card className="mb-3">
						<Card.Header>
                                <Link to={`/products/${media.data.id}`}>
                                    {media.data.name}
                                </Link>
                            </Card.Header>
                            <Card.Img src={media.data.image}></Card.Img>
							<Card.Text>{media.data.price}</Card.Text>
                            <Card.Text>{media.data.description}</Card.Text>
							<Card.Footer>
							</Card.Footer>
                        </Card>
					</li>
				);
			})}
		</ul>
	); */

/*                            <Card.Header>
                                <Link to={`/products/${media.id}`}>
                                    {media.name}
                                </Link>
                            </Card.Header>
                            <Card.Img src={media.image}></Card.Img>
							<Card.Text>{media.price}</Card.Text>
                            <Card.Text>{media.description}</Card.Text>
							<Card.Footer>
							</Card.Footer>*/