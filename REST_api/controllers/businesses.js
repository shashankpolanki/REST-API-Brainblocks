const businesses = require('../models').businesses;

module.exports = {

//Adding a new business
  add(req, res) {
    return businesses
    .create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      link: req.body.link
    })
    .then((result) => res.status(201).send(result))
    .catch((error) => res.status(400).send(error))
  },

//Listing all businesses
  list(req, res) {
    return businesses
    .findAll()
    .then((result) => res.status(201).send(result))
    .catch((error) => res.status(400).send(error))

  },

//Counting from all buinesses as specified by the moderation status
    count_all(req, res) {
      return businesses
      .findAndCountAll({
        where: {
            status: req.params.status,
        }
      })
      .then((result) => res.status(201).send(result))
      .catch((error) => res.status(400).send(error))

    },

//Counting from all buinesses as specified by moderation status and category
    count_category(req, res) {
        return businesses
        .findAndCountAll({
          where: {
              category: req.params.category,
              status: req.params.status,
          }
        })
        .then((result) => res.status(201).send(result))
        .catch((error) => res.status(400).send(error))

      },

//Listing businesses based on moderation status, offset, and limit
  list_filter(req, res) {
    return businesses
    .findAll({
      where: {
        status: req.params.status,
      },
      offset: req.params.offset,
      limit: req.params.limit,
    })

    .then((result) => res.status(201).send(result))
    .catch((error) => res.status(400).send(error))

  },

  //Listing businesses based on their category
  list_category(req, res){
    return businesses

    .findAll({
      where: {
        category: req.params.category,
      }
    })

    .then((result) => res.status(201).send(result))
    .catch((error) => res.status(400).send(error))

  },

  //Listing businesses based on their category, moderation status,
  //limit and offset
  list_category_filter(req, res){

    return businesses
    .findAll({
      where: {
        category: req.params.category,
        status: req.params.status,
      },
      offset: req.params.offset,
      limit: req.params.limit,
    })

    .then((result) => res.status(201).send(result))
    .catch((error) => res.status(400).send(error))

  },

//Deleting a business from the records based on the business's name.
  destroy(req, res) {
    return businesses

    .find({
      where: {
        name: req.params.name,
      },
    })

    .then(result => {
      if (!result) {
            return res.status(404).send({
            message: 'TodoItem Not Found'
        })
      }

      return result
      .destroy()
      .then(() => res.status(204).send())
      .catch(error => res.status(400).send(error))

    })

      .catch(error => res.status(400).send(error))

  },

}
