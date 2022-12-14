import React from "react";
import { ImageService } from "../../../services";
import LittleImage from "../LittleImage";

interface AvatarImageProps {
  pictureName?: string;
}

const AvatarImage: React.FC<AvatarImageProps> = ({ pictureName }) => {
  return <LittleImage src={ImageService.getAvatar(pictureName)} />;
};

export default AvatarImage;
