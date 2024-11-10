import { CloseIcon, StarIcon } from "@chakra-ui/icons";
import { Badge, Box, Flex, IconButton, Image, Tooltip } from "@chakra-ui/react";
import { imagePath } from "../services/api";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useFirestore } from "../services/firestore";
import { useAuth } from "../context/useAuth";

const WatchlistCardComponent = ({ item, type, setWatchlist }) => {
  const { removeFromWatchlist } = useFirestore();
  const { user } = useAuth();

  const handleRemove = async (e) => {
    e.preventDefault();
    removeFromWatchlist(user?.uid, item?.id).then(() =>
      setWatchlist((prev) => prev.filter((element) => element.id != item?.id))
    );
  };

  return (
    <Link to={`/${type}/${item?.id}`}>
      <Flex
        borderWidth="1px"
        borderRadius="lg"
        flexDirection={{ base: "column", sm: "row" }}
        position={"relative"}
      >
        <Tooltip label="remove from watchlist">
          <IconButton
            position={"absolute"}
            zIndex={2}
            top={0}
            right={0}
            variant="unstyled"
            colorScheme="teal"
            aria-label="remove from watchlist"
            fontSize="12px"
            icon={<CloseIcon />}
            onClick={handleRemove}
          />
        </Tooltip>
        <Image
          src={imagePath + item?.poster_path}
          alt={item?.name}
          objectFit={"cover"}
          bgPosition={"center"}
          width={{ base: "full", sm: "200px" }}
          fallbackSrc="https://placehold.co/300x450"
          borderRadius={"md"}
        />

        <Box
          transition={"all 0.4s ease-in-out"}
          p="6"
          width={"100%"}
          height={"-webkit-fit-content"}
          zIndex={1}
          bg="rgba(0, 0, 0, 0.8)"
        >
          <Box display="flex" aligndatas="baseline" gap={3}>
            <Badge
              borderRadius="full"
              px="2"
              colorScheme="teal"
              fontSize={"md"}
            >
              {type}
            </Badge>
            {item?.adult == true ? (
              <Badge borderRadius="full" px="2" colorScheme="orange">
                +18
              </Badge>
            ) : (
              ""
            )}
          </Box>

          <Flex alignItems={"center"} mt={2} gap={2}>
            <Box
              fontWeight="semibold"
              as="h1"
              lineHeight="tight"
              fontSize={"xl"}
            >
              {item?.title}
            </Box>

            <Box
              fontSize={"xl"}
              as="h1"
              lineHeight={"tight"}
              fontWeight={"semibold"}
            >
              (
              {new Date(
                item?.release_date || item?.first_air_date
              ).getFullYear() || "N/A"}
              )
            </Box>
          </Flex>

          <Box display="flex" mt="2" alignItems={"center"} gap={2}>
            <StarIcon />
            <Badge
              fontSize={"md"}
              borderRadius="full"
              px="2"
              colorScheme={item?.vote_average >= 5 ? "green" : "red"}
            >
              {item?.vote_average?.toFixed(1)}
            </Badge>
          </Box>
          <Box mt={"5"} fontWeight={"medium"} fontSize={"lg"}>
            {item?.overview}
          </Box>
        </Box>
      </Flex>
    </Link>
  );
};

WatchlistCardComponent.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  setWatchlist: PropTypes.func.isRequired,
};

export default WatchlistCardComponent;
