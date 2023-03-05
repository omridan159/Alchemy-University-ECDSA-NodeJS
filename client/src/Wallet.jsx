import server from './server';
import * as secp from 'ethereum-cryptography/secp256k1';
import * as utils from 'ethereum-cryptography/utils';

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
   async function onChange(evt) {
      const pk = evt.target.value;
      setPrivateKey(pk);

      const address = utils.toHex(secp.getPublicKey(pk));

      setAddress(address);

      if (address) {
         const {
            data: { balance }
         } = await server.get(`balance/${address}`);
         setBalance(balance);
      } else {
         setBalance(0);
      }
   }

   return (
      <div className="container wallet">
         <h1>Your Wallet</h1>

         <label>
            Private Key <input placeholder="Type an Private Key" value={privateKey} onChange={onChange}></input>
         </label>

         <div className="balance">Address: {address.slice(0, 10)}...</div>

         <div className="balance">Balance: {balance}</div>
      </div>
   );
}

export default Wallet;
