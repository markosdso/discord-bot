//const Rollercoaster = require('./models/rollercoaster');
const Ranking = require('./models/ranking');
//const User = require('./models/user');

(async () => {
    try {
        await Ranking.drop()
        console.log("complete");
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
})();


