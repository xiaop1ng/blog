module.exports = {
    theme: 'reco',
    themeConfig: {
        // 博客设置
        blogConfig: {
            category: {
                location: 2, // 在导航栏菜单中所占的位置，默认2
                text: 'Category' // 默认文案 “分类”
            },
            tag: {
                location: 3, // 在导航栏菜单中所占的位置，默认3
                text: 'Tag' // 默认文案 “标签”
            },
            // author
            author: 'xiaoping'
        },
        nav: [
            { text: 'TimeLine', link: '/timeLine/', icon: 'reco-date' }
        ]
    },
    head: [
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ]
}