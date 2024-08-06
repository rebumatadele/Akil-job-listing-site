import React from "react";
import { IconType } from "react-icons";
import Icons from "./Icons";

interface Props {
  text: string;
  date: string;
  Icon: IconType;
}
const AboutItem = ({ text, date, Icon }: Props) => {
  return (
    <div className="flex flex-row">
      <div>
        <Icons Icon={Icon}></Icons>
      </div>
      <div className="px-4">
        <div>{text}</div>
        <div className="font-bold">{date}</div>
      </div>
    </div>
  );
};

export default AboutItem;
