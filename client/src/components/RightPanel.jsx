import React from "react";
import { AiOutlineMessage, AiOutlinePlus, AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import { BiFile, BiFolder } from "react-icons/bi";
import { FiMessageSquare } from "react-icons/fi";
import { MdLogout } from "react-icons/md";

const RightPanel = ({ response0 }) => {
  console.log('right panel: ', response0)
  if (!response0.length) {
    return <></>;
  }
  return (
    <div className="dark hidden flex-shrink-0 bg-gray-900 md:flex md:w-[300px] md:flex-col">
      <div className="flex h-full min-h-0 flex-col w-[300px]">
        <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
          <nav className="flex h-full flex-1 flex-col space-y-1 p-2 ">
            <div className="">
              {response0[0] && (
                <a
                  href="https://help.openai.com/en/collections/3742473-chatgpt"
                  target="_blank"
                  className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
                >
                  <BiFolder className="h-4 w-4" />
                  <span>{response0[0][0]}</span>
                </a>
              )}
              {response0[1] &&
                response0[1].map((res, idx) => (
                  <a
                    href="https://help.openai.com/en/collections/3742473-chatgpt"
                    target="_blank"
                    key ={idx}
                    className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
                  >
                    <BiFile className="h-4 w-4" />
                    <span>{res}</span>
                  </a>
                ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
