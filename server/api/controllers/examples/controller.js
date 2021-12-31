import authenticationService from '../../services/authentication.service';
import examplesService from '../../services/examples.service';
import ExamplesService from '../../services/examples.service';

export class Controller {
  all(req, res) {
    ExamplesService.all()
      .then(r => res.json(r));
  }

  byId(req, res) {
    ExamplesService
      .byId(req.params.id)
      .then(r => {
        if (r) res.json(r);
        else res.status(404).end();
      });
  }

  create(req, res) {
    console.log("create")
    ExamplesService
      .create(req.body.name)
      .then(r => res
        .status(201)
        .location(`/api/v1/examples/${r.id}`)
        .json(r));
  }
  async getUserDetails(req, res, next) {
    
    try {
      const user = await ExamplesService.getUser("As12@gmail.com");
      console.log("HELLO")
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
}
export default new Controller();
