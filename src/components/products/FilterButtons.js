import { useEffect, useState } from "react"
import Select from 'react-select';
import useAxios from "../../hooks/useAxios";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from "react-use-cart";
import { BASE_URL } from '../../constants/api';
import { Link } from 'react-router-dom';
import { CartPlus, ChevronRight } from "react-bootstrap-icons";



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
  

  return (
      <>

                  <Container >
                      <Row >
                      <Col xs="auto" className="m-2">
                        <Select 
                          getOptionLabel={option => option.attributes.name} 
                          getOptionValue={option => option.id}
                          options={categories}
                          placeholder="Filter by Genres"
                          onChange={value => filterResult(value ? value.attributes.name : null)}
                        />
                      </Col>
                      <Col xs="auto" className="m-2">
                        <Button size="sm" className="btn--gray" onClick={() => setProductsData(products)}>View all</Button>
                      </Col>
                      </Row>


                          <Row className="my-3 mx-auto">
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

                              const image = BASE_URL + item.attributes.image.data.attributes.url;

                              return (
                                  <Card 
                                  key={id}
                                  as={Col}
                                  style={{ minWidth: '14.5rem', padding: "0" }} 
                                  className="m-2 product"
                                  xs={10}
                                  sm={2}
                                  md={1}

                              >
                                  <Card.Body>
                                      <Card.Img variant="top" src={image} />
                                      <Card.Text id="name" name="name" value={name} className="font-weight-bold">{name}</Card.Text>
                                      <Card.Text id="price" name="price" value={price}>${price}</Card.Text>
                                  </Card.Body>
                                  <Card.Footer className="product-card__buttons">
                                      <Button size="sm" className="btn--light-purple"><Link to={`/products/${item.id}`}><ChevronRight />Details</Link></Button>
                                      <Button onClick={() => addItem(productData)} size="sm" className="btn--light-green"><CartPlus />Add to cart</Button>
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