// import { Application } from 'egg';
import { Document, Model, model, Schema } from 'mongoose';
import * as moment from 'moment';

export interface IGroup {
  pk: string,
  name: string,
  resources: string[],
  description: string,
  enable: number,
  ct: number
}

export interface IGroupModel extends IGroup, Document {
  /**可以自定义方法 */
  /**
   * 加密用户密码
   */

}

// 定义Schema实例
export const groupSchema: Schema = new Schema({
  pk: { type: String },//资源组唯一id
  name: { type: String },//资源组名称
  resources: { type: Array },//资源id数组, 对应cms_resource 表的id
  description: { type: String },//描述文件
  enable: { type: Number },//	type===0时存在,是否展示菜单栏,1展示,0不展示

  ct: { type: Number, default: moment().second() }
});

groupSchema.index({ pk: 1 }, { unique: true });

export default (): Model<IGroupModel> => {

  return model<IGroupModel>('Group', groupSchema);
}





