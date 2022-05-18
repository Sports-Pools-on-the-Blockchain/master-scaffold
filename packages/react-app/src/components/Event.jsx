import { Button, HStack, Text } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";

export default function Matchup({ event }) {
  console.log("EVENTS", event);
  const date = event.event_date;
  const [team1, team2] = event.teams;
  console.log(team1);
  return (
    <Link as={ReactLink} to={`/pool/${event.event_id}`}>
      <Button>
        <HStack>
          <Text>{team1.is_away ? team1.name : team2.name}</Text>
          <Text>
            @ <br />
            {new Date(date).toDateString()}
          </Text>
          <Text>{team1.is_home ? team1.name : team2.name}</Text>
        </HStack>
      </Button>
    </Link>
  );
}
