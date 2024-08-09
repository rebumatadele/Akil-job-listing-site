import React from "react";
interface Props {
  // inPerson: boolean;
  children: string[];
}
const Buttons = ({children }: Props) => {
  // const inperson: string = inPerson ? "In Person" : "Virtual";
  return (
    <div className="py-3">
      <div className="flex flex-row gap-4 flex-wrap">
        {children.map((child, i) => (
          <button
            key={child}
            className={`font-bold text-sm text-nowrap rounded-3xl px-6 py-2.5 border-2  ${
              i % 2 == 0
                ? "text-orange-400 border-orange-400/80 "
                : "text-indigo-900 border-indigo-900 "
            }`}
          >
            {child}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Buttons;
