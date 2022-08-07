"use strict";

const fs = require("fs");
const path = require("path");
const axios = require("axios");
const glob = require("glob");
const gradient = require("gradient-string");

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err) => {
  throw err;
});

const dotenvFiles = [`.env`].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    require("dotenv-expand")(
      require("dotenv").config({
        path: dotenvFile,
      })
    );
  }
});

function deployed() {
  console.log(
    gradient.rainbow.multiline("     _            _                      _ ")
  );
  console.log(
    gradient.rainbow.multiline("  __| | ___ _ __ | | ___  _   _  ___  __| |")
  );
  console.log(
    gradient.rainbow.multiline(
      " / _` |/ _ \\ '_ \\| |/ _ \\| | | |/ _ \\/ _` |"
    )
  );
  console.log(
    gradient.rainbow.multiline("| (_| |  __/ |_) | | (_) | |_| |  __/ (_| |")
  );
  console.log(
    gradient.rainbow.multiline(
      " \\__,_|\\___| .__/|_|\\___/ \\__, |\\___|\\__,_|"
    )
  );
  console.log(
    gradient.rainbow.multiline("           |_|            |___/            ")
  );
}

glob(
  "**/*",
  { cwd: path.join(process.cwd(), "build"), nodir: true },
  function (err, files) {
    if (err) {
      console.log("Error", err);
    } else {
      if (!files || !files.length) {
        return console.log("Not build dir");
      }
      const ipfsArray = [];
      const promises = [];
      files.forEach((file) => {
        promises.push(
          new Promise((res, rej) => {
            fs.readFile(
              path.join(process.cwd(), "build", file),
              (err, data) => {
                if (err) rej();
                ipfsArray.push({
                  path: file,
                  content: data.toString("base64"),
                });
                res();
              }
            );
          })
        );
      });
      Promise.all(promises).then(() => {
        axios
          .post(
            "https://deep-index.moralis.io/api/v2/ipfs/uploadFolder",
            ipfsArray,
            {
              headers: {
                "X-API-KEY": process.env.MORALIS,
                "Content-Type": "application/json",
                accept: "application/json",
              },
            }
          )
          .then((res) => {
            if (res.data[0] && res.data[0].path) {
              const ipfs = res.data[0].path.split("/ipfs/")[1];
              const cid = ipfs.split("/")[0];
              console.log("");
              deployed();
              console.log("");
              console.log(gradient.cristal(`Brave Browser: ipfs://${cid}/`));
              console.log("");
              console.log(
                gradient.cristal(`ALL Browsers: https://dweb.link/ipfs/${cid}/`)
              );
              console.log("");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }
);
