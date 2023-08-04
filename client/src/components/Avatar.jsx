/* eslint-disable react/prop-types */
import { Box, Grid } from "@mui/material";
export default function Avatar(props) {
  return (
    <Grid item xs={3} sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        component={"img"}
        key={props.index}
        src={`data:image/svg+xml;utf8,${encodeURIComponent(props.data.data)}`}
        sx={{
          width: 50,
          border: 2,
          borderColor:
            props.selectedIndex == props.index ? "red" : "transparent",
          borderRadius: 7,
        }}
        onClick={() => {
          props.setSelectedIndex(props.index);
        }}
      />
    </Grid>
  );
}
