import "bootstrap/dist/css/bootstrap.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import "font-awesome/css/font-awesome.min.css";
import React, { useEffect, useState, createRef, useRef } from "react";
import {
  CNavLink,
  CAvatar,
  CListGroup,
  CListGroupItem,
  CFormCheck,
  CButton,
  CFormInput,
  CContainer,
  CHeaderNav,
  CNavItem,
  CHeader,
  CToast,
  CToastBody,
  CToastClose,
  CFormTextarea,
  CSpinner,
  CAlert,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilSettings,
  cilBell,
  cilAccountLogout,
  cilGroup,
  cilHome,
  cilGraph,
  cilCopy,
  cilThumbUp,
  cilThumbDown,
  cilDollar,
} from "@coreui/icons";
import { useDispatch, useSelector } from "react-redux";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import useDrivePicker from "react-google-drive-picker";
import { useUser, useAuth, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { getGmailFromGoogleDrive } from "../apis/googleapifunc";
import { ReactComponent as FictionalLogos } from "../assets/FictionalLogos.svg";
import { ReactComponent as ThirdPartySvg } from "../assets/3rdParty.svg";
import { ReactComponent as DataSourceSvg } from "../assets/data-source.svg";
import { ReactComponent as PlusSvg } from "../assets/plus-Icon.svg";
import { ReactComponent as RobotSvg } from "../assets/robot-icon.svg";
import { ReactComponent as TxtSvg } from "../assets/text-icon.svg";
import { ReactComponent as EditSvg } from "../assets/EditIcon.svg";
import logoImg from "../assets/images/logo.png";
import HomeLeftPannel from "../components/HomeLeftPannel";
import "../styles/globals.css";
import avatar2 from "../assets/images/2.jpg";
import {
  serverAuthAPI,
  serverO365AuthAPI,
  genClarifiedAnswerAPI,
  indexCreationAPI,
  userFirstInputAPI,
  createUserAPI,
} from "../apis/backendapi";
import { CONFIG } from "../config";
import { useClerk } from "@clerk/clerk-react";
import Suggestions from "../components/Suggestions";
import Conversation from "../components/Conversation";
import { checkSubscription } from "../utility/checkSubscription";
import axios from "axios";

const SCOPES = ["https://www.googleapis.com/auth/drive"];

export default function HomePage() {
  const { signOut } = useClerk();
  const dispatch = useDispatch();
  const [driveType, setDriveType] = useState("ONE_DRIVE"); //NONE_DRIVE, GOOGLE_DRIVE, ONE_DRIVE
  const [userFileInfo, setUserFileInfo] = useState(null);
  const [openPicker, authResponse] = useDrivePicker();
  const [response0, setResponse0] = useState([]);
  const [chatReady, setChatReady] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [onIndexing, setOnIndexing] = useState(false);
  const [countChat, setCountChat] = useState(0);
  const [maxCountChat, setMaxCountChat] = useState(3);
  const [response1, setResponse1] = useState([]);
  const [confirmAnswers, setConfirmAnswers] = useState([]);
  const [showEmptyChat, setShowEmptyChat] = useState(true);
  const [conversation, setConversation] = useState([]);
  const [openSettings, setOpenSettings] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const oneDriverChooseBtn = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const scrollableDivRef = useRef(null);
  function scrollToBottom() {
    const div = scrollableDivRef.current;
    div.scrollTo({
      top: div.scrollHeight,
      behavior: "smooth",
    });
  }
  const googleAuthURL = useSelector((state) => state.googleAuthURL);
  const googleAccessToken = useSelector((state) => state.googleAccessToken);
  const outlookAccessToken = useSelector((state) => state.outlookAccessToken);

  const { isSignedIn, isLoaded, userId } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && user) {
      console.log("user", user);
      const data = {
        id: user.id,
        user_name: user.username,
        full_name: user.fullName,
        image_url: user.imageUrl,
        primary_email_address: user.primaryEmailAddress.emailAddress,
        primary_phone_number: user.primaryPhoneNumber,
        last_sign_in_at: user.lastSignInAt,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      };
      createUserAPI(data);
    }
  }, [isLoaded]);

  useEffect(() => {
    console.log("isSignedIn", isSignedIn);
    console.log("isLoaded", isLoaded);

    if (isLoaded && !isSignedIn) {
      navigate("/login");
    }
  }, [isLoaded]);
  useEffect(() => {
    (async () => {
      //Module for google drive sign
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      if (code) {
        var respAuth = "";
        //Outlook code format: M.C105_BAY.2.a0273826-7f40-7842-99b0-06de85a19bd2
        if (code.indexOf("M.C", 0) !== -1) {
          console.log("serverO365AuthAPI", code);
          setDriveType("ONE_DRIVE");
          respAuth = await serverO365AuthAPI(window.location);
          console.log("respAuth.data", respAuth.data[0]);
          dispatch({ type: "set", outlookAuthURL: window.location });
          dispatch({ type: "set", outlookAccessToken: respAuth.data[0] });
        } else {
          setDriveType("GOOGLE_DRIVE");
          respAuth = await serverAuthAPI(window.location);

          if (respAuth.error) {
            // alert('google login failed')
            return;
          }

          console.log("respAuth.data", respAuth.data);
          dispatch({ type: "set", googleAuthURL: window.location });
          dispatch({ type: "set", googleAccessToken: respAuth.data });
        }
        console.log("DriveType -> ", driveType);
      }
    })();
  }, []);

  useEffect(() => {
    if (googleAccessToken && driveType === "GOOGLE_DRIVE") {
      handleGoogleFilePicker();
    }
  }, [googleAccessToken]);

  useEffect(() => {
    if (outlookAccessToken && driveType === "ONE_DRIVE") {
      console.log("OutlookSigninComponent accesstoken=>", outlookAccessToken);

      if (outlookAccessToken && driveType === "ONE_DRIVE") {
        console.log("accesstoken=>", outlookAccessToken);
        console.log("oneDriverChooseBtn=>", oneDriverChooseBtn);
        oneDriverChooseBtn.current.parentElement.click();
      }
    }
  }, [outlookAccessToken]);

  useEffect(() => {
    if (userFileInfo) {
      console.log("UserFileInfo: ", userFileInfo);

      (async () => {
        try {
          setOnIndexing(true);
          setChatReady(false);

          const resp = await indexCreationAPI(
            userFileInfo.driveType,
            userFileInfo.driveId,
            userFileInfo.email_id,
            userFileInfo.fileId,
            userFileInfo.file_name,
            userFileInfo.file_type
          );
          if (resp.error) {
            alert("Index creation failed");
            throw new Error();
          } else {
            setOnIndexing(false);
            console.log(resp.data, "Response0");
            setResponse0(resp.data);
            setChatReady(true);
          }
        } catch (err) {
          console.log("index_creation error: ", err);
        }
      })();
    }
    return () => {
      sessionStorage.removeItem(CONFIG.G_DRIVE_TOKEN);
    };
  }, [userFileInfo]);

  const handleGoogleFilePicker = async () => {
    if (!googleAccessToken) {
      window.location.href = CONFIG.GOOGLE_OAUTH_REDIRECT_LINK;
      return;
    }

    const config = {
      clientId:
        "135600683384-kd5hev0ik63e0toudupfajtllhphgdu4.apps.googleusercontent.com",
      developerKey: "AIzaSyBLuLgOv54zhvT0QXTnDRCnywWfpAQc5Bc",
      viewId: "DOCS",
      disableDefaultView: true,
      showUploadView: false,
      showUploadFolders: false,
      supportDrives: true,
      multiselect: true,
      setSelectFolderEnabled: true,
      customScopes: SCOPES,
      customViews: getCustomViews(),
    };

    if (googleAccessToken || sessionStorage.getItem(CONFIG.G_DRIVE_TOKEN)) {
      config.token =
        googleAccessToken || sessionStorage.getItem(CONFIG.G_DRIVE_TOKEN);
    }

    if (config.token) {
      function myCallback(data) {
        if (data.action === "loaded") {
          console.info("Opened popup");
          return;
        } else if (data.action === "cancel") {
          console.info("User clicked cancel/close button");
          return;
        }
        pickerCalllback(data, config.token);
      }
      config.callbackFunction = myCallback;
      openPicker(config);
    }
  };

  const getCustomViews = () => {
    if (!window.google || !window.google.picker) return;
    const customViews = [];
    const ggPicker = window.google.picker;

    const viewIds = ggPicker.ViewId.DOCS || [];
    // File View
    const fileView = new ggPicker.View(viewIds).setLabel("Drive Files");
    customViews.push(fileView);

    // Folder View
    const folderView = new ggPicker.DocsView();
    if (folderView) {
      folderView.setIncludeFolders(true);
      folderView.setMimeTypes("application/vnd.google-apps.folder");
      folderView.setSelectFolderEnabled(true);
      folderView.setLabel("Drive Folders");
      customViews.push(folderView);
    }

    const sharedwithmeview = new ggPicker.DocsView(viewIds);
    // Shared with me
    if (sharedwithmeview) {
      sharedwithmeview.setOwnedByMe(false);
      customViews.push(sharedwithmeview);
    }

    // Shared Drives
    const shareddrivesview = new ggPicker.DocsView(viewIds);
    if (shareddrivesview) {
      shareddrivesview.setEnableDrives(true);
      shareddrivesview.setIncludeFolders(true);
      customViews.push(shareddrivesview);
    }

    return customViews;
  };

  const pickerCalllback = async (data, config_token) => {
    // console.log('data: ', data, data.action, window.google.picker.Action.PICKED)
    const google = window.google;
    let text = `Picker response: \n${JSON.stringify(data, null, 2)}\n`;
    const document = data[google.picker.Response.DOCUMENTS][0];
    const fileId = document[google.picker.Document.ID];
    console.log("data: ", data);
    // console.log(fileId);
    // console.log(document)
    // console.log(document.mimeType);
    // console.log(document.name);
    const email_id = await getGmailFromGoogleDrive(config_token, fileId);
    console.log("userEmail: ", email_id);
    setUserFileInfo({
      driveType: driveType,
      driveId: "",
      email_id: email_id,
      token: config_token,
      fileId: fileId,
      file_name: document.name,
      file_type: document.mimeType,
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log("sendMessage: ", prompt);
    // Don't send empty messages
    if (chatReady == false) {
      return;
    }

    // Don't send empty messages for real-Question.
    if (countChat === 0 && prompt.length < 1) {
      setErrorMessage("Please enter a message.");
      return;
    } else {
      setErrorMessage("");
    }

    setIsThinking(true);

    // Clear the message & remove empty chat
    setShowEmptyChat(false);

    try {
      if (countChat === 0) {
        // userFirstInputAPI();
        const resp = await userFirstInputAPI(userFileInfo.authToken, prompt);
        setResponse1(resp);
        setMaxCountChat(resp[2].length);
        setConfirmAnswers(resp[0]);

        if (resp[2]?.length) {
          setConversation([
            ...conversation,
            { content: prompt, role: "user" },
            { content: resp[2][0], role: "system" },
          ]);
          setCountChat((prev) => prev + 1);
        } else {
          setConversation([...conversation, { content: prompt, role: "user" }]);
          let ntotalConfirmAnswers = resp[0];
          const finalResp = await genClarifiedAnswerAPI(
            userFileInfo.authToken,
            ntotalConfirmAnswers,
            resp[1],
            [], //gpt_questions
            response0, //selected_files
            userFileInfo.email_id //email
          );
          setConversation([
            ...conversation,
            { content: prompt, role: "user" },
            { content: finalResp[0], role: "system" },
            // { content: "Hope this answer will be helpful. Thank you for using us.", role: "system" },
          ]);

          initChatState();
        }
      } else if (countChat === maxCountChat) {
        // Confirm Answer attach without the last one.
        const totalConfirmAnswers = [...confirmAnswers, prompt];
        console.log("confirmAnsers: ", totalConfirmAnswers);
        console.log("response0: ", response0);
        // getClarifiedAnswerAPI();
        const finalResp = await genClarifiedAnswerAPI(
          userFileInfo.authToken,
          totalConfirmAnswers,
          response1[1],
          response1[2],
          response0,
          userFileInfo.email_id
        );
        setConversation([
          ...conversation,
          { content: prompt, role: "user" },
          { content: finalResp[0], role: "system" },
          //          { content: "Hope this answer will be helpful. Thank you for using us.", role: "system" },
        ]);

        // Init chat state for new Q/A
        // initChatState();
        // setIsEnableChat(false);
      } else {
        // Confirm Answer attach without the last one.
        setConfirmAnswers((prev) => [...prev, prompt]);
        setConversation([
          ...conversation,
          { content: prompt, role: "user" },
          { content: response1[2][countChat], role: "system" },
        ]);
        setCountChat((prev) => prev + 1);
      }
      setTimeout(() => {
        setIsThinking(false);
        setPrompt("");
      }, 200);
      scrollToBottom();
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);

      setIsThinking(false);
    }
  };

  useEffect(() => {
    const div = scrollableDivRef.current;
    div.scrollTo({
      top: div.scrollHeight,
      behavior: "smooth",
    });
  }, [conversation]); // Triggered whenever `conversation` changes

  const sendCustomiseMessage = async (prompt) => {
    console.log("sendMessage: ", prompt);
    // Don't send empty messages
    if (chatReady == false) {
      return;
    }

    // Don't send empty messages for real-Question.
    if (countChat === 0 && prompt.length < 1) {
      setErrorMessage("Please enter a message.");
      return;
    } else {
      setErrorMessage("");
    }

    setIsThinking(true);

    // Clear the message & remove empty chat
    setShowEmptyChat(false);

    try {
      if (countChat === 0) {
        // userFirstInputAPI();
        const resp = await userFirstInputAPI(userFileInfo.authToken, prompt);
        setResponse1(resp);
        setMaxCountChat(resp[2].length);
        setConfirmAnswers(resp[0]);

        if (resp[2]?.length) {
          setConversation([
            ...conversation,
            { content: prompt, role: "user" },
            { content: resp[2][0], role: "system" },
          ]);
          setCountChat((prev) => prev + 1);
        } else {
          setConversation([...conversation, { content: prompt, role: "user" }]);
          let ntotalConfirmAnswers = resp[0];
          const finalResp = await genClarifiedAnswerAPI(
            userFileInfo.authToken,
            ntotalConfirmAnswers,
            resp[1],
            [], //gpt_questions
            response0, //selected_files
            userFileInfo.email_id //email
          );
          setConversation([
            ...conversation,
            { content: prompt, role: "user" },
            { content: finalResp[0], role: "system" },
            // { content: "Hope this answer will be helpful. Thank you for using us.", role: "system" },
          ]);

          initChatState();
        }
      } else if (countChat === maxCountChat) {
        // Confirm Answer attach without the last one.
        const totalConfirmAnswers = [...confirmAnswers, prompt];
        console.log("confirmAnsers: ", totalConfirmAnswers);
        console.log("response0: ", response0);
        // getClarifiedAnswerAPI();
        const finalResp = await genClarifiedAnswerAPI(
          userFileInfo.authToken,
          totalConfirmAnswers,
          response1[1],
          response1[2],
          response0,
          userFileInfo.email_id
        );
        setConversation([
          ...conversation,
          { content: prompt, role: "user" },
          { content: finalResp[0], role: "system" },
          //          { content: "Hope this answer will be helpful. Thank you for using us.", role: "system" },
        ]);

        // Init chat state for new Q/A
        // initChatState();
        // setIsEnableChat(false);
      } else {
        // Confirm Answer attach without the last one.
        setConfirmAnswers((prev) => [...prev, prompt]);
        setConversation([
          ...conversation,
          { content: prompt, role: "user" },
          { content: response1[2][countChat], role: "system" },
        ]);
        setCountChat((prev) => prev + 1);
      }
      setTimeout(() => {
        setIsThinking(false);
        setPrompt("");
      }, 200);
      scrollToBottom();
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);

      setIsThinking(false);
    }
  };

  const initChatState = () => {
    setResponse1([]);
    setMaxCountChat(3);
    setConfirmAnswers([]);
    setCountChat(0);
  };

  // subscription functions
  const checkingSubscription = async () => {
    console.log("checking in protected page");
    const subscriptionStatus = await checkSubscription(userId);
    console.log(subscriptionStatus);
    setIsPro(subscriptionStatus);

    if (!subscriptionStatus) {
      try {
        const { data } = await axios.post(
          `${CONFIG.nodeApi}/create-checkout-session`,
          {
            userId: userId,
            email: user.emailAddresses[0].emailAddress,
          }
        );

        if (data.url) {
          window.location.href = data.url;
        }
      } catch (err) {
        console.log("error while checking subscription => ", err);
      }
    }
  };

  const handleBillings = async () => {
    try {
      const { data } = await axios.post(`${CONFIG.nodeApi}/manage-billings`, {
        userId: userId,
      });
      window.location.href = data.url;
    } catch (err) {
      console.log(
        "error requesting in handlebillings for customer portal => ",
        err
      );
    }
  };

  useEffect(() => {
    if (user) {
      checkingSubscription();
    }
  }, [user]);

  return (
    <>
      <SplitterLayout
        percentage={false}
        primaryIndex={0}
        primaryMinSize={70}
        secondaryInitialSize={window.innerWidth - 70 - 4}
        secondaryMinSize={window.innerWidth - 70 - 4}
      >
        <div>
          <div className="container-fluid gx-0 text-center w-full h-screen">
            <div className="row w-full h-screen gx-0">
              <div
                className="col py-3 main-left-tab"
                style={{ flex: "0 0 70px", overflow: "hidden" }}
              >
                <div className="row align-items-start">
                  <div className="col">
                    <CNavLink href={void 0}>
                      {/* <CAvatar color="primary" textColor="white" shape="rounded"> */}
                      <FictionalLogos
                        className="icon icon-lg"
                        style={{ height: "25px" }}
                      />
                      {/* </CAvatar> */}
                    </CNavLink>
                  </div>
                </div>
                <div className="row align-items-start">
                  <div className="col">
                    <CNavLink href={void 0}>
                      <CAvatar
                        color="primary"
                        textColor="white"
                        shape="rounded"
                      >
                        <CIcon icon={cilHome} size="lg" />
                      </CAvatar>
                    </CNavLink>
                  </div>
                </div>
                <div className="row align-items-start">
                  <div className="col">
                    <CNavLink href={void 0}>
                      {/* <CAvatar color="primary" textColor="white" shape="rounded"> */}
                      <CIcon icon={cilGraph} size="lg" />
                      {/* </CAvatar> */}
                    </CNavLink>
                  </div>
                </div>
                <div className="row align-items-start">
                  <div className="col">
                    <CNavLink href={void 0}>
                      {/* <CAvatar color="primary" textColor="white" shape="rounded"> */}
                      <CIcon icon={cilGroup} size="lg" />
                      {/* </CAvatar> */}
                    </CNavLink>
                  </div>
                </div>
                <div className="row align-items-start">
                  <div className="col">
                    <CNavLink
                      onClick={() => {
                        signOut();
                        navigate("/login");
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {/* <CAvatar color="primary" textColor="white" shape="rounded"> */}
                      <CIcon icon={cilAccountLogout} size="lg" />
                      {/* </CAvatar> */}
                    </CNavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <SplitterLayout
            percentage={false}
            primaryIndex={0}
            primaryMinSize={200}
            secondaryInitialSize={window.innerWidth - 270 - 4}
          >
            <div>
              <HomeLeftPannel
                handleGoogleFilePicker={handleGoogleFilePicker}
                oneDriverChooseBtn={oneDriverChooseBtn}
                setDriveType={setDriveType}
                setUserFileInfo={setUserFileInfo}
              />
            </div>
            <div>
              <div className="container-fluid text-center w-full h-screen">
                <div className="row w-full h-screen gx-0">
                  <div className="col position-relative py-3">
                    <div className="row align-items-start">
                      <div className="col">
                        <CHeader position="sticky" className="mb-4">
                          <CContainer fluid className="justify-content-end">
                            <CHeaderNav>
                              <CNavItem className="relative">
                                {/* it will have the manage billings link for redirect the user to our customer portal */}
                                <CNavLink href={void 0}>
                                  <CIcon
                                    icon={cilSettings}
                                    size="lg"
                                    className="cursor-pointer"
                                    onClick={() =>
                                      setOpenSettings(!openSettings)
                                    }
                                  />
                                </CNavLink>

                                {openSettings ? (
                                  <div
                                    style={{
                                      boxShadow: "0 .125px 2px rgba(0,0,0,0.6)",
                                    }}
                                    className="bg-white w-[200px] h-auto rounded-md absolute right-2 p-2 text-md flex flex-col items-start"
                                  >
                                    {isPro && (
                                      <div
                                        className="w-full flex items-center p-2 gap-x-2 cursor-pointer rounded-sm hover:bg-black/10"
                                        onClick={handleBillings}
                                      >
                                        <CIcon icon={cilDollar} size="lg" />
                                        <span> Manage Billings</span>
                                      </div>
                                    )}
                                  </div>
                                ) : null}
                              </CNavItem>
                              <CNavItem>
                                <CNavLink href={void 0}>
                                  <CIcon icon={cilBell} size="lg" />
                                </CNavLink>
                              </CNavItem>
                            </CHeaderNav>
                            <CHeaderNav>
                              <UserButton afterSignOutUrl="/login" />
                            </CHeaderNav>
                          </CContainer>
                        </CHeader>
                      </div>
                    </div>
                    <div
                      className="row"
                      style={{ height: "calc(100% - 330px)" }}
                    >
                      <div
                        className="col text-right"
                        style={{
                          flex: "0 0 100px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <RobotSvg />
                      </div>
                      <div
                        className="col border rounded shadow p-3 position-relative"
                        style={{
                          flex: "0 0 calc(100% - 100px)",
                          height: "100%",
                          overflowY: "auto",
                        }}
                        ref={scrollableDivRef}
                      >
                        <Conversation
                          isThinking={isThinking}
                          onIndexing={onIndexing}
                          conversation={conversation}
                          firstMessage={prompt}
                        />
                      </div>
                    </div>
                    <div className="container position-absolute bottom-0 start-50 translate-middle-x border-top w-100 pb-3">
                      {chatReady && (
                        <>
                          <div className="row align-items-start">
                            <div className="col text-left ps-1 subtitle-font">
                              Suggestions
                            </div>
                          </div>
                          <div className="row align-items-start mt-2">
                            <Suggestions
                              sendCustomiseMessage={sendCustomiseMessage}
                              setPrompt={setPrompt}
                            />
                          </div>
                        </>
                      )}
                      <div className="row align-items-start mt-3">
                        <div className="col">
                          <div className="input-group">
                            <CFormInput
                              className="mb-3 prompt"
                              value={prompt}
                              onChange={(e) => setPrompt(e.target.value)}
                              type="text"
                              placeholder="Ask something"
                              aria-label="default input example"
                            />
                            <div className="input-group-append">
                              <button
                                className="btn btn-secondary"
                                type="button"
                              >
                                <i className="fa fa-paperclip"></i>
                              </button>
                              <button
                                className="btn btn-secondary"
                                type="button"
                                onClick={sendMessage}
                                disabled={!chatReady}
                              >
                                <i className="fa fa-paper-plane"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row align-items-start mb-2">
                        <div className="col text-left ps-1 subtitle-font">
                          Output Files
                        </div>
                      </div>
                      <div className="row align-items-start normal-font">
                        <CToast
                          autohide={false}
                          visible={true}
                          className="align-items-center rounded-pill ms-1 me-1"
                          style={{ width: "300px" }}
                        >
                          <div className="d-flex">
                            <CToastBody>
                              <span className="fa fa-file-pdf-o me-1"></span>
                              08/23 financial report
                            </CToastBody>
                            <CToastClose className="me-2 m-auto fa fa-times" />
                          </div>
                        </CToast>
                        <CToast
                          autohide={false}
                          visible={true}
                          className="align-items-center rounded-pill ms-1 me-1"
                          style={{ width: "200px" }}
                        >
                          <div className="d-flex">
                            <CToastBody>
                              <span className="fa fa-file-word-o me-1"></span>
                              revious report
                            </CToastBody>
                            <CToastClose className="me-2 m-auto fa fa-times" />
                          </div>
                        </CToast>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SplitterLayout>
        </div>
      </SplitterLayout>
    </>
  );
}
