module.exports = {
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel:'stylesheet', href:'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/85/three.min.js' }
    ]
  },
  css: [
    { src: 'bulma', lang:'sass' },
    '~assets/styles/main.css'
  ],
  loading: false,
  env: {
    SYNTHLE_HOST: process.env.HOST || '0.0.0.0',
    SYNTHLE_PORT: process.env.PORT || 2222,
  },
  plugins: [
    { src: '~plugins/vue-touch', ssr: false },
    { src: '~plugins/synthle-socket', ssr: false }
  ]
}
