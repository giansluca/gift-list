const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
    const merkleTree = new MerkleTree(niceList);
    //const root = merkleTree.getRoot();
    const indexesToProve = [3, 12, 40, 125, 560];

    for (const index of indexesToProve) {
        const proof = merkleTree.getProof(index);
        const leaf = niceList[index];

        const { data: gift } = await axios.post(`${serverUrl}/gift`, {
            proof: proof,
            leaf: leaf,
        });

        console.log({ gift });
    }
}

main();
