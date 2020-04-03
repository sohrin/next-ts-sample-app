import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

/**
 *データ構造の定義
 *
 * @export
 * @class TestModel01
 */
@Entity()
// MEMO: テーブル名はクラス名のロワースネークケースとなる。指定も可能。
export default class TestModel01 {
  // 自動番号
  @PrimaryGeneratedColumn()
  id!: number;
  
  // TODO: Column引数未指定だとエラーが出た
  @Column('text', {nullable:true}) //一般データ
  name?: string;

  // TODO: Column第一引数'timestamp'未指定だとエラーが出た
  @Column('timestamp',{
    default: () => "CURRENT_TIMESTAMP"
  }) // default値の指定:()=>"命令" でCURRENT_TIMESTAMPが文字列にならないように設定
  date!: Date;
}