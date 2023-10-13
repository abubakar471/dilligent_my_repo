export const getEmailFromOneDrive = async (accessToken) => {
  console.log("getEmailFromOneDrive =>", accessToken)
  let resp = await fetch(`https://graph.microsoft.com/v1.0/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        console.log("getEmailFromOneDrive Data =>", data.mail)
        return data.mail;
      }
    })
    .catch((error) => {
      console.error("Error fetching file information:", error);
    });

  return resp;
};
