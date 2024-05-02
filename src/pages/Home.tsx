import { Divider } from "@chakra-ui/react";
import ImgInput from "../components/ImgInput";
import DescriptionPrompt from "../components/DescriptionPrompt";

const Home = () => {
  return (
    <div className="d-flex align-items-center home-container justify-content-between">
      <div className="d-flex align-items-center justify-content-center img-upload">
        <ImgInput></ImgInput>
      </div>
      <Divider orientation="vertical" />
      <DescriptionPrompt />
      {/* <Prompt /> */}
    </div>
  );
};

export default Home;
