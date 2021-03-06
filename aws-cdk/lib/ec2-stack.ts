import * as cdk from '@aws-cdk/core';
// npm install --save @aws-cdk/aws-ec2
import ec2 = require('@aws-cdk/aws-ec2/lib');
// npm install --save cdk-ec2-key-pair
import { KeyPair } from 'cdk-ec2-key-pair';

export class AwsCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // TODO: 許可するcidrIpを「this.node.tryGetContext('cidr_ip')」と「--context」で設定
    const sshAllowCidrIp = "XXX.XXX.XXX.XXX/32" // 
    /*
    ■デプロイ/SSH接続手順
    [1]：aws-cdk直下に移動
    [2]：npm run build
    [3]：cdk deploy
    [4]：aws secretsmanager get-secret-value --secret-id ec2-private-key/next-ts-sample-app-KeyPair --query SecretString --output text > next-ts-sample-app-key-pair.pem
    [5]：cdk deploy完了時に表示されるElastic IP、秘密鍵、ec2-userでSSHログイン
    */

    // VPCの作成
    // https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-ec2.Vpc.html
    const vpc = new ec2.Vpc(this, "next-ts-sample-app-VPC", {
      cidr: "10.0.0.0/16",
      defaultInstanceTenancy: ec2.DefaultInstanceTenancy.DEFAULT,
      enableDnsSupport: true,
      enableDnsHostnames: true,
      // 空を指定しないといくつかサブネットが作られてしまう
      subnetConfiguration: []
    })
  
    // サブネットの作成
    // https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-ec2.Subnet.html
    const subnet = new ec2.Subnet(this, "next-ts-sample-app-Subnet",{
      availabilityZone: "ap-northeast-1a",
      vpcId: vpc.vpcId,
      // 他のサブネットと被らない値
      cidrBlock: "10.0.255.0/24",
      mapPublicIpOnLaunch: true
    });

    // セキュリティグループの作成
    // https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-ec2.SecurityGroup.html
    const securityGroup = new ec2.SecurityGroup(this, 'next-ts-sample-app-SecurityGroup', {
      vpc
    });
    securityGroup.addEgressRule(ec2.Peer.anyIpv4(), ec2.Port.allTraffic());
    securityGroup.addIngressRule(ec2.Peer.ipv4(sshAllowCidrIp), ec2.Port.tcp(22));

    // インターネットゲートウェイの作成・VPCとアタッチ
    const internetGateway = new ec2.CfnInternetGateway(this, "next-ts-sample-app-InternetGateway", {
    })
    new ec2.CfnVPCGatewayAttachment(this, "next-ts-sample-app-VPCGatewayAttachment", {
      vpcId: vpc.vpcId,
      internetGatewayId: internetGateway.ref
    })

    // ルートテーブルの作成
    subnet.addRoute("next-ts-sample-app-RouteTable", {
      routerType: ec2.RouterType.GATEWAY,
      routerId: internetGateway.ref
    })
    
    // キーペアの作成
    // CDK SSM Document：https://awscdk.io/packages/cdk-ec2-key-pair@1.1.0/#/
    const key = new KeyPair(this, 'next-ts-sample-app-KeyPair', {
      name: 'next-ts-sample-app-KeyPair',
      description: 'KeyPair generated by AWS CDK.',
    });

    // EC2インスタンスの作成
    // https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-ec2.CfnInstance.html
    const ec2Instance = new ec2.CfnInstance(this, 'next-ts-sample-app-EC2', {
      imageId: new ec2.AmazonLinuxImage().getImage(this).imageId,
      instanceType: new ec2.InstanceType('t2.micro').toString(),
      networkInterfaces: [{
        associatePublicIpAddress: true,
        deviceIndex: '0',
        groupSet: [securityGroup.securityGroupId],
        subnetId: subnet.subnetId // vpc.publicSubnets[0].subnetId
      }],
      keyName: key.name // this.node.tryGetContext('key_pair')
    })

    // Elastic IPの作成・割り当て
    // https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-ec2.CfnEIP.html
    const elasticIp = new ec2.CfnEIP(this, 'next-ts-sample-app-elastic-ip', {
      instanceId: ec2Instance.ref
    })

    new cdk.CfnOutput(this, 'Id', { value: ec2Instance.ref });
    new cdk.CfnOutput(this, 'elasticIp', { value: elasticIp.ref });
  }
}
