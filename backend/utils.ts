var geocluster = require("geocluster");
var fs = require('fs');

export function cluster() {
  var text = fs.readFileSync('./exported/data1-0.json');

  const data = JSON.parse(text)["data"];
  let coordinates = [];
  for (let i = 0; i < data.length; i++) {
    let arr = data[i]["startLoc"].split(',');
    coordinates.push([Number(arr[1]), Number(arr[0])]);
  }
  var bias = 0.05;
  var result = geocluster(coordinates, bias);
  console.log(result)
  return result
}
