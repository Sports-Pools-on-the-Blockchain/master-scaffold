import React, { useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";
import Event from "../components/Event";
import axios from "axios";
/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({ yourLocalBalance, readContracts }) {
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    async function getUpcomingGames() {
      const today = new Date(Date.now()).toISOString().substring(0, 10);

      const options = {
        method: "GET",
        url: `https://therundown-therundown-v1.p.rapidapi.com/sports/4/events/${today}`,
        params: { include: "scores", offset: "300" },
        headers: {
          "X-RapidAPI-Host": "therundown-therundown-v1.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
        },
      };
      console.log("MAKING AXIOS CALL");
      const response = await axios.request(options);
      console.log("EVENTS OBJECT: ", response.data.events);
      setEventsList(response.data.events);
    }
    getUpcomingGames();
  }, []);
  return (
    <VStack>
      {eventsList.map(event => {
        return <Event event={event} />;
      })}
    </VStack>
  );
}
export default Home;
