const express = require('express');
const router = express.Router();

const Collection = require('../../models/Collection');
const NFT = require('../../models/Nft');

const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const ipfsAPI = require('ipfs-api');
const { listeners } = require('process');
const ipfs = ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' });

let attribute = [];

router.post('/createAttr', async (req, res) => {
  attribute = [];
  try {
    const { attr } = req.body;
    attribute = attr;
    res.json(attribute);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
})


// @route    POST api/collection/createCollection
// @desc     Create Collection
// @access   Public
router.post('/createNFT', async (req, res) => {

  // const form = formidable({ multiples: true });
  const form = new formidable.IncomingForm();

  try {
    // To Do
    form.parse(req, async function (err, fields, files) {
      let _nft = new NFT({
        name: fields.name,
        description: fields.description,
        file: '',
        ipfs_path: '',
        chain: fields.chain,
        creater: fields.creater,
        owner: fields.owner,
        tokenId: fields.tokenId,
        collection_id: fields.collection_id,
        collection_name: fields.collection_name,
        collection_symbol: fields.collection_symbol,
        contract_address: fields.contract_address,
      });
      console.log("NFT Data --- ", _nft);

      if (files.file) {
        const oldpath = files.file.filepath;
        const cTimestamp = Date.now();
        const fileName = cTimestamp + path.extname(files.file.originalFilename);
        const newpath = './../frontend/public/files/nfts/file/' + fileName;
        const readStream = fs.createReadStream(oldpath);
        const writeStream = fs.createWriteStream(newpath);
        readStream.pipe(writeStream)

        readStream.on('end', () => {
          fs.unlinkSync(oldpath);
          console.log("File pasted to", path.resolve(newpath));

          // Upload File to IPFS
          let uploadFile = fs.readFileSync(newpath);
          let tempBuffer = Buffer.from(uploadFile);
          ipfs.files.add(tempBuffer, async (err, file) => {
            if (err) {
              console.log("------------------------------ ERROR -----------------------------")
              console.log(err);
            }

            _nft.ipfs_path = file[0].hash;
            // _nft.ipfs_path = "ipfs_file_path";
            _nft.file = fileName;

            let metadata;
            // Metadata Generate
            if(_nft.chain == "ethereum") {
              metadata = {
                name: _nft.name,
                description: _nft.description,
                image: 'https://ipfs.io/ipfs/' + _nft.ipfs_path,
                animation_url: '',
                external_url: ''
              };
            } else if(_nft.chain == "solana") {
              metadata = {
                name: _nft.name,
                symbol: _nft.collection_symbol,
                description: _nft.description,
                uri: 'https://ipfs.io/ipfs/' + _nft.ipfs_path,
                sellerFeeBasisPoints: 350,
                creators: [
                  {address: _nft.creater, verified: false, share: 100}
                ],
                collection: {name: _nft.name, family: _nft.symbol},
                attributes: attribute,
                isMutable: true,
              }
              console.log("Metadata URI --------------------------------", metadata.uri)
            } else {
              return console.log("Change your chain to ETH or SOL");
            }
            console.log(_nft.chain, "Meta data", metadata);
            const jsonString = JSON.stringify(metadata);

            fs.writeFile(
              path.resolve('./../frontend/public/files/nfts/metadata/' + cTimestamp + '.json'),
              jsonString,
              async (err) => {
                if (err) {
                  console.log('Error writing file', err);
                } else {
                  // Upload Metadata to IPFS
                  let uploadJSON = fs.readFileSync(
                    path.resolve('./../frontend/public/files/nfts/metadata/' + cTimestamp + '.json'),
                  );
                  let tempMetadataBuffer = Buffer.from(uploadJSON);
                  ipfs.files.add(
                    tempMetadataBuffer,
                    async function (err, file_metadata) {
                      if (err) {
                        console.log(err);
                      }

                  _nft.metadata_url = file_metadata[0].hash;
                  // _nft.metadata_url = "file_metadata[0].hash";

                  console.log('create new NFT', _nft);
                  const _newNFT = await _nft.save();
                  return res.status(200).json({ _newNFT, metadata });
                  }
                  );
                }
              }
            );
          });
        });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/getNFTs', async (req, res) => {
  try {
    const collection_id = req.query.collection_id;
    const chain = req.query.chain;
    const address = req.query.address;

    const search = {};

    if (collection_id) {
      search.collection_id = collection_id;
    }
    if (chain) {
      search.chain = chain;
    }
    if (address) {
      search.owner = address;
    }

    console.log('search', search);

    const NFTs = await NFT.find(search);
    res.json(NFTs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.get('/getNFTData/:_id', async (req, res) => {
  try {
    const NFTData = await NFT.findById(req.params._id);
    res.json(NFTData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.post('/verifyNFT', async (req, res) => {
  try {
    const { _id, contract_address } = req.body;

    let nft = await NFT.findOne({ _id: _id });

    let collectinFields = {
      status: 1
    };
    if (nft) {
      // Using upsert option (creates new doc if no match is found):
      nft = await NFT.findOneAndUpdate(
        { _id: _id },
        { $set: collectinFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      return res.json(nft);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.post('/listItem', async (req, res) => {
  try {
    let { nft, user } = req.body;

    let collectinFields = {
      status: 2,
      price: nft.price,
      updated_at: new Date()
    };

    if (nft) {
      // Using upsert option (creates new doc if no match is found):
      nft = await NFT.findOneAndUpdate(
        { _id: nft._id },
        { $set: collectinFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      return res.json(nft);
    } else {
      res.status(400).json({ msg: 'not found NFT' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.post('/cancelListing', async (req, res) => {
  try {
    let { nft, user } = req.body;

    let collectinFields = {
      status: 1,
      price: 0,
      updated_at: new Date()
    };

    if (nft) {
      // Using upsert option (creates new doc if no match is found):
      nft = await NFT.findOneAndUpdate(
        { _id: nft._id },
        { $set: collectinFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      return res.json(nft);
    } else {
      res.status(400).json({ msg: 'not found NFT' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.post('/buyItem', async (req, res) => {
  try {
    let { nft, user } = req.body;

    let collectinFields = {
      status: 1,
      price: 0,
      updated_at: new Date(),
      owner: user.address
    };

    if (nft) {
      // Using upsert option (creates new doc if no match is found):
      nft = await NFT.findOneAndUpdate(
        { _id: nft._id },
        { $set: collectinFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      return res.json(nft);
    } else {
      res.status(400).json({ msg: 'not found NFT' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
