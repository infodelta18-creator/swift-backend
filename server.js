const express = require("express");
const axios = require("axios");
const app = express();

const CHANNELS = {
  "1011": "https://stream8.cinerama.uz/1011/tracks-v1a1/playlist.m3u8",
  "1016": "https://stream8.cinerama.uz/1016/tracks-v1a1/mono.m3u8"
};

app.get("/api/watch/:id", async (req, res) => {
  const streamUrl = CHANNELS[req.params.id];
  if (!streamUrl) return res.status(404).send("Not found");

  const response = await axios.get(streamUrl);
  res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
  res.send(response.data);
});

app.listen(3000, () => console.log("Proxy running"));