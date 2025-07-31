const express = require('express');
const app = express();

app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');

// Mount routes
app.use('/api/users', userRoutes);

// Models
const Team = require('./models/team');
const Player = require('./models/player');
const Match = require('./models/match');
const Fixture = require('./models/fixture');

let teams = [];
let players = [];
let matches = [];
let fixtures = [];

// Fixtures
app.post('/fixtures', (req, res) => {
  const { id, matchId, announcement } = req.body;
  const fixture = new Fixture(id, matchId, announcement);
  fixtures.push(fixture);
  res.status(201).json(fixture);
});
app.get('/fixtures', (req, res) => {
  res.json(fixtures);
});

// Teams
app.post('/teams', (req, res) => {
  const { id, name, captainId } = req.body;
  const team = new Team(id, name, captainId);
  teams.push(team);
  res.status(201).json(team);
});
app.get('/teams', (req, res) => {
  res.json(teams);
});

// Players
app.post('/players', (req, res) => {
  const { id, name, teamId, position } = req.body;
  const player = new Player(id, name, teamId, position);
  players.push(player);
  res.status(201).json(player);
});
app.get('/players', (req, res) => {
  res.json(players);
});

// Matches
app.post('/matches', (req, res) => {
  const { id, date, homeTeamId, awayTeamId, lineup, score } = req.body;
  const match = new Match(id, date, homeTeamId, awayTeamId, lineup, score);
  matches.push(match);
  res.status(201).json(match);
});
app.get('/matches', (req, res) => {
  res.json(matches);
});

// Root route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

module.exports = app;
