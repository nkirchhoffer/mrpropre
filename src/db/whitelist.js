const db = require('monk')(process.env.MONGO_DATABASE_URI);

const whitelist = {

    async add(url) {
        const gifs = db.get('whitelist');

        if (gifs.count({ url }) > 0) {
            throw new Error("Ce GIF a déjà été soumis à notre algorithme, mais merci quand même bg! :smiley:");
        }

        const blacklist = db.get('blacklist').count({ url });

        if (blacklist > 0) {
            throw new Error("Ce GIF a déjà été soumis à notre algorithme, mais merci quand même bg! :smiley:");
        }

        gifs.insert({ url });

        return true;
    }

}

module.exports = whitelist;