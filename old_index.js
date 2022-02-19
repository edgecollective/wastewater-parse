
const { exec } = require('child_process');

function getWasteData() {
exec('./grab.sh', (err, stdout, stderr) => {
  if (err) {
    //some err occurred
    console.error(err)
  } else {
   // the *entire* stdout and stderr (buffered)
   //console.log(`stdout: ${stdout}`);
   //console.log(`stderr: ${stderr}`);
   console.log("success.");
  }
});

}

setInterval(getWasteData, 60000);
