module.exports = {
  app: {
    port: 3000,
    static_folder: `${__dirname}/../src/public`,
    router: `${__dirname}/../src/routers/web`,
    view_folder: `${__dirname}/../src/apps/views`,
    view_engine: "ejs",
    session_key: "Nodejs_session",
  },
  mail: {
    host: "smtp.gmail.com",
    post: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "quynhcoi6802@gmail.com",
      pass: "lpdt iida depp fdes",
    },
  },
};
