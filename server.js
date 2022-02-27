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
      { id: 1, date: '02/20/2021', body: 'Like Kanye, I feel like the time is NOW for it to be okay to be great. Why do we shun people for being great? For being a bright color? For standing out? But the time is now to be okay, for you to be the greatest you and me to be the greatest me. I am a brilliant shade of gold, dangit!'},
      { id: 2, date: '02/21/2021', body: 'There is nothing I really wanted to do in life that I was not able to get good at. That is skill Kanye and I share. I am not really specifically talented at anything except for the ability to learn. That is what I do. That is what I am here for. I am not afraid to be wrong because I cannot learn anything from a compliment.'},
      { id: 3, date: '02/22/2021', body: 'I am not always in the position that I want to be in, and that is ok. I am constantly growing. I constantly make mistakes and try to express myself and actualize my dreams. I have the opportunity to play this game of life, so I am trying to appreciate every moment. A lot of people do not appreciate the moment until it has passed- that will not be me.'},
      { id: 4, date: '02/23/2021', body: 'My thoughts on failure- If everything I did failed (which it does not, it actually succeeds) just the fact that I am willing to fail is an inspiration. People are so scared to lose that they do not even try. I am not afraid. The one thing people cannot say is that I am not trying, and I am not trying my hardest, and I am not trying to do the best I know how. I truly am an inspiration.'}
    ],
    moods: [
      { id: 1, date: '02/20/2022', mood: 1, time: '01:59 PM'},
      { id: 2, date: '02/21/2022', mood: 2, time: '02:07 PM'},
      { id: 3, date: '02/22/2022', mood: 3, time: '12:27 AM'},
      { id: 4, date: '02/23/2022', mood: 4, time: '05:07 PM'}

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
  const { date, type, id, mood, time, body} = request.body;
  if (type === 'mood'){
    if (!id || !date || !mood || !time){
        return response.status(422).json({
          error: 'Expected format { id: <Number>, date: <String>, time: <String>, mood: <Number>}. You are missing a required parameter.'
        })
      }
    const newMood = {id, date, mood, time };
    app.locals.user.moods = [...app.locals.user.moods, newMood];
    return response.status(201).json(newMood);
    }

  if (type === 'journal'){
    if (!id || !date || !body){
        return response.status(422).json({
          error: 'Expected format { id: <Number>, date: <String>, body: <String>}. You are missing a required parameter.'
        })
      }
    const newJournal = {id, date, body };
    app.locals.user.journal = [...app.locals.user.journal, newJournal];
    return response.status(201).json(newJournal);
  }
});

app.delete('/dashboard/:id', (request, response) => {
  const { id } = request.params;
  const { journal } = app.locals.user;
  
  const journalEntryToDelete = journal.find(entry => entry.id === parseInt(id));

  if (!journalEntryToDelete) {
    return response.status(404).json({
      message: `No found entry with id of #${id}.`
    })
  }

  app.locals.user.journal = journal.filter(entry => entry.id !== id);

  response.status(200).json({
    message: `Journal entry #${id} has been deleted`
  })
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
