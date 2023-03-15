
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { BASE_URL } from "../../constants/api";
import Heading from "../layout/Heading";
import { useCart } from "react-use-cart";
import Button from "react-bootstrap/Button";

export default function DetailsPage() {
	const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const http = useAxios();

	const { 
		addItem,
	 } = useCart();

	let { id } = useParams();

	const url = `/api/products/${id}?populate=*`;

	useEffect(
		function () {
			async function getPost() {
				try {
					const response = await http.get(url);
					console.log("response", response.data);
					setProduct(response.data.data);
				} catch (error) {
					console.log(error);
					setError(error.toString());
				} finally {
					setLoading(false);
				}
			}

			getPost();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

    if (loading) return <div>Loading posts...</div>;

	if (error) return <div>{}</div>;

	const productData = {
		id: product.id,
		price: product.attributes.price,
		title: product.attributes.name,
		image: BASE_URL + product.attributes.image.data.attributes.url,
	}

	return (
        <Container className="product product-details">
			<Row>
				<Col>
			<Heading content={product.attributes.name} />
			</Col>
			</Row>
			<Row className="mb-3" key={product.id}>
            <Col>
                <Image src={`${BASE_URL}${product.attributes.image.data.attributes.url}`}></Image>
			</Col>
			<Col>
				<p>${product.attributes.price}</p>
				<Button onClick={() => addItem(productData)} size="sm" className="m-2">Add to cart</Button>
            </Col>
			</Row>
			<Row>
				<Col>
					<h4>Description</h4>
					<p>{product.attributes.description}</p>
				</Col>
			</Row>
        </Container>
	);
}

/*export default function PostList() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams({});
  

	const http = useAxios();

    
    //let params = (new URL(document.location)).searchParams;
    //let name = params.get('name'); // is the string "Jonathan Smith".
    //let id = parseInt(params.get("id")); // is the number 18

	useEffect(function () {
		async function getMedia() {
			try {
				const response = await http.get(`/social/posts/?_author=true&_comments=true&_reactions=true`);
				console.log("response", response);
				setPosts(response.data);
                console.log(response.data);
                //setSearchParams(response.data.id);
                //console.log(searchParams);
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

    const singlePost = searchParams.get("posts");

	return (
            {singlePost ? (
              <p>
                Your favorite fruit is <b>{favoriteFruit}</b>
              </p>
            ) : (
              <i>No favorite fruit selected yet.</i>
            )}
                <Container className="posts">
                    {posts.map((media) => {
                        return (
                        <Card className="posts mb-3" key={media.id}>
                            <Card.Header>
                                {media.author.name}
                            </Card.Header>
						    <Link to={`/dashboard/posts/${media.id}`}>{media.title}</Link>
                            <Card.Img src={media.media}></Card.Img>
                            <Card.Text>{media.body}</Card.Text>
                        </Card>
                        );
                    })}
                </Container>
			);
                

}*/

/*export default function PostPage() {
	return (
		<DashboardPage>
			<Heading size="3" content="Posts" />
			<p>
				<Link to="/dashboard/posts/add">Add post</Link>
			</p>
			<Container>
					<PostList/>
			</Container>
		</DashboardPage>
	);
}*/