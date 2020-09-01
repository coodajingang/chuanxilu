module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  outputDir: '../server/public/',
  // webpack-dev-server 相关配置
  devServer: {
    // 通知dev server在服务器启动后打开浏览器。将其设置为true以打开默认浏览器。
    // Darwin是由苹果电脑于2000年所释出的一个开放原始码操作系统。
    // process.platform：列举node运行的操作系统的环境，只会显示内核相关的信息，
    // 如：linux2， darwin，而不是“Redhat ES3” ，“Windows 7”，“OSX 10.7”等；
    // open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8888,
    https: false,
    hotOnly: false,
    // 设置代理
    proxy: {
      '/api': {
        // 目标 API 地址
        target: 'http://localhost:3000', // 后端服务地址，注意端口号后面没有/
        // 如果要代理 websockets
        secure: false,// 如果是https接口，需要配置这个参
        ws: true,
        // 将主机标头的原点更改为目标URL
        // changeOrigin: false, 
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配
        pathRewrite: {
          '^/api': '/'    // 将api重定向到/
        }
      }
    }
  }
}