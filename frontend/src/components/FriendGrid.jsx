import { Flex, Grid, Spinner, Text } from "@chakra-ui/react"
import FriendCard from "./FriendCard"
import { useEffect, useState } from "react"
import { BASE_URL } from "../App"

const FriendGrid = ({ friends, setFriends }) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getFriends = async () => {
            try {
                const response = await fetch(BASE_URL + "/friends")
                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.error)
                }
                setFriends(data)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
        getFriends()
    }, [setFriends])

    return (
        <>
            <Grid gap={4} templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}>
                {friends && friends.map((friend) => (
                    <FriendCard key={friend.id} friend={friend} setFriends={setFriends} />
                ))}
            </Grid>

            {isLoading && (
                <Flex justifyContent={"center"}>
                    <Spinner size={"xl"} />
                </Flex>
            )}

            {
                !isLoading && friends.length === 0 && (
                    <Flex justifyContent={"center"}>
                        <Text fontSize={"xl"}>
                            <Text as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2}>
                                Poor you! 😧
                            </Text>
                            No friends found!
                        </Text>
                    </Flex>
                )
            }
        </>
    )
}

export default FriendGrid
