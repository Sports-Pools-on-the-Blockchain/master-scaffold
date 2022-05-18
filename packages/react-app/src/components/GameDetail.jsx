import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, HStack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import {
  Spinner,
  Center,
  Box,
  FormControl,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputStepper,
} from "@chakra-ui/react";
import SquaresBoard from "./SquaresBoard";

export default function GameDetail() {
  let { eventID } = useParams();
  const [eventData, setEventData] = useState({});
  const [buyAmount, setBuyAmount] = useState(0);
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
    console.log("dev: ", buyAmount);
    //call smart contract here
  };
  if (Object.keys(eventData).length !== 0) {
    const date = eventData.event_date;
    const [team1, team2] = eventData.teams;
    return (
      <>
        <Center p={4}>
          <Box border={"2px"} p={1}>
            <HStack>
              <Text>{team1.is_away ? team1.name : team2.name}</Text>
              <Text>
                @<br />
                {new Date(date).toDateString()}
              </Text>
              <Text>{team1.is_home ? team1.name : team2.name}</Text>
            </HStack>
          </Box>
        </Center>
        <Center>
          <FormControl w={"20%"}>
            {/* <FormLabel htmlFor="amount" textAlign={"center"}>
              Amount
            </FormLabel> */}
            <NumberInput max={50} min={1} onChange={amt => setBuyAmount(amt)} defaultValue={0}>
              <NumberInputField id="amount" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button onClick={handleBuy} mt={"10px"}>
              Buy a Square (price?)
            </Button>
          </FormControl>
        </Center>

        <SquaresBoard />
      </>
    );
  } else {
    return <Spinner />;
  }
}
