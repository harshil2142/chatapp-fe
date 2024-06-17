import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import { baseApiUrl } from '../../utility/utility';

const GroupChatModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { user, chats, setChats } = ChatState();
    const [groupChatName, setGroupChatName] = useState()
    const [selectedUsers, setSelectedUsers] = useState([])
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading,setLoading] = useState(false)
    const toast = useToast()

    const handleSearch = async(query)=>{
      setSearch(query)
      if(!query) return;
      try {
          setLoading(true)
          const config = {
            headers:{
              Authorization : `Bearer ${user.token}`
            }
          }
          const {data} = await axios.get(`${baseApiUrl}/api/user?search=${query}`,config)
          // console.log(data,"data");
          setLoading(false)
          setSearchResult(data);
      } catch (error) {
        toast({
          title: "error occured!",
          // description: "We've created your image for you.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
    const handleSubmit =async()=>{
        if( !groupChatName || !selectedUsers){
          toast({
            title: "Please fill all the fileds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }

        try {
          const config = {
            headers:{
              Authorization : `Bearer ${user.token}`
            }
          }

          const {data} = await axios.post(`${baseApiUrl}/api/chat/group`,{
            name : groupChatName,
            users : JSON.stringify(selectedUsers.map((u)=>u._id))
          },config)

          setChats([data , ...chats]);
          onClose();
          toast({
            title: "New group chat created",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        } catch (error) {
          toast({
            title: "Failed to create chat!",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        }
    }

    const handleGroup =(userToAdd)=>{
      if(selectedUsers.includes(userToAdd)){
        toast({
          title: "user already added !",
          // description: "We've created your image for you.",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
      setSelectedUsers([...selectedUsers , userToAdd])
    }

    const handleDelete =(delUser)=>{
      setSelectedUsers(selectedUsers.filter(sel => (sel._id !== delUser._id)))
    }
  return (
    <>
    <span onClick={onOpen}>{children} </span>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent >
        <ModalHeader fontSize={"35px"} fontFamily={"Work sans"} display={"flex"} justifyContent={"center"}>Create Group Chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody display={"flex"} flexDir={"column"} alignItems={"center"}>
          <FormControl>
            <Input placeholder='Chat Name' mb={3} onChange={e => setGroupChatName(e.target.value)} />
            <Input placeholder='Add users' mb={3} onChange={(e)=>{handleSearch(e.target.value)}} />

          </FormControl>
          <Box w={"100%"} display={"flex"} flexWrap={"wrap"}>
          {selectedUsers?.map(u=>(
            <UserBadgeItem key={u._id} user={u} handleFunction={()=>handleDelete(u)}/>
          ))}
          </Box>

          { loading ? <div>loading..</div> : 
          searchResult?.slice(0,4).map((user)=>(
            <UserListItem key={user?._id} user={user} handleFunction={()=>{handleGroup(user)}} /> 
          ))
          }

        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue'  onClick={handleSubmit}>
            Submit
          </Button>
          
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
}

export default GroupChatModal
