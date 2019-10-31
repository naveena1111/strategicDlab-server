module.exports = (app) => {
    const markers = require('../controllers/marker.controller.js');

    // Create a new marker
    app.post('/marker', markers.create);

    // Retrieve all markers
    app.get('/marker', markers.findAll);

    // Retrieve a single Marker with markerId
    app.get('/marker/:markerId', markers.findOne);

    // Update a Marker with markerId
    app.put('/marker/:markerId', markers.update);

    // Delete a Marker with markerId
    app.delete('/marker/:markerId', markers.delete);
}