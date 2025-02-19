import Thumbnail from "./Thumbnail";
const ThumbnailWithPreview = ({
  previewImg,
  img,
  setPreviewImg,
  htmlFor,
  className,
  upload,
}) => {
  return (
    <>
      {previewImg ? (
        <img
          onClick={() => {
            setPreviewImg(null);
          }}
          src={URL.createObjectURL(previewImg)}
          className={` ${className}`}
        />
      ) : (
        <Thumbnail
          upload={upload || true}
          onChange={(e) => {
            setPreviewImg(e.target.files[0]);
          }}
          htmlFor={htmlFor}
          image={img}
          className={className ? className : "rounded-none"}
        />
      )}
    </>
  );
};

export default ThumbnailWithPreview;
