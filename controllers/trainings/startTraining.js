const { Training, Book } = require('../../models')


const startTraining = async (req, res) => {
  const { _id } = req.user;
  const newTraining = { ...req.body, participator: req.user._id };
  const findUserTraining = await Training.findOne({ participator: _id });
  if (findUserTraining) {
    const { id } = findUserTraining;
    const { startDate, finishDate, book } = newTraining;
    const result = await Training.findByIdAndUpdate(
      id,
      { startDate, finishDate, book },
      { new: true }
    );
     await Book.updateMany(
      { _id: { $in: result.book } },
     {status:"ACTIVE"},
      { multi: true }
    );
    res.status(201).json(result)
  } else {
    const result = await Training.create(newTraining);
    await Book.updateMany(
      { _id: { $in: result.books} },
  {status: "ACTIVE"},
      { multi: true }
    );
      res.status(201).json(result)
  }
}
module.exports = startTraining
