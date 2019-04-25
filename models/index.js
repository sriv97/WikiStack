const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false
});

const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM("open", "closed")
  }
});



const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  //   unique: {
  //     args: true,
  //     msg: 'Email address already in use!'
  // }
      }

});

Page.belongsTo(User,{as:'author'});
User.hasMany(Page);


Page.beforeValidate((pageInstance) => {
  function generateSlug (title) {
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  }
  pageInstance.slug = generateSlug(pageInstance.title)
})



module.exports = { Page, User, db };
