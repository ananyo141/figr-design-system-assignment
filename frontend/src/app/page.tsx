import { permanentRedirect } from "next/navigation";

const Home = () => {
  permanentRedirect("/projects");
};

export default Home;
