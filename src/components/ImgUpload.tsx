import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import blankImg from "../assets/blank-image.png";
import { useCreateCaptionMutation } from "../services/apiCalls";
import { useDispatch } from "react-redux";
import { storeCaption } from "../features/captionsSlice";
import { useForm } from "react-hook-form";
import { Captions } from "../types/Caption";
type CaptionData = {
  files: FileList;
};
const ImgUpload = () => {
  const [createCaption, { isSuccess }] = useCreateCaptionMutation();
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState("");
  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    console.log(target.files);
    setFile(URL.createObjectURL(target.files[0]));
  }
  const { register, handleSubmit } = useForm<CaptionData>();
  const dispatch = useDispatch();
  const onSubmit = async (formData: CaptionData) => {
    setCaption("");
    console.log("data in the react-hook-form", formData);
    try {
      const response = await createCaption(formData.files[0]).unwrap();
      console.log("response is ", response);
      const obtainedCaption: Captions = response.data as Captions;
      dispatch(storeCaption(obtainedCaption));
      setCaption(obtainedCaption.caption);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <img
        className="img-container"
        src={file ? file : blankImg}
        alt="uplaoded-image"
      />
      <div className="d-flex justify-content-center mt-5 caption-form">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group
            controlId="formFile"
            className="mb-3 justify-content-center d-flex flex-column"
            onChange={handleChange}
          >
            <Form.Label>Select The image</Form.Label>
            <Form.Control type="file" {...register("files")} />
            <Button className="mx-auto mt-3" type="submit" variant="secondary">
              Get Caption
            </Button>
          </Form.Group>
        </Form>
      </div>
      <div>
        {isSuccess && caption && <div>Obtained Caption is : {caption}</div>}
      </div>
    </div>
  );
};

export default ImgUpload;
