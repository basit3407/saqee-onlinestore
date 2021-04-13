export default async function forgotPasswordHandler(req, res) {
  const { token } = req.query;

  res.redirect(`${process.env.CLIENT_URL}forgot/${token}`);
}
