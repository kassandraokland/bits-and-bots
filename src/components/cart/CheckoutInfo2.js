import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { redirect } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useCart } from "react-use-cart";


const schema = yup.object().shape({
    name: yup.string()
        .required("Please enter the name on the card"),
        //.matches(/^\S+$/, { message : "Name may not contain spaces or punctuation symbols."}),
    address: yup.string()
        .required("Please enter an address"),
    cardNumber: yup.number()
        .required("Please enter a card number"),
    expiryDate: yup.number()
        .required("Please enter the expire date of the card"),
    securityCode: yup.number()
        .required("Please enter the security code (CVV/ CVC)"),
    zip: yup.number()
        .required("Please enter the registered zip or postal code")
        .min(4, 'Too short - minimum 4 digits.')
        .max(7, 'Too long - maximum 7 digits'),
});

function CheckoutInfo() {
    const [submitting, setSubmitting] = useState(false);
    const [checkoutError, setCheckoutError] = useState(null);

    const { handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const {
        emptyCart,
        isEmpty,
        items,
        cartTotal,
      } = useCart();
  
      console.log(items);
    
      if (isEmpty) return <p>Your cart is empty</p>;


    function onSubmit() {
        setSubmitting(true);
        setCheckoutError(null);

        emptyCart(items);

        redirect("products");
    }

    return (

        <>
            <Form onSubmit={handleSubmit(onSubmit)} className="pt-3">
            {checkoutError && <FormError>{checkoutError}</FormError>}

                <Card>
                    <Card.Header>
                        <Card.Title>Order Summary</Card.Title>
                    </Card.Header>
                    {items.map((item) => (
                    <Card.Body key={item.id} style={{ width: '20rem' }} className="product">
                        <Row>
                            <Col>
                                <Card.Text>{item.title}</Card.Text>
                            </Col>
                            <Col>
                                <Card.Text>Qty: {item.quantity}</Card.Text>
                            </Col>
                            <Col>
                                <Card.Text>${item.price}</Card.Text>
                            </Col>   
                        </Row>
                    </Card.Body>
                    ))}
                    <Card.Footer>
                        <Card.Text>Total: ${cartTotal}</Card.Text>
                    </Card.Footer>
                </Card>
    

                <Card>
                    <Card.Header>
                        <Card.Title>Billing information</Card.Title>
                    </Card.Header>

                    <Card.Body>
                        <Form.Group className="mt-2 mb-2">
                            <Form.Group className="mt-2 mb-2">
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                        type="text" 
                                        placeholder="Enter name" 
                                        name="name"
                                />
                                {errors.name && <FormError>{errors.name.message}</FormError>}
                            </Form.Group>

                            <Form.Group className="mt-2 mb-2">
                                <Form.Label>Address</Form.Label>
                                <Form.Control 
                                    type="address" 
                                    placeholder="Enter address" 
                                    name="address"
                                />
                                {errors.address && <FormError>{errors.address.message}</FormError>}
                            </Form.Group>

                            <Form.Group className="mt-2 mb-2">
                                <Form.Label>Card number</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        placeholder="Enter card number" 
                                        name="cardNumber" 
                                    />
                                {errors.cardNumber && <FormError>{errors.cardNumber.message}</FormError>}
                            </Form.Group>

                            <Form.Group as={Row} className="mt-2 mb-2">
                                <Form.Group as={Col}>
                                    <Form.Label>Expiry Date</Form.Label>
                                    <Form.Control 
                                        type="month" 
                                        aria-placeholder='Expiry date'
                                        name="expiryDate"
                                    />
                                    {errors.expiryDate && <FormError>{errors.expiryDate.message}</FormError>}
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>CVV/ CVC</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        placeholder="Enter CVV/ CVC" 
                                        name="securityCode"
                                    />
                                    {errors.securityCode && <FormError>{errors.securityCode.message}</FormError>}
                                </Form.Group>
                            </Form.Group>

                            <Form.Group className="mt-2 mb-2">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="Enter ZIP/ Postal code" 
                                    name="zip"
                                /> 
                                {errors.zip && <FormError>{errors.zip.message}</FormError>}
                            </Form.Group>
                        </Form.Group>
                    </Card.Body>
                </Card>
        
                <Button type="submit" className="mt-3 mb-3"> 
                    {submitting ? "Submitting payment..." : "Pay now"}
                </Button>   
            </Form>

        </>
        
    );
}

export default CheckoutInfo;