import {
  Container,
  Flex,
  Grid,
  Heading,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFirestore } from "../services/firestore";
import { useAuth } from "../context/useAuth";
import WatchlistCardComponent from "../components/WatchlistCardComponent";

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
      {loading && (
        <Flex justifyContent={"center"} alignItems={"center"} mt={10}>
          <Spinner size={"xl"} color="teal" />
        </Flex>
      )}
      {!loading && watchlist?.length === 0 && (
        <Flex justifyContent={"center"} alignItems={"center"} mt={10}>
          <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
            No item in the watchlist
          </Heading>
        </Flex>
      )}
      {!loading && watchlist?.length > 0 && (
        <Grid
          templateColumns={{
            base: "1fr",
          }}
          gap={5}
        >
          {watchlist?.map((item, i) => {
            return loading ? (
              <Skeleton key={i} height={300} />
            ) : (
              <WatchlistCardComponent
                key={item?.id}
                item={item}
                type={item?.type}
                setWatchlist={setWatchlist}
              />
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default Watchlist;
