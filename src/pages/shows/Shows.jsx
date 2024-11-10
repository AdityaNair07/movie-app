import { useEffect, useState } from "react";
import { fetchShows } from "../../services/api";
import {
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  Skeleton,
} from "@chakra-ui/react";
import CardComponent from "../../components/CardComponent";
import PaginationComponent from "../../components/PaginationComponent";

const Shows = () => {
  const [tvData, setTvData] = useState();
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");

  useEffect(() => {
    setLoading(true);
    fetchShows(activePage, sortBy)
      .then((data) => {
        console.log(data, "tv shows data");
        setTvData(data.results);
        setActivePage(data.page);
        setTotalPages(data.total_pages);
      })
      .finally(setLoading(false));
  }, [activePage, totalPages, sortBy]);

  return (
    <Container maxW={"container.xl"} pb={10}>
      <Flex alignItems={"center"} mb={10} gap={5}>
        <Heading fontSize={"xl"} fontWeight={"bold"}>
          Discover TV Shows
        </Heading>
        <Select
          onChange={(e) => {
            setSortBy(e.target.value);
            setActivePage(1);
          }}
          w={150}
        >
          <option value="popularity.desc">Popular</option>
          <option value="vote_average.desc&vote_count.gte=1000">
            Top Rated
          </option>
        </Select>
      </Flex>
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
        }}
        gap={5}
      >
        {tvData &&
          tvData.map((tv, index) => {
            return loading ? (
              <Skeleton height={300} />
            ) : (
              <CardComponent data={tv} type="tv" key={index} />
            );
          })}
      </Grid>
      {/* pagination  */}
      <PaginationComponent
        activePage={activePage}
        totalPages={totalPages}
        setActivePage={setActivePage}
      />
    </Container>
  );
};

export default Shows;
