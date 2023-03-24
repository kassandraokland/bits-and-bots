import { useEffect, useRef, useState } from "react"
import Select from 'react-select';
import useAxios from "../../hooks/useAxios";
import { Container, Row, Col, Card, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { useCart } from "react-use-cart";
import { BASE_URL } from '../../constants/api';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';


function FilterButtons() {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);
  const [productsData, setProductsData] = useState(null);
  //const [categoryData, setCategoryData] = useState(null);


  const http = useAxios();

  const categoryUrl = `/api/categories?populate=*`;

  const productUrl = "/api/products?populate=*";

  const { addItem } = useCart();

  useEffect(
    function () {
      async function getGenres() {
        try {
          const response = await http.get(categoryUrl);
          console.log("response", response.data.data);
          setCategories(response.data.data);
          const productResponse = await http.get(productUrl);
          console.log(productResponse.data.data);
          setProducts(productResponse.data.data);
          setProductsData(productResponse.data.data);

        } catch (error) {
          console.log(error);
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }

      getGenres();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (loading) return <div>Loading filters...</div>;

  if (error) return <div>{}</div>;

  const filterResult = (catItem) => {

    const result = products.filter((item) => {
      return item.attributes.category.data.attributes.name === catItem;
    });
    setProductsData(result);
  }

  //const handleClear = setProductsData(products);

  const ClearValue = () => {
    setProductsData(products);
  }
  
  
  /*({ innerProps, isDisabled }) =>
  !isDisabled ? (
    <div {...innerProps}>{/* your component internals *//*>}</div>
  ) : null;*/

  

  return (
      <>

                  <Container>
                      <Row>
                      <Col>
                        <Select 
                          getOptionLabel={option => option.attributes.name} 
                          getOptionValue={option => option.id}
                          options={categories}
                          placeholder="Filter by Genres"
                          onChange={value => filterResult(value ? value.attributes.name : null)}
                        />
                      </Col>
                        <Col>
                          <Button onClick={() => setProductsData(products)}>View all</Button>
                        </Col>
                      </Row>


                          <Row>
                          {productsData.map((item) => {

                              const productData = {
                                  id: item.id,
                                  price: item.attributes.price,
                                  title: item.attributes.name,
                                  image: BASE_URL + item.attributes.image.data.attributes.url,
                              }

                              let id = item.id;
                              let name = item.attributes.name;
                              let price = item.attributes.price;
                              let category = item.attributes.category;

                              const image = BASE_URL + item.attributes.image.data.attributes.url;

                              return (
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
                                      <Card.Text id={category.id} name="category" value={category.data.attributes.name}>Genre: {category.data.attributes.name}</Card.Text>
                                  </Card.Body>
                                  <Card.Footer>
                                      <Button size="sm" className="m-2"><Link to={`/products/${item.id}`}>Details</Link></Button>
                                      <Button onClick={() => addItem(productData)} size="sm" className="m-2">Add to cart</Button>
                                  </Card.Footer>
                              </Card>
                          )})}
                      </Row>
                    

                  </Container>
          
      </>
  )
}

export default FilterButtons;

/**                        {categories.map((category => {
                          return (
                            <Button key={category.id} onClick={() => filterResult(category.attributes.name)}>{category.attributes.name}</Button>
                          )
                        }))}
                        <Button onClick={() => setProductsData(products)}></Button> */

/**  const unfilteredResult = (catItem) => {

    const result = data.filter((item) => {
      return item.attributes.category.data.attributes.name === catItem;
    });
    setProducts((products));
  } */

/**                  <Select 
                        getOptionLabel={option => option.attributes.name} 
                        getOptionValue={option => option.id}
                        options={categories}
                        placeholder="Filter by Genres"
                        isClearable
                        onChange={value => filterResult(value.attributes.name)}
                        />  */

/**                  <Row>
                          <DropdownButton id="dropdown-basic-button" title="Filter by genre">
                            <Dropdown.Item onClick={() => filterResult("Action")} className='m-2'>Action</Dropdown.Item>
                            <Dropdown.Item onClick={() => filterResult("Adventure")} className='m-2'>Adventure</Dropdown.Item>
                            <Dropdown.Item onClick={() => setProducts(products)}>All</Dropdown.Item>
                          </DropdownButton>
                    </Row> */

/**                            {categories.map((category) => {
                              return (
                              <Dropdown.Item onClick={() => filterResult(category.attributes.name)} key={category.id} className='m-2'>{category.attributes.name}</Dropdown.Item>
                            )})} */
/**                  <Row>
                        <Select 
                        getOptionLabel={option => option.attributes.name} 
                        getOptionValue={option => option.id}
                        options={categories}
                        placeholder="Filter by Genres"
                        isClearable
                        onChange={catItem => filterResult(catItem.attributes.name)}
                        /> 

                    </Row> */

/*                  <Row>
                      <Dropdown>
                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                              Game Genres
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {categories.map((category) => {
                              return (
                              <Dropdown.Item onClick={() => filterResult(category.attributes.name)} key={category.id} className='m-2'>{category.attributes.name}</Dropdown.Item>
                            )})}
                          </Dropdown.Menu>
                    </Dropdown>

                  </Row>*/