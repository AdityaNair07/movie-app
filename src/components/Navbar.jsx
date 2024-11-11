import {
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import "../assets/styles.css";

const Navbar = () => {
  const { user, signInWithGoogle, logout } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

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
              MovieGeek
            </Box>
          </Link>
          <Flex
            gap={7}
            alignItems={"center"}
            display={{ base: "none", md: "flex" }}
            fontWeight={"semibold"}
          >
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/movies">
              Movies
            </Link>
            <Link className="nav-link" to="/shows">
              TV Shows
            </Link>
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

          <Flex
            alignItems={"center"}
            gap={7}
            display={{ base: "flex", md: "none" }}
          >
            <Link to="/search">
              <SearchIcon fontSize={"2xl"} />
            </Link>
            <IconButton
              ref={btnRef}
              colorScheme="teal"
              onClick={onOpen}
              icon={<HamburgerIcon />}
            />
          </Flex>

          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>
                {user && (
                  <Flex alignItems={"center"} gap={3} mb={5}>
                    <Avatar
                      bg={"teal.500"}
                      color={"white"}
                      size={"sm"}
                      name={user?.displayName}
                    />
                    <Text fontWeight={"semibold"} fontSize={"lg"}>
                      {user?.displayName}
                    </Text>
                  </Flex>
                )}
                {!user && (
                  <Avatar
                    size={"sm"}
                    bg={"gray.500"}
                    as={"button"}
                    onClick={handleGoogleLogin}
                  />
                )}
              </DrawerHeader>

              <DrawerBody>
                <Flex
                  gap={5}
                  flexDirection={"column"}
                  alignItems={"center"}
                  display={{ base: "flex", md: "none" }}
                >
                  <Link className="nav-link" onClick={() => onClose()} to="/">
                    Home
                  </Link>
                  <Link
                    className="nav-link"
                    onClick={() => onClose()}
                    to="/movies"
                  >
                    Movies
                  </Link>
                  <Link
                    className="nav-link"
                    onClick={() => onClose()}
                    to="/shows"
                  >
                    TV Shows
                  </Link>
                  <Link
                    className="nav-link"
                    onClick={() => onClose()}
                    to="/watchlist"
                  >
                    My Watchlist
                  </Link>

                  <Button variant={"outline"} w={"full"} onClick={logout}>
                    Logout
                  </Button>
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
