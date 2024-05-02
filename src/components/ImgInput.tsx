import React, { useState } from "react";
import {
  Flex,
  Container,
  Image,
  Text,
  FormControl,
  Button,
  Progress,
  useToast,
} from "@chakra-ui/react";
import blankImg from "../assets/blank-image.png";
import { useForm } from "react-hook-form";
import { useCreateCaptionMutation } from "../services/apiCalls";
import { useDispatch } from "react-redux";
import { storeCaption } from "../features/captionsSlice";
import { Captions } from "../types/Caption";
import { addDesciptions } from "../features/descriptionsSlice";
type CaptionData = {
  files: FileList;
};
const ImgInput = () => {
  const [createCaption, { isSuccess, isLoading }] = useCreateCaptionMutation();
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState("");
  const dispatch = useDispatch();
  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    console.log(target.files);
    setFile(URL.createObjectURL(target.files[0]));
  }
  const { register, handleSubmit } = useForm<CaptionData>();
  const onSubmit = async (formData: CaptionData) => {
    setCaption("");
    console.log("data in the react-hook-form", formData);
    try {
      const response = await createCaption(formData.files[0]).unwrap();
      console.log("response is ", response);
      const obtainedCaption: Captions = response.data as Captions;
      dispatch(storeCaption(obtainedCaption));
      dispatch(addDesciptions({ type: "r", text: obtainedCaption.caption }));
      setCaption(obtainedCaption.caption);
    } catch (error) {
      console.log(error);
    }
  };
  const toast = useToast();
  return (
    <>
      <Flex flexDirection={"column"}>
        <Container>
          <Image src={file ? file : blankImg} w={"350px"} maxH={"40vh"} />
        </Container>
        <Container w={"100%"} alignItems={"center"} justifyContent={"center"}>
          <Text mx={"auto"}>Select an Image</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mx={"auto"} my={"10px"} onChange={handleChange}>
              <input type={"file"} {...register("files")} />
            </FormControl>
            <Button
              w={"100%"}
              colorScheme="blue"
              type="submit"
              onClick={() =>
                toast({
                  title: `Uploading the image....`,
                  status: "info",
                  isClosable: true,
                  position: "bottom-left",
                })
              }
            >
              Get Caption{" "}
            </Button>
          </form>
        </Container>
        {isLoading && <Progress my={"10px"} size="sm" isIndeterminate />}
        {isSuccess && <Text my={10}>{caption}</Text>}
      </Flex>
    </>
  );
};

export default ImgInput;
