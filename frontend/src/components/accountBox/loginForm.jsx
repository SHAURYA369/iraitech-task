import React, { useContext, useState } from "react";
import axios from "axios";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import auth from "../../utils/auth";
import { useNavigate } from "react-router";

export function LoginForm(props) {
  const navigate = useNavigate();

  const { switchToSignup } = useContext(AccountContext);

  let [identifier, setIdentifier] = useState();
  let [password, setPassword] = useState();

  const signIn = async () => {
    try {
      const response = await axios.post("/auth/login", {
        identifier,
        password,
      });

      auth.setToken(response.data.token);
      navigate("/profile", { replace: true });
    } catch (err) {
      console.log(err.response.data.error);
    }
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="email"
          placeholder="Email"
          onChange={({ target }) => setIdentifier(target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={signIn}>
        Signin
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
