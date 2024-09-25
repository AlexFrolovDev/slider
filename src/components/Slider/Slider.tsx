import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Box, Center, Flex } from "@chakra-ui/react";
import { CardType } from "../Card/types";
import Card from "../Card";
import Chip from "../Chip";

export type ItemType = "card" | "chip";

type SliderProps = {
  items: CardType[] | string[];
  itemType: ItemType;
  width: string;
};

const Slider = (props: SliderProps) => {
  const { items, itemType, width } = props;
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true); // initial state, prev is reached
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemSize, setItemSize] = useState(0);

  const itemsGap = 8;
  const itemsGapInPixels = 32;

  const updateButtonStates = (index: number) => {
    setIsPrevDisabled(index <= 0);
    setIsNextDisabled(
      index >=
        items.length -
          Math.ceil(
            cardsContainerRef.current!.clientWidth /
              (itemSize + itemsGapInPixels)
          )
    );
  };

  const onPrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex - 1;
        updateButtonStates(newIndex);
        return newIndex;
      });
    }
  };

  const onNextClick = () => {
    if (
      currentIndex <
      items.length -
        Math.ceil(
          cardsContainerRef.current!.clientWidth / (itemSize + itemsGapInPixels)
        )
    ) {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        updateButtonStates(newIndex);
        return newIndex;
      });
    }
  };

  useLayoutEffect(() => {
    if (cardsContainerRef.current) {
      const itemElement = cardsContainerRef.current.querySelector("div");
      if (itemElement) {
        setItemSize(itemElement.clientWidth);
      }
    }
  }, []);

  useEffect(() => {
    if (itemSize > 0) {
      updateButtonStates(currentIndex);
    }
  }, [itemSize, currentIndex]);

  return (
    <Box width={width}>
      <Flex
        maxH={"100%"}
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
      >
        <Box>
          <Center
            width="2em"
            height="2em"
            cursor={isPrevDisabled ? "not-allowed" : "pointer"}
            fontWeight="bold"
            fontSize="2em"
            onClick={onPrevClick}
            opacity={isPrevDisabled ? 0.5 : 1}
          >
            {"<"}
          </Center>
        </Box>
        <Box overflow="hidden" flex="1" width="100%" height="auto">
          <Flex
            gap={itemsGap}
            mx={4}
            ref={cardsContainerRef}
            style={{
              transform: `translateX(-${
                currentIndex * (itemSize + itemsGapInPixels)
              }px)`,
              transition: "transform 0.3s ease-in-out",
              flexDirection: "row",
            }}
          >
            {items.map((item, idx) =>
              itemType === "card" ? (
                <Card key={idx} data={item as CardType} />
              ) : (
                <Chip key={idx} text={item as string} />
              )
            )}
          </Flex>
        </Box>
        <Box>
          <Center
            width="2em"
            height="2em"
            cursor={isNextDisabled ? "not-allowed" : "pointer"}
            fontWeight="bold"
            fontSize="2em"
            onClick={onNextClick}
            opacity={isNextDisabled ? 0.5 : 1}
          >
            {">"}
          </Center>
        </Box>
      </Flex>
    </Box>
  );
};

export default Slider;
