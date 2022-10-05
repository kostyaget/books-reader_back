const { RequestError } = require('../../helpers')
const { Training, Book } = require('../../models')

const { IN_PROGRESS } = require('../../helpers').bookStatus

const startTraining = async (req, res) => {
  const { _id: userId } = req.user
  const { book: bookId } = req.body

  const [userBook, userTraining] = await Promise.all([
    Book.findOne({
      _id: bookId,
      reader: userId,
    }),
    Training.findOne({
      book: bookId,
      participator: userId,
    }),
  ])

  if (!userBook) throw RequestError(404, 'Book not found. Incorrect book id')

  if (userTraining)
    throw RequestError(400, 'Book is already added to the training')

  const newTraining = await Training.create({
    ...req.body,
    participator: userId,
  }).populate('book')

  console.log(newTraining)

  res.status(201).json(newTraining)
}
module.exports = startTraining

//   const { id } = findUserTraining
//   const { startDate, finishDate, book } = newTraining
//   const result = await Training.findByIdAndUpdate(
//     id,
//     { startDate, finishDate, book },
//     { new: true }
//   )
//   await Book.updateMany(
//     { _id: { $in: result.book } },
//     { status: IN_PROGRESS },
//     { multi: true }
//   )
//   res.status(201).json(result)
// } else {
//   const result = await Training.create(newTraining)
//   await Book.updateMany(
//     { _id: { $in: result.books } },
//     { status: IN_PROGRESS },
//     { multi: true }
//   )
//  res.status(201).json(result)
