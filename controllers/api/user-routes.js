router.post('/login', async (req, res) => {
    try {
      const dbUserData = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!dbUserData) {
        res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }

      const validPassword = await dbUserData.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }

      req.session.save(() => {
        req.session.username = dbUserData.name;
        req.session.userId = dbUserData.id;
        req.session.logged_in = true;
        res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
      });
    } catch (err) {}
  });

  module.exports = router;