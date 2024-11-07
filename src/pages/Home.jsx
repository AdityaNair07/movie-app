import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import { fetchTrending } from "../services/api";
import CardComponent from "../components/CardComponent";

const Home = () => {
  const [data, setData] = useState([]);
  const [timeWindow, setTimeWindow] = useState("day");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchTrending(timeWindow)
      .then((data) => setData(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [timeWindow]);

  console.log("data: ", data);

  return (
    <Container maxW={"container.xl"} pb={10}>
      <Flex alignItems={"center"} mb={10}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Trending
        </Heading>
        <Flex
          ml={3}
          gap={5}
          border={"1px solid teal"}
          borderRadius={"20px"}
          p={2}
        >
          <Box
            backgroundColor={timeWindow == "day" && "teal"}
            fontWeight={"semibold"}
            as="button"
            onClick={() => {
              setTimeWindow("day");
            }}
            p={1}
            borderRadius={"10px"}
          >
            Today
          </Box>
          <Box
            backgroundColor={timeWindow == "week" && "teal"}
            fontWeight={"semibold"}
            as="button"
            onClick={() => {
              setTimeWindow("week");
            }}
            p={1}
            borderRadius={"10px"}
          >
            This Week
          </Box>
        </Flex>
      </Flex>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
        }}
        gap={5}
      >
        {data?.map((item, i) => {
          return loading ? (
            <Skeleton key={i} height={300} />
          ) : (
            <CardComponent key={item?.id} data={item} type={item.media_type} />
          );
        })}
      </Grid>
    </Container>
  );
};

export default Home;
