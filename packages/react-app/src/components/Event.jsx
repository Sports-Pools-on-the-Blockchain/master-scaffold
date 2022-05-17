import { useRadioGroup, HStack, Text } from "@chakra-ui/react";
import RadioCard from "./RadioCard";

export default function Matchup({ event }) {
  console.log(event);
  const date = event.event_date;
  const [team1, team2] = event.teams;

  const handleChange = value => {
    console.log(`${team1} vs ${team2} -> ${value}`);
  };

  const { getRadioProps, getRootProps } = useRadioGroup({
    name: `${team1.name} vs ${team2.name}`,
    defaultValue: "react",
    onChange: handleChange,
  });

  const group = getRootProps();
  const name = team1.name;
  const name2 = team2.name;

  const radio1 = getRadioProps({ name });
  const radio2 = getRadioProps({ name2 });
  return (
    <HStack {...group} pt={"20px"}>
      {team1.is_away ? (
        <RadioCard key={team1.team_id} {...radio1} {...getRadioProps({ value: team1.name })}>
          {team1.name}
        </RadioCard>
      ) : (
        <RadioCard key={team2.team_id} {...radio2} {...getRadioProps({ value: team2.name })}>
          {team2.name}
        </RadioCard>
      )}
      <Text>
        @ <br />
        {new Date(date).toDateString()}
      </Text>
      {team1.is_home ? (
        <RadioCard key={team1.team_id} {...radio1} {...getRadioProps({ value: team1.name })}>
          {team1.name}
        </RadioCard>
      ) : (
        <RadioCard key={team2.team_id} {...radio2} {...getRadioProps({ value: team2.name })}>
          {team2.name}
        </RadioCard>
      )}
    </HStack>
  );
}
