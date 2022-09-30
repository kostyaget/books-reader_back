const { Training,Book } = require('../../models')

const startTraining = async (req, res) => {
    const { _id: participator } = req.user;
    const {id:bookId } = req.params;
    const { startDate, finishDate, book,pageAmount } = req.body;
    let body = { startDate, finishDate, book,pageAmount };
    
    const findBook = await Book.findOne(bookId)
    if (!findBook) {
        throw new Error("Book is not found");
    }
    const result = await Training.create({ ...body, participator,pageAmount });
    res.status(201).json(result);
    
}
module.exports = startTraining;