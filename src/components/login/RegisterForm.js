import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useState, useContext } from "react";
import { redirect } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL } from "../../constants/api"; 
import InputGroup from "react-bootstrap/InputGroup";
import { LockFill } from "react-bootstrap-icons";
import { EnvelopeFill } from "react-bootstrap-icons";
import { PersonFill } from 'react-bootstrap-icons';
import AuthContext from "../../context/AuthContext";
import FormError from "../common/FormError";
import useLocalStorage from '../../hooks/useLocalStorage';
import SubHeading from '../layout/SubHeading';
import Alert from 'react-bootstrap/Alert';

const url = BASE_URL + "/api/auth/local/register";

const schema = yup.object().shape({
    username: yup.string()
        .required("Please enter a username"),
    email: yup.string()
        //.matches("^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+.)?[a-zA-Z]+.)?(stud.noroff).no$", { message : `Please enter an email address` })
        .required(`Please enter your email address`),
    password: yup.string()
        .min(8, "Password should contain a minimum of 8 characters.")
        .required("Please enter a password"),
});

function RegisterForm() {
    const [registrationError, setRegistrationError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [username, setUsername] = useLocalStorage();
    const [email, setEmail] = useLocalStorage();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [, setAuth] = useContext(AuthContext);

    async function onSubmit(data) {
        setSubmitting(true);
        setRegistrationError(null);

        console.log(data);

        try {
            const response = await axios.post(url, data);
            console.log(response.data);
            setAuth(response.data);
            redirect("/");
        } catch (error) {
            console.log("error", error);
			      setRegistrationError(error.toString());
        } finally {
            setSubmitting(false);
            alert("Registration successful! Now you can log in to view our products.")
        }   
    }

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)} className="pt-3">
            {registrationError && <FormError>{registrationError}</FormError>}
                <SubHeading content="Sign up here" />
                
                <Form.Group>

                    <Form.Group>
                        <InputGroup className="mb-3" controlid="formUsername">
                            <InputGroup.Text id="basic-addon1"><PersonFill /></InputGroup.Text>
                            <Form.Control 
                                type="text" 
                                placeholder="Username" 
                                name="username"
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                                {...register("username")}
                            />
                        </InputGroup>
                        {errors.username && <FormError>{errors.username.message}</FormError>}
                    </Form.Group>

                    
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <InputGroup className="mb-3" controlid="formEmail">
                            <InputGroup.Text id="basic-addon1"><EnvelopeFill /></InputGroup.Text>
                            <Form.Control 
                                type="email" 
                                placeholder="Email" 
                                name="email"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                {...register("email")}
                            />
                        </InputGroup>
                        {errors.email && <FormError>{errors.email.message}</FormError>}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <InputGroup className="mb-3" controlid="formPassword">
                            <InputGroup.Text id="basic-addon1"><LockFill /></InputGroup.Text>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                name="password" 
                                {...register("password")}
                            />
                        </InputGroup> 
                        {errors.password && <FormError>{errors.password.message}</FormError>}
                    </Form.Group>
                </Form.Group>
        
                <Button type="submit" className="mb-3"> 
                    {submitting ? "Signing up..." : "Sign up"}
                </Button>   
            </Form>

        </>
    );
}

export default RegisterForm;