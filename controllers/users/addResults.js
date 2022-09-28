const addResults = async (req, res) => {
  console.log(req.user)
  res.json({ message: 'ok' })
}

module.exports = { addResults }
