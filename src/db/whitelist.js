const db = require('monk')(process.env.MONGO_DATABASE_URI);

const whitelist = {

    async add(url) {
        const gifs = db.get('whitelist');

        const gif = gifs.find({ url });

        if (gif.count() > 0) {
            throw new Error("Ce GIF a déjà été soumis à notre algorithme, mais merci quand même bg! :smiley:");
        }

        gifs.insert({ url });
    }

}

module.exports = whitelist;