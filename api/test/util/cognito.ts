import * as AWS from 'aws-sdk';
import { getAuthToken } from './token';

const cognitoIdp: AWS.CognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
const ssm: AWS.SSM = new AWS.SSM();

export class Cognito {
  private isUserCreated: boolean = false;
  private readonly password: string = 'TestTest1_';
  private readonly username: string = `integration-test-${Date.now()}@test.com`;
  private userPoolId: string | undefined;

  public destroy = async (): Promise<void> => {
    if (this.isUserCreated && this.userPoolId) {
      await cognitoIdp.adminDeleteUser({
        UserPoolId: this.userPoolId,
        Username: this.username
      }).promise();
    }
  }

  public getUserToken = async (): Promise<string> => {
    this.userPoolId = (await ssm.getParameter({
      Name: '/cognito/user-pool/id'
    }).promise()).Parameter?.Value as string;

    const clientId: string = (await ssm.getParameter({
      Name: '/cognito/client/id'
    }).promise()).Parameter?.Value as string;

    await cognitoIdp.adminCreateUser({
      TemporaryPassword: this.password,
      UserPoolId: this.userPoolId,
      Username: this.username
    }).promise();

    this.isUserCreated = true;

    await cognitoIdp.adminSetUserPassword({
      Password: this.password,
      Permanent: true,
      UserPoolId: this.userPoolId,
      Username: this.username
    }).promise();

    return getAuthToken(this.userPoolId, clientId, this.username, this.password);
  }
}
