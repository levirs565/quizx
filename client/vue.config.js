/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  devServer: {
    proxy: "http://localhost:3000"
  },

  transpileDependencies: [
    'vuetify'
  ]
}
