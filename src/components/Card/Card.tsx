import { CardType } from "./types";
import {
  CardBody,
  Card as ChakraCard,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

type CardProps = {
  data?: CardType;
  className?: string;
};
const Card = (props: CardProps) => {
  const { data, className } = props;

  if (!data) return null;

  return (
    <ChakraCard className={className} minW={"fit-content"}>
      <CardBody width={"fit-content"}>
        <Image
          width={200}
          height={300}
          alt={data.title}
          src={data.imageUrl}
          borderRadius={"7"}
        />
        <Stack mt="6" spacing="3">
          <Heading size={"md"}>{data.title}</Heading>
          <Text maxW={200}>{data.description}</Text>
        </Stack>
      </CardBody>
    </ChakraCard>
  );
};

export default Card;
