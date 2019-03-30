// import { Application } from 'egg';
import { Document, Model, model, Schema } from 'mongoose';
import * as moment from 'moment';

export interface IResource {
  pk: string,
  label: string,
  type: number,
  api: string,
  parent_id?: string,
  name?: string,
  router_path?: string,
  component_path?: string,
  description: string,
  sort_id: number,
  enable: number,
  icon: string,
  ct: number
}

export interface IResourceModel extends IResource, Document {
  /**可以自定义方法 */
  /**
   * 加密用户密码
   */
  // action(): void;
}

// 定义Schema实例
export const resourceSchema: Schema = new Schema({
  pk: { type: String },//资源唯一id
  label: { type: String },//1.菜单名称 2.功能名称
  type: { type: Number },//类型, 0:菜单 1:页面功能(api 路由)
  api: { type: String },//api请求地址, 当type===1时,此字段存在
  parent_id: { type: String },//父菜单的id, type===0并且该字段为0或null时,为顶级菜单
  name: { type: String },//vue路由name, type===0&&parent_id 存在
  router_path: { type: String },//前端路由的router
  component_path: { type: String },//前端路由的页面地址
  description: { type: String },//描述文件
  sort_id: { type: Number },//菜单之间的排序
  enable: { type: Number },//	type===0时存在,是否展示菜单栏,1展示,0不展示
  icon: { type: String },//菜单的图标,顶级菜单存在此字段

  ct: { type: Number, default: moment().second() }
});

resourceSchema.index({ pk: 1 }, { unique: true });

export default (): Model<IResourceModel> => {

  return model<IResourceModel>('Resource', resourceSchema);
}





