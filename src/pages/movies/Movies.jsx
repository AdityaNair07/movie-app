import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/api";
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

const Movies = () => {
  const [moviesData, setMoviesData] = useState();
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");

  useEffect(() => {
    setLoading(true);
    fetchMovies(activePage, sortBy)
      .then((data) => {
        console.log(data, "movies data");
        setMoviesData(data.results);
        setActivePage(data.page);
        setTotalPages(data.total_pages);
      })
      .finally(setLoading(false));
  }, [activePage, totalPages, sortBy]);

  return (
    <Container maxW={"container.xl"} pb={10}>
      <Flex alignItems={"center"} mb={10} gap={5}>
        <Heading fontSize={"xl"} fontWeight={"bold"}>
          Discover Movies
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
        {moviesData &&
          moviesData.map((movie, index) => {
            return loading ? (
              <Skeleton height={300} />
            ) : (
              <CardComponent data={movie} type="movie" key={index} />
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

export default Movies;
