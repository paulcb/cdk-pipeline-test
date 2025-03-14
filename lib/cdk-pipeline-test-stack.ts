import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { AppStage } from './app-stage';

import { envTag } from './common/helpers';
import { LambdaStack } from './lambda-stack';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkPipelineTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkPipelineTestQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const pipeline = new CodePipeline(this, envTag(CodePipeline.name), {
      synth: new ShellStep(envTag(ShellStep.name), {
        input: CodePipelineSource.gitHub('paulcb/cdk-pipeline-test', 'main'),
        commands: [
          'cd website', 'npm ci', 'npm run build',
          'cd ../',
          'npm ci', 'npm run build', 'npx cdk synth']
      })
    });

    pipeline.addStage(new AppStage(this, envTag(AppStage.name)));
  }
}
