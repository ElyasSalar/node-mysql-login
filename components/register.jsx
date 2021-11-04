// hooks
import { useState } from "react";
import { useRouter } from "next/router";

// styles
import { Button, Input, Heading, Text, Kbd } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { logState } from "../redux/actions";

export default function Register({ setTabIndex}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const [credentials, setCredentials] = useState({
    name: '',
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
    fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentialsToRequest)
    }).then(res => res.json()).then(res => {
      dispatch(logState(res.loggedIn))
      
      setCredentials({
        name: '',
        email: '',
        password: '',
      });

      if(res.created) {
        setErrorMessage(res.message);
        return res;
      }
      
      setErrorMessage("");
      router.push('/');

      return res
    })

  }
  
  return (
    <>
      <form onSubmit={handleAuthUser}>
        <Heading size="lg" mt={5} mb={2}>Register</Heading>
        <Text fontSize='xs' mb={4}>
          Wanna create an account? provide us with your information as 
          required below and DONE!
        </Text>
        <Input
          flexBasis={{ md: "30%" }}
          mt={{ base: 2 }}
          placeholder="Name"
          name="name"
          value={credentials.name}
          onChange={handleValueChange}
          required
        />
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
        <Text>{errorMessage}</Text>
        <Text my={2}>
          Already have account? 
          <Kbd
            cursor='pointer'
            onClick={() => setTabIndex(0)}
            >login right away</Kbd>
        </Text>
        <Button
          type="submit"
          bg="blue.900"
          isFullWidth
          color="blue.300"
          mt={5}
        >
          Register
        </Button>
      </form>
    </>
  );
}
