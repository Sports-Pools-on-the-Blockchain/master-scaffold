import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React from "react";
import { Link } from "react-router-dom";
import { VStack, HStack, useRadioGroup, RadioGroup } from "@chakra-ui/react";
import RadioCard from "../components/RadioCard";
import Matchup from "../components/Matchup";
/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({ yourLocalBalance, readContracts }) {
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  // const purpose = useContractReader(readContracts, "YourContract", "purpose");

  const options = [
    ["Grizzlies", "Warriors"],
    ["Celtics", "Bucks"],
  ];

  return (
    <VStack>
      {options.map(matchup => {
        return <Matchup matchup={matchup} />;
      })}
    </VStack>
  );
}

export default Home;
