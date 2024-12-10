import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './Component/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from './Component/Search/Search';
import TVsection from './Component/TV/TVsection'
import Login from './Component/Login/Login';
import Subscription from './Component/Login/Subscription/Subscription';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/TV" element={<TVsection />} />
          <Route path="/subscription" element={<Subscription />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}