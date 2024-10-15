import { useEffect } from "react";
import { Container, Heading } from "@chakra-ui/react";
import { fetchTrending } from "../services/api";

const Home = () => {
  useEffect(() => {
    fetchTrending("day")
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container maxW={"container.xl"}>
      <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
        Trending
      </Heading>
    </Container>
  );
};

export default Home;
