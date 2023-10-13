export const getGmailFromGoogleDrive = async (accessToken, fileId) => {
  console.log("getGmailFromGoogleDrive =>", accessToken)
  let resp = await fetch(`https://www.googleapis.com/drive/v2/files/${fileId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        return data.owners[0].emailAddress;
      }
    })
    .catch((error) => {
      console.error("Error fetching file information:", error);
    });

  return resp;
};
