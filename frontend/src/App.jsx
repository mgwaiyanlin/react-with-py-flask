import { Container, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import Navbar from './components/Navbar'
import FriendGrid from './components/FriendGrid'

export const BASE_URL = "http://127.0.0.1:5000/api"

function App() {
  const [friends, setFriends] = useState();

  return (
    <Stack minH={"100vh"}>
      {/* navigation bar */}
      <Navbar setFriends={setFriends} />

      <Container maxW={"1200px"} my={4}>
        <Text fontSize={{ base: "3xl", md: "50" }} fontWeight={"bold"} letterSpacing={"2px"} textTransform={"uppercase"} textAlign={"center"} mb={8}>
          <Text as={"span"} bgGradient={"linear(to-r, cyan.400, pink.500)"} bgClip={"text"}>My Friend List</Text> ❣
        </Text>

        {/* friend lists */}
        <FriendGrid friends={friends} setFriends={setFriends} />
      </Container>
    </Stack>
  )
}

export default App
