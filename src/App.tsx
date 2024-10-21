import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { JsonSchemaViewer } from "@stoplight/json-schema-viewer";
import { Provider as MosaicProvider, injectStyles } from "@stoplight/mosaic";
import useQuerySchemas from "./../api/useQuerySchemas";

const App = () => {
  injectStyles();

  const { data: schema, isLoading, isError } = useQuerySchemas();

  return (
    <Box py={2} style={{ maxWidth: 1000 }} mx="auto">
      <Typography textAlign="center" variant="h2">
        Digital planning data schemas
      </Typography>
      <Typography pt={4} maxWidth={800} mx='auto'>
        Digital Planning Data schemas aim to encourage more interoperability and
        consistency between systems by offering a central, version controlled
        specification for documenting and validating planning data.
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
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : (
            <>
              <Typography pb={2}>{schema.$id}</Typography>
              <JsonSchemaViewer
                name="Digital planning data schemas"
                schema={schema}
                hideTopBar={false}
                emptyText="No schema defined"
                expanded={true}
                defaultExpandedDepth={0}
                renderRootTreeLines={true}
              />
            </>
          )}
          {isError && (
            <Typography pt={4}>Sorry, please try again later.</Typography>
          )}
        </Box>
      </MosaicProvider>
    </Box>
  );
};

export default App;
