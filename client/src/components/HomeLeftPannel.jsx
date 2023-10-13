/* eslint-disable react/prop-types */
import React from "react";
import { CFormCheck, CButton, CFormInput } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { ReactOneDriveFilePicker } from "react-onedrive-filepicker";

import { ReactComponent as TxtSvg } from "../assets/text-icon.svg";
import logoImg from "../assets/images/logo.png";
import { CONFIG } from "../config";

const HomeLeftPannel = ({
  handleGoogleFilePicker,
  oneDriverChooseBtn,
  setDriveType,
  setUserFileInfo,
}) => {
  const googleAccessToken = useSelector((state) => state.googleAccessToken);
  const outlookAccessToken = useSelector((state) => state.outlookAccessToken);

  let windowObjectReference = null;
  let previousUrl = null;

  React.useEffect(() => {
    oneDriverChooseBtn.current.parentElement.addEventListener(
      "click",
      (event) => {
        setDriveType("ONE_DRIVE");

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        if (!code) {
          console.log("Must be get accessToken");
          event.stopPropagation();
          window.location.href = CONFIG.OUTLOOK_OAUTH_REDIRECT_LINK;
        }
      },
    );
  }, []);

  const selectGoogleDocument = async () => {
    if (!googleAccessToken) {
      console.log(CONFIG.GOOGLE_OAUTH_REDIRECT_LINK);
      window.location.href = CONFIG.GOOGLE_OAUTH_REDIRECT_LINK;
      return;
    }

    handleGoogleFilePicker();
  };

  const getEmailFromOneDrive = async (accessToken) => {
    console.log("getEmailFromOneDrive =>", accessToken);
    let resp = await fetch(`https://graph.microsoft.com/v1.0/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log("getEmailFromOneDrive Data =>", data.mail);
          return data.mail;
        }
      })
      .catch((error) => {
        console.error("Error fetching file information:", error);
      });

    return resp;
  };

  return (
    <div className="container-fluid text-center w-full h-screen">
      <div className="row w-full h-screen gx-0">
        <div
          className="col position-relative py-3"
          style={{ flex: "0 0 200px" }}
        >
          <img src={logoImg}></img>
          <div
            className="container pt-3 px-0 left-menu-upper"
            style={{ height: "calc(100% - 350px)", overflowY: "clip" }}
          >
            <CButton
              className="w-100 mb-3 new-chat-btn"
              color="primary"
              variant="outline"
            >
              <span className="fa fa-plus-square-o me-3"></span>New Chat
            </CButton>
            <div className="form-group has-search">
              <span className="fa fa-search form-control-feedback"></span>
              <CFormInput
                className="mb-3 search"
                type="text"
                placeholder="Search"
                aria-label="default input example"
              />
            </div>
            <div className="row text-left">&nbsp;Today</div>

            <div className="row text-left bg-light rounded py-1 mb-1">
              <div className="col-1">
                <TxtSvg />
              </div>
              <div className="col">Generate financial...</div>
            </div>
            <div className="row text-left bg-light rounded py-1 mb-1">
              <div className="col-1">
                <TxtSvg />
              </div>
              <div className="col">Generate financial...</div>
            </div>

            <div className="row text-left mt-3">&nbsp;Previous</div>

            <div className="row text-left bg-light rounded py-1 mb-1">
              <div className="col-1">
                <TxtSvg />
              </div>
              <div className="col">Generate financial...</div>
            </div>
            <div className="row text-left bg-light rounded py-1 mb-1">
              <div className="col-1">
                <TxtSvg />
              </div>
              <div className="col">Generate financial...</div>
            </div>
            <div className="row text-left bg-light rounded py-1 mb-1">
              <div className="col-1">
                <TxtSvg />
              </div>
              <div className="col">Generate financial...</div>
            </div>
          </div>
          <div className="position-absolute bottom-0 start-50 translate-middle-x w-100 pb-3 border-top text-left left-under-menu">
            &nbsp;
            <span className="left-under-menu-title">My Data Platforms</span>
            <div className="container-fluid ps-2 mt-2">
              <span className="fa fa-database me-1"></span>
              <span className="left-menu-font">Use data source</span>
              <div className="row">
                <div className="col">
                  <ReactOneDriveFilePicker
                    clientID="f0081d4d-0c9e-4e40-9bf8-89b57b1c6e54"
                    action="share"
                    multiSelect={true}
                    advanced={{
                      redirectUri: "http://localhost:3000/",
                      accessToken: outlookAccessToken,
                    }}
                    onSuccess={async (result) => {
                      console.log(JSON.stringify(result));
                      console.log("onSuccess");
                      console.log("accessToken: ", result.accessToken);
                      const email_id = await getEmailFromOneDrive(
                        result.accessToken,
                      );

                      const userFileInfo = {
                        driveType: "ONE_DRIVE",
                        driveId: result.value[0].parentReference.driveId,
                        email_id: email_id,
                        token: result.accessToken,
                        fileId: result.value[0].id,
                        file_name: result.value[0].name,
                        file_type: result.value[0].file.mimeType,
                      };

                      console.log(
                        "setUserFileInfo Updated!",
                        setUserFileInfo,
                        userFileInfo,
                      );

                      setUserFileInfo(userFileInfo);
                    }}
                    onCancel={(result) => {
                      //Omitted alert(JSON.stringify(result));
                    }}
                    onError={(result) => {
                      //Omitted alert(JSON.stringify(result));

                      console.error(result);
                    }}
                  >
                    <CButton
                      ref={oneDriverChooseBtn}
                      color="secondary"
                      className="btn btn-sm w-100"
                    >
                      Office 365
                    </CButton>
                  </ReactOneDriveFilePicker>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <CButton
                    color="secondary"
                    className="btn btn-sm w-100"
                    onClick={selectGoogleDocument}
                  >
                    Google Drive
                  </CButton>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <CButton color="secondary" className="btn btn-sm w-100">
                    Azure
                  </CButton>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <CButton color="secondary" className="btn btn-sm w-100">
                    LocalFiles
                  </CButton>
                </div>
              </div>
              <div className="row mt-2"></div>
              <span className="fa fa-clone me-1"></span>
              <span className="left-menu-font">3rd Party Integraions</span>
              <div className="row">
                <div className="col">
                  <CFormCheck label="Slack" />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <CFormCheck label="Teams" />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <CFormCheck label="Zoom" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLeftPannel;
