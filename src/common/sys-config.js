const CONFIG = {
  development: {
    baseUrl: 'http://localhost:8500',
    logo: 'http://localhost:8080/logo.png',
    avatar: 'http://localhost:8080/header1.gif',
    emptyImg: 'http://localhost:8080/empty.png',
    qrCodeUrlPrefix: 'http://localhost:8080?target=',
  },
  production: {
    baseUrl: 'https://www.mushanyu.xyz:8500',
    logo: 'https://www.mushanyu.xyz/logo.png',
    avatar: 'https://www.mushanyu.xyz/header1.gif',
    emptyImg: 'https://www.mushanyu.xyz/empty.png',
    qrCodeUrlPrefix: 'https://www.mushanyu.xyz:8800?target=',
    roomExcelHref: 'https://mushanyu-file-save.oss-cn-beijing.aliyuncs.com/project/apply-room-record/%E6%88%BF%E9%97%B4%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx',
    userExcelHref: 'https://mushanyu-file-save.oss-cn-beijing.aliyuncs.com/project/apply-room-record/%E4%BA%BA%E5%91%98%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx'
  }
}

export default CONFIG[process.env.NODE_ENV];