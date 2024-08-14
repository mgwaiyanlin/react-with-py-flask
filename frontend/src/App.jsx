import { Container, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import Navbar from './components/Navbar'
import FriendGrid from './components/FriendGrid'


function App() {

  return (
    <Stack minH={"100vh"}>
      {/* navigation bar */}
      <Navbar />

      <Container maxW={"1200px"} my={4}>
        <Text fontSize={{ base: "3xl", md: "50" }} fontWeight={"bold"} letterSpacing={"2px"} textTransform={"uppercase"} textAlign={"center"} mb={8}>
          <Text as={"span"} bgGradient={"linear(to-r, cyan.400, pink.500)"} bgClip={"text"}>My Friend List</Text> ❣
        </Text>

        {/* friend lists */}
        <FriendGrid />
      </Container>
    </Stack>
  )
}

export default App
