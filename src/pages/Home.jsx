import { useEffect, useState } from "react";
import { Container, Grid, Heading } from "@chakra-ui/react";
import { fetchTrending } from "../services/api";
import Card from "../components/Card";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTrending("day")
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  console.log("data: ", data);

  return (
    <Container maxW={"container.xl"}>
      <Heading as="h2" fontSize={"md"} textTransform={"uppercase"} mb={5}>
        Trending
      </Heading>
      <Grid templateColumns={"repeat(4,1fr)"} gap={5}>
        {data &&
          data?.map((item) => {
            return <Card key={item?.id} data={item} />;
          })}
      </Grid>
    </Container>
  );
};

export default Home;
