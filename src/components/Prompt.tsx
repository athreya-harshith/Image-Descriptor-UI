import { RootState } from "../store";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useCreateDescriptionMutation } from "../services/apiCalls";
import { useForm } from "react-hook-form";
import { Captions } from "../types/Caption";
import { storeCaption } from "../features/captionsSlice";
import { useState } from "react";
type PromptData = {
  prompt: string;
};
const Prompt = () => {
  const caption = useSelector((state: RootState) => state.captions);
  const [description, setDescription] = useState("");
  //   const someText =
  //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eligendi dignissimos consequatur aspernatur explicabo architecto accusamus ducimus! Molestiae commodi modi natus rerum quia harum, ratione deleniti voluptatum inventore quas officia laborum assumenda quam tenetur excepturi.";
  const { register, handleSubmit } = useForm<PromptData>();
  const [createDescription, { isLoading: loadingDescription }] =
    useCreateDescriptionMutation();
  const dispatch = useDispatch();
  const onSubmit = async (data: PromptData) => {
    console.log(data);
    try {
      const response = await createDescription({
        id: caption.id,
        prompt: data.prompt,
      }).unwrap();
      const obtainedCaption: Captions = response.data;
      console.log("the description created ", obtainedCaption);
      setDescription(obtainedCaption.description);
      await dispatch(storeCaption(obtainedCaption));
      console.log(description);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="d-flex flex-column prompt-container justify-content-between">
      Get Amazing Descriptions
      <div className="prompt-result-container d-flex flex-column">
        {loadingDescription && (
          <div className="description">Processing ...</div>
        )}
        {caption.caption && (
          <div className="description">Caption is {caption.caption}</div>
        )}
        {description && (
          <div className="description">{caption.description}</div>
        )}
        {/* <div className="description">{}</div>
        <div className="description">{someText}</div> */}
      </div>
      <div className="prompt-input-container ">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex">
            <Form.Control
              type="text"
              placeholder="Enter the prompt"
              {...register("prompt")}
            />
            <button className="prompt-submit-button" type="submit">
              <span className="material-symbols-sharp send-icon">send</span>
            </button>
          </div>
        </Form>
        <br />
      </div>
    </div>
  );
};

export default Prompt;
