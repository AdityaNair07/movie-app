import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const styles = {
  global: (props) => ({
    body: {
      bg: mode("gray.50", "blackAlpha.900")(props),
    },
  }),
};

const theme = extendTheme({ config, styles });

export default theme;
