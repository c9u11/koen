import Activator from '../../components/Activator';
import TopBar from '../../components/TopBar';

function Home() {
  return (
    <>
      <TopBar isHome={true} />
      <Activator />
    </>
  );
}

export default Home;
