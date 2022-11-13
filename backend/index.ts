import { cluster } from './utils/utils';
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/getTripsByDate', async (req, res) => {
  let point: string = req.query.point;
  let radius: string = req.query.radius;
  let startDate: string = req.query.startDate;
  let endDate: string = req.query.endDate;

  let data = await tradeAreaTrips(point, radius, startDate, endDate);
  // res.send(data);
  res.send(await cluster(data));
});

app.get('/getCluster', async (req, res) => {
  // console.log('getting Response');
  res.send(await cluster(""));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

async function tradeAreaTrips(
  point: string,
  radius: string,
  startDate: string,
  endDate: string
) {
  try {
    const axiosConfig = {
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + process.env.TOKEN,
      },
    };

    let od: string = 'destination';
    let geoFilterType: string = 'circle';
    // let radius: string = '500ft';
    let limit: number = 1000;
    //let provider: string = 'consumer';
    let startDt = startDate || '%3E%3D2022-01-01T00%3A00';
    let endDt = endDate || '%3C%3D2022-06-30T00%3A00';
    //let endPointType: number = 3;
    const tripsResponse = await axios
      .get(
        'https://trade-areas-api.inrix.com/v1/trips?' +
        '&od=' +
        od +
        '&geoFilterType=' +
        geoFilterType +
        '&radius=' +
        radius +
        '&points=' +
        point +
        '&limit=' +
        limit.toString() +
        '&startDate=' +
        startDt +
        '&endDate=' +
        endDt,
        axiosConfig
      )
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.error('An error occurred: ', error);
        throw 'error';
      });

    return tripsResponse;
  } catch (e) {
    console.log(e);
  }
}
