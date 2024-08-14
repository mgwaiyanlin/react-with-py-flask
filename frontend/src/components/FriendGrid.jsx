import { Grid } from "@chakra-ui/react"
import { USERS } from '../dummy/dummyapi'
import FriendCard from "./FriendCard"

const FriendGrid = () => {

    return (
        <Grid gap={4} templateColumns={{base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}}>
            {USERS.map((user) => (
                <FriendCard key={user.id} user={user} />
            ))}
        </Grid>
    )
}

export default FriendGrid
