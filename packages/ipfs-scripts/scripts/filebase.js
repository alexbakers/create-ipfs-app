const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const pack = require("ipfs-car/pack/fs");
const blockstore = require("ipfs-car/blockstore/fs");
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
  await pack.packToFs({
    input: path.join(process.cwd(), "build"),
    output: path.join(process.cwd(), "build.car"),
    blockstore: new blockstore.FsBlockStore(),
    wrapWithDirectory: false,
  });

  const s3 = new AWS.S3({
    accessKeyId: process.env.FILEBASE.split(":")[0],
    secretAccessKey: process.env.FILEBASE.split(":")[1],
    endpoint: "https://s3.filebase.com",
    region: "us-east-1",
    s3ForcePathStyle: true,
  });

  fs.readFile(path.join(process.cwd(), "build.car"), (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const params = {
      Bucket: process.env.FILEBASE.split(":")[2],
      Key: "Create IPFS App [" + new Date().toISOString() + "]",
      Metadata: { import: "car" },
      Body: data,
    };

    const request = s3.putObject(params);
    request.on("httpHeaders", (statusCode, headers) => {
      console.log("");
      deployed();
      console.log("");
      console.log(
        gradient.cristal(`Brave Browser: ipfs://${headers["x-amz-meta-cid"]}/`)
      );
      console.log("");
      console.log(
        gradient.cristal(
          `ALL Browsers: https://dweb.link/ipfs/${headers["x-amz-meta-cid"]}/`
        )
      );
      console.log("");
    });
    request.send();
  });
};

upload();
