const mongodb = require('../data/database.js');
const { ObjectId } = require('mongodb');

// GET all users
const getAll = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const db = mongodb.getDatabase().db('cse341-project1');
    const result = await db.collection('contacts').find();
    const contacts = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// GET single user
const getSingle = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const userId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase().db('cse341-project1');
    const result = await db.collection('contacts').find({ _id: userId });
    const contacts = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// CREATE (POST)
const createUser = async (req, res) => {
  //#swagger.tags=['Users']
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  try {
    const db = mongodb.getDatabase().db('cse341-project1');
    const response = await db.collection('contacts').insertOne(user);

    if (response.acknowledged) {
      res.status(201).json(response); 
    } else {
      res.status(500).json(response.error || 'Error creating user.');
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// UPDATE (PUT)
const updateUser = async (req, res) => {
  //#swagger.tags=['Users']
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  try {
    const db = mongodb.getDatabase().db('cse341-project1');
    const response = await db.collection('contacts').replaceOne({ _id: userId }, user);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Error updating user.');
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// DELETE
const deleteUser = async (req, res) => {
  //#swagger.tags=['Users']
  const userId = new ObjectId(req.params.id);

  try {
    const db = mongodb.getDatabase().db('cse341-project1');
    const response = await db.collection('contacts').deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(204).send(); 
    } else {
      res.status(500).json(response.error || 'Error deleting user.');
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};
