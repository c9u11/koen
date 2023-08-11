import { CenterLayout } from "../../components/Layout";
import { Menu } from "../../components/Menu";
import Activator from "./components/Activator";

function Home() {
  return (
    <CenterLayout>
      <Menu>
        <Activator />
      </Menu>
    </CenterLayout>
  );
}

export default Home;
