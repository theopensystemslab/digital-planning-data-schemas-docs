import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { plot, tree } from "@observablehq/plot";
import { useEffect, useRef, useState } from "react";

const TreeDiagram = ({ schema }: any) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [selectedEnum, setSelectedEnum] = useState("ProjectType");
  const data = schema.definitions?.[`${selectedEnum}`]?.["anyOf"];

  // Ref https://observablehq.com/plot/marks/tree
  function indent() {
    return (root: any) => {
      root.eachBefore((node: any, i: number) => {
        node.y = node.depth;
        node.x = i;
      });
    };
  }

  useEffect(() => {
    const treePlot = plot({
      axis: null,
      margin: 10,
      marginLeft: 0,
      marginRight: 80,
      width: 900,
      height: data.length * 10,
      marks: tree(data, {
        path: "const",
        delimiter: ".",
        treeLayout: indent,
        strokeWidth: 1,
        curve: "step-before",
        textStroke: "none",
      }),
    });

    ref.current?.append(treePlot);
    return () => treePlot.remove();
  }, [selectedEnum, schema]);

  return (
    <Box style={{ maxWidth: 1000 }} mx="auto">
      <form>
        <Select
          variant="standard"
          disableUnderline={true}
          sx={{
            // Style MUI Select to match JSON Schema Viewer toggle
            marginBottom: 2,
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { border: 0 },
            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0 },
            fontSize: "12px",
            fontWeight: 600,
            fontFamily: "inherit",
          }}
          defaultValue={selectedEnum}
          id="select-enum"
          onChange={(e) => setSelectedEnum(e.target.value)}
          value={selectedEnum}
        >
          <MenuItem disabled value={"ApplicationType"}>ApplicationType (TODO)</MenuItem>
          <MenuItem value={"PrototypeFileType"}>FileType</MenuItem>
          <MenuItem disabled value={"BasePlanningDesignation"}>PlanningConstraint (TODO)</MenuItem>
          <MenuItem value={"ProjectType"}>ProjectType</MenuItem>
          <MenuItem value={"PropertyType"}>PropertyType</MenuItem>
        </Select>
      </form>
      <div ref={ref} />
    </Box>
  );
}

export default TreeDiagram;