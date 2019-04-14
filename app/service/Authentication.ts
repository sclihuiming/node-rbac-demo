import { Service } from 'egg';
import { map, keys, size } from 'lodash';

/**
 * Authentication Service
 */
export default class Authentication extends Service {

  /**
   * 初始化权限，根据本地设计的权限管理表等，将权限鉴权信息加载出来。
   * 按需使用，这个方法不是必要的（适用于手动修改数据库的权限管理）
   */
  public async initAcl() {
    await this.removeResource();
    await this.addAcl();
    await this.addUserRoles();
  }

  /**
   * 删除指定的或者所有的资源
   * @param apis 资源信息
   */
  public async removeResource(apis?: string[]) {
    // const { ctx } = this;
    let removeApis: string[];
    if (!apis) {
      let apiInfos = await this.app.model.Resource.find({ type: 1 }, { _id: 0, api: 1 }).lean();
      removeApis = map(apiInfos, 'api') || [];
    } else {
      removeApis = apis;
    }
    for (let i = 0, k = removeApis.length; i < k; i++) {
      let api = removeApis[i];
      await this.ctx.app.acl.removeResource(api);
    }
  }

  /**
   * 增加权限资源到acl
   */
  public async addAcl() {
    let permissions: any[] = await this.getPermissions();
    for (let i = 0, k = permissions.length; i < k; i++) {
      let permission = permissions[i];
      await this.removeAllow(permission.role);
      await this.addAllow(permission.role, permission.resources, permission.permissions);
    }
  }

  /**
   * 根据数据库信息增加角色授权信息
   * @param role 角色信息
   * @param resources  资源信息
   * @param permissions 方法
   */
  public async addAllow(role: string, resources: string[], permissions: string[]) {
    // throw new Error("Method not implemented.");
    await this.app.acl.allow(role, resources, permissions);
  }

  /**
   * 移除某个角色的所有授权
   * @param role  角色信息
   */
  public async removeAllow(role: string, resources?: string[], permissions?: string[]) {
    // throw new Error("Method not implemented.");
    permissions = permissions || ['*'];
    if (!resources) {
      resources = await this.serachRoleResource(role);
    }
    await this.app.acl.removeAllow(role, resources, permissions)
  }

  /**
  * 查询角色的权限授权信息
  * @param role 角色
  */
  public async serachRoleResource(role: string): Promise<string[]> {
    // throw new Error("Method not implemented.");
    let resourceInfos = await this.app.acl.whatResources(role);
    return keys(resourceInfos);
  }


  /**
   * 从数据库获取资源权限信息
   */
  public async getPermissions(): Promise<any[]> {
    let permissions: any[] = [];
    let groupInfos = await this.app.model.Group.find({}, { _id: 0, id: 1, name: 1, resources: 1 }).lean();
    for (let i = 0, k = groupInfos.length; i < k; i++) {
      let groupInfo = groupInfos[i];
      let role = groupInfo.id;
      let resources: string[] = [];
      for (let j = 0, n = groupInfo.resources; j < n; j++) {
        let resourceId = groupInfo.resources[j];
        let resourceInfo = await this.app.model.Resource.findOne({ id: resourceId }, { _id: 0, id: 1, label: 1, api: 1 }).lean();
        if (resourceInfo && resourceInfo.api) {
          resources.push(resourceInfo.api);
        }
      }
      permissions.push({
        role: role,
        resources: resources,
        permissions: ['*']//默认所有的方法都适用（get/post/put等)
      })
    }
    return permissions;
  }

  /**
   * 增加用户到角色组（为用户分配角色信息）
   */
  public async addUserRoles() {
    let userInfos = await this.app.model.User.find({}, { _id: 0, username: 1, email: 1, group: 1 }).lean();//这里的username作为系统唯一
    for (let i = 0, k = userInfos.length; i < k; i++) {
      let userInfo = userInfos[i];
      let username = userInfo.username;
      let roles = userInfo.group || ['guest'];//group里面的id代表角色,如果没有,就默认一个guest
      await this.removeUserRole(username);
      await this.addUserRole(username, roles);
    }
  }
  /**
   * 将该用户的所有角色移除授权
   * @param username 用户名
   */
  public async removeUserRole(username: any, roles?: string[]) {
    if (!(roles && size(roles) > 0)) {
      roles = await this.searchUserRole(username);
    }
    await this.app.acl.removeUserRoles(username, roles)
  }

  /**
   * 将该用户绑定指定的角色信息
   * @param username 用户名
   * @param roles 角色信息
   */
  public async addUserRole(username: any, roles: any) {
    roles = roles || ['guest'];
    await this.app.acl.addUserRoles(username, roles)
  }

  /**
   * 寻找用户的角色信息
   * @param username 用户名称
   */
  async searchUserRole(username: any): Promise<string[]> {
    return await this.app.acl.userRoles(username)
  }


}