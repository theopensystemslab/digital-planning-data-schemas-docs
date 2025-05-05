import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { JsonSchemaViewer } from "@stoplight/json-schema-viewer";
import { injectStyles } from "@stoplight/mosaic";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";

import useQuerySchemas from "./../api/useQuerySchemas";
import Enums from "./components/Enums";
import Header from "./components/Header";

const LATEST_WORKING_VERSION = "@next";
const LATEST_WORKING_SCHEMA = "application";

const App = () => {
  injectStyles();
  const queryClient = useQueryClient();
  const [selectedSchema, setSelectedSchema] = useState(
    LATEST_WORKING_SCHEMA
  );

  const {
    data: schema,
    isLoading,
    isError,
  } = useQuerySchemas(selectedSchema, { retry: false });

  const formik = useFormik({
    initialValues: {
      schema: selectedSchema,
    },
    onSubmit: (values) => setSelectedSchema(values.schema),
  });

  return (
    <Header>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <form onSubmit={formik.handleSubmit}>
            <InputLabel shrink id="select-schema-label">
              Available schemas ({LATEST_WORKING_VERSION} version)
            </InputLabel>
            <Select
              sx={{ marginBottom: 4 }}
              labelId="select-schema-label"
              defaultValue={selectedSchema}
              id="select-schema"
              onChange={(e) => {
                queryClient.invalidateQueries({
                  queryKey: ["schemas", selectedSchema],
                });
                formik.setFieldValue("schema", e.target.value, false);
                formik.submitForm();
              }}
              value={formik.values.schema}
            >
              <MenuItem value={"preApplication"}>Pre-application</MenuItem>
              <MenuItem value={"application"}>Application</MenuItem>
              <MenuItem value={"prototypeApplication"}>Prototype application (demo)</MenuItem>
              <MenuItem value={"postSubmissionApplication"}>Post-submission application (demo)</MenuItem>
            </Select>
          </form>
          {!isError && (
            <Box mb={4}>
              <Typography variant="h5" mb={2}>
                Specification
              </Typography>
              <JsonSchemaViewer
                name="Digital planning data schemas"
                schema={schema}
                hideTopBar={false}
                emptyText="No schema defined"
                expanded={true}
                defaultExpandedDepth={0}
                renderRootTreeLines={true}
              />
            </Box>
          )}
          {!isError && selectedSchema === "prototypeApplication" && (
            <>
              <Divider />
              <Enums schema={schema} />
            </>
          )}
        </>
      )}
      {isError && (
        <Typography pt={4}>Sorry, please try again later.</Typography>
      )}
    </Header>
  );
};

export default App;
