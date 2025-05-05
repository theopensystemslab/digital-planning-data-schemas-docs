import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
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
      <Typography pt={2} maxWidth={1000} mx="auto">
        These schemas are currently developed by and exchanged between <Link href="https://opendigitalplanning.org/" target="_blank">Open Digital Planning</Link> products including Plan✕,
        Back Office Planning System (BOPS), and Digital Planning Register (DPR). Learn more, share feedback, and report issues on <Link href="https://github.com/theopensystemslab/digital-planning-data-schemas" target="_blank">GitHub</Link>.
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
