//Express setup
const express=require('express');
const bodyParser=require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));

//Knex setup
const env = process.env.NODE_ENV || 'development';
const config =require('./knexfile')[env];
const knex = require('knex')(config);

//bcrypt setup
let bcrypt=require('bcrypt');
const saltRounds=10;
///////////////////////////
//GET entries functions////
//////////////////////////

app.get('/api/users/:id/entries', (req, res) => {
  let id = parseInt(req.params.id);
  knex('users').join('entries','users.id','entries.user_id')
    .where('users.id',id)
    .orderBy('created','desc')
    .select('entry','username','name','created').then(entries => {
      res.status(200).json({entries:entries});
    }).catch(error => {
      res.status(500).json({ error });
    });
});

// app.get('/api/entries/search', (req, res) => {
//   if (!req.query.keywords)
//     return res.status(400).send();
//   let offset = 0;
//   if (req.query.offset)
//     offset = parseInt(req.query.offset);
//   let limit = 50;
//   if (req.query.limit)
//     limit = parseInt(req.query.limit);
//   knex('users').join('entries','users.id','entries.user_id')
//     .whereRaw("MATCH (entry) AGAINST('" + req.query.keywords + "')")
//     .orderBy('created','desc')
//     .limit(limit)
//     .offset(offset)
//     .select('entry','username','name','created','users.id as userID').then(entries => {
//       res.status(200).json({entries:entries});
//     }).catch(error => {
//       res.status(500).json({ error });
//     });
// });
//
// app.get('/api/entries/hash/:hashtag', (req, res) => {
//   let offset = 0;
//   if (req.query.offset)
//     offset = parseInt(req.query.offset);
//   let limit = 50;
//   if (req.query.limit)
//     limit = parseInt(req.query.limit);
//   knex('users').join('entries','users.id','entries.user_id')
//     .whereRaw("entry REGEXP '^#" + req.params.hashtag + "' OR entry REGEXP ' #" + req.params.hashtag + "'")
//     .orderBy('created','desc')
//     .limit(limit)
//     .offset(offset)
//     .select('entry','username','name','created','users.id as userID').then(entries => {
//       res.status(200).json({entries:entries});
//     }).catch(error => {
//       res.status(500).json({ error });
//     });
// });

// get the entries of those you are following
// use limit to limit the results to a certain number
// // use offset to provide an offset into the results (e.g., starting at results number 10)
// app.get('/api/users/:id/feed', (req,res) => {
//   // id of the person we are interested in
//   let id = parseInt(req.params.id);
//   // offset into the results
//   let offset = 0;
//   if (req.query.offset)
//     offset = parseInt(req.query.offset);
//   // number of results we should return
//   let limit = 50;
//   if (req.query.limit)
//     limit = parseInt(req.query.limit);
//   // get people this person is following
//   knex('followers').where('followers.user_id',id).then(followed => {
//     // get entries from this users plus people this user follows
//     let following = followed.map(entry=>entry.follows_id);
//     following.push(id);
//     return knex('entries').join('users','entries.user_id','users.id')
//       .whereIn('entries.user_id',following)
//       .orderBy('created','desc')
//       .limit(limit)
//       .offset(offset)
//       .select('entry','username','name','created','users.id as userID');
//   }).then(entries => {
//     res.status(200).json({entries:entries});
//   }).catch(error => {
//     console.log(error);
//     res.status(500).json({ error });
//   });
// });

app.get('/api/users/:id', (req, res) => {
  let id = parseInt(req.params.id);
  // get user record
  knex('users').where('id',id).first().select('username','name','id').then(user => {
    res.status(200).json({user:user});
   }).catch(error => {
     res.status(500).json({ error });
   });
 });
////////////////////
//POST FUNCTIONS////
////////////////////
app.post('/api/login', (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send();
  knex('users').where('email',req.body.email).first().then(user => {
    if (user === undefined) {
      res.status(403).send("Invalid credentials");
      throw new Error('abort');
    }
    return [bcrypt.compare(req.body.password, user.hash),user];
  }).spread((result,user) => {
    if (result)
      res.status(200).json({user:user});
    else
      res.status(403).send("Invalid credentials");
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

app.post('/api/users', (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username || !req.body.name)
    return res.status(400).send();
  knex('users').where('email',req.body.email).first().then(user => {
    if (user !== undefined) {
      res.status(403).send("Email address already exists");
      throw new Error('abort');
    }
    return knex('users').where('username',req.body.username).first();
  }).then(user => {
    if (user !== undefined) {
      res.status(409).send("User name already exists");
      throw new Error('abort');
    }
    return bcrypt.hash(req.body.password, saltRounds);
  }).then(hash => {
    return knex('users').insert({email: req.body.email, hash: hash, username:req.body.username,
				 name:req.body.name, role: 'user'});
  }).then(ids => {
    return knex('users').where('id',ids[0]).first();
  }).then(user => {
    res.status(200).json({user:user});
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

app.post('/api/users/:id/entries', (req, res) => {
  let id = parseInt(req.params.id);
  knex('users').where('id',id).first().then(user => {
    return knex('entries').insert({user_id: id, entry:req.body.entry, created: new Date()});
  }).then(ids => {
    return knex('entries').where('id',ids[0]).first();
  }).then(entry => {
    res.status(200).json({entry:entry});
    return;
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});

app.listen(3000, ()=>console.log('Server listening on port 3000!'));
