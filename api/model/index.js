const Users = require('./User')
const Orders = require('./Orders')
const Books = require('./Books')
const BookAuthor = require('./BookAuthor')
// Export all objects
module.exports = {
    users: new Users(),
    orders: new Orders(),
    books: new Books(),
    authors: new BookAuthor()
}