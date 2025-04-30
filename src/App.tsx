import Typography from "@mui/material/Typography";
import { useQueryClient } from "@tanstack/react-query";

import { JsonSchemaViewer } from "@stoplight/json-schema-viewer";
import { injectStyles } from "@stoplight/mosaic";
import { useFormik } from "formik";
import useQuerySchemas from "./../api/useQuerySchemas";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import Header from "./components/Header";

// TODO: grab this programatically instead of hard-coding
const LATEST_WORKING_VERSION = "application";

const App = () => {
  injectStyles();
  const queryClient = useQueryClient();
  const [selectedVersion, setSelectedVersion] = useState(
    LATEST_WORKING_VERSION
  );

  const {
    data: schema,
    isLoading,
    isError,
  } = useQuerySchemas(selectedVersion, { retry: false });

  const formik = useFormik({
    initialValues: {
      version: selectedVersion,
    },
    onSubmit: (values) => setSelectedVersion(values.version),
  });

  return (
    <Header>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <form onSubmit={formik.handleSubmit}>
            <InputLabel shrink id="select-version-label">
              Available schemas (@next version)
            </InputLabel>
            <Select
              sx={{ marginBottom: 4 }}
              labelId="select-version-label"
              defaultValue={selectedVersion}
              id="select-version"
              onChange={(e) => {
                queryClient.invalidateQueries({
                  queryKey: ["schemas", selectedVersion],
                });
                formik.setFieldValue("version", e.target.value, false);
                formik.submitForm();
              }}
              value={formik.values.version}
            >
              // TODO: add query to populate with a list of possible schemas
              <MenuItem value={"preApplication"}>Pre-application</MenuItem>
              <MenuItem value={"application"}>Application</MenuItem>
              <MenuItem value={"prototypeApplication"}>Prototype application (demo)</MenuItem>
              <MenuItem value={"postSubmissionApplication"}>Post-submission application (demo)</MenuItem>
            </Select>
          </form>
          {!isError && (
            <JsonSchemaViewer
              name="Digital planning data schemas"
              schema={schema}
              hideTopBar={false}
              emptyText="No schema defined"
              expanded={true}
              defaultExpandedDepth={0}
              renderRootTreeLines={true}
            />
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
