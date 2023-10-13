import React, { useRef } from "react";
import {
  AiOutlinePlus,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineGoogle,
  AiOutlineCloud,
} from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { FiMessageSquare } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { ReactOneDriveFilePicker } from "react-onedrive-filepicker"
import { getEmailFromOneDrive } from "../apis/outlookapifunc";

// clerk
import { UserButton } from "@clerk/clerk-react";

const GoogleSigninComponent = ({ handleGoogleLogin }) => {
  return (
    <div className="pb-1">
      <a
        onClick={handleGoogleLogin}
        className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm border border-white/20"
      >
        <AiOutlineGoogle className="h-4 w-4" />
        Select from Google
      </a>
    </div>
  );
};

const Sidebar = ({ handleGoogleLogin }) => {
  return (
    <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
      <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
        <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-1 flex-shrink-0 border border-white/20">
          <AiOutlinePlus className="h-4 w-4" />
          New chat
        </a>
        <div className="flex-col flex-1 overflow-y-auto">
          <div className="flex flex-col gap-2 pb-2 text-gray-100 text-sm">
            <a className="flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 group">
              <FiMessageSquare className="h-4 w-4" />
              <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
                New conversation
                <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-900 group-hover:from-[#2A2B32]"></div>
              </div>
            </a>
          </div>
        </div>

        <GoogleSigninComponent handleGoogleLogin={handleGoogleLogin} />
        <div className="border-t border-white/20">
          <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm ">
            <AiOutlineUser className="h-4 w-4" />
            My plan
          </a>
          <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
            <AiOutlineSetting className="h-4 w-4" />
            Settings
          </a>
          <a
            href="https://help.openai.com/en/collections/3742473-chatgpt"
            target="_blank"
            className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
          >
            <BiLinkExternal className="h-4 w-4" />
            Get help
          </a>
          <a
            className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 
          transition-colors duration-200 text-white cursor-pointer text-sm"
          >
            {/* <MdLogout className="h-4 w-4" /> */}
            <UserButton afterSignOutUrl="/signin" signInUrl="/signin"  />
            <div className="flex items-center">
              <span>Profile</span>
            </div>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
