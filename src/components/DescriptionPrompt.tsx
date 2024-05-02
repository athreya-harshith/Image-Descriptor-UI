import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useCreateDescriptionMutation } from "../services/apiCalls";
import { Captions } from "../types/Caption";
import { storeCaption } from "../features/captionsSlice";
import { addDesciptions } from "../features/descriptionsSlice";
type PromptData = {
  prompt: string;
};
const DescriptionPrompt = () => {
  const caption = useSelector((state: RootState) => state.captions);
  const descriptions = useSelector((state: RootState) => state.descriptions);
  const { register, handleSubmit, reset } = useForm<PromptData>();
  const [description, setDescription] = useState("");
  const [createDescription, { isLoading: loadingDescription }] =
    useCreateDescriptionMutation();
  const dispatch = useDispatch();
  const onSubmit = async (data: PromptData) => {
    console.log(data);
    dispatch(addDesciptions({ type: "q", text: data.prompt }));
    try {
      const response = await createDescription({
        id: caption.id,
        prompt: data.prompt,
      }).unwrap();
      const obtainedCaption: Captions = response.data;
      console.log("the description created ", obtainedCaption);
      dispatch(
        addDesciptions({ type: "r", text: obtainedCaption.description })
      );
      setDescription(obtainedCaption.description);
      await dispatch(storeCaption(obtainedCaption));
      console.log(description);
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  const promptBg = useColorModeValue("gray.100", "#1DA1F2");
  return (
    <Container h={"100%"} w={"40%"}>
      <Flex h={"100%"} flexDirection={"column"} justifyContent={"between"}>
        <Container h={"90%"} overflowY={"auto"} mb={5}>
          {descriptions &&
            descriptions.map((desc, i) =>
              desc.type === "q" ? (
                <Box
                  key={i}
                  backgroundColor={promptBg}
                  float={"left"}
                  w={"70%"}
                  my={3}
                  p={3}
                  borderRadius={10}
                >
                  {desc.text}
                </Box>
              ) : (
                <Box
                  key={i}
                  backgroundColor={promptBg}
                  float={"right"}
                  minW={"70%"}
                  maxW={"90%"}
                  my={3}
                  p={3}
                  borderRadius={10}
                >
                  {desc.text}
                </Box>
              )
            )}
          {loadingDescription && (
            <Box
              backgroundColor={promptBg}
              float={"right"}
              minW={"70%"}
              maxW={"90%"}
              my={3}
              p={3}
              borderRadius={10}
            >
              Processing....
            </Box>
          )}
        </Container>
        <Container alignItems={"center"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Enter the description"
                  {...register("prompt")}
                />
                <InputRightAddon>
                  <Button type="submit" backgroundColor={"Transparent"}>
                    <ArrowForwardIcon />
                  </Button>
                </InputRightAddon>
              </InputGroup>
            </FormControl>
          </form>
        </Container>
      </Flex>
    </Container>
  );
};

export default DescriptionPrompt;
