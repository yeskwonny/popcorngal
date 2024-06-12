// import CircularProgress from "@mui/material/Button";
// function Loader() {
//   return <CircularProgress />;
// }
// export default Loader;

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "30px",
        height: "50px",
        marginRight: "auto",
        marginLeft: "auto",
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
}
