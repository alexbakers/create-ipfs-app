# Create IPFS App

<img alt="Create IPFS App" src="public/create-ipfs-app.png" />

<img alt="IPFS" align="right" src="public/ipfs.svg" width="20%" />

Create IPFS apps with no build configuration (like create-react-app).

<a href="https://web3.storage"><img alt="Web3.Storage" align="right" src="public/web3.png" width="8%" /></a>
<a href="https://moralis.io"><img alt="Moralis.Io" align="right" src="public/moralis.png" width="10%" /></a>

Create IPFS App works on macOS, Windows, and Linux.<br>
If something doesn’t work, please [file an issue](https://github.com/alexbakers/create-ipfs-app/issues/new).<br>
If you have questions or need help, please ask in [GitHub Discussions](https://github.com/alexbakers/create-ipfs-app/discussions).

## Quick Overview

To create a new IPFS app, you may choose one of the following methods:

### NPX

```sh
npx create-ipfs-app my-ipfs-app --web3 WEB3_STORAGE_API_TOKEN
```

### YARN

```sh
yarn create ipfs-app my-ipfs-app --moralis MORALIS_WEB3_API_KEY
```

<img alt="Create IPFS App Success" src="public/success.png" />

Once the installation is done, you can open your project folder:

```sh
cd my-ipfs-app
```

Inside the newly created project, you can run some built-in commands:

### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test` or `yarn test`

Runs the test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
Your app is ready to be deployed.

### `npm run deploy:service` or `yarn deploy:service`

<img alt="Create IPFS App Deployed" src="public/deployed.png" />

- `deploy:web3` - deploy to <a href="https://web3.storage">web3.storage</a>
- `deploy:moralis` - deploy to <a href="https://moralis.io">moralis.io</a>

In a few seconds, your application will be deployed on the decentralized network.<br>

- Open `ipfs://Q.../index.html` to view it in the Brave browser.
- Open `https://dweb.link/ipfs/Q.../index.html` to view it in the ALL browsers.

If you see a white screen instead of a website:

- Add to package.json `"homepage": "."`;
- Build the project;
- Deploy it again.

# TODO

- [x] web3.storage
- [x] moralis.io
- [ ] infura.io
- [ ] pinata.cloud
- [ ] framework agnostic (vue, svelte, ...)
