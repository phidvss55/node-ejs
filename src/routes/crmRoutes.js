import {
  addNewContact,
  getAllContacts,
  getOneContact,
  deleteContact,
  updateContact,
} from '../controllers/crmController.js';

const routes = (app) => {
  app
    .route('/contact')
    .get((req, res, next) => {
      getAllContacts(req, res);
    })
    .post((req, res) => {
      addNewContact(req, res);
    });

  app
    .route('/contact/:contactId')
    .get((req, res) => {
      getOneContact(req, res);
    })
    .put((req, res) => {
      updateContact(req, res);
    })
    .delete((req, res) => {
      deleteContact(req, res);
    });
};

export default routes;
