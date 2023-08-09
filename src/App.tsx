import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ROUTES_BASENAME,
  ROUTES_PATH_ROOT,
  ROUTES_PATH_SETTING,
} from "./constant/Routes";
import Setting from "./pages/Setting";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter basename={ROUTES_BASENAME}>
      <Routes>
        <Route path={ROUTES_PATH_ROOT} element={<Home />} />
        <Route path={ROUTES_PATH_SETTING} element={<Setting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
