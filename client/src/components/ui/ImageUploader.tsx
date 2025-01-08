import React from "react";

type ImageUploaderProps = {
  image: File | null;
  onImageChange: (file: File) => void;
  placeholderImg: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const ImageUploader = ({
  image,
  onImageChange,
  placeholderImg,
  ...rest
}: ImageUploaderProps) => (
  <label className="form-image-upload">
    <img
      src={image ? URL.createObjectURL(image) : placeholderImg}
      alt="Image preview"
      className="form-image-preview"
    />
    <input
      type="file"
      onChange={(e) => e.target.files && onImageChange(e.target.files[0])}
      hidden
      {...rest}
    />
  </label>
);
