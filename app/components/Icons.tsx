import React from "react";
import { IconType } from "react-icons";

interface Props {
  Icon: IconType;
}
const AboutItems = ({ Icon }: Props) => {
  return (
    <>
      <div className="border-2 border-[#D6DDEB] rounded-full p-3">
        <Icon size="25px" color="#26A4FF"></Icon>
      </div>
    </>
  );
};

export default AboutItems;
