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

server.post('/projects/', async (req, res) => {
    let project = req.body;
    if (!('name') in project || !('description') in project) {
        res.status(400).send({ errorMessage: "Please provide a name and description for the project." });
    }
    else if(project.description.length > 128){
        res.status(400).send({errorMessage: "Please limit your descriptions to 128 characters."})
    }

    try {
        const newProject= await projectModel.insert(project);
        res.status(200).json(newProject);
    }
    catch (err) {
        res.status(500).json({ error: 'Project could not be created.' })
    }
});

server.post('/actions/', async (req, res) => {
    let action = req.body;
    if (!('project_id') in action || !('description') in action) {
        res.status(400).send({ errorMessage: "Please provide the project id and description for the action." });
    }

    try {
        // const projectCheck = await projectModel.get(action.project_id)
        // if(projectCheck.id > 0){
        const newAction = await actionModel.insert(action);
        res.status(200).json(newAction);
        
        // else
        // res.status(400).send({errorMessage: "Could not retrieve project with specified ID."});
    }
    catch (err) {
        console.log(action);
        res.status(500).json({ error: 'Action could not be created.' })
    }
});

server.delete('/projects/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const deleted = await projectModel.remove(id);
        if (deleted > 0)
            res.status(200).json(deleted);
        else
            res.status(404).json({ error: 'The project with the specified ID could not be found' });
    }
    catch (err) {
        res.status(500).json({ error: 'Project could not be deleted' });
    }

})

server.delete('/actions/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const deleted = await actionModel.remove(id);
        if (deleted > 0)
            res.status(200).json(deleted);
        else
            res.status(404).json({ error: 'The action with the specified ID could not be found' });
    }
    catch (err) {
        res.status(500).json({ error: 'Action could not be deleted' });
    }

})

server.put('/projects/:id', async (req, res) => {
    let id = req.params.id;
    let updatedProject = req.body;
    if (!('name') in updatedProject || !('description') in updatedProject) {
        res.status(400).send({ errorMessage: "Please provide a name and description for the project." });
    }
    else if(updatedProject.description.length > 128){
        res.status(400).send({errorMessage: "Please limit your descriptions to 128 characters."})
    }

    try {
        const updated = await projectModel.update(id, updatedProject);
        console.log(updated);
        if (updated.id > 0)
            res.status(200).json(updated);
        else
            res.status(404).json({ error: 'The project with the specified ID could not be found' });
    }

    catch (err) {
        res.status(500).json({ error: 'Project could not be updated' });
    }
})





server.listen(8000, () => console.log('API running on port 8000'));