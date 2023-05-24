import Head from "next/head";
import Map from "./components/App";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>My PWA App</title>
        <link rel='manifest' href='/manifest.json' />
      </Head>
      <h1>My PWA App</h1>
      <Map />
    </div>
  );
};

export default Home;
