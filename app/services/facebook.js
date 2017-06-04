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



export function getFBAlbumPicture(albumId){
  return new Promise((resolve, reject) => {
    const albumDetailsRequestCallback = (error, albumDetails) => {
      if (error) reject(error);

      // console.log(profileInfo)
      resolve(albumDetails);
    };

    const albumDetailsRequest =
      new GraphRequest(
        `/${albumId}/picture`,
        null,
        albumDetailsRequestCallback
      );

    new GraphRequestManager().addRequest(albumDetailsRequest).start();
  });
}


export function getFBAlbumPhotos(albumId){
  return new Promise((resolve, reject) => {
    const albumDetailsRequestCallback = (error, albumDetails) => {
      if (error) reject(error);

      // console.log(profileInfo)
      resolve(albumDetails);
    };

    const albumDetailsRequest =
      new GraphRequest(
        `/${albumId}/photos`,
        null,
        albumDetailsRequestCallback
      );

    new GraphRequestManager().addRequest(albumDetailsRequest).start();
  });
}



export function getPictureUrlByPictureId(pictureId){
  return new Promise((resolve, reject) => {
    const picturesCallback = (error, pictures) => {
      if (error) reject(error);
      //
      // console.log('@@@@@')
      // console.log(albumCover)
      // // console.log(profileInfo)
      resolve(pictures);
    };

    const pictureRequest =
      new GraphRequest(
        `/${pictureId}?fields=picture,height,images`,
        {},
        picturesCallback
      );

    new GraphRequestManager().addRequest(pictureRequest).start();
  });
}



// TODO: alter to take in single photo instead of all photos
export function getFBAlbumCover(albumId){
  return new Promise((resolve, reject) => {
    const albumCoverRequestCallback = (error, albumCover) => {
      if (error) reject(error);
      //
      // console.log('@@@@@')
      // console.log(albumCover)
      // // console.log(profileInfo)
      resolve(albumCover);
    };

    const albumCoverRequest =
      new GraphRequest(
        `/${albumId}/?fields=cover_photo`,
        {},
        albumCoverRequestCallback
      );

    new GraphRequestManager().addRequest(albumCoverRequest).start();
  });
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
