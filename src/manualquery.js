//const Rollercoaster = require('./models/rollercoaster');
//const Ranking = require('./models/ranking');
const User = require('./models/user');

(async () => {
    try {
        await User.update(
            { name: 'Markos 🌺' },
            {
              where: {
                name: 'Markos',
              },
            },
          );
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
})();


