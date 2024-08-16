import { BiAddToQueue } from 'react-icons/bi'
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    useDisclosure,

    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Textarea,
    RadioGroup,
    Radio,
    ButtonGroup
} from '@chakra-ui/react'
import { useState } from 'react'
import { BASE_URL } from '../App'
import { useToast } from '@chakra-ui/react'

const CreateFriendModal = ({setFriends}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const [inputs, setInputs] = useState({
        name: "",
        gender: "",
        role: "",
        description: ""
    })
    const toast = useToast()

    const createFriend = async (e) => {
        // preventing page reload when you submit
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await fetch(BASE_URL + "/friends", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                //  A JavaScript method to convert objects into JSON strings for data transmission.
                body: JSON.stringify(inputs)
            })

            // reads the body of the HTTP response and parses it as JSON  and  resolves to a JavaScript object or array.
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error)
            }

            toast({
                title: 'Friend created.',
                description: "A friend was created successfully.",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: "top-center"
            })

            // to close modal
            onClose()
 
            setInputs({
                name: "",
                gender: "",
                role: "",
                description: ""
            })
            // to render with new data
            setFriends((prevFriends) => [...prevFriends, data])

        } catch (error) {
            console.error(error.message)

            toast({
                title: 'An error occured',
                description: error.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: "top-center"
            })
        } finally {
            setIsLoading(false)
           
        }
    }

    return (
        <>
            <Button onClick={onOpen}>
                <BiAddToQueue size={20} />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />

                <form onSubmit={createFriend}>
                    <ModalContent>
                        <ModalHeader>Add my new friend 😍</ModalHeader>
                        <ModalCloseButton />

                        <ModalBody pb={6}>
                            <Flex alignItems={'center'} gap={4}>

                                {/* input form start */}
                                <FormControl>
                                    <FormLabel>Full name</FormLabel>
                                    <Input
                                        placeholder="Mr.Sudo"
                                        value={inputs.name}
                                        onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Role</FormLabel>
                                    <Input
                                        placeholder="Cyber Security Engineer"
                                        value={inputs.role}
                                        onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
                                    />
                                </FormControl>
                                {/* input form end */}

                            </Flex>

                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    resize={"none"}
                                    overflowY={"hidden"}
                                    placeholder="He's a cyber security engineer who loves to protect people from cyber attack."
                                    value={inputs.description}
                                    onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                                />
                            </FormControl>

                            <RadioGroup mt={4}>
                                <Flex gap={5}>
                                    <Radio value='male' onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}>Male</Radio>
                                    <Radio value='female' onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}>Female</Radio>
                                </Flex>
                            </RadioGroup>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} type='submit'>
                                Add
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    )
}

export default CreateFriendModal
