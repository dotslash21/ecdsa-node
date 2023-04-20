const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  // Private key: b755060cd5967d500ba0d9377a8e36bf53d569bd764bcf7b5cce12d7dc711e29
  // Public key: 02a694bfb6a33ae81703abb0d5923b4d35afb06d3af26602de7eef24c9f15a0e92
  bec0d590ac2872d1e89396e49c14016303076009: 100,

  // Private key: 11a1927c9c407fb552b03f43f1d715bb7da1be92d09939114c9ff84bfe7c4d90
  // Public key: 03225b7f566eba642e821761a1ccea2bdb69ccc09b38f9f5db866a79d76d16e1eb
  e12492c20b6dc8a3dddde7f59f8d5f54ce636941: 50,

  // Private key: ad2e8ccfcbee5aa47d22f6246755650673cf22f06f2a4d402c27be948c1e2624
  // Public key: 02036d0d1a793785cceed7f9e23f89f9bb0e6ef905361ab65682e9e406d1467484
  "012717a22a9cf397e5403afba1bb5fa13539af62": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // TODO: Get a signature from the sender and verify it

  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
