import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import TreeDiagram from "./TreeDiagram";

const Enums = ({ schema }: any) => {
  return (
    <Box>
      <Typography variant="h5" mt={3} mb={1}>
        Enums
      </Typography>
      <Typography variant="body2" mb={2}>
        Enums visualise the hierarchical nature of select "any of" values referenced throughout the specification above. The <code>parent.child</code> structure is informed by Plan✕ service design which presents users a single entry point (eg apply for planning permission) and then smartly funnels into discrete journeys based on granular property type, project types, applicable constraints, and more.
      </Typography>
      <TreeDiagram schema={schema} />
    </Box>
  );
}

export default Enums;
