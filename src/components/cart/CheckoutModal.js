import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { redirect } from 'react-router-dom';
import { useCart } from "react-use-cart";
import Modal from 'react-bootstrap/Modal';

export default function CheckoutModal() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const { emptyCart, items } = useCart();

    function onConfirm() {
        emptyCart();
    }

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Payment confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to proceed with this payment?</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="primary" onClick={() => handleClose(onConfirm)}>
                Confirm payment
            </Button>
        </Modal.Footer>
    </Modal>  

    );

}