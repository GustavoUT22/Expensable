import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useRef } from "react";
import { loginService } from "../../services/session-service";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { colors } from "../../styles";
import { linkTextStyle } from "./sign-up";
import { StyledLabel } from "./sign-up";

const StyledLogin = styled.div`
  max-width: 720px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
    height: 100vh;
  gap: 2rem;
  align-items: center;
`;

const StyleLoginInput = styled.input`
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
`
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  gap: 1rem;
`;

const StyleLoginSubmit = styled.input`
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

function Login() {
  const formRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = formRef.current.elements;
    loginService(email.value, password.value).then(() => {
      navigate("/categories");
    }).catch((error) => {console.log(error)});
  };

  return (
    <div>
      <StyledLogin>
        <h2>Login</h2>
        <StyledForm onSubmit={handleSubmit} ref={formRef}>
          <StyledLabel>EMAIL</StyledLabel>
          <StyleLoginInput type="email" name="email" placeholder="name@mail.com"/>
          <StyledLabel>PASSWORD</StyledLabel>
          <StyleLoginInput type="password" name="password" placeholder="******"/>
          <StyleLoginSubmit type="submit" value="Login" />
        </StyledForm>
        <Link to="" onClick={navigate("/sign-up")} style={linkTextStyle}>Sign up</Link>
      </StyledLogin>
    </div>
  );
}

export default Login;
