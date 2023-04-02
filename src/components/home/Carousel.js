import Carousel from 'react-bootstrap/Carousel';
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../constants/api";
import axios from 'axios';

const url = BASE_URL + "/api/slider-images?populate=*";

function CarouselSlider() {

    const [slider, setSlider] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

    

    useEffect(function () {

		async function getMedia() {

			try {
				const response = await axios.get(url);
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
                    <h3>{image.attributes.sliderHeading}</h3>
                    <p>{image.attributes.sliderParagraph}</p>
                    </Carousel.Caption>
                </Carousel.Item>

            )
        })}
    
    </Carousel>
  );
}

export default CarouselSlider;