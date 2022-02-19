var fs = require('fs');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'a'});

const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function lsWithGrep() {
  try {
      let ts = Date.now();
      console.log('grabbing ...');
      const { stdout, stderr } = await exec('./grab.sh');
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
      log_file.write(ts+'\n');
      log_file.write(stdout + '\n');
      log_file.write(stderr);
  } catch (error) {
     console.error(error);
     let ts = Date.now();
     log_file.write(ts+'\n');
     log_file.write(error + '\n');
     log_file.write(stdout + '\n');
     log_file.write(stderr);
  };
};

//lsWithGrep();
setInterval(lsWithGrep,1000*60*60*1); // every hour
