const path = require('path')
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require('axios');
const s3Url = "https://s3.ap-northeast-2.amazonaws.com/gling.co.kr";
const serverUrl = process.env.NODE_ENV === "production" ? "https://testapi.gling.co.kr" : "http://localhost:4000";

app.use(express.static(path.join(__dirname, "./build")));
app.use(express.json());

app.use(
  "/api/", async (req, res, next)=>{
    console.log("req.body", req.body)
    const result = (await axios.post(`${serverUrl}${req.url}`, req.body)).data;
    console.log("result", result)
    res.status(200).json(result)
    next(); 
  }
);
app.use(
  "/file/", async (req, res, next)=>{
    console.log("file", req.url);
    const result = (await axios.post(`${serverUrl}${req.url}`, req.body)).data;
    res.status(200).json(result)
    next();
  }
);
app.use(
  "/s3/", async (req, res, next)=>{
    console.log("s3", req.url);
    const result = (await axios.post(`${s3Url}${req.url}`, req.body)).data;
    res.status(200).json(result)
    next();
  }
);
app.use(
  "/user/social/*/**", async (req, res, next)=>{
    console.log("s3", req.url);
    const result = (await axios.post(`${serverUrl}${req.url}`, req.body)).data;
    res.status(200).json(result)
    next();
  }
);
app.use(
  "/kcp/", async (req, res, next)=>{
    console.log("kcp", req.url);
    const result = (await axios.post(`${serverUrl}${req.url}`, req.body)).data;
    res.status(200).json(result)
    next();
  }
);

app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

app.listen(PORT, () => console.log(`port ${PORT}`));