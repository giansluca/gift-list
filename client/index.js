const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
    const merkleTree = new MerkleTree(niceList);
    //const root = merkleTree.getRoot();

    const indexToProve = 3;
    const proof = merkleTree.getProof(indexToProve);
    const leaf = niceList[indexToProve];

    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
        proof: proof,
        leaf: leaf,
    });

    console.log({ gift });
}

main();
