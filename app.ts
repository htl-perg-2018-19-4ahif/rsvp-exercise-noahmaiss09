import {CREATED, BAD_REQUEST, UNAUTHORIZED} from 'http-status-codes';
import * as loki from 'lokijs';
import * as express from 'express';
import * as basic from 'express-basic-auth';

const app = express();
app.use(express.json());

import {Request, Response} from 'express';
import { getUnpackedSettings } from 'http2';

var db = new loki('loki.json');
var guests = db.addCollection('guests');
const adminFilter = basic({ users: { admin: 'P@ssw0rd!' }});

// Add routes
app.get('/party', getAll);
app.post('/register', post);
app.get('/guests', getGuests, adminFilter);

export function getGuests(req: Request, res: Response): void {
  res.send(guests.find);
}

export function post(req: Request, res: Response): void {
  if (!req.body.firstName || !req.body.lastName) {
    res.status(BAD_REQUEST).send('No input for firstname or lastname');
  } else {
    let count = guests.count();
    if (count > 10){
      const guest = guests.insert({firstName: req.body.firstName, lastName: req.body.lastName});
      res.status(CREATED).send(guest);
    }
  }
}

export function getAll(req: Request, res: Response): void {
  res.send({
    title: "Halligalli Drecksauparty",
    location: "Sprengdorf 69",
    date: new Date(2018, 0, 1)
  });
}

app.listen(8080, () => console.log('API is listening on port 8080'))