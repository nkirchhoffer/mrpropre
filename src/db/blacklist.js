const db = require('monk')(process.env.MONGO_DATABASE_URI);

const blacklist = {

    async add(url) {
        const gifs = db.get('blacklist');

        const req = gifs.find({ url });

        if (req.count() > 0) {
            throw new Error("Ce GIF a déjà été soumis à notre algorithme, mais merci quand même bg! :smiley:");
        }

        const whitelist = db.get('whitelist').find({ url }).count();

        if (whitelist > 0) {
            throw new Error("Ce GIF a déjà été soumis à notre algorithme, mais merci quand même bg! :smiley:");
        }

        gifs.insert({ url });
        return true;
    }

}

module.exports = blacklist;