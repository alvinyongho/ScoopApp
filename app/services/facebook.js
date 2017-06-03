import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';

const facebookParams = 'id,name,email,picture.width(100).height(100)';

export function facebookLoginAPI(){
  return new Promise((resolve, reject) => {
    LoginManager.logInWithReadPermissions(['public_profile', 'user_likes', 'user_photos'])
    .then((result) => {
        console.log('LOGGING IN WITH PERMISSIONS')
        console.log(result)

        if (result.isCancelled) {
          throw new Error('Login was cancelled');
        }

        if (result.deniedPermissions) {
          throw new Error('We need the requested permissions');
        }
        return AccessToken.getCurrentAccessToken();
    })
    .then((result) => {
      resolve(result);  // Resolve the access token
    })
    .catch((error) => {
      reject(error);
    });
  });
}

export function facebookLogoutAPI(){
  if(AccessToken.getCurrentAccessToken() != null){
    LoginManager.logOut();
  }
}



export function callFacebookGraphAPIForUserAlbums(userId){
  return new Promise((resolve, reject) => {
    const albumsRequestCallback = (error, profileInfo) => {
      if (error) reject(error);

      // console.log(profileInfo)
      resolve(profileInfo);
    };

    const albumsRequest =
      new GraphRequest(
        `/${userId}/albums`,
        null,
        albumsRequestCallback
      );

    new GraphRequestManager().addRequest(albumsRequest).start();
  });


}




export function getFacebookInfoAPI() {
  return new Promise((resolve, reject) => {
    const profileInfoCallback = (error, profileInfo) => {
      if (error) reject(error);

      resolve(profileInfo);
    };

    const profileInfoRequest =
      new GraphRequest(
        '/me',
        {
          parameters: {
            fields: {
              string: facebookParams,
            },
          },
        },
        profileInfoCallback
      );

    new GraphRequestManager().addRequest(profileInfoRequest).start();
  });
}
