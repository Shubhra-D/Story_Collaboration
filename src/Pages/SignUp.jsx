import { Box ,Input,Button,Flex,Heading,Text} from '@chakra-ui/react'
import React, { useState } from 'react'
import { signInWithPopup,createUserWithEmailAndPassword ,updateProfile} from 'firebase/auth';
import {provider,auth} from '../Firebase/firebaseconfig'
import { FcGoogle } from 'react-icons/fc';

const SignUp = () => {
  const [userName,setUserName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);
   
  //signup using email and password 
  const handleSignUp = async()=>{
    try{
      const userCredential =  await createUserWithEmailAndPassword(auth,email,password);
      await updateProfile(userCredential.user,{displayName:userName})
      alert(`${userName} Signed Up Successfully`)
      localStorage.setItem("UserName",userName)
       window.location.reload();
    }catch(err){
        setError(err.message)
    }
  }
  //login using google
  const login = async()=>{
     try{
          await signInWithPopup(auth,provider);
     }catch(err){
        setError(err.message)
     }
  }
  
  return (
    <Box>
        <Heading m={4} fontWeight={"bolder"}  fontSize="2xl" textAlign={"center"} color={"whiteAlpha.800"}>
        Sign up
      </Heading>
      {error && <Text color={"red.500"}>{error}</Text>}
      <Box  display={"flex"} p={5} gap="3" flexDirection={"column"} alignItems={"center"}>
      <Input
        placeholder="Enter Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        bg={"whiteAlpha.900"}
        border={"none"}
      />
      <Input
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        bg={"whiteAlpha.900"}
        border={"none"}
      />
      <Input
       bg={"whiteAlpha.900"}
      border={"none"}
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      </Box>
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Button
          m={2}
          bg="none"
          backgroundImage="linear-gradient(to right, purple,pink, purple)"
          color="black"
          fontWeight={"bolder"}
          _hover={{
            backgroundImage: "linear-gradient(to right, green, pink,green)",
          }}
          onClick={handleSignUp}
        >
         Sign-Up
        </Button>
        <Button
          m={2}
          bg="none"
          backgroundImage="linear-gradient(to right, purple,pink, purple)"
          color="black"
          fontWeight={"bolder"}
          _hover={{
            backgroundImage: "linear-gradient(to right, green, pink,green)",
          }}
          onClick={login}
        >
        <FcGoogle/>
          Login With Google
        </Button>
      </Flex>
    </Box>
  )
}

export default SignUp