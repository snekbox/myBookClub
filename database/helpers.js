const {User, Group, Book, Comment, Note} = require('./index.js')

//Check or Add new user to the database.
//Then, retrieve all group data for that user

const verifyUser = (email, username) => {
    return User.findOrCreate({
        where: { email: email },
        defaults: { username: username }
    }).then((result) => {
        return result;
    })
}

const getUserGroups = (userId) => {
    return Group.findAll({
    where: {
        userId: userId,
    },
    include: [
        { model: User },
        { model: Book }
    ]
}).then((result) => {
    return result;
}).catch((err) => {  
    return err
});
}

const createNewGroup = (userId, groupName, bookId) => {
    return Group.create({
        name: groupName,
        userId: userId,
        bookId: bookId || null,
    }) .then((result) => {
        return result;
    }).catch((err) => {
        return err;
    });
}

const addOrFindBook = (isbn, title, author, published, description, urlInfo, image) => {
    return Book.findOrCreate({
        where: { isbn: isbn },
        defaults: {
        title: title,
        author: author,
        published: published,
        urlInfo: urlInfo,
        description: description,
        image: image,
        }
    }) .then((result) => {
        return result;
    }).catch((err) => {
        return err;
    });
}
module.exports = {
    verifyUser,
    createNewGroup,
    getUserGroups,
    addOrFindBook,

}