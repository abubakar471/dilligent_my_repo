import { CONFIG } from "../config";

export const serverAuthAPI = async (auth_url) => {
  try {
    let resp = await fetch(
      `${CONFIG.apiURL}/server_auth?auth_url=${auth_url}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      },
    ).then((response) => {
      console.log("resposne: j", response);
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    });
    console.log("resp123: ", resp);

    return {
      error: false,
      data: resp,
    };
  } catch (err) {
    console.log("server_auth error: ", err);
    return {
      error: true,
      data: [],
    };
  }
};

export const serverO365AuthAPI = async (auth_url) => {
  try {
    let resp = await fetch(
      `${CONFIG.apiURL}/ms_server_auth?auth_url=${auth_url}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      },
    ).then((response) => {
      console.log("resposne: j", response);
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    });
    console.log("resp123: ", resp);

    return {
      error: false,
      data: resp,
    };
  } catch (err) {
    console.log("server_auth error: ", err);
    return {
      error: true,
      data: [],
    };
  }
};

export const indexCreationAPI = async (
  driveType,
  driveId,
  email_id,
  fileId,
  file_name,
  file_type,
) => {
  try {
    let endpoint = "";
    if (driveType === "ONE_DRIVE") {
      endpoint = "ms_index_creation";
    } else {
      endpoint = "index_creation";
    }
    let resp = await fetch(
      `${CONFIG.apiURL}/${endpoint}?email_id=${email_id}&fileId=${fileId}&file_name=${file_name}&file_type=${file_type}&`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      },
    ).then((response) => {
      console.log("resposne: j", response);
      if (response.status !== 200) {
        throw new Error(response.body);
      }
      return response.json();
    });
    console.log("resp123: ", resp);

    return {
      error: false,
      data: resp,
    };
  } catch (err) {
    console.log("index_creation error: ", err);
    return {
      error: true,
      data: [],
    };
  }
};

export const userFirstInputAPI = async (accessToken, user_input) => {
  try {
    let resp = await fetch(
      `${CONFIG.apiURL}/user_first_input?user_input=${user_input}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      },
    ).then((response) => {
      console.log("resposne: j", response);
      if (response.status !== 200) {
        throw new Error();
      }
      return response.json();
    });

    return resp;
  } catch (err) {
    console.log("user_first_input error: ", err);
  }
};

export const genClarifiedAnswerAPI = async (
  accessToken,
  user_input_list,
  messages,
  gpt_questions,
  selected_files,
  email_id,
) => {
  try {
    let resp = await fetch(
      `${CONFIG.apiURL}/gen_clarified_answer?user_input_list=${JSON.stringify(
        user_input_list,
      )}&messages=${JSON.stringify(messages)}&gpt_questions=${JSON.stringify(
        gpt_questions,
      )}&selected_files=${JSON.stringify(selected_files)}&email_id=${email_id}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      },
    )
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error fetching file information:", error);
      });

    return resp;
  } catch (err) {
    console.log("gen_clarified_answer error: ", err);
  }
};

export const loginAPI = async (email, password) => {
  try {
    const requestOptions = {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    let resp = await fetch(`${CONFIG.apiURL}/login`, requestOptions).then(
      (response) => {
        console.log("resposne: j", response);
        if (response.status !== 200) {
          throw new Error();
        }
        return response.json();
      },
    );
    console.log("hello world: ", requestOptions, resp);

    return resp;
  } catch (err) {
    console.log("user_first_input error: ", err);
  }
};

export const createUserAPI = async (userData) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    let resp = await fetch(`${CONFIG.apiURL}/users/`, requestOptions).then(
      (response) => {
        console.log("response: j", response);
        if (response.status !== 200) {
          throw new Error();
        }
        return response.json();
      },
    );
    console.log("createUserAPI response: ", resp);

    return {
      error: false,
      data: resp,
    };
  } catch (err) {
    console.log("createUserAPI error: ", err);
    return {
      error: true,
      data: [],
    };
  }
};
