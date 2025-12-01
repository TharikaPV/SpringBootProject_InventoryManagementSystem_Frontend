import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6b21a8", // deep purple
    },
    secondary: {
      main: "#8b5cf6",
    },
    background: {
      default: "#f6f6fb",
      paper: "#ffffff",
    },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true }
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif'
  }
});

export default theme;
