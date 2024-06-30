const hre = require("hardhat");

async function getBalances(address) {
    const balanceBigInt = await hre.ethers.provider.getBalance(address);
    return hre.ethers.formatEther(balanceBigInt);
}

async function consoleBalances(addresses) {
    let counter = 0;
    for (const address of addresses) {
        console.log(`Address ${counter} balaance:`, await getBalances(address));
        counter++;
    }
}

async function consoleMemos(memos) {
    for (const memo of memos) {
        const timestamp = memo.timestamp;
        const name = memo.name;
        const from = memo.from;
        const message = memo.message;
        console.log(`At ${timestamp},Name:${name},Address:${from},Message:${message}`);
    }
}

async function main() {
    const [owner, from1, from2, from3] = await hre.ethers.getSigners();
    const chai = await hre.ethers.getContractFactory("chai");
    const contract = await chai.deploy(); //instance of contract
    // const contract = await chai.deployed(); //instance of contract

    await contract.waitForDeployment();
    // await contract.deployed();
    console.log("Address of Contract:", contract.target);

    const addresses = [owner.address, from1.address, from2.address, from3.address];
    console.log("Before Buying Chai:");
    await consoleBalances(addresses);

    const amount = { value: hre.ethers.parseEther("1") }
    await contract.connect(from1).buyChai("from1", "Very Nice Chai", amount);
    await contract.connect(from2).buyChai("from2", "Very Nice Course", amount);
    await contract.connect(from3).buyChai("from3", "Very Nice Information", amount);

    console.log("After Buying Chai:");
    await consoleBalances(addresses);

    const memos = await contract.getMemos();
    consoleMemos(memos);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})