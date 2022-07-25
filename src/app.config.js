export default defineAppConfig({
  "lazyCodeLoading": "requiredComponents",
  pages: [
    'pages/main/index',
    'pages/family_tree/index',
    'pages/my/index',
    'pages/notice/index',
    'pages/notice/info',
    'pages/pinfo/index',
    'pages/article/detail/index',
    'pages/article/index',
    'pages/people_list/index',
    'pages/auth/main/index',
    'pages/auth/company/index',
    'pages/auth/art/index',
    'pages/auth/people/index',
    'pages/my/auth_info/index',
    'pages/auth_info/index',
    'pages/agreement/index',
    'pages/notification/index'
  ],
  "subPackages": [
    {
      "root": "common",
      "pages": [
        "pages/single_page/index"
      ]
    },
    {
      "root": "shoppingmall",
      "pages": [
        "goodList/index"
      ]
    }
  ],
  tabBar: {
    list: [{
      'iconPath': 'resource/main.png',
      'selectedIconPath': 'resource/main_on.png',
      pagePath: 'pages/main/index',
      text: '首页'
    }, {
      'iconPath': 'resource/gene.png',
      'selectedIconPath': 'resource/gene_on.png',
      pagePath: 'pages/family_tree/index',
      text: '族谱'
    },
    {
      'iconPath': 'resource/my.png',
      'selectedIconPath': 'resource/my_on.png',
      pagePath: 'pages/my/index',
      text: '我的'
    }
    ],
    'color': '#B7B7B6',
    'selectedColor': '#9D0202',
    'backgroundColor': '#fff',
    'borderStyle': 'white'
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
