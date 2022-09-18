// we need useState to track the FormInput from the FormInput fields
import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss' 

// object that allows us to keep track of multiple fields inside our form.
const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  // pass usestate the defaultFormFields value, which is an object with the above values
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields; // init values, which will change.
  
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  // calls to databases are asyncronous
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // get back appropriate user auth as a response 
      await signInAuthUserWithEmailAndPassword(
        email,
        password
      );  
      resetFormFields();
    } catch (error) {
      // switch is like if/else. 
      // 'break' means once you've found a match, don't check the following cases.
      switch(error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break 
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(error);
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
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>

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

        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
        </div>

      </form>
    </div>
  );  
}

export default SignInForm;