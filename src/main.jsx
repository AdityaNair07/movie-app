import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "../theme.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <div>Home</div>,
      },
      {
        path: "/movies",
        element: <div>Movies</div>,
      },
      {
        path: "/shows",
        element: <div>Shows</div>,
      },
      {
        path: "/search",
        element: <div>Search</div>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
