import { useRadioGroup, HStack } from "@chakra-ui/react";
import RadioCard from "./RadioCard";

export default function Matchup({ matchup }) {
  const team1 = matchup[0];
  const team2 = matchup[1];

  const handleChange = value => {
    console.log(`${team1} vs ${team2} -> ${value}`);
  };

  const { getRadioProps, getRootProps } = useRadioGroup({
    name: `${team1} vs ${team2}`,
    defaultValue: "react",
    onChange: handleChange,
  });

  const group = getRootProps();

  const radio1 = getRadioProps({ team1 });
  const radio2 = getRadioProps({ team2 });
  return (
    <HStack {...group}>
      <RadioCard key={team1} {...radio1} {...getRadioProps({ value: team1 })}>
        {team1}
      </RadioCard>
      <RadioCard key={team2} {...radio2} {...getRadioProps({ value: team2 })}>
        {team2}
      </RadioCard>
    </HStack>
  );
}
