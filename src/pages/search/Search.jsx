import {
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { searchQuery } from "../../services/api";
import CardComponent from "../../components/CardComponent";
import PaginationComponent from "../../components/PaginationComponent";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");
  const [tempQuery, setTempQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    searchQuery(query, activePage)
      .then((data) => {
        console.log("search data ", data);
        setResults(data.results);
        setActivePage(data.page);
        setTotalPages(data.total_pages);
      })
      .finally(setLoading(false));
  }, [query, activePage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(tempQuery);
  };

  return (
    <Container maxW={"container.xl"} pb={10}>
      <Flex alignItems={"center"} my={5} gap={5}>
        <Heading fontSize={"xl"} fontWeight={"bold"}>
          Search
        </Heading>
      </Flex>
      <form onSubmit={handleSearch} style={{ marginBottom: 50 }}>
        <Input
          onChange={(e) => setTempQuery(e.target.value)}
          placeholder="Search for movies, tv shows, series..."
          _placeholder={{ color: "gray.300" }}
          value={tempQuery}
        />
      </form>

      {loading && (
        <Flex justifyContent={"center"}>
          <Spinner size={"xl"} color="teal" />
        </Flex>
      )}

      {results.length === 0 && !loading && (
        <Flex alignItems={"center"} mb={10} gap={5} justifyContent={"center"}>
          <Heading fontSize={"xl"} fontWeight={"bold"}>
            No results found
          </Heading>
        </Flex>
      )}

      {results.length > 0 && !loading && (
        <Flex alignItems={"center"} mb={10} gap={5}>
          <Heading fontSize={"xl"} fontWeight={"bold"}>
            Showing results for &apos;{query}&apos;
          </Heading>
        </Flex>
      )}

      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
        }}
        gap={5}
      >
        {results.length !== 0 &&
          !loading &&
          results?.map((result, index) => {
            return loading ? (
              <Skeleton height={300} />
            ) : (
              <CardComponent
                data={result}
                type={result.media_type}
                key={index}
              />
            );
          })}
      </Grid>
      {/* pagination  */}
      {results.length > 0 && !loading && (
        <PaginationComponent
          activePage={activePage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      )}
    </Container>
  );
};

export default Search;
