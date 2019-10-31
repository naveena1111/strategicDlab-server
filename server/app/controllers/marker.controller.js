const Marker = require('../models/marker.model.js');


// Create and Save a new Marker
exports.create = (req, res) => {
    // Validate request
    if(!req.body.latitude) {
        return res.status(400).send({
            message: "latitude  can not be empty"
        });
    }

    if(!req.body.longitude) {
        return res.status(400).send({
            message: "longitude  can not be empty"
        });
    }

    // Create a Marker
    const marker = new Marker({
        latitude: req.body.latitude , 
        longitude: req.body.longitude,
        address: req.body.address
    });

    // Save Marker in the database
    marker.save()
    .then(data => {
        res.send({result:data});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all markers from the database.
exports.findAll = (req, res) => {
    Marker.find()
    .then(markers => {
        let response = {data:markers,message:"Markers listed successfully"}
        res.send({result:response});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single marker with a markerId
exports.findOne = (req, res) => {
    Marker.findById(req.params.markerId)
    .then(response => {
        if(!response) {
            return res.status(404).send({
                message: "marker not found with id " + req.params.markerId
            });            
        }
        res.send(response);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "marker not found with id " + req.params.markerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving marker with id " + req.params.markerId
        });
    });
};

// Update a marker identified by the markerId in the request
exports.update = (req, res) => {
  

    // Find marker and update it with the request body
    Marker.findByIdAndUpdate(req.params.markerId, req.body, {new: true})
    .then(markerresp => {
        if(!markerresp) {
            return res.status(404).send({
                message: "Marker not found with id " + req.params.markerId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Marker not found with id " + req.params.markerId
            });                
        }
        return res.status(500).send({
            message: "Error updating marker with id " + req.params.markerId
        });
    });
};

// Delete a marker with the specified markerId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Marker not found with id " + req.params.markerId
            });
        }
        res.send({message: "Marker deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Marker not found with id " + req.params.markerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Marker with id " + req.params.markerId
        });
    });
};
