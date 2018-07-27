const express = require('express');
const actionModel = require('./data/helpers/actionModel');
const projectModel = require('./data/helpers/projectModel');

const server = express();
const bodyParser = require('body-parser');

server.use(bodyParser.json());


server.get('/projects', async (req, res) => {
    try {
        const projects = await projectModel.get();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: 'Projects could not be retrieved.' })
    }
});

server.get('/projects/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const project = await projectModel.get(id)
        res.status(200).json(project);
    }
    catch (err) {
        res.status(500).json({ error: 'Project could not be retrieved.' })
    }
});

server.get('/actions', async (req, res) => {
    try {
        const actions = await actionModel.get();
        res.status(200).json(actions);
    } catch (err) {
        res.status(500).json({ error: 'Actions could not be retrieved.' })
    }
});

server.get('/actions/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const action = await actionModel.get(id)
        res.status(200).json(action);
    }
    catch (err) {
        res.status(500).json({ error: 'Action could not be retrieved.' })
    }
});


server.listen(8000, () => console.log('API running on port 8000'));