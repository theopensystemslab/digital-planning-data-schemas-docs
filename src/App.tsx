import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { JsonSchemaViewer } from "@stoplight/json-schema-viewer";
import { Provider as MosaicProvider, injectStyles } from "@stoplight/mosaic";

import prototypeApplication from "./schemas/prototypeApplication.json"; // TODO fetch live from GH Pages

function App() {
  injectStyles();

  return (
    <Box py={2} style={{ maxWidth: 1000 }} mx="auto">
      <Typography textAlign="center" variant="h2">
        Digital planning data schemas
      </Typography>
      <Typography pt={4} textAlign={"center"}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mattis
        eget purus quis feugiat. Ut vehicula, turpis sit amet lacinia fermentum,
        turpis arcu commodo enim, sed malesuada erat nisi nec urna. Pellentesque
        nunc risus, efficitur sit amet nisi id, pretium sollicitudin nibh. Etiam
        at nulla aliquet est placerat bibendum. Praesent dictum ante nec
        lobortis auctor. Nullam ut ex augue.
      </Typography>
      <MosaicProvider>
        <Box
          p={6}
          my={4}
          maxWidth={800}
          style={{
            borderRadius: 2,
            backgroundColor: "#fff5ef",
          }}
          mx="auto"
        >
          <JsonSchemaViewer
            name="Digital planning data schemas"
            schema={prototypeApplication}
            hideTopBar={false}
            emptyText="No schema defined"
            expanded={true}
            defaultExpandedDepth={0}
            renderRootTreeLines={true}
          />
        </Box>
      </MosaicProvider>
    </Box>
  );
}

export default App;
