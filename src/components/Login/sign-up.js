import { Link, useNavigate } from "react-router-dom"
import styled from "@emotion/styled"
import { useRef } from "react"
import { createUser } from "../../services/session-service";
import PropTypes from "prop-types";
import { colors } from "../../styles";

const StyledSignup = styled.div`
  max-width: 720px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
    height: 100vh;
  gap: 2rem;
  align-items: center;
`;

const StyledSignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledInput = styled.input`
width: 320px;
border-radius: 6px;
padding: 8px 12px;
border: 1px solid ${colors.gray[300]};
&:hover {
  background-color: ${colors.gray[50]};
}
&:focus {
  border-color: ${colors.pink[400]};
}
&:active {
  border-color: ${colors.pink[400]};
}
::placeholder {
    color:  ${colors.gray[300]};
}
-moz-appearance: textfield;
appearance: textfield;
::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
`;

export const StyledLabel = styled.label`
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: 0.125rem;
    text-transform: uppercase;
`;

const SignupSubmit = styled.input`
    background-color: ${colors.pink[400]};
    display: flex;
    justify-content: center;
    padding: 8px 12px;
    gap: 0.25rem;
    width: 100%;
    border-radius: 4px;
    color: ${colors.white};
    cursor: pointer;
    border: none;
    &:hover {
      background-color: ${colors.pink[500]};
    }
    &:focus {
      background-color: ${colors.pink[700]};  
    }
`

export const linkTextStyle = {
  textDecoration: 'none',
  color: colors.pink[600],
};



function SignupForm() {
    const formRef = useRef()
    const navigate = useNavigate()
  
    const handleSubmit =  (event) => {
      event.preventDefault()
      const { email, password, firstname, lastname, phone } = formRef.current.elements
      createUser(email.value, password.value, firstname.value, lastname.value, phone.value).then(()=> {
        console.log("Se registró")
        navigate("/categories")
      })
    }
  
  
    return (
      <div>
        <StyledSignup>
          <h2>Sign up</h2>
          <StyledSignupForm onSubmit={handleSubmit} ref={formRef}>
            <StyledLabel>EMAIL</StyledLabel>
            <StyledInput type="email" name="email" placeholder="example@mail.com"/>
            <StyledLabel>PASSWORD</StyledLabel>
            <StyledInput type="password" name="password" placeholder="******"/>
            <StyledLabel>FIRST NAME</StyledLabel>
            <StyledInput type="text" name="firstname" placeholder="John"/>
            <StyledLabel>LAST NAME</StyledLabel>
            <StyledInput type="text" name="lastname" placeholder="Doe"/>
            <StyledLabel>PHONE</StyledLabel>
            <StyledInput type="number" name="phone" placeholder="987654321"/>
            <SignupSubmit type="submit" value="SIGN UP"/>
          </StyledSignupForm>
          <Link to="" onClick={navigate("/")} style={linkTextStyle}>Login</Link>
        </StyledSignup>
      </div>
    );
  }
  
  export default SignupForm;
  