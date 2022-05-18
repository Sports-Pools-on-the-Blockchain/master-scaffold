import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, HStack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

export default function GameDetail() {
  let { eventID } = useParams();
  const [eventData, setEventData] = useState({});

  useEffect(() => {
    console.log("dev: UseEffect Fired");
    async function getGameById() {
      try {
        const options = {
          method: "GET",
          url: `https://therundown-therundown-v1.p.rapidapi.com/sports/4/events/${eventID}`,
          params: { include: "scores" },
          headers: {
            "X-RapidAPI-Host": "therundown-therundown-v1.p.rapidapi.com",
            "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
          },
        };
        console.log("dev: MAKING AXIOS CALL");
        const response = await axios.request(options);
        console.log("dev: ", response.data.events[0]);
        setEventData(response.data.events[0]);
      } catch (e) {
        console.log("ERROR", e);
      }
    }
    getGameById();
  }, [eventID]);

  const handleBuy = e => {
    e.preventDefault();
    //call smart contract here
  };
  if (Object.keys(eventData).length !== 0) {
    const date = eventData.event_date;
    const [team1, team2] = eventData.teams;
    return (
      <>
        <HStack>
          <Text>{team1.is_away ? team1.name : team2.name}</Text>
          <Text>
            @<br />
            {new Date(date).toDateString()}
          </Text>
          <Text>{team1.is_home ? team1.name : team2.name}</Text>
        </HStack>
        <Button onClick={handleBuy}>Buy a Square</Button>
      </>
    );
  } else {
    return <Spinner />;
  }
}
