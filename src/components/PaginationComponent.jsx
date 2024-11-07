import { Button, Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const PaginationComponent = ({ activePage, totalPages, setActivePage }) => {
  return (
    <Flex gap={2} alignItems={"center"}>
      <Flex alignItems={"center"} gap={2} my={10} maxW={250}>
        <Button
          colorScheme="teal"
          variant={"solid"}
          onClick={() => setActivePage(activePage - 1)}
          isDisabled={activePage === 1}
        >
          Prev
        </Button>
        <Button
          colorScheme="teal"
          variant={"solid"}
          onClick={() => setActivePage(activePage + 1)}
          isDisabled={activePage === totalPages}
        >
          Next
        </Button>
      </Flex>
      <Flex gap={1} fontWeight={"semibold"} fontSize={"lg"}>
        <Text>{activePage}</Text>
        <Text>of</Text>
        <Text>{totalPages}</Text>
      </Flex>
    </Flex>
  );
};

PaginationComponent.propTypes = {
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setActivePage: PropTypes.func.isRequired,
};

export default PaginationComponent;
