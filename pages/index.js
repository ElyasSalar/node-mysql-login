import Head from 'next/head'
import { Box, Heading, Divider, Grid, Stack, Text, Button, Flex, Spacer } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import { logState } from '../redux/actions';

export default function Home() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state);
  const router = useRouter();
  if(process.browser){
    if(!isLoggedIn) {
      router.push('/login');
    }
  }

  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:3000/api/users', {method: "GET"})
    .then(res => res.json())
    .then(res => {
      setUsers(res.users)
      return res
    })
  }, [])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        px={20}
        color='#1a202c'
      >
        <Flex >
          <Heading fontSize='6xl'>Private User Accounts</Heading>
          <Spacer />
          <Button
            onClick={() => { dispatch(logState(false)) }}
            bgColor='blue.700'
            color='blue.100'
            variant='solid'
            mb={5}
            alignSelf='flex-end'
            _hover={{bgColor: 'black'}}
          >Log Out</Button>
        </Flex>

        <Divider my={2} borderColor='#1a202c' />

        <Grid templateColumns='repeat(4, 1fr)' gap={4}>
          {
            users.map(user => (
              <Stack
                key={user.id}
                bgColor='#1a202c'
                p={5}
                color='#e1ebff'
                borderRadius='lg'
                boxShadow='xl'
              >
                <Heading fontSize='xx-small' lineHeight='5px'>Email</Heading>
                <Text fontSize='lg'>{user.email}</Text>
                <Divider borderColor='#e1ebff' />
                <Heading fontSize='xx-small' lineHeight='5px'>Password</Heading>
                <Text fontSize='lg'>{user.password}</Text>
              </Stack>
            ))
          }
        </Grid>
      </Box>
    </>
  )
}


String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; 
  }
  return hash;
};