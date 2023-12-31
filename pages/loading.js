import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function SimpleBackdrop() {
  return (
    <div>
      <Backdrop sx={{ color: "#fff", backdropFilter: "blur(25px)", zIndex: 999 }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
