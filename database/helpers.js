const { Op } = require('sequelize');
const {
  User,
  Group,
  Book,
  Comment,
  Note,
  BookGroup,
  UserBook,
  UserGroup,
} = require('./index.js');

// Check or Add new user to the database.
// Then, retrieve all group data for that user
/**
 * @function verifyUser
 * adds user to sessions table
 * 
 * @param {*} token security token
 * @param {*} tokenSecret 
 * @param {*} profile user id
 */
const verifyUser = (token, tokenSecret, profile) => {
  return User.findOrCreate({
    where: { googleId: profile.id },
    defaults: {
      username: profile.displayName,
      email: profile.emails[0].value,
      token: token,
    },
  }).then(result => {
    return result;
  });
};

/**
 * @function deseralizeUser
 * for token deserialization to user object
 * 
 * @param {*} id 
 */

const deseralizeUser = (id) => {
  return User.findOne({
    where: { id: id }
  }).then(result => {
    return result;
  });
};

/**
 * @function getOwnerGroups
 * takes in a userId, returns all groups that are owned by the user passed to function
 * @param {*} userId 
 */

const getOwnerGroups = userId => {
  return Group.findAll({
    where: {
      userId,
    },
    include: [{ model: User }, { model: Book }],
  })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
};

/**
 * @function createNewGroup
 * adds new group to groups table
 * 
 * @param {*} userId userId to serve as owner of new group
 * @param {*} groupName groupName to serve as new group name
 * @param {*} bookId bookId is current book that group is reading
 */

const createNewGroup = (userId, groupName, bookId) => {
  return Group.create({
    name: groupName,
    userId,
    bookId: bookId || null,
  })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
};

/**
 * @function addOrFindBook
 * takes in book information, returns book's info from database.
 * If book does not exist in database, adds it.
 * 
 * book info:
 * @param {*} isbn 
 * @param {*} title 
 * @param {*} author 
 * @param {*} published 
 * @param {*} description 
 * @param {*} urlInfo 
 * @param {*} image 
 */
const addOrFindBook = (
  isbn,
  title,
  author,
  published,
  description,
  urlInfo,
  image,
) => {
  return Book.findOrCreate({
    where: { isbn },
    defaults: {
      title,
      author,
      published,
      urlInfo,
      description,
      image,
    },
  })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
};

/**
 * @function getUserGroups
 * gets all groups that user is a member of
 * 
 * @param {*} userId 
 */
const getUserGroups = userId => {
  return UserGroup.findAll({
    attributes: [],
    where: {
      userId,
    },
    include: [
      {
        model: Group,
        include: [Book],
      },
    ],
  })
    .then(result => {
      let groups = result.map(group => {
        return group.group;
      });
      return groups;
    })
    .catch(err => {
      return err;
    });
};

/**
 * @function addUserToGroup
 * takes in a userId, and a groupId, adds this user to group table
 * 
 * @param {*} userId 
 * @param {*} groupId 
 */
const addUserToGroup = (userId, groupId) => {
  return UserGroup.findOrCreate({
    where: { userId, groupId },
  })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
};

/**
 * @function getGroupUsers
 * gets all users from group with ID matching groupId
 * 
 * @param {*} groupId 
 */
const getGroupUsers = groupId => {
  return UserGroup.findAll({
    attributes: [],
    where: {
      groupId,
    },
    include: [{ model: User }],
  })
    .then(result => {
      let users = result.map(user => {
        return user.user;
      });
      return users;
    })
    .catch(err => {
      return err;
    });
};

/**
 * @function addBookToGroup
 * takes in a groupId and a bookId, adds bookId to group table
 * 
 * @param {*} groupId 
 * @param {*} bookId 
 */
const addBookToGroup = (groupId, bookId) => {
  return BookGroup.findOrCreate({
    where: { bookId, groupId },
  })
    .then(() => {
      return Group.update(
        { bookId },
        {where: {
          id: groupId,
        }}
      )
    })
    .then(() => {
      return Group.findOne({
        where: {
          id: groupId,
        },
        include: [{
          model: Book,
        }]
      })
    })
    .then(updatedGroup => 
      updatedGroup
    )
    .catch(err => {
      return err;
    });
};

/**
 * @function getGroupBooks
 * takes in a groupId and returns all books from group matching groupId
 * 
 * @param {*} groupId 
 */
const getGroupBooks = groupId => {
  return BookGroup.findAll({
    attributes: [],
    where: {
      groupId,
    },
    include: [{ model: Book }],
  })
    .then(result => {
      let book = result.map(book => {
        return book.book;
      });
      return book;
    })
    .catch(err => {
      return err;
    });
};

/**
 * @function addComment
 * takes in userId, groupId, bookId, and a comment 
 * adds input to comments table
 * 
 * @param {*} userId 
 * @param {*} groupId 
 * @param {*} bookId 
 * @param {*} comment 
 */
const addComment = (userId, groupId, bookId, comment) => {
  return Comment.create({
    comment,
    userId,
    groupId,
    bookId,
  })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
};

/**
 * @function getAllComments
 * groupId and bookId, gets all of specified group's comments on specified book
 * 
 * @param {*} groupId 
 * @param {*} bookId 
 */
const getAllComments = (groupId, bookId) => {
  return Comment.findAll({
    where: {
      groupId,
      bookId,
    },
    include: [{ model: User }],
  })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
};

/**
 * @function searchGroups
 * returns group that matches group query, for use in group search functions
 * @param {*} query 
 */

const searchGroups = query => {
  return Group.findAll({
    where: {
      name: {
        [Op.like]: `%${query}%`,
      },
    },
    include: [{ model: User }, { model: Book }],
  })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
};

/**
 * @function deleteGroup
 * takes in groupId, removes specified group from groups table
 * 
 * @param {*} groupId 
 */
const deleteGroup = groupId => {
  return Group.destroy({
    where: {
      id: groupId,
    },
  })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
};

/**
 * @function removeUserFromGroup
 * takes in userId and groupId, removes user reference from group table
 * @param {*} userId 
 * @param {*} groupId 
 */
const removeUserFromGroup = (userId, groupId) => {
  return UserGroup.destroy({
    where: {
      userId,
      groupId,
    }
  })
  .then((result) => {
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
  getOwnerGroups,
  addUserToGroup,
  getGroupUsers,
  addBookToGroup,
  getGroupBooks,
  addComment,
  getAllComments,
  searchGroups,
  deleteGroup,
  removeUserFromGroup,
  deseralizeUser,
};
