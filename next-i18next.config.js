module.exports = {
    i18n: {
      // all the locales supported in the application
      locales: ['es', 'en'], 
      // the default locale to be used when visiting
      // a non-localized route (e.g. `/about`)   
      defaultLocale: 'es',

      reloadOnPrerender: process.env.NODE_ENV !== 'production',
    },
  }