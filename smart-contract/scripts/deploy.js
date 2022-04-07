const main = async () => {
  const charityFundingFactory = await hre.ethers.getContractFactory(
    "FundingCreator"
  );
  const creator = await charityFundingFactory.deploy();
  await creator.deployed();

  const charityFunding = await hre.ethers.getContractFactory("CharityFunding");
  const fundraise = await charityFunding.deploy(
    1,
    1000,
    "0x0834a891A7a4160678bfbc1Ef95Ad40231893a4b",
    "title",
    "description",
    "hhtp"
  );
  await fundraise.deployed();

  console.log("Contract factory address:", creator.address);
  console.log("Contract address:", fundraise.address);
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
