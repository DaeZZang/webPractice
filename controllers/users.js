const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

module.exports.register = catchAsync(async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      //register하면 자동로그인
      if (err) return next(err); //에러나면 next()
      req.flash("success", "Welcome to Yelp Camp!");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
});

module.exports.login = (req, res) => {
  req.flash("success", "welcome back!");
  const { id } = req.session.returnUrl;
  const redirectUrl = req.session.returnUrl || "campgrounds";
  if (["/reviews"].includes(req.session.returnUrl)) {
    return res.redirect(`/campgrounds/${id}`);
  }
  res.redirect(redirectUrl);
};

module.exports.renderLogout = (req, res) => {
  req.logout();
  req.flash("success", "GOOD BYE");
  res.redirect("/login");
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};
