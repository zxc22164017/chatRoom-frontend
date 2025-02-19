import { useEffect, useState } from "react";
import Textarea from "../Textarea";
import ThumbnailWithPreview from "../Thumbnails/ThumbnailWithPreview";
import Button from "../Button";
import { useUploadImgMutation, usePatchCommentMutation } from "../../store";

const EditComment = ({ comment, setEdit }) => {
  const [formData, setFormData] = useState(comment.content);
  const [patchComment, patchResult] = usePatchCommentMutation();
  const [uploadImg] = useUploadImgMutation();
  const [img, setImg] = useState();
  const handleSubmit = async () => {
    let key;
    if (img) {
      key = await uploadImg({ file: img }).unwrap();
    }
    patchComment({ formData, commentId: comment._id, image: key });
    setEdit(false);
  };
  useEffect(() => {
    if (patchResult.isSuccess) {
      window.location.reload();
    }
  }, [patchResult]);

  return (
    <div>
      <Textarea
        text={"edit"}
        value={formData}
        isLoading={patchResult.isLoading}
        onChange={(e) => {
          setFormData(e.target.value);
        }}
        noSubmit
      />
      <ThumbnailWithPreview
        className={"max-h-28 max-w-28 mt-1 rounded-none"}
        img={comment?.image}
        previewImg={img}
        setPreviewImg={setImg}
      />
      <div className="absolute bottom-1 right-1">
        <div className="flex gap-2">
          <Button
            secondary
            rounded
            className="w-28 "
            onClick={() => {
              setEdit(false);
            }}
          >
            Cancel
          </Button>
          <Button primary rounded className="w-28 " onClick={handleSubmit}>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditComment;
