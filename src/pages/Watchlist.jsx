import { Container, Flex, Grid, Heading, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFirestore } from "../services/firestore";
import { useAuth } from "../context/useAuth";
import CardComponent from "../components/CardComponent";

const Watchlist = () => {
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState();
  const { getWatchlist } = useFirestore();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.uid) {
      getWatchlist(user?.uid)
        .then((data) => {
          console.log(data, "Watchlist data");
          setWatchlist(data);
        })
        .finally(setLoading(false));
    }
  }, [user, getWatchlist, loading]);

  return (
    <Container maxW={"container.xl"} pb={10}>
      <Flex alignItems={"center"} mb={10}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Watchlist
        </Heading>
      </Flex>
      {/* <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
        }}
        gap={5}
      >
        {watchlist?.map((item, i) => {
          return loading ? (
            <Skeleton key={i} height={300} />
          ) : (
            <CardComponent key={item?.id} data={item} type={item.media_type} />
          );
        })}
      </Grid> */}
    </Container>
  );
};

export default Watchlist;
