// tslint:disable-next-line:no-implicit-dependencies
import cognito from "amazon-cognito-identity-js-node";
// tslint:disable-next-line:no-implicit-dependencies
import AWS from "aws-sdk";

AWS.CognitoIdentityServiceProvider.AuthenticationDetails = cognito.AuthenticationDetails;
AWS.CognitoIdentityServiceProvider.CognitoUserPool = cognito.CognitoUserPool;
AWS.CognitoIdentityServiceProvider.CognitoUser = cognito.CognitoUser;

export const getAuthToken = async (userPoolId, clientId, username, password) => {
  const userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool({
    ClientId: clientId,
    UserPoolId: userPoolId,
  });

  const user = new AWS.CognitoIdentityServiceProvider.CognitoUser({
    Pool: userPool,
    Username: username,
  });

  const authenticationDetails = new AWS.CognitoIdentityServiceProvider.AuthenticationDetails({
    Password: password,
    Username: username,
  });

  return new Promise((resolve, reject) => {
    const responseCallbacks = {
      onFailure: (err) => {
        reject(err);
      },
      onSuccess: (result) => {
        resolve(result.accessToken.jwtToken);
      },
    };

    user.authenticateUser(authenticationDetails, responseCallbacks);
  });
};
