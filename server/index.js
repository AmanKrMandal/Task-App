const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("./db/config");
const Regis = require("./db/register"); // register
const Work = require("./db/work"); // work

// jwt
const Jwt = require("jsonwebtoken");
const JwtKey = "aman-project";
const app = express();

//share the data on mongodb
app.use(express.json());

//error fix by using cors
app.use(cors(
{
    origin: ["http://localhost:3000/", "https://task-nu-neon.vercel.app/login"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Header":
      "Origin, X-Requested-With, Content-Type, Accept",
    credentials: true,
  }
));

// register
app.post("/register", async (req, resp) => {
  let regis = new Regis(req.body);
  let result = await regis.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, JwtKey, (err, token) => {
    if (err) {
      resp.send({
        result: "Something went wrong , Pls try after some time later",
      });
    }
    resp.send({ result, token });
  });
  // resp.send(result);
});

//login
app.post("/login", async (req, resp) => {
  let regis = await Regis.findOne(req.body).select("-password");
  if (req.body.password && req.body.email) {
    if (regis) {
      ///
      Jwt.sign({ regis }, JwtKey,(err, token) => {
        if (err) {
          resp.send({
            result: "Something went wrong , Pls try after some time later",
          });
        }
        resp.send({ regis, token });
      });
      ///
    } else {
      resp.send("Result not found");
    }
  } else {
    resp.send("Result not found");
  }
});

// get works
app.get("/works", verifyToken, async (req, resp) => {
  let work = await Work.find();
  if (work.length > 0) {
    resp.send(work);
  } else {
    resp.send({ result: "No result found" });
  }
});

//add works
app.post("/add-works", verifyToken, async (req, resp) => {
  let work = new Work(req.body);
  let result = await work.save();
  resp.send(result);
});

//get data for one update 
app.get("/work/:id", async (req, resp) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
  let result = await Work.findById(req.params.id)
    
  if (result) {
    resp.send(result)
  } else {
    resp.send({ "result": "No data found" })
  }
}
});

// update work
app.put("/work/:id", verifyToken, async (req, resp) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    let result = await Work.updateOne(
      { _id: req.params.id },
      {
        $set: req.body
      }
    );
    resp.send(result)
  }
});

//delete work
app.delete("/work/:id", verifyToken, async (req, resp) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {

    let result = await Work.deleteOne({ _id: req.params.id });
    resp.send(result);
  }
});

// Verify Token
function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    console.log("midilware token", token);
    Jwt.verify(token, JwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "Pls provide token valid" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Pls add token with header" });
  }
  // console.log("aman token",token)
}

app.get("/", (req, resp) => {
  resp.json("server start")
})

const port = process.env.PORT || 5000

app.listen(port,() => {
  console.log(`app running at ${port}`);
});
