import SignUpForm from '../../components/sign-up-form/SignUpform.component';  

import SignInForm from '../../components/sign-in-form/Sign-form.component';
import './Auth.styles.scss';





function Auth() {

    
    return (
    <div className='authentication-container'>
      <SignInForm/>
    <SignUpForm/>
    
    </div>
  )
}

export default Auth