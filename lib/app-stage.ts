import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { LambdaStack } from './lambda-stack';
import { envTag } from './common/helpers';

export class AppStage extends cdk.Stage {

  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    const lambdaStack = new LambdaStack(this, envTag(LambdaStack.name));
  }
}
