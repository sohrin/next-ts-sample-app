import * as cdk from '@aws-cdk/core';
import ec2 = require("@aws-cdk/aws-ec2");
import ecs = require("@aws-cdk/aws-ecs");
import ecs_patterns = require("@aws-cdk/aws-ecs-patterns");
import rds = require("@aws-cdk/aws-rds");
// TODO: 使わなかったら後でnpm uninstall --saveする
import ecr = require("@aws-cdk/aws-ecr");

export class AwsCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // TODO: 外部注入値を「this.node.tryGetContext('key');」と「--context」で設定


    // VPCの作成
    // https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-ec2.Vpc.html
    const vpc = new ec2.Vpc(this, "next-ts-sample-app-VPC", {
      cidr: "10.0.0.0/16",
      defaultInstanceTenancy: ec2.DefaultInstanceTenancy.DEFAULT,
      enableDnsSupport: true,
      enableDnsHostnames: true,
      // 空を指定しないといくつかサブネットが作られてしまう
      subnetConfiguration: [
        // TODO: VPCでサブネットを作るように変えることで、アプリへのアクセスに影響がないか心配
        {
          name: 'next-ts-sample-app-Subnet-DBCluster',
          subnetType: ec2.SubnetType.PUBLIC // TODO: ゆくゆくはec2.SubnetType.ISOLATED
        }
      ]
    })
  
    // RDSの作成
    // TODO: パスワードは？
    // TODO: cdk destroyが失敗する件：https://dev.classmethod.jp/articles/aws-cdk-s3-delete-policy/
    const instance = new rds.DatabaseInstance(this, 'next-ts-sample-app-RDS', {
      engine: rds.DatabaseInstanceEngine.POSTGRES,
      instanceClass: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.MICRO),
      masterUsername: 'syscdk',
      vpc
    });
// MEMO: Auroraの場合のコード（成功済）
//     const db = new rds.DatabaseCluster(this, 'next-ts-sample-app-DBCluster', {
//       engine: rds.DatabaseClusterEngine.AURORA_POSTGRESQL,
//       engineVersion: '10.7',
//       instances: 1,
//       masterUser: {
//         username: 'appuser',
//       },
//       defaultDatabaseName: "appdb",
// //      port: dbPort,
//       instanceProps: {
//         instanceType: ec2.InstanceType.of(ec2.InstanceClass.R5, ec2.InstanceSize.LARGE),
//         vpc: vpc,
//         vpcSubnets: {
//           subnetType: ec2.SubnetType.PUBLIC // TODO: ゆくゆくはec2.SubnetType.ISOLATED
//         }
//       },
//       parameterGroup: new rds.ClusterParameterGroup(this, 'next-ts-sample-app-DBClusterPArameterGroup', {
//         family: 'aurora-postgresql10',
//         parameters: {
//           application_name: 'next-ts-sample-app',
//         }
//       }),
//       removalPolicy: cdk.RemovalPolicy.DESTROY // TODO: for test
//     })

//    new cdk.CfnOutput(this, 'Id', { value: ec2Instance.ref });
//    new cdk.CfnOutput(this, 'elasticIp', { value: elasticIp.ref });
  }
}
