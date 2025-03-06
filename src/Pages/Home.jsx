import { Box, Heading, Image, Text, Button, VStack, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../Firebase/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const [stories, setStories] = useState([]);
  const [contributionText, setContributionText] = useState("");
  const [selectedStoryId, setSelectedStoryId] = useState(null); // Tracks which story user is contributing to
  const [currentUser,setCurrentUser] = useState(null);
  //get the user
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(user)=>{
      setCurrentUser(user);
    });
    return ()=>unsubscribe();
  },[])
  //fetch the stories from realtime
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(
          `https://social-media-project-acf57-default-rtdb.firebaseio.com/stories.json`
        );
        const data = response.data;

        if (data) {
          const parentId = Object.keys(data)[0]; // Get unique parent ID
          const storiesObject = data[parentId]; // Extract stories inside parent ID

          const storiesArray = Object.entries(storiesObject).map(([id, story]) => ({
            id,
            ...story,
          }));

          setStories(storiesArray);
        } else {
          setStories([]); // No stories found
        }
      } catch (err) {
        console.error("Error Fetching stories", err);
      }
    };
    fetchStories();
  }, []);


  //MAX LIMIT
  const MAX_CONTRIBUTION = 5; //max contibutions no for 1 user
  const MAX_WORDS = 10;//max words for 1 contributor 
  // Function to handle contribution
  const handleContribute = async (storyId) => {
    if (!currentUser) return alert("You must be logged in to contribute!");
    const words = contributionText.trim().split(/\s+/)//split text into words
    if(words.length>MAX_WORDS){
      return alert(`You exceeded the maximum word Limit`)
    }
    
    try {
      const userId = currentUser.uid;
      const storyUrl = `https://social-media-project-acf57-default-rtdb.firebaseio.com/stories/${storyId}/contributions.json`
      //fetch contribution for count
      const response = await axios.get(storyUrl);
      const contributions = response.data || {};
      //counting the no. user has contributed
      const userContribution = Object.values(contributions).filter((e)=>e.userId === userId)
      if(userContribution.length>=MAX_CONTRIBUTION){
         return alert(`You can only contribute ${MAX_CONTRIBUTION}`)
      }
      const contribution = {
        text: contributionText,
        contributor: currentUser.displayName||"Anonymous",
        userId,
      };

      await axios.patch(storyUrl,
        {
          [Date.now()]: contribution, // Unique key for each contribution
        }
      );

      setStories((prevStories) =>
        prevStories.map((story) =>
          story.id === storyId
            ? { ...story, contributions: { ...story.contributions, [Date.now()]: contribution } }
            : story
        )
      );

      setContributionText(""); 
      setSelectedStoryId(null); // Hide input box
    } catch (err) {
      console.error("Error adding contribution", err);
    }
  };

  return (
    <VStack spacing={6} p={6}>
      <Heading textAlign={"center"} color={"teal.400"} m={3} fontSize={"4xl"}>
        Stories 📖
      </Heading>

      {stories.length > 0 ? (
        stories.map((story) => (
          <Box
            key={story.id}
            w={"80%"}
            p={5}
            borderRadius="lg"
            boxShadow="lg"
            bg={"gray.100"}
            textAlign="center"
          >
            <Text fontWeight={"bold"} fontSize={"2xl"} color={"teal.600"}>
              {story.title}
            </Text>
            <Text mt={2} fontSize="lg" color="gray.700">
              {story.content}
            </Text>
            <Text mt={3} fontSize="sm" color="gray.500">
              Created by: {story.createdBy}
            </Text>

            {/* Contributions Section */}
            {story.contributions && (
              <Box mt={4} bg="gray.200" p={3} borderRadius="md">
                <Text fontWeight="bold" color="teal.500">
                  Contributions:
                </Text>
                {Object.values(story.contributions).map((c, index) => (
                  <Text key={index} fontSize="sm">
                    {c.text} - <i>{c.contributor}</i>
                  </Text>
                ))}
              </Box>
            )}

            {/* Show "Collaborate" button only if user is signed in */}
            {currentUser && (
              <>
                {selectedStoryId === story.id ? (
                  <Box mt={4}>
                    <Textarea
                      value={contributionText}
                      onChange={(e) => setContributionText(e.target.value)}
                      placeholder="Add a sentence..."
                      size="sm"
                      bg="white"
                    />
                    <Button
                      mt={2}
                      colorScheme="teal"
                      size="sm"
                      onClick={() => handleContribute(story.id)}
                      
                    >
                      Submit ✍
                    </Button>
                    <Button
                      mt={2}
                      size="sm"
                      ml={2}
                      onClick={() => setSelectedStoryId(null)}
                    >
                      Cancel ❌
                    </Button>
                  </Box>
                ) : (
                  <Button
                    mt={4}
                    colorScheme="teal"
                    size="sm"
                    onClick={() => setSelectedStoryId(story.id)}
                    isDisabled={userContributions >= MAX_CONTRIBUTIONS}
                  >
                    {userContributions >= MAX_CONTRIBUTIONS ? "Limit Reached" : "Collaborate ✍"}
                  </Button>
                )}
              </>
            )}
          </Box>
        ))
      ) : (
        <>
          <Text p={5} m={2} fontWeight={"bold"} fontSize={"3xl"} color={"teal.400"}>
            No Stories Found
          </Text>
          <Image src="/waiting.gif"/>
        </>
      )}
    </VStack>
  );
};

export default Home;
