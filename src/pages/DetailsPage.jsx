import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDetails, imagePath, url } from "../services/api";
import {
  Badge,
  Box,
  Container,
  Flex,
  Image,
  Skeleton,
  Spinner,
  Text,
} from "@chakra-ui/react";

const DetailsPage = () => {
  const { type, id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchDetails(type, id)
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} color="teal" />
      </Flex>
    );
  }

  return (
    <Box>
      <Box>
        <Container maxW={"container.xl"} display={"flex"}>
          <Image src={`${imagePath}/${data.poster_path}`} borderRadius={10} />
          <Box p={3}>
            <Text fontSize={"4xl"} fontWeight={"bold"} mb={2}>
              {data.title}
            </Text>
            <Text fontSize={"2xl"} fontWeight={"bold"} mb={2}>
              {data.tagline}
            </Text>
            <Text fontWeight={"semibold"} fontSize={"2xl"} mb={2}>
              Release Date: {data.release_date}
            </Text>
            <Text fontSize={"lg"} fontWeight={"medium"} mb={2}>
              {data.overview}
            </Text>
            <Flex alignItems={"center"} gap={3}>
              {data.genres.map((item) => {
                return <Badge key={item.id}>{item.name}</Badge>;
              })}
            </Flex>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default DetailsPage;
