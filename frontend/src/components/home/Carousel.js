import Carousel from 'react-bootstrap/Carousel';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Card from "react-bootstrap/Card";
import { BASE_URL } from "../../constants/api";
import Button from "react-bootstrap/Button";
import { useCart } from "react-use-cart";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import GenreDropdown from "./GenreDropdown";
//import ProductCard from "./ProductCard";



function CarouselSlider() {

    const [slider, setSlider] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const http = useAxios();

    

    useEffect(function () {

		async function getMedia() {

			try {
				const response = await http.get(`/api/slider-images?populate=*`);
				console.log("response", response);
				setSlider(response.data);
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

	if (loading) return <div>Loading products...</div>;

	if (error) return <div>{}</div>;

  return (
    <Carousel>
        {slider.data.map((image) => {

            let imgSrc = BASE_URL + image.attributes.image.data.attributes.url;
            return(
                <Carousel.Item key={image.id}>
                    <img
                    className="d-block w-100"
                    src={imgSrc}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>

            )
        })}
    
    </Carousel>
  );
}

export default CarouselSlider;