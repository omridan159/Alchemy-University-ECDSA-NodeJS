const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
   '04975bfefbeb3181137a19895e607bb7a25721b943d9b6cc36f2d97fff1fd831d3938d153d8efe8a77c0710c964093735d11785d0b3870ebe0ba4df38d561c5db6': 100,
   '040a0e280a621e632dc2ad3a93ae543f0270fda83a007b71ce8afcd27a015d5fe42f766c50cd2274a44339a18bef51334fb02a4cff913ecfce980b68c705e5015f': 50,
   '04881d443a996597b9b0892af69bd7947faf379b34d6116261f5aa593b8021ff40e1c910e26111ceee1e238eaff42d8ea7dcc25747ad0c9509bbe6d4fac2a8cce7': 75
};

app.get('/balance/:address', (req, res) => {
   const { address } = req.params;
   const balance = balances[address] || 0;
   res.send({ balance });
});

app.post('/send', (req, res) => {
   const { sender, recipient, amount } = req.body;

   setInitialBalance(sender);
   setInitialBalance(recipient);

   if (balances[sender] < amount) {
      res.status(400).send({ message: 'Not enough funds!' });
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
