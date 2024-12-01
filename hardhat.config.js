require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`0xac89611e207ebb599e9ce1b1c3b400eda788bfbb1b6790c5bc6c4bb2f91490d4`],
    },
  },
};
