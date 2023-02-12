import { useState } from 'react'

import FormInput from '../form-input/form-input.component';

import Button from '../Button/Button.component';


import './sign-up.styles.scss'

import {createAuthUserWithEmailAndPassword,createUserProfileDocument} from '../../utils/firebase/firebase.utils'

function SignUpForm() {

    const defaultFormValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }


  const [formValues, setFormValues] = useState(defaultFormValues) ;

  console.log(formValues);
  const { name, email, password, confirmPassword } = formValues;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        try {
           const {user} =  await createAuthUserWithEmailAndPassword(email, password);
            //create user in firestore
            await createUserProfileDocument(user, { displayName: name });
            setFormValues(defaultFormValues);
        } catch (error) {
          if(error.code === 'auth/email-already-in-use'){
            alert('cannot create user with this email');
          }
            console.log(error);
        }
    }
  return (
    <div className='sign-up-container'>
 <h2> Don't have an account</h2>   
<span>Signup with your email and password</span>
<form onSubmit={handleSubmit}>  
    <FormInput label='Display Name' id='name' name='name' type="text" required onChange={handleChange} value={name} />
    <FormInput label='Email' id='email' name='email'  type="email" required onChange={handleChange} value={email} />
    <FormInput label='Password' id='password' name='password' type="password" required  onChange={handleChange} value={password} />
    <FormInput label='Confirm Password' name="confirmPassword" id='confirmPassword' type="password" required onChange={handleChange} value={confirmPassword} />
    <Button  type='submit'>Sign Up</Button>
</form>

    </div>
  )
}

export default SignUpForm