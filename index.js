const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function lsWithGrep() {
  try {
      console.log('grabbing ...');
      const { stdout, stderr } = await exec('./grab.sh');
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
  } catch (error) {
     console.error(error);
  };
};

lsWithGrep();
//setInterval(lsWithGrep(),60000);
