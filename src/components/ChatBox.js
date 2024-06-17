import React, { useState } from 'react'
import {ChatState} from "../Context/ChatProvider"
import { Box } from '@chakra-ui/react'
import SingleChat from './SingleChat'

const ChatBox = ({fetchAgain,setFetchAgain}) => {

    const { selectedChat } = ChatState()

  return (
    <Box display={"flex"} 
    alignItems={"center"}
    flexDir={"column"}
    p={3}
    bg={"white"}
    w={"100%"}
    borderRadius={"lg"}
    borderWidth={"1px"}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  )
}

export default ChatBox
