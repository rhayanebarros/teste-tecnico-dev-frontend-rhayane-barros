module.exports = {
  pwa: {
    themeColor: '#f2f2f2'
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/style/_variables.scss"; @import "@/assets/style/_mixins.scss";`
      }
    }
  }
};
