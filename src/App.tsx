import Typography from "@mui/material/Typography";

import { JsonSchemaViewer } from "@stoplight/json-schema-viewer";
import { injectStyles } from "@stoplight/mosaic";
import { useFormik } from "formik";
import useQuerySchemas from "./../api/useQuerySchemas";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Header from "./components/Header";

const App = () => {
  injectStyles();

  const { data: schema, isLoading, isError } = useQuerySchemas();

  const formik = useFormik({
    initialValues: {
      version: "",
    },
    onSubmit: () => console.log("hi"),
  });

  return (
    <Header>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <form onSubmit={formik.handleSubmit}>
            <InputLabel>Version</InputLabel>
            <Select>
              <MenuItem>A version</MenuItem>
            </Select>
          </form>
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
    </Header>
  );
};

export default App;
