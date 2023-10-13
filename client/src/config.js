let isDevelopment = process.env.NODE_ENV === 'development';

const redirectURI = isDevelopment
  ? 'http://localhost:3000'
  : process.env.REACT_APP_G_REDIRECT_URI;

const apiURL = isDevelopment
  ? 'http://localhost:8000'
  : process.env.REACT_APP_SERVER_URL;
const nodeApi = isDevelopment ? "http://localhost:8000" : process.env.REACT_APP_NODE_API

export const CONFIG = {
  apiURL: apiURL,
  nodeApi : nodeApi,
  REACT_APP_CLERK_PUBLISHABLE_KEY:
    'pk_test_ZGVjaWRpbmctamF3ZmlzaC02Ni5jbGVyay5hY2NvdW50cy5kZXYk',
  REACT_APP_CLERK__SIGN_IN_URL: '/login',
  REACT_APP_CLERK_SIGN_UP_URL: '/register',
  REACT_APP_CLERK_AFTER_SIGN_IN_URL: '/dashboard',
  REACT_APP_CLERK_FTER_SIGN_UP_URL: '/dashboard',
  GOOGLE_OAUTH_REDIRECT_LINK: `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirectURI}&prompt=consent&response_type=code&client_id=911440963199-s9l35r1g29r6sb1081ijagqsngrvmu0u.apps.googleusercontent.com&scope=openid+https://www.googleapis.com/auth/drive+https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/drive.file+https://www.googleapis.com/auth/drive.metadata+https://www.googleapis.com/auth/drive.metadata.readonly+https://www.googleapis.com/auth/drive.photos.readonly+https://www.googleapis.com/auth/drive.readonly&access_type=offline`,
  OUTLOOK_OAUTH_REDIRECT_LINK: `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=f0081d4d-0c9e-4e40-9bf8-89b57b1c6e54&response_type=code&redirect_uri=${redirectURI}/&response_mode=query&scope=offline_access%20email%20Files.Read.All%20openid%20profile%20User.Read.All%20Notes.Read.All%20SharePointTenantSettings.Read.All%20ShortNotes.Read%20Files.Read%20Files.ReadWrite.All&state=12345`,
  G_DRIVE_TOKEN: 'G_DRIVE_TOKEN',
};
