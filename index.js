const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const rs = require('readline-sync');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const GoStumble = (auth) => new Promise((resolve, reject) => {

    fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/3', {
        method: 'GET',
        headers: {
            'authorization': auth
        }
    })
    .then(res => res.text())
    .then(data=> {
        resolve(data);
    })
    .catch(err => {
        reject(err);
    });

});

(async () => {

    console.log(`
${chalk.cyan('The Script was remake by Anonytikus')}
${chalk.cyan('Tiktok : @Anonytikus')}

${chalk.red('Terkadang Rasa Kecewa Yang Mendalam Itu Di Sebabkan Oleh Harapan Kita Yang Terlalu Tinggi Terhadap Sesuatu')}
`);

    const auth = rs.question('▹ Enter your auth token : ');
    console.log('');

    while (true) {

        const result = await GoStumble(auth);
        if (!result) {

            

        } else if (result.includes('User')) {

            const data = JSON.parse(result);
            const username = data.User.Username;
            const country = data.User.Country;
            const trophy = data.User.SkillRating;
            const crown = data.User.Crowns;
            
            console.log(chalk.cyan(`\r[ ${moment().format('yyyy - MM - ddd  HH:mm:ss')} ]
▹ Username : ${chalk.yellow(`${username}`)}
▹ Country  : ${chalk.yellow(`${country}`)}
▹ Trophy   : ${chalk.yellow(`${trophy}`)}
▹ Crown    : ${chalk.yellow(`${crown}`)}
`));

            await sleep(10000);

        } else if (result == 'YOUR ACCOUNT HAS BANNED!!') {

            console.log(chalk.red(`\r[ ${moment().format('HH:mm:ss')} ] Banned !`));
            break;
            
        } else if (result == 'SERVER_ERROR') {

            continue;
            
        }
    }
    

})();