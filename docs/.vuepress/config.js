module.exports = {
    title: 'blog',
    description: '简超平的部落格',
    theme: '@vuepress/blog',
    themeConfig: {
        smoothScroll: true, // 页面滚动效果
        sidebar: 'auto', // 自动侧边栏
        sidebarDepth: 2,   // 设置嵌套的标题链接深度
        lastUpdated: 'Last Updated',   // 最后更新时间
        nav: [ // 导航栏
            {
                text: '编程',
                link: '/',
            },
            {
                text: '文集',
                link: '/post/',
            },
            {
                text: '标签',
                link: '/tag/',
            },
            {
                text: 'About',
                link: '/me',
            },
            {
                text: 'GitHub',
                link: 'https://github.com/xiaop1ng',
            }
        ],
        footer: { // 网站底部
            contact: [
                {
                    type: 'github',
                    link: 'https://github.com/xiaop1ng',
                }
            ],
            copyright: [
                {
                    text: 'Privacy Policy',
                    link: 'https://policies.google.com/privacy?hl=en-US',
                },
                {
                    text: 'Copyright xiaop1ng © 2015 - ' + new Date().getFullYear(),
                    link: '/',
                },
            ],
        }
    },
    head: [
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
    markdown: { // 为每个代码块显示行号
    	lineNumbers: true
  	},
    plugins: [
        [
            '@vuepress/blog',
            {
                directories: [ // 分类器
                    {
                        // 杂文
                        id: 'post',
                        dirname: '_posts',
                        path: '/post/',
                        itemPermalink: '/post/:year/:month/:day/:slug',
                    },
                    {
                        // 编程
                        id: 'programe',
                        dirname: '_programe',
                        path: '/',
                    },
                ],
                frontmatters: [ // 标签
                    {
                        // Unique ID of current classification
                        id: 'tag',
                        // Decide that the frontmatter keys will be grouped under this classification
                        keys: ['tag', 'tags'],
                        // Path of the `entry page` (or `list page`)
                        path: '/tag/',
                        // Layout of the `entry page`
                        layout: 'Tags',
                        // Layout of the `scope page`
                        scopeLayout: 'Tag'
                    },
                ],
            },
        ],
        '@vuepress/last-updated', 
        '@vuepress/back-to-top',
        '@vuepress/nprogress'
    ],

}