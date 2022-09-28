import axios from "axios";
import https from "https";
import fs from "fs";
const httpsAgent = new https.Agent({ keepAlive: true });

// for loop that paginates and fetches records from the API

const fetchRecords = async (offset, limit) => {
  let config = {
    method: "get",
    url: `https://www.nmc.org.in/MCIRest/open/getPaginatedData?service=getPaginatedDoctor&start=${offset}&length=${limit}`,
    httpsAgent,
  };
  try {
    const data = (await axios.get(config.url, { httpsAgent })).data.data;
    return data.map((iter) => iter.slice(0, -1));
  } catch (e) {
    console.log("error");
    return [];
  }
};

async function main() {
  let promises = [];
  let records = [];

  for (let i = 0; i <= 100; i++) {
    let offset = i * 13000;
    let limit = 13000;
    promises.push(fetchRecords(offset, limit));
    console.log(`starting ${i}th iteration`);
    if (i % 5 === 0) {
      const data = await Promise.all(promises);
      console.log(`${i}th iteration completed`);
      data.forEach((slice) => {
        records = [...records, ...slice];
      });
      promises = [];
    }
  }
  // let res = await Promise.all(promises);
  // res.forEach((slice) => {
  //   records = [...records, ...slice];
  // });
  // Write to file
  // json.stringify() prettify
//  append to file

  fs.writeFile(
    "records.json",
    JSON.stringify(records, null, 2),
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    }
  );
}

main();
