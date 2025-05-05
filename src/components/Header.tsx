import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Provider as MosaicProvider, injectStyles } from "@stoplight/mosaic";
import { ComponentProps } from "react";

const Header = ({ children }: ComponentProps<"header">) => {
  injectStyles();

  return (
    <Box p={2} style={{ maxWidth: 1000 }} mx="auto">
      <Typography variant="h2">
        Digital planning data schemas
      </Typography>
      <Typography pt={4} maxWidth={1000} mx="auto">
        Digital Planning Data schemas aim to encourage more interoperability and
        consistency between systems by offering a central, version controlled
        specification for documenting and validating planning data.
      </Typography>
      <MosaicProvider>
        <Box
          p={6}
          my={4}
          maxWidth={1000}
          style={{
            borderRadius: 2,
            backgroundColor: "#fbf6f3",
          }}
          mx="auto"
        >
          {children}
        </Box>
      </MosaicProvider>
    </Box>
  );
};

export default Header;
