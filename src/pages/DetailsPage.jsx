import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchCredits,
  fetchDetails,
  imagePath,
  imagePathOriginal,
} from "../services/api";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Image,
  Skeleton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { CheckCircleIcon, SmallAddIcon, StarIcon } from "@chakra-ui/icons";
import { ratingColor, ratingToPercentage } from "../utils/helpers";

const DetailsPage = () => {
  const { type, id } = useParams();
  const [data, setData] = useState();
  const [creditsData, setCreditsData] = useState();
  const [loading, setLoading] = useState(true);
  const [watchlistStatus, setWatchlistStatus] = useState(false);

  useEffect(() => {
    setLoading(true);

    // fetchDetails(type, id)
    //   .then((data) => {
    //     setData(data);
    //     console.log(data);
    //   })
    //   .catch((error) => console.log(error))
    //   .finally(() => setLoading(false));

    // fetchCredits(type, id)
    //   .then((data) => {
    //     setCreditsData(data);
    //     console.log("credits data: ", data);
    //   })
    //   .catch((error) => console.error(error))
    //   .finally(() => setLoading(false));

    const fetchData = async () => {
      try {
        const [detailsData, creditsData] = await Promise.all([
          fetchDetails(type, id),
          fetchCredits(type, id),
        ]);

        setData(detailsData);
        setCreditsData(creditsData);
      } catch (error) {
        console.log("error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type, id]);

  if (loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} color="teal" />
      </Flex>
    );
  }

  return (
    <Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        w={"100%"}
        background={`linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.8)), url(${imagePathOriginal}/${data.backdrop_path})`}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        h={{ base: "auto", md: "600px" }}
        py={2}
      >
        <Container
          maxW={"container.xl"}
          display={"flex"}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Image
            src={`${imagePath}/${data.poster_path}`}
            borderRadius={10}
            w={{ base: "-webkit-fit-content", md: "400px" }}
            marginX={"auto"}
          />
          <Box p={3} ml={3}>
            <Text
              fontSize={"4xl"}
              fontWeight={"bold"}
              mb={2}
              textAlign={{ base: "center", md: "start" }}
            >
              {type == "movie" ? data.title : data.name}
            </Text>
            <Text
              fontWeight={"semibold"}
              fontSize={"2xl"}
              mb={2}
              textAlign={{ base: "center", md: "start" }}
            >
              {type == "movie" ? data.release_date : data.first_air_date}
            </Text>
            <Flex
              flexDirection={{ base: "column", md: "row" }}
              alignItems={"center"}
              mb={3}
              gap={5}
              justifyContent={{ base: "center", md: "flex-start" }}
            >
              <Box display={"flex"} gap={3} alignItems={"center"}>
                <CircularProgress
                  thickness={10}
                  size={20}
                  value={ratingToPercentage(data.vote_average)}
                  color={ratingColor(data.vote_average)}
                >
                  <CircularProgressLabel color={"white"} fontSize={"xl"}>
                    {ratingToPercentage(data.vote_average)}%
                  </CircularProgressLabel>
                </CircularProgress>
                <Text
                  fontSize={"xl"}
                  fontWeight={"medium"}
                  display={{ base: "none", md: "initial" }}
                >
                  User Score
                </Text>
              </Box>
              <Button
                size={"lg"}
                colorScheme={watchlistStatus ? "green" : "gray"}
                variant={"solid"}
                leftIcon={
                  watchlistStatus ? <CheckCircleIcon /> : <SmallAddIcon />
                }
                onClick={() => setWatchlistStatus(!watchlistStatus)}
              >
                {watchlistStatus ? "In Watchlist" : "Add to watchlist"}
              </Button>
            </Flex>
            <Text
              fontSize={"2xl"}
              fontWeight={"bold"}
              mb={2}
              textAlign={{ base: "center", md: "start" }}
              fontStyle={"italic"}
            >
              {type == "movie" && data.tagline && (
                <>&rsquo;{data.tagline}&rsquo;</>
              )}
            </Text>
            <Text
              fontSize={"xl"}
              fontWeight={"medium"}
              mb={7}
              textAlign={{ base: "center", md: "start" }}
            >
              {data.overview}
            </Text>
            <Flex
              alignItems={"center"}
              gap={3}
              mb={7}
              justifyContent={{ base: "center", md: "flex-start" }}
            >
              {data.genres.map((item) => {
                return (
                  <Badge
                    fontSize={"md"}
                    backgroundColor={"teal"}
                    key={item.id}
                    py={1}
                    px={2}
                  >
                    {item.name}
                  </Badge>
                );
              })}
            </Flex>
            <Flex
              alignItems={"center"}
              gap={3}
              justifyContent={{ base: "center", md: "flex-start" }}
            >
              <AvatarGroup max={4} size={"lg"}>
                {creditsData?.cast.map((cast) => {
                  return (
                    <Avatar
                      src={imagePathOriginal + cast.profile_path}
                      key={cast.id}
                      name={cast.name}
                    />
                  );
                })}
              </AvatarGroup>
            </Flex>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default DetailsPage;
