import "./App.css";
import { ChakraProvider, Heading } from "@chakra-ui/react";

import { CardType } from "./components/Card/types";
import Slider from "./components/Slider";

const MOCK_CARDS: CardType[] = new Array(20).fill(null).map((_, idx) => ({
  id: idx,
  title: `Product ${idx + 1}`,
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque obcaecati commodi consequuntur! Odio commodi minus minima provident rem, facere veritatis. Voluptatibus ab perferendis, facilis ipsa quaerat iure assumenda placeat odit.",
  imageUrl: "https://picsum.photos/200/300",
}));

const MOCK_CATEGORIES = [
  "Fresh Produce",
  "Pantry",
  "Baking",
  "Dairy",
  "Snacks",
  "Beverages",
  "Frozen",
  "Personal Care",
  "Household",
  "Pets",
];

function App() {
  return (
    <ChakraProvider>
      <>
        <Heading mb={8}>Cards</Heading>
        <Slider width={"100%"} items={MOCK_CARDS} itemType="card" />
        <Heading mb={8} mt={8}>
          Chips
        </Heading>
        <Slider width={"100%"} items={MOCK_CATEGORIES} itemType="chip" />
      </>
    </ChakraProvider>
  );
}

export default App;
