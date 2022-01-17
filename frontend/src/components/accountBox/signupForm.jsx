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

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  let [firstName, setFirstName] = useState();
  let [lastName, setLastName] = useState();
  let [email, setEmail] = useState();
  let [phone, setPhone] = useState();
  let [address, setAddress] = useState();
  let [password, setPassword] = useState();
  let [cPassword, setCPassword] = useState();

  const signUp = async () => {
    try {
      if (password != cPassword) {
        console.log("Password and confirm password does not match!");
        return;
      }

      const response = await axios.post("/auth/register", {
        firstName,
        lastName,
        email,
        phone,
        address,
        password,
      });

      console.log(response.data);

      switchToSignin();
    } catch (err) {
      console.log(err.response.data.error);
    }
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="text"
          placeholder="First Name"
          onChange={({ target }) => setFirstName(target.value)}
        />
        <Input
          type="text"
          placeholder="Last Name"
          onChange={({ target }) => setLastName(target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          onChange={({ target }) => setEmail(target.value)}
        />
        <Input
          type="text"
          placeholder="Phone number"
          onChange={({ target }) => setPhone(target.value)}
        />
        <Input
          type="text"
          placeholder="Address"
          onChange={({ target }) => setAddress(target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          onChange={({ target }) => setCPassword(target.value)}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={signUp}>
        Signup
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
