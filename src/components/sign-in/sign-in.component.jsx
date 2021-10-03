import React,{useState} from "react";
import { connect } from "react-redux";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import './sign-in.styles.scss';
import { googleSignInStart, emailSignInStart } from "../../redux/user/user.actions";

const SignIn =({emailSignInStart, googleSignInStart})=>{
  const [userCredenitals, setCredentials]=useState({email:'', password:''});
  const {email, password} = userCredenitals;

  const handleChange=event=>{
    const {value, name}=event.target;
    setCredentials({...userCredenitals, [name]:value});
  }

  const handleSubmit=async event=>{
    event.preventDefault();
    

    emailSignInStart(email, password);
  }
  return(
    <div className='sign-in'>
      <h1 className='title'>I already have an account</h1>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput name='email' type='email' handleChange={handleChange} value={email} label='email' required/>
        <FormInput name='password' type='password' value={password} handleChange={handleChange} label='password' required/>
        <div className='buttons'>
          <CustomButton type='submit'>Sign in</CustomButton>
          <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>Sign in with Google</CustomButton>

        </div>
      </form>

    </div>
  )
}

const mapDispatchToProps = dispatch=>({
  googleSignInStart: ()=>dispatch(googleSignInStart()),
  emailSignInStart: (email, password)=>dispatch(emailSignInStart({email, password})),
})

export default connect(null, mapDispatchToProps)(SignIn);