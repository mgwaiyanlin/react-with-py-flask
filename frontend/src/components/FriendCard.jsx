import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useToast } from "@chakra-ui/react"
import { BiTrash } from "react-icons/bi"
import EditModal from "./EditModal"
import { BASE_URL } from "../App"

const FriendCard = ({ friend, setFriends }) => {

    const toast = useToast()

    const deleteFriend = async () => {
        try {
            const response = await fetch(BASE_URL + "/friends/" + friend.id, {
                method: "DELETE",
            })
            const data = response.json()
            if(!response.ok) {
                throw new Error(data.error)
            }
            setFriends((prevFriends) => prevFriends.filter((f) => f.id !== friend.id))
            toast({
                title: 'Friend deleted.',
                description: "A friend was deleted successfully.",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: "top-center"
            })
        } catch (error) {
            console.error(error.message)
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: "top-center"
            })
        }
    }
    
    return (
        <Card>
            <CardHeader>
                <Flex>
                    <Flex flex={"1"} gap={"4"} alignItems={"center"}>
                        <Avatar src={friend.imgUrl} />
                        
                        <Box>
                            <Heading size={"sm"}>{friend.name}</Heading>
                            <Text>{friend.role}</Text>
                        </Box>
                    </Flex>

                    <Flex>
                        <EditModal friend={friend} setFriends={setFriends} />
                        <IconButton
                            variant="ghost"
                            colorScheme="red"
                            size={"sm"}
                            aria-label="See menu"
                            icon={<BiTrash size={20} />}
                            onClick={deleteFriend}
                        />
                    </Flex>
                </Flex>
            </CardHeader>

            <CardBody>
                <Text>
                    { friend.description }
                </Text>
            </CardBody>
        </Card>
    )
}

export default FriendCard
