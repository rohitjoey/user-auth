const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./database");
const User = connection.models.User;
const validatePassword = require("../lib/passwordUtils").validatePassword;

const verifyCallback = async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });
    // console.log(user);
    if (!user) {
      console.log("Wrong username");
      return done(null, false);
    }

    const isValid = await validatePassword(password, user.password);
    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    // console.log("dfsdf");
    done(error);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
