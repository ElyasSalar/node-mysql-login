// hooks
import { useState } from "react";
import { useRouter } from "next/router";

// styles
import { Button, Input, Heading, Text, Kbd } from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { logState } from "../redux/actions"

export default function Login({ setTabIndex }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  function handleValueChange(e){
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  function handleAuthUser(e){
    e.preventDefault();
    let credentialsToRequest = {
      ...credentials,
      password: credentials.password.hashCode()
    }
    fetch('http://localhost:3000/api/authUser', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentialsToRequest)
    }).then(res => res = res.json()).then(res => {
      setCredentials({
        email: '',
        password: '',
      });

      router.push('/');
      
      dispatch(logState(res.loggedIn))
      return res;
    })

  }
  
  return (
    <>
      <form onSubmit={handleAuthUser}>
        <Heading size="lg" mt={5} mb={2}>Secure login</Heading>
        <Text fontSize='xs' mb={4}>
          If you have account, please provide us with your account 
          information so we make sure your account is highly secure
        </Text>
        <Input
          flexBasis={{ md: "30%" }}
          mt={{ base: 2 }}
          placeholder="Email"
          type='email'
          name="email"
          value={credentials.email}
          onChange={handleValueChange}
          required
        />
        <Input
          flexBasis={{ md: "30%" }}
          mt={{ base: 2 }}
          placeholder="Password"
          type='password'
          name="password"
          value={credentials.password}
          onChange={handleValueChange}
          required
        />
        <Text my={2}>
          Don&apos;t have account yet? 
          <Kbd
            cursor='pointer'
            onClick={() => setTabIndex(1)}
          >Register right away</Kbd>
        </Text>
        <Button
          type="submit"
          bg="blue.900"
          isFullWidth
          color="blue.300"
          mt={5}
        >
          Login
        </Button>
      </form>
    </>
  );
}
