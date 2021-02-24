//const { Place } = require("../models");

const Place = require("../models/Place");

const placeController = {
  getAllPlaces: async (req, res) => {
    const places = await Place.findAll();
    res.status(200).json({ data: places });
  },

  getPlaceById: async (req, res) => {
    const placeId = parseInt(req.params.id, 10);
    const place = await Place.findById(placeId);
    res.status(200).json({ data: place });
  },

  createPlace: async (req, res) => {
    const place = new Place(req.body);
    // méthode save plutôt que insert
    const newPlaceId = await place.insert();
    res.status(201).json({ data: newPlaceId });
  },

  updatePlaceById: async (req, res) => {
    const placeId = parseInt(req.params.id, 10);
    const place = await Place.findById(placeId);
    // Ici l'instanciation se fera avec les éléments de place plutôt que place directement, amélioré avec les data de req.body
    // méthode save plutôt que insert
    const updatedPlace = new Place(place);
    const result = await updatedPlace.update(req.body);
    res.status(200).json({ data: result });
  },

  deletePlaceById: async (req, res) => {
    const placeId = parseInt(req.params.id, 10);
    // const place = await Place.findById(placeId);
    // // Ici on complète notre objet..
    // place.update()
    // res.status(200).json({ data: places });
    res.send("ok")
  }
};

module.exports = placeController;

/*const Whatever = require('../models/whatever');
const whateverController = {
  // GET /whatevers
  getAll: async (req, res) => {
    res.json(await Whatever.findAll());
  },
  // GET /whatevers/:id
  getOne: async (req, res) => {
    Whatever.findOne(req.params.id)
      .then(res.json.bind(res))
      .catch(err => res.status(404).json(err.message));
  },
  // POST /whatevers
  addOne: async (req, res) => {
    const newOne = new Whatever(req.body);
    await newOne.save(); // l'instance n'a pas d'id, un INSERT est exécuté
    res.status(201).json(newOne);
  },
  // PATCH /whatevers/:id
  editOne: async (req, res) => {
    Whatever.findOne(req.params.id)
      .catch(err => res.status(404).json(err.message))
      .then(async theOne => {
        theOne = {...theOne, ...req.body};
        await theOne.save(); // vu que l'instance a un id, un UPDATE sera exécuté plutôt qu'un INSERT
        res.json(theOne);
      );
  },
  // DELETE /whatevers/:id
  dropOne: async (req, res) => {
    Whatever.find(req.params.id)
      .then(async oldOne => {
        await oldOne.delete();
        res.status(204).json();
      )
      .catch(err => res.status(404).json(err.message));
  }
};*/