const oauthConfig = {
  'oauth_uri': 'https://github.com/login/oauth/authorize',
  'redirect_uri': 'http://biaochenxuying.cn/login',
  'client_id': '****',
  'client_secret': '****',
}

if (process.env.NODE_ENV === 'development') {
  oauthConfig.redirect_uri = "http://192.168.199.247:8000/oauthIndex"
  oauthConfig.client_id = "e02953453419c485ca9e"
  oauthConfig.client_secret = "779f0d30db25e8b7cc98691987a34cdda8b71bb3"
}

export default oauthConfig;