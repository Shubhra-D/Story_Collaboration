import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { FaBookOpen } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      p={5}
      m={3}
      bg={"teal.400"}
    >
      <Flex color={"purple.700"} fontWeight={"bolder"} fontSize={"2xl"}>
        <FaBookOpen color={"goldenrod"} />
        <Text>Story Center</Text>
      </Flex>
      <Link
        to="/"
        textDecoration={"none"}
       
      ><Heading  color={"purple.700"}
      fontWeight={"bolder"}
      fontSize={"2xl"}>Home</Heading>
        
      </Link>
      <Heading>
        <Link to="/signup">
          <Button
            m={2}
            bg="none"
            backgroundImage="linear-gradient(to right, purple,pink, purple)"
            color="black"
            fontWeight={"bolder"}
            _hover={{
              backgroundImage: "linear-gradient(to right, green, pink,green)",
            }}
          >
            Sign Up
          </Button>
        </Link>
        <Link to="/login">
          <Button
            m={2}
            bg="none"
            backgroundImage="linear-gradient(to right, purple,pink, purple)"
            color="black"
            fontWeight={"bolder"}
            _hover={{
              backgroundImage: "linear-gradient(to right, green, pink,green)",
            }}
          >
            Login
          </Button>
        </Link>
      </Heading>
    </Flex>
  );
};

export default Navbar;
