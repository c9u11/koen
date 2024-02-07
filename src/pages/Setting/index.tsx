import { CenterLayout } from '../../components/Layout';
import ShortcutSetter from '../../components/ShortcutSetter';
import TopBar from '../../components/TopBar';

function Setting() {
  return (
    <>
      <TopBar isHome={false} />
      <CenterLayout>
        <ShortcutSetter />
      </CenterLayout>
    </>
  );
}

export default Setting;
