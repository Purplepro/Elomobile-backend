require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET





const { eloRequest } = require('../models');
// console.log(eloRequest)

const index = async (req, res) => {
    console.log('inside of /api/elorequest');
    console.log(req.user)
        try {
            const allrequest = await eloRequest.find({UserId: req.user.id});
            console.log(allrequest)
            res.json({request: allrequest });
        } catch (error) {
            console.log('Error inside of /api/elorequest');
            console.log(error);
            return res.status(400).json({message: 'elo request page not found. Please try again'})
        }
}

const show = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id
    console.log('----show user id----')
    console.log(userId)

    try {
        const eloReq = await EloRequest.find({$and: [{_id: id}, {userId}]});
        res.json({ eloReq });
    } catch (error) {
        console.log('error inside of /api/elorequest/:id');
        console.log(error);
        return res.status(400).json({message: 'Elo request not found. Try again'})
    }
}


const create = async (req, res) => {
            const { fullName, evMake, evModel, color, location, phoneNumber} = req.body;
            console.log(req.body);
            const UserId = req.user.id
            try {
                    const newEloRequest = await eloRequest.create({fullName,evMake,evModel,color,location,phoneNumber, UserId});
                    console.log('request submitted', newEloRequest);
                    res.json({ request: newEloRequest})
            } catch (error) {
                    console.log('Error inside of /api/elorequest');
                    console.log(error);
                    return res.status(400).json({ message: 'request failed could not be submitted. Please try again..'});

            }
}


const update = async (req, res) => {
    const {id} = req.params;
    const userId = req.user.id
    console.log(id);
    console.log('hitting update route')
    try {
        const updatedInstructions = await eloRequest.findOneAndUpdate({_id: id}, req.body, {location: true})
      
        console.log('finding and updating location ')
    } catch (error) {
        console.log(error);
    }
}


const cancelRequest = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id
    console.log('hitting cancel route')
    try {
        const result = await eloRequest.deleteOne({_id: id});
        console.log(result);
        res.json({ message: 'entry deleted successfully'});

    } catch (error) {
        console.log('error inside of CANCEL route');
        console.log(error)
        return res.status(400).json({ message: 'error cancelling request'})
    }
}



//Get api


// router.get('/test', (req, res) => {
//     res.json({ msg: 'hitting '})
// }) 


//make sure to put authentication when making request



router.get('/',  passport.authenticate('jwt', { session: false }), index);

router.get('/:id', show);

router.post('/', passport.authenticate('jwt', { session: false }), create);
// PUT -> /api/elorequest
router.put('/:id', passport.authenticate('jwt', { session: false }), update);
// DELETE -> /api/elorequest/:id
router.delete('/:id', passport.authenticate('jwt', { session: false }), cancelRequest);


module.exports = router;