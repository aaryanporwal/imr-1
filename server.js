import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.get("/", (req, res) => {
  res.send("Go to /getDoctorsByName and pass in name as query. Example: `http://139.59.3.10:3000/getDoctorsByName?name=Sanjay`" );
})

app.get("/getDoctorsByName", async (req, res) => {
  res.header("Content-Type",'application/json');
  // if no request parameter passed:
  if(!req.query.name){
    res.send("No name param passed: Try this: `http://139.59.3.10:3000/getDoctorsByName?name=Sanjay`");
  }
  try {
    const { name } = req.query;
    // validate if name is single word
    let searchTerm = name;
    if (name.split(" ").length > 1) {
      searchTerm = name.split(" ").join(" & ");
    }
    const doctors = await prisma.user.findMany({
      where: {
        name: {
          search: searchTerm,
        },
      },
    });
    res.send(JSON.stringify(doctors, null, 2));
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});


// start the server
app.listen(3000, () => {
  console.log("server started on port 3000");
});

// async function dumpFromJson() {
//   const filePath = "/home/aaryan/Desktop/imr-records/records.json";
//   const file = fs.readFileSync(filePath, "utf8");
//   let j = JSON.parse(file);
//   const parsed = j
//     .map(([id, year, reg_no, state_council, name, father_name]) => ({
//       id,
//       year,
//       reg_no,
//       state_council,
//       name,
//       father_name,
//     }))
//     .filter((x) => x.reg_no !== null);
//   parsed.splice(0, 10_00_000);
//   while (parsed.length > 0) {
//     const data = parsed.splice(0, 100000);
//     await prisma.user.createMany({ data, skipDuplicates: true });
//     console.log("doing");
//   }
//   // await prisma.user.createMany({ data: parsed, skipDuplicates: true });
//   console.log("done");
// }

// dumpFromJson();
