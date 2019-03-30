import { Application } from 'egg';
import { Document, Model, model, Schema } from 'mongoose';
import * as moment from 'moment';

export interface IUser {
  pk: string,
  username: string,
  display_name?: string,
  password: string,
  email?: string,
  salt: string,
  group: string[],//权限组
  email_login: number,
  status: number,//账户状态
  ct: number
}

export interface IUserModel extends IUser, Document {
  /**可以自定义方法 */
  /**
   * 加密用户密码
   */
  setPassword(): void;
}

// 定义Schema实例
export const userSchema: Schema = new Schema({
  pk: { type: String },
  username: { type: String },
  display_name: { type: String },//显示名称
  password: { type: String },
  email: { type: String },
  salt: { type: String },
  group: { type: Array },//权限组
  email_login: { type: Number, default: 0 },//使用邮箱登陆,默认是关
  create_time: { type: Number, default: moment().second() }
});

userSchema.index({ username: 1 }, { unique: true });

export default (app: Application): Model<IUserModel> => {
  userSchema.methods.setPassword = function () {
    this.password = app.config.mongoose.url;
  };
  return model<IUserModel>('User', userSchema);
}





