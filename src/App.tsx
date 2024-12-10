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
const LATEST_WORKING_VERSION = "v0.7.0";

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
              Version
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
              // TODO: add query to populate with a list of possible versions
              <MenuItem value={"v0.7.1"}>v0.7.1</MenuItem>
              <MenuItem value={"v0.7.0"}>v0.7.0</MenuItem>
              <MenuItem value={"v0.6.0"}>v0.6.0</MenuItem>
              <MenuItem value={"v0.5.0"}>v0.5.0</MenuItem>
              <MenuItem value={"v0.4.0"}>v0.4.0</MenuItem>
              <MenuItem value={"v0.4.1"}>v0.4.1</MenuItem>
              <MenuItem value={"v0.3.0"}>v0.3.0</MenuItem>
              <MenuItem value={"v0.2.3"}>v0.2.3</MenuItem>
              <MenuItem value={"v0.2.2"}>v0.2.2</MenuItem>
              <MenuItem value={"v0.2.1"}>v0.2.1</MenuItem>
              <MenuItem value={"v0.2.0"}>v0.2.0</MenuItem>
              <MenuItem value={"v0.1.2"}>v0.1.2</MenuItem>
              <MenuItem value={"v0.1.1"}>v0.1.1</MenuItem>
              <MenuItem value={"v0.1.0"}>v0.1.0</MenuItem>
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
