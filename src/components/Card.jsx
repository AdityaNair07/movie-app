import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box, Flex, Image } from "@chakra-ui/react";

const Card = ({ data }) => {
  const imagePath = "https://image.tmdb.org/t/p/w300/";

  const property = {
    imageUrl: `${imagePath + data?.poster_path}`,
    imageAlt: `${data?.name}`,
    adult: `${data.adult}`,
    title: `${data?.name}`,
    formattedPrice: `${data?.first_air_date}`,
    reviewCount: Math.floor(Math.random() * data?.popularity),
    rating: Math.floor((Math.random() * data?.popularity) % 5),
    type: `${data?.media_type}`,
  };

  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      flexDirection={"column"}
    >
      <Image
        src={property.imageUrl}
        alt={property.imageAlt}
        objectFit={"cover"}
        bgPosition={"center"}
        maxH={300}
        width={"100%"}
      />

      <Box p="6">
        <Box display="flex" aligndatas="baseline" gap={3}>
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {property.type}
          </Badge>
          {property.adult == true ? (
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
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {property.title}
        </Box>

        <Box>{property.formattedPrice}</Box>

        <Box display="flex" mt="2" aligndatas="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < property.rating ? "teal.500" : "gray.300"}
              />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {property.reviewCount} reviews
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Card;
