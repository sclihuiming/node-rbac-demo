import { Context } from 'egg';
import { includes } from 'lodash';


export default function authenticationMiddleware(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      let username: string = ctx.request.body.operationUserName;
      let path: string = ctx.path;
      let method: string = ctx.method.toLowerCase();
      ctx.logger.error('method', method);
      if (method === 'get' || includes(ctx.app.config.acl.whiteUrlList, path)) {//白名单都是可以访问的，get请求可以通过
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
      ctx.logger.error('error', e);
      ctx.body = {
        status: 1001,
        message: '没有权限'
      }
    }
  };
}