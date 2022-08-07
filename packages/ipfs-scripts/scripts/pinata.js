"use strict";

const fs = require("fs");
const path = require("path");
const pinataSDK = require("@pinata/sdk");
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

const upload = async () => {
  const pinata = pinataSDK(
    process.env.PINATA.split(":")[0],
    process.env.PINATA.split(":")[1]
  );
  const options = {
    pinataMetadata: {
      name: "Create IPFS App [" + new Date().toISOString() + "]",
    },
    pinataOptions: {
      cidVersion: 0,
      wrapWithDirectory: false,
    },
  };
  pinata
    .pinFromFS(path.join(process.cwd(), "build"), options)
    .then((result) => {
      console.log("");
      deployed();
      console.log("");
      console.log(
        gradient.cristal(`Brave Browser: ipfs://${result.IpfsHash}/`)
      );
      console.log("");
      console.log(
        gradient.cristal(
          `ALL Browsers: https://dweb.link/ipfs/${result.IpfsHash}/`
        )
      );
      console.log("");
    })
    .catch((err) => {
      console.log(err);
    });
};
upload();
