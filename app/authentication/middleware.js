module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Для просмотра данной страницы пользователь должен быть авторизирован');
    res.redirect('/');
}