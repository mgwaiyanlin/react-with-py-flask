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

const CreateFriendModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen}>
                <BiAddToQueue size={20} />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add my new friend 😍</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>
                        <Flex alignItems={'center'} gap={4}>

                            {/* input form start */}
                            <FormControl>
                                <FormLabel>Full name</FormLabel>
                                <Input placeholder="Mr.Sudo"></Input>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Role</FormLabel>
                                <Input placeholder="Cyber Security Engineer"></Input>
                            </FormControl>
                            {/* input form end */}

                        </Flex>

                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea resize={"none"} overflowY={"hidden"} placeholder="He's a cyber security engineer who loves to protect people from cyber attack." />
                        </FormControl>

                        <RadioGroup mt={4} defaultValue='male'>
                            <Flex gap={5}>
                                <Radio value='male'>Male</Radio>
                                <Radio value='female'>Female</Radio>
                            </Flex>
                        </RadioGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Add
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateFriendModal
