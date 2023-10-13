/* eslint-disable react/prop-types */

import CIcon from "@coreui/icons-react";
import { CFormTextarea, CNavLink, CSpinner } from "@coreui/react";
import { ReactComponent as EditSvg } from "../assets/EditIcon.svg";
import { cilCopy, cilThumbUp, cilThumbDown } from "@coreui/icons";

const Spinner = ({ variant, size }) => (
  <CSpinner color={variant || "danger"} variant="grow" size={size || "sm"} />
);

const IconButton = ({ icon, onClick }) => (
  <CNavLink href={void 0} onClick={onClick}>
    <CIcon icon={icon} size="lg" />
  </CNavLink>
);

const Message = ({ children, onIndexing, isThinking }) => (
  <div className="row align-items-start bg-info text-gray-dark rounded py-2">
    <div className="col ps-1" style={{ flex: "0 0 50px" }}>
      {onIndexing ? <Spinner /> : ""} {isThinking ? <Spinner size="sm" /> : ""}
    </div>
    <div className="col text-left ps-1 message-font">{children}</div>
    <div className="col text-center ps-1" style={{ flex: "0 0 50px" }}>
      <IconButton icon={EditSvg} />
    </div>
  </div>
);

const Response = ({ content }) => (
  <>
    <CFormTextarea
      placeholder=""
      aria-label="Readonly textarea example"
      disabled
      readOnly
      className="my-2 answer-message-font"
      style={{ height: "calc(100% - 80px)" }}
      value={content}
    />
    <div
      style={{ marginLeft: "auto" }}
      className="container bottom-0 translate-end-x w-100 pb-3"
    >
      <div className="row align-items-start">
        <div className="col text-right ps-1"></div>
        <div className="col text-right ps-1" style={{ flex: "0 0 50px" }}>
          <IconButton icon={cilThumbUp} />
        </div>
        <div className="col text-right ps-1" style={{ flex: "0 0 50px" }}>
          <IconButton icon={cilThumbDown} />
        </div>
        <div
          className="col text-right ps-1"
          style={{ flex: "0 0 50px", cursor: "pointer" }}
        >
          <IconButton
            icon={cilCopy}
            onClick={() => navigator.clipboard.writeText(content)}
          />
        </div>
      </div>
    </div>
  </>
);

const Conversation = ({
  conversation,
  onIndexing,
  isThinking,
  firstMessage,
}) => {
  if (conversation.length < 2) {
    return (
      <Message onIndexing={onIndexing} isThinking={isThinking}>
        {firstMessage}
      </Message>
    );
  } else {
    return conversation.map((item, index) =>
      item.role === "user" ? (
        <Message
          key={index}
          {...item}
          onIndexing={onIndexing}
          isThinking={isThinking}
        >
          {item.content}
        </Message>
      ) : (
        <Response key={index} content={item.content} />
      ),
    );
  }
};

export default Conversation;
