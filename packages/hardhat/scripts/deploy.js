const { ethers } = require("hardhat");

async function main() {
  // Load the marketplace contract artifacts
  const MarketplaceFactory = await ethers.getContractFactory(
    "Marketplace"
  );

  // Deploy the contract
  const MarketplaceContract = await MarketplaceFactory.deploy();

  // Wait for deployment to finish
  await MarketplaceContract.deployed();

  // Log the address of the new contract
  console.log(
    "Marketplace deployed to:",
    MarketplaceContract.address
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });