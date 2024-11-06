import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchCredits,
  fetchDetails,
  fetchVideos,
  imagePath,
  imagePathOriginal,
} from "../services/api";
import {
  AspectRatio,
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Heading,
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
  const [videoData, setVideoData] = useState();

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
        const [detailsData, creditsData, videoData] = await Promise.all([
          fetchDetails(type, id),
          fetchCredits(type, id),
          fetchVideos(type, id),
        ]);

        setData(detailsData);
        setCreditsData(creditsData);
        setVideoData(videoData.results);
        console.log("credits ", creditsData);
        console.log("video data ", videoData);
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

  const trailer = videoData.filter((result) => result.type == "Trailer");

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
        <Container maxW={"container.xl"}>
          <Flex flexDirection={{ base: "column", md: "row" }}>
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
            </Box>
          </Flex>
        </Container>
      </Box>
      <Container maxW={"container.xl"} pb={10}>
        <Heading
          textTransform={"uppercase"}
          fontSize={"3xl"}
          fontWeight={"semibold"}
          my={5}
          textAlign={{ base: "center", md: "start" }}
        >
          Cast
        </Heading>
        <Flex
          alignItems={"start"}
          gap={7}
          justifyContent={{ base: "center", md: "flex-start" }}
          flexWrap={"wrap"}
        >
          {creditsData?.cast.slice(0, 6).map((cast) => {
            return (
              <Box
                display={"flex"}
                key={cast.id}
                flexDirection={"column"}
                textAlign={"center"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={5}
              >
                <Image
                  width={140}
                  borderRadius={5}
                  src={imagePath + cast.profile_path}
                  fallbackSrc="https://placehold.co/140x210"
                />
                <Text
                  textAlign={"center"}
                  fontSize={"md"}
                  fontWeight={"semibold"}
                >
                  {cast.name}
                </Text>
              </Box>
            );
          })}
        </Flex>
      </Container>
      <Container maxW={"container.xl"} pb={10}>
        <AspectRatio
          width={"full"}
          ratio={16 / 9}
          border={"1px solid red"}
          borderRadius={5}
          overflow={"hidden"}
        >
          <iframe
            src={`https://www.youtube.com/embed/${trailer[0].key}`}
            allowFullScreen
          />
        </AspectRatio>
      </Container>
    </Box>
  );
};

export default DetailsPage;
