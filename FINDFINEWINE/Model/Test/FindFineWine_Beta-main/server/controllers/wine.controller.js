import Wine from "../mongodb/models/wine.js";

const getWines = async (req, res) => { 
    try {
        const wines = await Wine.find();
        res.status(200).json(wines);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getRedWines = async (req, res) => { 
    try {
        const wines = await Wine.find({Type: 'Red Wine'});
        res.status(200).json(wines);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getWhiteWines = async (req, res) => { 
    try {
        const wines = await Wine.find({Type: 'White Wine'});
        res.status(200).json(wines);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getRoseWines = async (req, res) => {
    try {
        const wines = await Wine.find({Type: 'Rosé Wine'});
        res.status(200).json(wines);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export { getWines, getRedWines, getWhiteWines, getRoseWines };