// we need useState to track the FormInput from the FormInput fields
import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';


import './sign-up-form.styles.scss' 

// object that allows us to keep track of multiple fields inside our form.
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = () => {
  // pass usestate the defaultFormFields value, which is an object with the above values
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields; // init values, which will change.
  
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email, password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
      
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('email already in use')
      } else {
        console.log('user creation error', error);
      }
    }

  };

  const handleChange = (event) => {
    // the name will come through on the event. 
    // So we can tell our setState which of these fields to update
    const { name, value } = event.target;

    // set form fields to the object. the '...' SPREADS values to all fields.
    // [name] - update appropriate field - 'take this value and apply it here, from this variable'
    // value - gives us the value to update.
    setFormFields({ ...formFields, [name]: value })
  };

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        
        <FormInput
          label='Display Name'
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          // we use the values we pulled off our formFields - 
          // ... so the value from the state is the value that's shown on the FormInput
          // but it's circular - so when the user types those values in:
          // ... our onChangeHandler pushes the values into the state!
          // because there's overlap between the name and value, we're able to create this
          //simple shorthand method of storing and setting this uniform object in our form. 
          value={displayName}
        />

        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        /> 

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />

        <FormInput
          label='Confirm Password'
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        /> 

        <Button type='submit'>Sign Up</Button>

      </form>
    </div>
  );  
}

export default SignUpForm;