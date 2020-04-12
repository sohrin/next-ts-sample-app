import * as cdk from '@aws-cdk/core';
import ec2 = require("@aws-cdk/aws-ec2");
import ecs = require("@aws-cdk/aws-ecs");
import ecs_patterns = require("@aws-cdk/aws-ecs-patterns");

export class AwsCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ECSクラスタの作成
    const cluster = new ecs.Cluster(this, 'next-ts-sample-app-Cluster', {
      // 自前でVPCを作らずデフォルトに任せる
//      vpc,
      clusterName: "next-ts-sample-app-RouteTableCluster"
    });

    // Create a load-balanced Fargate service and make it public
    // https://docs.aws.amazon.com/cdk/latest/guide/ecs_example.html
    // ※以下は情報が少し古いがほとんど同じことをやってる。
    // https://dev.classmethod.jp/articles/aws-cdk-getting-ecs/
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargateService", {
      cluster: cluster, // Required
      cpu: 512, // Default is 256
      desiredCount: 6, // Default is 1
      // いったんDockerHubからイメージを取得
      taskImageOptions: { image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample') },
      memoryLimitMiB: 2048, // Default is 512
      publicLoadBalancer: true // Default is false
    });

  }
}
