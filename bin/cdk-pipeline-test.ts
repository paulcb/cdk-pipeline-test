#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkPipelineTestStack } from '../lib/cdk-pipeline-test-stack';
import { envTag } from '../lib/common/helpers';
import { AppStage } from '../lib/app-stage';

const app = new cdk.App();
console.log('CDK_APP_DEV', process.env.CDK_APP_DEV);

const isDev = process.env.CDK_APP_DEV;
if (!isDev) {
    new CdkPipelineTestStack(app, envTag(CdkPipelineTestStack.name));
} else {
    new AppStage(app, envTag(AppStage.name));
}
