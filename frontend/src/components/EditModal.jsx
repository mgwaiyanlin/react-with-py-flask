import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BASE_URL } from "../App";

function EditModal({friend, setFriends}) {
	const { isOpen, onOpen, onClose } = useDisclosure()	
	const toast = useToast()
	const [isLoading, setIsLoading ] = useState(false)
	const [ inputs, setInputs ] = useState({
		name: friend.name,
		gender: friend.gender,
		role: friend.role,
		description: friend.description
	})

	const editFriend = async (e) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			const response = await fetch(BASE_URL + "/friends/"+ friend.id, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs)
			})
			const data = await response.json()

			if(!response.ok) {
				throw new Error(data.error)
			}
			setFriends((prevFriends) => prevFriends.map((f) => f.id === friend.id ? data : f))
			onClose()
			toast({
                title: 'Friend updated.',
                description: "A friend was updated successfully.",
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
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<IconButton
				onClick={onOpen}
				variant='ghost'
				colorScheme='blue'
				aria-label='See menu'
				size={"sm"}
				icon={<BiEditAlt size={20} />}
			/>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<form onSubmit={editFriend}>
					<ModalContent>
						<ModalHeader>My new BFF 😍</ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={6}>
							<Flex alignItems={"center"} gap={4}>
								<FormControl>
									<FormLabel>Full Name</FormLabel>
									<Input
										placeholder='John Doe'
										value={inputs.name}
										onChange={(e) => setInputs((prev) => ({...prev, name: e.target.value}))}
									/>
								</FormControl>

								<FormControl>
									<FormLabel>Role</FormLabel>
									<Input
										placeholder='Software Engineer'
										value={inputs.role}
										onChange={(e) => setInputs((prev) => ({...prev, role: e.target.value}))}
									/>
								</FormControl>
							</Flex>
							<FormControl mt={4}>
								<FormLabel>Description</FormLabel>
								<Textarea
									resize={"none"}
									overflowY={"hidden"}
									placeholder="He's a software engineer who loves to code and build things."
									value={inputs.description}
									onChange={(e) => setInputs((prev) => ({...prev, description: e.target.value}))}
								/>
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme='blue' mr={3} type='submit'>
								Update
							</Button>
							<Button onClick={onClose}>Cancel</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</>
	);
}

export default EditModal;
