import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaBookOpen } from "react-icons/fa6";
import { Link } from "react-router-dom";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebaseconfig";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setUser(user.displayName||localStorage.getItem("userName"))
      }else{
        setUser("");
      }
    });

   
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      p={5}
      m={3}
      bg={"teal.400"}
    >
      {/* Logo Section */}
      <Flex color={"purple.700"} fontWeight={"bolder"} fontSize={"2xl"}>
        <FaBookOpen color={"goldenrod"} />
        <Text>Story Center</Text>
      </Flex>

      {/* Home Link */}
      <Link to="/">
        <Heading color={"purple.700"} fontWeight={"bolder"} fontSize={"2xl"}>
          Home
        </Heading>
      </Link>

      {/* Authentication Section */}
      <Heading>
        {user ? (
          // If user is logged in, show username and logout button
          <>
            <Text color="white" fontSize="lg" fontWeight="bold" display="inline">
              Welcome 🙏, {user || "User"}!
            </Text>
            <Button
              m={2}
              bg="none"
              backgroundImage="linear-gradient(to right, red, pink, red)"
              color="black"
              fontWeight="bolder"
              _hover={{
                backgroundImage: "linear-gradient(to right, green, pink,green)",
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          // If user is NOT logged in, show Sign Up and Login buttons
          <>
            <Link to="/signup">
              <Button
                m={2}
                bg="none"
                backgroundImage="linear-gradient(to right, purple, pink, purple)"
                color="black"
                fontWeight={"bolder"}
                _hover={{
                  backgroundImage: "linear-gradient(to right, green, pink, green)",
                }}
              >
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button
                m={2}
                bg="none"
                backgroundImage="linear-gradient(to right, purple, pink, purple)"
                color="black"
                fontWeight={"bolder"}
                _hover={{
                  backgroundImage: "linear-gradient(to right, green, pink, green)",
                }}
              >
                Login
              </Button>
            </Link>
          </>
        )}
      </Heading>
    </Flex>
  );
};

export default Navbar;
