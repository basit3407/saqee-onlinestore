import Uppy from "@uppy/core";
import { DragDrop } from "@uppy/react";
import ThumbnailGenerator from "@uppy/thumbnail-generator";
import XHRUpload from "@uppy/xhr-upload";
import PropTypes from "prop-types";
import { ProgressBar } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import "@uppy/progress-bar/dist/style.css";

export default function ImageUpload(props) {
  const { category, setProduct, id, auxImageIndex } = props;
  const uppy = new Uppy({
    meta: { type: "productImage" },
    restrictions: {
      maxNumberOfFiles: null,
      maxFileSize: null,
      allowedFileTypes: [".jpg", ".jpeg", ".png"],
    },
    autoProceed: true,
  });

  uppy.setMeta({ category: category });

  uppy.use(XHRUpload, {
    endpoint: "http://localhost:3000/api/upload",
    fieldName: "productImage",
    formData: true,
  });

  uppy.use(ThumbnailGenerator, {
    thumbnailWidth: 200,
    waitForThumbnailsBeforeUpload: false,
  });

  uppy.on("thumbnail:generated", (file, preview) => {
    console.log(file.name, preview);
  });

  // uppy.on("complete", (result) => {
  //   const url = result.successful[0].uploadURL;
  //   console.log("successful upload", result);
  // });

  uppy.on("upload-error", (file, e, response) => {
    const { error } = response.body;
    console.log(error);

    console.log(response);
    console.log("error with file:", file.id);
    console.log("error message:", e);
  });

  // uppy.on("error", (error) => {
  //   console.log(error);
  // });

  uppy.on("upload-success", (file, response) => {
    const { url } = response.body;
    console.log(response.body);
    console.log(file);

    setProduct((prevVal) => {
      const { auxImages } = prevVal;

      return {
        ...prevVal,
        [id]:
          id === "image"
            ? url
            : [
                ...auxImages.slice(0, auxImageIndex),
                url,
                ...auxImages.slice(auxImageIndex + 1),
              ],
      };
    });
  });

  uppy.on("restriction-failed", (file, error) => {
    const err = error.stack.includes("exceeds maximum allowed size of 4 MB")
      ? "File size is larger than 4MB"
      : error;

    alert(
      "-Upload error: " +
        err +
        "\n" +
        file.name +
        " Size : " +
        Math.round(file.size / 1024 / 1024) +
        "MB"
    );
  });

  /*

    From:   https://uppy.io/examples/dashboard/
            https://uppy.io/docs/react/

 */
  return (
    <div>
      <DragDrop
        uppy={uppy}
        locale={{
          strings: {
            // Text to show on the droppable area.
            // `%{browse}` is replaced with a link that opens the system file selection dialog.
            dropHereOr: " Drag the image here or {browse}",
            // Used as the label for the link that opens the system file selection dialog.
            browse: "search the device",
          },
        }}
      />
      <ProgressBar uppy={uppy} fixed hideAfterFinish />
    </div>
  );
}

ImageUpload.propTypes = {
  id: PropTypes.string.isRequired,
  auxImageIndex: PropTypes.number,
  setProduct: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
};
