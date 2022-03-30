const main = async () => {
  const charityFundingFactory = await hre.ethers.getContractFactory(
    "CharityFunding"
  );
  const charityFunding = await charityFundingFactory.deploy(
    1000,
    100000,
    "0x5429Fa166B6f8bfd3BD3De4027D5a458104ABb5e"
  );
  await charityFunding.deployed();

  console.log("Contract address:", charityFunding.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
