const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.set('port', process.env.PORT || 4020);
app.locals.title = 'Kanye Mindfulness App';

app.locals.user = {
    id: 1,
    firstName: 'Kaja',
    lastName: 'De Mariposa',
    pronouns: 'she/her',
    journal: [
    {id: 1, date: '02/21/21', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquam urna a sollicitudin porttitor. Sed bibendum arcu metus, sit amet rhoncus ante pulvinar et. Suspendisse sit amet ex aliquam turpis dapibus luctus id quis sapien. Ut vestibulum lorem ut pulvinar scelerisque. Maecenas et nibh vel quam consequat blandit. Nam sem velit, pretium eu velit et, rhoncus porttitor eros. Curabitur auctor eros nisi, a tempor massa pulvinar vel. Donec faucibus nisi et lorem tristique, nec sodales tortor cursus. Praesent tempor ultrices erat, id malesuada arcu tempus a. Vivamus dapibus, nisi tempus varius porttitor, ipsum tellus convallis metus, et bibendum lectus metus id mi. Donec ullamcorper non augue eget consequat.'},
    {id: 2, date: '03/07/2003', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquam urna a sollicitudin porttitor. Sed bibendum arcu metus, sit amet rhoncus ante pulvinar et. Suspendisse sit amet ex aliquam turpis dapibus luctus id quis sapien. Ut vestibulum lorem ut pulvinar scelerisque. Maecenas et nibh vel quam consequat blandit. Nam sem velit, pretium eu velit et, rhoncus porttitor eros. Curabitur auctor eros nisi, a tempor massa pulvinar vel. Donec faucibus nisi et lorem tristique, nec sodales tortor cursus. Praesent tempor ultrices erat, id malesuada arcu tempus a. Vivamus dapibus, nisi tempus varius porttitor, ipsum tellus convallis metus, et bibendum lectus metus id mi. Donec ullamcorper non augue eget consequat'},
      { id: 3, date: '01/23/2018', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquam urna a sollicitudin porttitor. Sed bibendum arcu metus, sit amet rhoncus ante pulvinar et. Suspendisse sit amet ex aliquam turpis dapibus luctus id quis sapien. Ut vestibulum lorem ut pulvinar scelerisque. Maecenas et nibh vel quam consequat blandit. Nam sem velit, pretium eu velit et, rhoncus porttitor eros. Curabitur auctor eros nisi, a tempor massa pulvinar vel. Donec faucibus nisi et lorem tristique, nec sodales tortor cursus. Praesent tempor ultrices erat, id malesuada arcu tempus a. Vivamus dapibus, nisi tempus varius porttitor, ipsum tellus convallis metus, et bibendum lectus metus id mi. Donec ullamcorper non augue eget consequat.'},
      { id: 4, date: '09/20/1999', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Maecenas aliquam urna a sollicitudin porttitor.Sed bibendum arcu metus, sit amet rhoncus ante pulvinar et.Suspendisse sit amet ex aliquam turpis dapibus luctus id quis sapien.Ut vestibulum lorem ut pulvinar scelerisque.Maecenas et nibh vel quam consequat blandit.Nam sem velit, pretium eu velit et, rhoncus porttitor eros.Curabitur auctor eros nisi, a tempor massa pulvinar vel.Donec faucibus nisi et lorem tristique, nec sodales tortor cursus.Praesent tempor ultrices erat, id malesuada arcu tempus a.Vivamus dapibus, nisi tempus varius porttitor, ipsum tellus convallis metus, et bibendum lectus metus id mi.Donec ullamcorper non augue eget consequat.'}
    ],
    moods: [
        {id: 1, date: '04/18/2018', mood: 1},
        {id: 2, date: '07/28/2012', mood: 2},
        {id: 3, date: '08/05/2008', mood: 3},
        {id: 4, date: '05/12/2013', mood: 4}

    ],
    sleepData: [],
    meditationCount: [],
}

app.get('/', (request, response) => {
    // const { id } = request.params;
    const user = app.locals.user;
    if (!user) {
      return response.sendStatus(404);
    }
    response.status(200).json(user);
});

app.post('/', (request, response) => {
  const { date, type,  } = request.body;

  if (!name || !date || !time || !number ) {
    return response.status(422).json({
      error: 'Expected format { name: <String>, date: <String>, time: <String>, number: <Number> }. You are missing a required parameter.'
    })
  }

  const newReservation = {id: Date.now(), name, date, time, number};

  app.locals.reservations = [...app.locals.reservations, newReservation];

  return response.status(201).json(newReservation);
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
