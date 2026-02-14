module.exports = {
  title: '鸿驰祥瑞管理后台',

  /**
   * @type {boolean} true | false
   * @description 是否显示设置右侧面板
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description 是否需要标签页视图
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description 是否固定头部
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description 是否在侧边栏显示 logo
   */
  sidebarLogo: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description 需要显示错误日志组件。
   * 默认只在生产环境中使用
   * 如果您想在开发环境中也使用它，可以传递 ['production', 'development']
   */
  errorLog: 'production'
}
