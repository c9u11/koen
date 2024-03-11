import { HashRouter, Route, Routes } from 'react-router-dom';
import {
  ROUTES_BASENAME,
  ROUTES_PATH_ROOT,
  ROUTES_PATH_SETTING
} from './constant/Routes';
import Setting from './pages/Setting';
import Home from './pages/Home';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={ROUTES_PATH_ROOT} element={<Home />} />
        <Route path={ROUTES_PATH_SETTING} element={<Setting />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
