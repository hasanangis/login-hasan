import React, { useEffect, useState } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

const initialFormValues = {
  email: '',
  password: '',
  terms: false,
};
export const errorMessages = {
    email: 'Email is required',
    password: 'Password is required',
    terms: 'You must accept the terms and conditions',
};
 const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
};
      
const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
    return re.test(password);
}
export default function Login() {
    const history = useHistory();

  const [formData, setFormData] = useState(initialFormValues);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    terms: false,
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(validateForm());
  }, [formData])

  const validateForm = () => {
    return validateEmail(formData.email) && validatePassword(formData.password) && formData.terms;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if(!validateForm()) return;
  
    history.push("/success");
  };

  const handleChange = (event) => {
    const { name, value, type, checked} = event.target;
    if(type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
       setFormData({
        ...formData,
        [name]: value
      });
    }
    if(name === "email") {
      setErrors({
        ...errors,
        email: !validateEmail(value)
      });
    } 
    else if(name === "password") {
      setErrors({
        ...errors,
        password: !validatePassword(value)
      });
    } else if(name === "terms") {
      setErrors({
        ...errors,
        terms: !checked
      });
    }
  }

   return (
    <>
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="email"
          type="email"
          onChange={handleChange}
          value={formData.email}
          invalid={errors.email}
          data-cy="email-input"
        />
        {errors.email && <FormFeedback data-cy="error-message" className="text-danger"> {errorMessages.email}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="Password">Password</Label>
        <Input
          id="Password"
          name="password"
          placeholder="password"
          type="password"
          onChange={handleChange}
          value={formData.password}
          invalid={errors.password}
          data-cy="password-input"
        />
        {errors.password && <FormFeedback data-cy="error-message" className="text-danger">{errorMessages.password} </FormFeedback>}
        </FormGroup>
         <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={formData.terms}
          type="checkbox"
          onChange={handleChange}
          invalid={errors.terms}
          data-cy="terms-input"
        />
            I accept the terms and conditions
        <Label>
            {errors.terms && <FormFeedback data-cy="error-message" className="text-danger">{errorMessages.terms}</FormFeedback>}
        </Label>
      </FormGroup>
        <Button 
        type="submit"
        color="primary" 
        disabled={!isValid}
        data-cy="submit-button"
        >Login</Button>
      </Form>
    </>
    )
}