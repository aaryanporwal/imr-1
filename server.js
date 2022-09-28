import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.get("/getDoctorsByName", async (req, res) => {
  try {
    const { name } = req.query;
    // validate if name is single word
    if (name.split(" ").length > 1) {
      res.end("invalid name");
    }
    const doctors = await prisma.user.findMany({
      where: {
        name: {
          search: name,
        },
      },
    });
    res.json(doctors);
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
