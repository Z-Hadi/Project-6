const Sauce = require('../models/product');

const fs = require('fs');

exports.createSauce = (req, res, next) => {

    const sauceData = JSON.parse(req.body.sauce)
    const url = req.protocol + '://' + req.get('host');
    const sauce = new Sauce({
        name: sauceData.name,
        manufacturer: sauceData.manufacturer,
        description: sauceData.description,
        imageUrl: url + '/images/' + req.file.filename,
        mainPepper: sauceData.mainPepper,
        heat: sauceData.heat,
        userId: sauceData.userId
    });
    console.log(sauce);
    sauce.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json(error);
        }
    );
};


exports.likeSauce = (req, res, next) => {

    /*  const sauce = JSON.parse(req.body.sauce)
    console.log(sauce)
    const url = req.protocol + '://' + req.get('host');
    const thing = new Sauce({
        name: sauce.name,
        manufacturer: sauce.manufacturer,
        description: sauce.description,
        imageUrl: url + '/images/' + req.file.filename,
        mainPepper: sauce.mainPepper,
        heat: sauce.heat,
        userId: sauce.userId
    });
    sauce.save().then(
        () => {
            res.status(201).json({
                message: 'Like saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json(error);
        }
    );  */
};



exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(404).json(error);
        }
    );
};

exports.modifySauce = (req, res, next) => {

    let sauce = new Sauce({ _id: req.params._id });
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        const sauceData = JSON.parse(req.body.sauce)
        sauce = {
            _id: req.params.id,
            name: sauceData.name,
            manufacturer: sauceData.manufacturer,
            description: sauceData.description,
            imageUrl: url + '/images/' + req.file.filename,
            mainPepper: sauceData.mainPepper,
            heat: sauceData.heat,
            userId: sauceData.userId
        };
    } else {

        sauce = {
            _id: req.params.id,
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            mainPepper: req.body.mainPepper,
            heat: req.body.heat,
            userId: req.body.userId
        };
    }
    Sauce.updateOne({ _id: req.params.id }, sauce).then(
        () => {
            res.status(201).json({
                message: 'Sauce updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json(error);
        }
    );
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }).then(
        (sauce) => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink('images/' + filename, () => {
                Sauce.deleteOne({ _id: req.params.id }).then(
                    () => {
                        res.status(200).json({
                            message: 'Deleted!'
                        });
                    }
                ).catch(
                    (error) => {
                        res.status(400).json(error);
                    }
                );
            });
        }
    );
};

exports.getAllproduct = (req, res, next) => {
    Sauce.find().then(
        (sauces) => {
            res.status(200).json(sauces);
        }
    ).catch(
        (error) => {
            res.status(400).json(error);
        }
    );
};