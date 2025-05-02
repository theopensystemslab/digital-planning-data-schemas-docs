import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { plot, tree } from "@observablehq/plot";
import { useEffect, useRef } from "react";

const TreeDiagram = ({ schema }: any) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const data = schema.definitions?.["ProjectType"]?.["anyOf"];

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
      marginRight: 30,
      width: 1000,
      height: 3000, // todo make multiplier of data.length?
      marks: tree(data, {
        path: "const",
        delimiter: ".",
        treeLayout: indent,
        strokeWidth: 1,
        curve: "step-before",
        textStroke: "none"
      }),
    });

    ref.current?.append(treePlot);
    return () => treePlot.remove();
  }, [schema]);

  return (
    <Box style={{ maxWidth: 1000 }} mx="auto">
      <Typography variant="caption">
        <strong>ProjectType</strong>{" "}(Picker here TBD)
      </Typography>
      <div ref={ref} />
    </Box>
  );
}

export default TreeDiagram;