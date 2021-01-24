const axios = require('axios').default;

const whitelist = require('./db/whitelist');

const message = {

    regex: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,

    async checkMessage(content) {
        if (!this.regex.test(content)) {
            throw new Error('Le message que tu as posté ne comporte pas de lien :angry:');
        }

        const url = this.regex.exec(content)[0];
        const extension = url.split('.');

        if (extension[extension.length - 1].split('?')[0] !== 'gif') {
            throw new Error('Le lien que tu as posté ne représente pas d\'image GIF ! :angry:');
        }
        
        let res;
        try {
            res = await axios({
                method: 'GET',
                url,
                timeout: '2000'
            });

            console.log(res.headers);
            
        } catch(error) {
            console.error(error);
            throw new Error('Une erreur est survenue lorsque nous avons requêté ton lien, code : ' + error.code);
        }

        if (res.headers['content-type'] !== 'image/gif') {
            throw new Error('Le lien que tu as posté ne représente pas d\'image GIF valide (`image/gif`) :angry:');
        }

        whitelist.add(url);

        return true;
    }   

};

module.exports = message;