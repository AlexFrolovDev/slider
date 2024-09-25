import { Box, Center, Heading } from "@chakra-ui/react";

const Chip = (props: { text: string }) => {
  const { text = "" } = props;
  return (
    <Box alignItems={"center"} className="carousel-item" width={"fit-content"}>
      <Center width={200}>
        <Heading as={"h3"} size={"md"}>
          {text}
        </Heading>
      </Center>
    </Box>
  );
};

export default Chip;
