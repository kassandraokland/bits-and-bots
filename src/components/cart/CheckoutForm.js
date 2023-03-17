//import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useCart } from "react-use-cart";
import Modal from 'react-bootstrap/Modal';

const schema = yup.object().shape({
    name: yup.string()
        .required("Please enter the name on the card"),
        //.matches(/^\S+$/, { message : "Name may not contain spaces or punctuation symbols."}),
    address: yup.string()
        .required("Please enter an address"),
    cardNumber: yup.number()
        .required("Please enter a card number"),
    expiryDate: yup.string()
        .required("Please enter the expire date of the card"),
    securityCode: yup.number()
        .required("Please enter the security code (CVV/ CVC)"),
    zip: yup.number()
        .required("Please enter the registered zip or postal code")
        .min(1000, 'Too short - minimum 4 digits.')
        .max(999999, 'Too long - maximum 7 digits'),
});

function CheckoutForm() {
    const [checkoutError, setCheckoutError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { emptyCart, items } = useCart();

    const navigate = useNavigate();

    function onConfirm(items) {
        emptyCart(items);
        navigate("/products");
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    //const [, setAuth] = useContext(AuthContext);

    function onSubmit(data) {
        setSubmitting(true);
        setCheckoutError(null);

        console.log(data);
    }

    console.log(errors);

    return (
        
        <Form onSubmit={handleSubmit(onSubmit)} className="pt-3">
        {checkoutError && <FormError>{checkoutError}</FormError>}

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
                                    required
                                    {...register("name")}
                            />
                            {errors.name && <FormError>{errors.name.message}</FormError>}
                        </Form.Group>

                        <Form.Group className="mt-2 mb-2">
                            <Form.Label>Address</Form.Label>
                            <Form.Control 
                                type="address" 
                                placeholder="Enter address" 
                                name="address"
                                required
                                {...register("address")}
                            />
                            {errors.address && <FormError>{errors.address.message}</FormError>}
                        </Form.Group>

                        <Form.Group className="mt-2 mb-2">
                            <Form.Label>Card number</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="Enter card number" 
                                    name="cardNumber" 
                                    required
                                    {...register("cardNumber")}
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
                                    required
                                    {...register("expiryDate")}
                                />
                                {errors.expiryDate && <FormError>{errors.expiryDate.message}</FormError>}
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>CVV/ CVC</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="Enter CVV/ CVC" 
                                    name="securityCode"
                                    required 
                                    {...register("securityCode")}
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
                                required 
                                {...register("zip")}
                            /> 
                            {errors.zip && <FormError>{errors.zip.message}</FormError>}
                        </Form.Group>
                    </Form.Group>
                </Card.Body>
            </Card>
      
            <Button type="submit" className="mt-3 mb-3" onClick={handleShow}> 
			  	{submitting ? "Submitting payment..." : "Pay now"}
		  	</Button> 

              <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Payment confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to proceed with this payment?</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="primary" onClick={() => handleClose(onConfirm(items))}>
                Confirm payment
            </Button>
        </Modal.Footer>
    </Modal>  
        </Form>
        
    );
}

export default CheckoutForm;

/**        try {
            redirect("products");
        } catch (error) {
            console.log("error", error);
		    setCheckoutError(error.toString());
            console.log(checkoutError);
        } finally {
            setSubmitting(false);
        }    */

/**
        try {
            const response = await axios.get(url, data);
            console.log(response.data);
            setAuth(response.data);
            redirect("products");
        } catch (error) {
            console.log("error", error);
		    setCheckoutError(error.toString());
            console.log({checkoutError});
        } finally {
            setSubmitting(false);
        }   
    }
 */