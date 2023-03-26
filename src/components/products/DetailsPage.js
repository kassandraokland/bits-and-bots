
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
			async function getDetails() {
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

			getDetails();
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
        <Container className="m-3 mx-auto product product-details">
			<Row >
				<Col className="my-4">
					<Heading content={product.attributes.name} />
				</Col>
			</Row>
			<Row className="pb-3 justify-content-center">
					<Col xs={6} md={5}>
						<Image className="details-page--image" src={`${BASE_URL}${product.attributes.image.data.attributes.url}`} />
					</Col>
					<Col  xs="auto" md={5} className="align-self-center mx-auto">
						<p>${product.attributes.price}</p>
						<p>{product.attributes.category.data.attributes.name}</p>
						<Button onClick={() => addItem(productData)} size="sm" className="my-2 btn--light-green">Add to cart</Button>
					</Col>
			</Row>
			<Row className="py-3 justify-content-center">
					<Col xs="auto" md={12}>
						<h4>Description</h4>
						<p>{product.attributes.desc}</p>
						<p>{product.attributes.desc2}</p>
						<p>{product.attributes.desc3}</p>
					</Col>
			</Row>
        </Container>
	);
}

//justify-content-md-center

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