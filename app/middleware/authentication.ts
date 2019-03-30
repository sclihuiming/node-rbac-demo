import { Context } from 'egg';
import { includes } from 'lodash';


export default function authenticationMiddleware(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      let username: string = ctx.body.operationUserName;
      let path: string = ctx.path;
      var method: string = ctx.method.toLowerCase();

      if (includes(ctx.app.config.acl.whiteUrlList, path)) {//基础信息和白名单都是可以访问的
        await next();
      } else {
        let allow = await ctx.app.acl.isAllowed(username, path, method);
        if (allow) {
          await next();
        } else {
          ctx.body = {
            status: 1001,
            message: '没有权限'
          }
        }
      }
    } catch (e) {
      ctx.body = {
        status: 1001,
        message: '没有权限'
      }
    }
  };
}