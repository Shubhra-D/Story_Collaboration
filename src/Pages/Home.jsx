import { Box, Heading, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import axios from "axios"

const Home = () => {
  const [stories,setStories] = useState([]);
  
  useEffect(()=>{
    const fetchStories = async()=>{
      try{
       const response = await axios.get(`https://social-media-project-acf57-default-rtdb.firebaseio.com/stories.json`)
       const data = response.data;
       if(data){
        const storiesArray = Object.entries(data).map(([id,story])=>({
            id,...story,
        }));
        setStories(storiesArray)
       }else{
        setStories([]);//vacant no stories found
       }

      }catch(err){
        console.error("Error Fetching stories",err)
      }
    }
    fetchStories()
  },[]);
  
  return (
    < >
      <Heading textAlign={"center"} m={4} color={'teal.200'} fontSize={'4xl'}>Stories...</Heading> 
      {stories.length>0 ? (
        stories.map((story)=>(
           <Box key={story.id} textAlign={"center"} bg={'teal.100'} boxShadow={"rgba(0.22,0,0.15) 0px 5px 10px"}>
              <Text fontWeight={"bolder"} fontSize={"2xl"} color={"teal.400"}>{story.title}</Text>
              <Text>Content: {story.content}</Text>
           </Box>
        ))
      ):(
        <>
         <Image src="./assests/waiting.gif" alt='no data found '/>
         <Text fontWeight={"bolder"} fontSize={"3xl"} color={"teal.400"} >No Stories Found</Text>
        </>
      )}
    </>
  )
}

export default Home