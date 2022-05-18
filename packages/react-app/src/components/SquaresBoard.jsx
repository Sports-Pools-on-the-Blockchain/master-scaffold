import React, { useEffect } from "react";
import { Grid, GridItem, Text, Center } from "@chakra-ui/react";
export default function SquaresBoard({ eventID }) {
  useEffect(() => {
    async function getSquaresFromContract() {
      //TODO call smart contract using eventID
    }
    getSquaresFromContract();
  }, []);

  return (
    <>
      <Grid templateColumns="repeat(11, 1fr)" templateRows="repeat(11, 1fr)" gap={0} p={10}>
        <GridItem rowSpan={1} colSpan={11} bg="beige" pt={"10px"}>
          <Center>
            <Text>Home team</Text>
          </Center>
        </GridItem>
        <GridItem rowSpan={11} colSpan={1} bg="beige" pt={"10px"}>
          <Center>
            <Text sx={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>Away Team</Text>
          </Center>
        </GridItem>
        {Array.from(new Array(110), (val, index) => (
          <GridItem w="100%" h="10" border={"2px"}>
            <Text></Text>
          </GridItem>
        ))}
      </Grid>
    </>
  );
}
