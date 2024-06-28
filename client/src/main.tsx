import ReactDOM from "react-dom/client";
import "./main.css";
import { Box, CssBaseline } from "@mui/material";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import CardDetail from "./views/CardDetail.tsx";
import Home from "./views/Home.tsx";
import About from "./views/About.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CardsProvider } from "./context/CardsContext.tsx";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0055A4",
    },
    secondary: {
      main: "#CE1126",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontWeight: 700,
      color: "#013220",
    },
    h2: {
      fontWeight: 700,
      color: "#013220",
    },
    body1: {
      color: "#333",
    },
  },
});

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Header />
      <Box
        sx={{
          padding: 2,
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/card-detail/:id",
        element: <CardDetail />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

// Ensure createRoot is used properly
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <div className="App">
      <ThemeProvider theme={theme}>
        <CardsProvider>
          <RouterProvider router={router} />
        </CardsProvider>
      </ThemeProvider>
    </div>
  );
}
