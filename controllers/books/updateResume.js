const { RequestError } = require('../../helpers')
const { Book } = require('../../models')

const STATUS_COMPLETED = 'completed'

const updateResume = async (req, res) => {
  const { id } = req.params

  // it must be a book status check to have a permision to add a resume.
  // it is only possible when book status is completed
  // maybe it should be decomposed to send 400 response with
  // 'Book needs to have a status completed'
  const updatedBook = await Book.findOneAndUpdate(
    { _id: id, status: STATUS_COMPLETED },
    req.body,
    {
      new: true,
      fields: {
        rating: 1,
        summary: 1,
      },
    }
  )

  if (!updatedBook) throw RequestError(404)

  res.json(updatedBook)
}

module.exports = { updateResume }
