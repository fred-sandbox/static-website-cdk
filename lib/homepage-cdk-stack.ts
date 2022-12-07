import {aws_s3_deployment, Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';

export class HomepageCdkStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const webSiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
            bucketName: 'homepage-cdk-bucket',
            publicReadAccess: true,
            websiteIndexDocument: 'index.html'
        });

        new s3deploy.BucketDeployment(this, 'BucketDeployment', {
            sources: [s3deploy.Source.asset('./website/')],
            destinationBucket: webSiteBucket
        })
    }
}
