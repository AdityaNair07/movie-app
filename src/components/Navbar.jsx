import {
  Avatar,
  Box,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { SearchIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { user, signInWithGoogle, logout } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      console.log("Successfully signed in using Google");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <Box py={4} mb={2}>
      <Container maxW={"container.xl"}>
        <Flex justifyContent={"space-between"}>
          <Link to={"/"}>
            <Box
              fontSize={"2xl"}
              fontWeight={"bold"}
              letterSpacing={"wide"}
              color={"teal.300"}
            >
              MovieFlex
            </Box>
          </Link>
          <Flex gap={7} alignItems={"center"}>
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/shows">TV Shows</Link>
            <Link to="/search">
              <SearchIcon fontSize={"lg"} />
            </Link>
            {user && (
              <Menu>
                <MenuButton>
                  <Avatar
                    bg={"teal.500"}
                    color={"white"}
                    size={"sm"}
                    name={user?.displayName}
                  />
                </MenuButton>
                <MenuList>
                  <Link to="/watchlist">
                    <MenuItem>Watchlist</MenuItem>
                  </Link>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            )}
            {!user && (
              <Avatar
                size={"sm"}
                bg={"gray.500"}
                as={"button"}
                onClick={handleGoogleLogin}
              />
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
