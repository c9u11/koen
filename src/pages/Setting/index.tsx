import IsChangeInputSourceSetter from '../../components/IsChangeInputSourceSetter';
import { Item, ItemContent, ItemTitle } from '../../components/Item';
import { CenterLayout } from '../../components/Layout';
import ShortcutSetter from '../../components/ShortcutSetter';
import TopBar from '../../components/TopBar';

function Setting() {
  return (
    <>
      <TopBar isHome={false} />
      <CenterLayout>
        <ShortcutSetter />
        <Item>
          <ItemTitle>Options</ItemTitle>
          <ItemContent>
            <IsChangeInputSourceSetter />
          </ItemContent>
        </Item>
      </CenterLayout>
    </>
  );
}

export default Setting;
