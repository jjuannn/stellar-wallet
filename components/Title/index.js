import { Heading, Text } from "@chakra-ui/react";

export default function Title({ title, subtitle }) {
  return (
    <>
      <Heading size={"2xl"}>{title}</Heading>
      <Text textAlign={"center"} fontSize={"2rem"} marginTop={"2"}>
        {subtitle}
      </Text>
    </>
  );
}
