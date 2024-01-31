import { CenterLayout } from '../../components/Layout';
import Activator from './components/Activator';
import ShortcutSetter from './components/ShortcutSetter';

function Home() {
  return (
    <CenterLayout>
      <Activator />
      <ShortcutSetter />
    </CenterLayout>
  );
}

export default Home;
