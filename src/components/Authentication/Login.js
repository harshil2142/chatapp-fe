import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseApiUrl } from "../../utility/utility";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [show, setShow] = useState();
    const toast = useToast();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleClick = ()=> setShow(!show)
    const postDetails = (pics)=>{
  
    }
    const submitHandler = async()=>{
      setLoading(true);
    if ( !email || !password ) {
      toast({
        title: "Please Fill all the fields",
        // description: "We've created your image for you.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false)
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${baseApiUrl}/api/user/login`,
        {  email, password },
        config
      );
      // console.log(data);
      if (data){
        localStorage.setItem('userInfo',JSON.stringify(data))
        toast({
          title: "Login Sucessfull",
          // description: "We've created your image for you.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        navigate("/chats")
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast({
        title: "Error Occured",
        description: error?.response?.data?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

    }
    return (
      <VStack spacing="5px">
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          isLoading={loading}
        >
          Submit
        </Button>
        <Button
        variant="solid"
          colorScheme="red"
          width="100%"
          style={{ marginTop: 15 }}

          onClick={()=>{
            setEmail("guest@example.com")
            setPassword("123456")
          }}
        >
          Get User Credentials
        </Button>
      </VStack>
    );
}

export default Login
