import { createElement } from "react";
import type { CSSProperties } from "react";

const previewImageStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "block",
  objectFit: "cover"
};

export function makePreviewImage(src?: string) {
  const imageSrc = src?.trim();
  if (!imageSrc) return undefined;

  function PreviewImage() {
    return createElement("img", {
      alt: "",
      loading: "lazy",
      src: imageSrc,
      style: previewImageStyle
    });
  }

  return PreviewImage;
}
