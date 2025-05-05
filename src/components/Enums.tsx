import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import TreeDiagram from "./TreeDiagram";

const Enums = ({ schema }: any) => {
  return (
    <Box>
      <Typography variant="h5" mt={3} mb={1}>
        Enums
      </Typography>
      <TreeDiagram schema={schema} />
    </Box>
  );
}

export default Enums;
