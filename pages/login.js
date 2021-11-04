import Head from 'next/head'
import { Box, Flex, Tabs, Tab, TabList, TabPanels, TabPanel, Button } from '@chakra-ui/react'
import Login from '../components/login'
import Register from '../components/register'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const router = useRouter()
  return (
    <Flex justifyContent='center' h='100vh' w='100vw' alignItems='center' flexDir='column'>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Button
        onClick={() => { router.push('/') }}
        bgColor='blue.700'
        color='blue.100'
        variant='solid'
        mb={5}
        _hover={{bgColor: 'black'}}
      >Private Page</Button>

      <Box
        w='35%'
        h='70vh'
        bgColor='#1a202c'
        boxShadow='md'
        borderRadius='lg'
        p={5}
      >
        <Tabs isFitted variant="enclosed" index={tabIndex}>
          <TabList mb="1em">
            <Tab onClick={() => setTabIndex(0)}>Login</Tab>
            <Tab onClick={() => setTabIndex(1)}>Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login setTabIndex={setTabIndex} />
            </TabPanel>
            <TabPanel>
              <Register setTabIndex={setTabIndex} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  )
}
