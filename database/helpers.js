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

const deseralizeUser = (id) => {
  return User.findOne({
    where: { id: id }
  }).then(result => {
    return result;
  });
};

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
