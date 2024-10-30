import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box, Flex, Image } from "@chakra-ui/react";
import { imagePath } from "../services/api";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  return (
    <Link to={"/"}>
      <Flex
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        flexDirection={"column"}
        boxSize={"-webkit-fit-content"}
        marginX={"auto"}
        position={"relative"}
        transform={"scale(1)"}
        _hover={{
          transform: { base: "scale(1)", md: "scale(1.05)" },
          transition: "transform 0.2s ease-in-out",
          "& .overlay": {
            opacity: 1,
            bottom: 0,
          },
        }}
      >
        <Image
          src={imagePath + data?.poster_path}
          alt={data?.name}
          objectFit={"contain"}
          bgPosition={"center"}
          // maxH={300}
          width={"100%"}
        />

        <Box
          className="overlay"
          transition={"all 0.4s ease-in-out"}
          p="6"
          position={"absolute"}
          bottom={-10}
          left={0}
          width={"100%"}
          height={"-webkit-fit-content"}
          zIndex={1}
          bg="rgba(0, 0, 0, 0.8)"
          opacity={0}
        >
          <Box display="flex" aligndatas="baseline" gap={3}>
            <Badge
              borderRadius="full"
              px="2"
              colorScheme="teal"
              fontSize={"md"}
            >
              {data?.media_type}
            </Badge>
            {data?.adult == true ? (
              <Badge borderRadius="full" px="2" colorScheme="orange">
                +18
              </Badge>
            ) : (
              ""
            )}
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h1"
            lineHeight="tight"
            noOfLines={1}
            fontSize={"xl"}
          >
            {data?.media_type === "movie" ? data?.title : data?.name}
          </Box>

          <Box>
            {data?.media_type === "movie"
              ? data?.release_date
              : data?.first_air_date}
          </Box>

          <Box display="flex" mt="2" aligndatas="center">
            <Badge
              fontSize={"md"}
              borderRadius="full"
              px="2"
              colorScheme={data?.vote_average >= 5 ? "green" : "red"}
            >
              {data?.vote_average}
            </Badge>
          </Box>
        </Box>
      </Flex>
    </Link>
  );
};

export default Card;
