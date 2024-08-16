import { Box, Button, Container, Flex, Heading, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"
import CreateFriendModal from "./CreateFriendModal";

function Navbar({ setFriends }) {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Container maxW={"900px"}>
            <Box px={4} my={4} borderRadius={5} bg={useColorModeValue("gray.200", "gray.700")}>
                <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                    {/* left side */}
                    <Flex alignItems={"center"} justifyContent={"center"} gap={2} display={{ base: "none", sm: "flex" }}>
                        <Heading size={'lg'}>Python Project</Heading>
                        <img src="/python.svg" alt="Python Logo" width={50} height={50} />
                    </Flex>

                    {/* right side */}
                    <Flex alignItems={"center"} justifyContent={"center"} gap={3}>
                        <Text fontSize={"lg"} fontWeight={500} display={{ base: "none", md: "block" }}>
                            Friendship
                        </Text>

                        {/* the btn to change light or dark mode */}
                        <Button onClick={toggleColorMode}>
                            {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
                        </Button>
                        <CreateFriendModal setFriends={setFriends} />
                    </Flex>
                </Flex>
            </Box>
        </Container>
    )
}

export default Navbar;

