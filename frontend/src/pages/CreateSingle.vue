<template>
  <div class="page-wrap">
    <!-- header  -->
    <header class="header-section has-header-main bg-pattern-3">
      <!-- Header main -->
      <HeaderMain></HeaderMain>
    </header>
    <!-- create -->
    <section class="create-section section-space-b pt-4 pt-md-5 mt-md-4">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="section-head-sm">
              <router-link
                :to="SectionData.createSingleData.path"
                class="btn-link fw-semibold"
                ><em class="ni ni-arrow-left"></em>
                {{ SectionData.createSingleData.btnText }}</router-link
              >
              <h1 class="mt-2">{{ SectionData.createSingleData.title }}</h1>
            </div>
          </div>
          <!-- end col -->
          <div class="col-lg-8">
            <form action="#" class="form-create mb-5 mb-lg-0">
              <div class="form-item mb-4">
                <h5 class="mb-3">Upload file</h5>
                <div class="file-upload-wrap">
                  <p class="file-name mb-4" id="file-name">
                    PNG, GIF, WEBP, MP4 or MP3. Max 100mb.
                  </p>
                  <input
                    id="file-upload"
                    class="file-upload-input"
                    data-target="file-name"
                    type="file"
                    @change="uploadFile"
                    hidden
                    ref="file"
                  />
                  <label for="file-upload" class="input-label btn btn-primary"
                    >Choose File</label
                  >
                </div>
                <p class="px-3 text-red">
                  <small v-if="errors.file">{{ errors.file }}</small>
                </p>
              </div>
              <!-- end form-item -->
              <!-- <div class="form-item mb-4">
                                <h5 class="mb-3">Select Method</h5>
                                <ul class="row g-3 nav nav-tabs nav-tabs-s2" id="myTab" role="tablist">
                                    <li class="nav-item col-4 col-sm-4 col-lg-3" role="presentation" v-for="list in SectionData.selectMethodTabNav" :key="list.id">
                                        <button class="nav-link" :class="list.isActive" :id="list.slug" data-bs-toggle="tab" :data-bs-target="list.bsTarget" type="button">
                                            <em class="ni nav-link-icon" :class="list.icon"></em>
                                            <span class="nav-link-title mt-1 d-block">{{list.title }}</span>
                                        </button>
                                    </li>
                                </ul>
                                <div class="tab-content mt-4" id="myTabContent">
                                    <div class="tab-pane fade show active" id="fixed-price" role="tabpanel" aria-labelledby="fixed-price-tab">
                                        <div class="form-create-tab-wrap">
                                            <label class="mb-2 form-label">Price</label>
                                            <input type="text" class="form-control form-control-s1" placeholder="Enter a price for item">
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="timed-auction" role="tabpanel" aria-labelledby="timed-auction-tab">
                                        <div class="form-create-tab-wrap">
                                            <label class="mb-2 form-label">Minimum bid</label>
                                            <input type="text" class="form-control form-control-s1" placeholder="Enter Minimum bid">
                                            <div class="row mt-3">
                                                <div class="col-lg-6">
                                                    <label class="mb-2 form-label">Starting date</label>
                                                    <input type="date" class="form-control form-control-s1">
                                                </div>
                                                <div class="col-lg-6">
                                                    <label class="mb-2 form-label">Expiration date</label>
                                                    <input type="date" class="form-control form-control-s1">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="open-for-bids" role="tabpanel" aria-labelledby="open-for-bids-tab">
                                        <div class="form-create-tab-wrap">
                                            <label class="mb-2 form-label">Minimum bid</label>
                                            <input type="text" class="form-control form-control-s1" placeholder="Enter Minimum bid">
                                        </div>
                                    </div>
                                </div>
                            </div> -->
              <!-- <div class="form-item mb-3">
                                <div class="switch-wrap">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="me-2">
                                            <h5 class="mb-1">Unlock once purchased</h5>
                                            <p class="form-text">Content will be unlocked after successful transaction</p>
                                        </div>
                                        <div class="form-check form-switch form-switch-s1">
                                            <input class="form-check-input checkbox-switcher" data-target="switch-content-unlock" type="checkbox">
                                        </div>
                                    </div>
                                    <div class="switch-content-unlock mt-4" id="switch-content-unlock">
                                        <input type="text" name="text" class="form-control form-control-s1" placeholder="Access key, code to redeem or link to a file...">
                                    </div>
                                </div>
                            </div> -->
              <div class="form-item mb-4">
                <h5 class="mb-1">Choose collection</h5>
                <p class="form-text mb-3">
                  This is the collection where your item will appear.
                </p>
                <!-- <v-select class="generic-select" v-model="selected" :options="options"></v-select> -->

                <v-select
                  v-model="NFTData.collection"
                  :options="collections"
                  label="name"
                ></v-select>
                <p class="px-3 text-red">
                  <small v-if="errors.collection">{{
                    errors.collection
                  }}</small>
                </p>
              </div>
              <!-- end form-item -->
              <div class="form-item mb-4">
                <div class="mb-4">
                  <label class="mb-2 form-label">Name</label>
                  <input
                    type="text"
                    class="form-control form-control-s1"
                    v-model="NFTData.name"
                    placeholder="e. g. Redeemable T-Shirt with logo"
                  />
                  <p class="px-3 text-red">
                    <small v-if="errors.name">{{ errors.name }}</small>
                  </p>
                </div>
                <div class="mb-4">
                  <label class="mb-2 form-label">Description</label>
                  <textarea
                    name="message"
                    class="form-control form-control-s1"
                    v-model="NFTData.description"
                    placeholder="e. g. After purchasing you’ll be able to get the real T-Shirt"
                  ></textarea>
                  <p class="px-3 text-red">
                    <small v-if="errors.description">{{
                      errors.description
                    }}</small>
                  </p>
                </div>


                <!-- Attribute -->
                <div class="mb-4">
                  <label class="mb-2 form-label">Attributes</label>
                    <div v-if="this.NFTData.attributes.length" >

                      <div v-for="item of this.NFTData.attributes" v-bind:key="item">

                        <div class="btns-group d-flex" >
                          <div class="flex-grow-1">
                            <input
                              type="text"
                              class="form-control form-control-s1"
                              v-model="item[0]"
                              placeholder="Trait Type"
                            />
                          </div>
                          <div class="flex-grow-1">
                            <input
                              type="text"
                              class="form-control form-control-s1"
                              v-model="item[1]"
                              placeholder="Value"
                            />
                          </div>
                        </div>

                      </div>

                    </div>
                    <div v-else></div>

                  <p class="px-3 text-red">
                    <small v-if="errors.attribute">{{
                      errors.attributes
                    }}</small>
                  </p>

                  <button
                    class="btn btn-primary"
                    type="button"
                    v-on:click="addAttribute"
                    v-if="!isLoading"
                  >
                    + Add attribute
                  </button>
                </div>
                
                <!-- <div class="mb-3">
                                    <label class="mb-2 form-label">Royalties</label>
                                    <input type="text" class="form-control form-control-s1" placeholder="e.g 10%">
                                    <p class="form-text mt-1">Suggested: 0, 10%, 20%, 30%. Maximum is 70%</p>
                                </div> -->
              </div>
              <!-- end form-item -->
              <button
                class="btn btn-primary"
                type="button"
                v-on:click="createNFT"
                v-if="!isLoading"
              >
                Create Item
              </button>
              <button class="btn btn-primary" type="button" disabled v-else>
                Loading...
              </button>
            </form>
          </div>
          <!-- endn col -->
        </div>
        <!-- row-->
      </div>
      <!-- container -->
    </section>
    <!-- create-section -->
    <!-- Footer  -->
    <Footer></Footer>
  </div>
  <!-- end page-wrap -->
</template>

<script>

import { mapState, mapGetters, mapActions } from "vuex";
import Web3 from "web3";
// Import component data. You can change the data in the store to reflect in all component
import SectionData from "@/store/store.js";
import NFTService from "@/services/nft.service.js";
import CollectionService from "@/services/collection.service.js";

import { 
  ERC721NFT_json,
  SolanaNFT_json,
  NFTMintprogramId,
  TOKEN_METADATA_PROGRAM_ID
} from "@/constants/constant.js";


import * as anchor from "@project-serum/anchor";

import { 
  MintLayout, Token, 
  TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID 
} from "@solana/spl-token";

import {
  Keypair,
  PublicKey,
  Transaction,
  Connection,
  clusterApiUrl,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";

export async function getAssociateTokenAddress(mint, owner) {
  let [address] = await PublicKey.findProgramAddress(
    [owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
    ASSOCIATED_TOKEN_PROGRAM_ID,
  );
  return address;
}


async function sendTransaction(transaction, signers) {
  const wallet = window.solana;
  const preflightCommitment = '"finalized"'
  const commitment = '"finalized"'
  const connection = new Connection(clusterApiUrl('devnet'))
  const provider = new anchor.Provider(connection, wallet, { preflightCommitment, commitment })
  const owner = provider.wallet;
  
  try{
    transaction.feePayer = owner.publicKey
    transaction.recentBlockhash = (await connection.getRecentBlockhash('max')).blockhash;
    transaction.setSigners(owner.publicKey,...signers.map(s => s.publicKey));
    if(signers.length !== 0)
      await transaction.partialSign(...signers)
    const signedTransaction = await owner.signTransaction(transaction);
    let hash = await connection.sendRawTransaction(await signedTransaction.serialize());
    await connection.confirmTransaction(hash);
    // Store.addNotification({
    console.log({
      title: "Success",
      message: "Success",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 1000,
        onScreen: true
      }
    });
  } catch(err) {
    console.log(err)
    // Store.addNotification({
    console.log({
      title: "ERROR",
      message: "Error",
      type: "warning",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 1000,
        onScreen: true
      }
    });
  }
}


export default {
  name: "CreateSingle",
  data() {
    return {
      SectionData,
      collections: [],
      NFTData: {
        name: null,
        description: null,
        file: null,
        collection: null,
        attributes: [],
      },
      errors: {
        collection: null,
      },
      isLoading: false,
    };
  },
  computed: {
    ...mapState(["auth"]),
    ...mapGetters({ currentChain: ["auth/currentChain"] }),
  },
  async mounted() {
    /*==============File upload =============== */
    function fileUpload(selector) {
      let elem = document.querySelectorAll(selector);
      if (elem.length > 0) {
        elem.forEach((item) => {
          item.addEventListener("change", function () {
            var target = document.getElementById(item.dataset.target);
            var allowedExtensions = ["jpg", "png", "gif", "webp", "mp4", "mp3"];
            var fileExtension = this.value.split(".").pop();
            var lastDot = this.value.lastIndexOf(".");
            var ext = this.value.substring(lastDot + 1);
            var extTxt = (target.value = ext);

            if (!allowedExtensions.includes(fileExtension)) {
              alert(
                extTxt +
                  " file type not allowed, Please upload jpg, png, gif, webp, mp4 or mp3 file"
              );
              target.innerHTML =
                "Please upload jpg, png, gif, webp, mp4 or mp3 file";
            } else {
              target.innerHTML = item.files[0].name;
            }
          });
        });
      }
    }

    fileUpload(".file-upload-input");

    /*  ============== Unlock once purchased Checkbox switcher ============= */
    function checkboxSwitcher(selector) {
      let elem = document.querySelectorAll(selector);
      if (elem.length > 0) {
        elem.forEach((item) => {
          item.addEventListener("change", function () {
            let target = document.getElementById(item.dataset.target);
            if (this.checked) {
              target.classList.add("is-shown");
            } else {
              target.classList.remove("is-shown");
            }
          });
        });
      }
    }

    checkboxSwitcher(".checkbox-switcher");

    const _colletions = await CollectionService.getCollections(
      this.auth.user.address,
      this.auth.user.chain
    );
    this.collections = _colletions;
    if ((await this.currentChain()) == "ethereum") {
      this.collections = _colletions.filter(item => item.type == "721");
    } else if ((await this.currentChain()) == "solana") {
      this.collections = _colletions.filter(item => item.type == "single");
    } else {
      this.collections = [];
    }
    // this.collections = ["Select"];
  },
  methods: {
    ...mapActions({
      loginWithPhantom: "auth/loginWithPhantom",
      getCollections: "collection/getCollections",
    }),
    uploadFile() {
      this.NFTData.file = this.$refs.file.files[0];
    },
    addAttribute() {
      const attr = this.NFTData.attributes;
      attr.push(["", ""]);
      this.NFTData.attributes = attr;
      console.log(this.NFTData.attributes);
    },
    async createNFT() {
      this.errors = {};
      if (this.NFTData.file == null) {
        this.errors.file = "Please select file";
        return false;
      }
      if (this.NFTData.collection == null) {
        this.errors.collection = "Please select collection.";
        return false;
      }
      if (!this.NFTData.name) {
        this.errors.name = "Please select file";
        return false;
      }
      if (!this.NFTData.description) {
        this.errors.description = "Please select file";
        return false;
      }
      if (this.NFTData.attributes.length != 0) {
        this.NFTData.attributes.map(item => {
          if(item.trait_type == "" || item.value == "")
          {
            this.errors.attributes = "Please input attributes";
            return false;
          }
        })
      }

      this.isLoading = true;

      const formData = new FormData();
      console.log("========================================================");
      // console.log("File : ", this.NFTData.file);
      // console.log("Name : ", this.NFTData.name);
      // console.log("description : ", this.NFTData.description);
      // console.log("ID : ", this.NFTData.collection._id);
      // console.log("Collection : ", this.NFTData.collection.name);
      // console.log("symbol : ", this.collection.symbol);

      if ((await this.currentChain()) == "ethereum") {
        // Create web3.
        console.log("Create an NFT on ETH chain")

        let web3 = new Web3(window.ethereum);
        let contract = new web3.eth.Contract(
          ERC721NFT_json.abi,
          this.NFTData.collection.contract_address
        );

        const supply = await contract.methods.supply().call();

        formData.append("file", this.NFTData.file);
        formData.append("name", this.NFTData.name);
        formData.append("description", this.NFTData.description);
        formData.append("collection_id", this.NFTData.collection._id);
        formData.append("collection_name", this.NFTData.collection.name);
        formData.append("collection_symbol", this.NFTData.collection.symbol);
        
        formData.append("creater", this.auth.user.address);
        formData.append("chain", this.auth.user.chain);
        formData.append("tokenId", supply);

        const response = await NFTService.createNFT(formData);

        if (!response.errors) {
          console.log(response.errors);
          this.errors = response.errors;
          this.isLoading = false;
          return;
        } else {
          // Call Mint Function
          contract.methods
            .mint(
              this.auth.user.address,
              supply,
              10,
              "" + response._newNFT.metadata_url
            )
            .send({ from: this.auth.user.address })
            .once("error", (err) => {
              console.log(err, "Error");
              this.isLoading = false;
            })
            .then(async (receipt) => {
              console.log(receipt);

              const response1 = await NFTService.verifyNFT(
                response._newNFT._id
              );
              console.log(response1);

              this.isLoading = false;
              alert("NFT created successfully!");
              this.$router.push(
                "/collection/" + this.NFTData.collection.shortUrl
              );
            })
            .catch(err => {
              console.log(err);
              this.isLoading = false;
            });
        }
        } else if ((await this.currentChain()) == "solana") {
          if(this.auth.user.address.length != 0)
          {
          console.log(this.NFTData.collection.contract_address);
          const { solana } = window;
          const solanaRes = await solana.connect();
          this.phantomWallet = solanaRes.publicKey.toString();
          const wallet = window.solana;
          console.log("Wallet Address: ", this.phantomWallet)

          const preflightCommitment = "finalized"
          const commitment = "finalized"
          
          const connection = new Connection(clusterApiUrl('devnet'))
          
          const provider = new anchor.Provider(connection, wallet, { preflightCommitment, commitment })
          const program = new anchor.Program(SolanaNFT_json, NFTMintprogramId, provider)
          const owner = provider.wallet.publicKey;
          this.phantomWallet = owner;
          
          formData.append("file", this.NFTData.file);
          formData.append("name", this.NFTData.name);
          formData.append("description", this.NFTData.description);
          formData.append("collection_id", this.NFTData.collection._id);
          formData.append("collection_name", this.NFTData.collection.name);
          formData.append("collection_symbol", this.NFTData.collection.symbol);
          
          let attr = [];
          this.NFTData.attributes.map(item => attr.push({"trait_type": item[0],"value": item[1]}));
          formData.append("collection_attributes", attr)
          
          formData.append("creater", this.auth.user.address);
          formData.append("chain", this.auth.user.chain);
          
          const mintRent = await connection.getMinimumBalanceForRentExemption(MintLayout.span)

          const supply = (await program.account.collection.fetch(new PublicKey(this.NFTData.collection.contract_address.toString()))).currentSupply.toNumber();
          formData.append("tokenId", supply);

          formData.append("contract_address", NFTMintprogramId);
          formData.append("chain", this.auth.user.chain);
          formData.append("owner", owner);
          formData.append("collection_id", new PublicKey(this.NFTData.collection.contract_address.toString()));

          await NFTService.createAttr(attr).then(() => console.log());

          await NFTService.createNFT(formData).then(async (res) => {
            console.log(res);

            const mint = Keypair.generate();
            let ata = await getAssociateTokenAddress(mint.publicKey, owner);
            let metadata = (await PublicKey.findProgramAddress([Buffer.from('metadata'),TOKEN_METADATA_PROGRAM_ID.toBuffer(),mint.publicKey.toBuffer()],TOKEN_METADATA_PROGRAM_ID))[0]
            let master_edition = (await PublicKey.findProgramAddress([Buffer.from('metadata'),TOKEN_METADATA_PROGRAM_ID.toBuffer(),mint.publicKey.toBuffer(),Buffer.from('edition')],TOKEN_METADATA_PROGRAM_ID))[0]

            let data = res.metadata;
            console.log(data);
            data.creators[0].address = owner
            let transaction = new Transaction()
            transaction.add(
              SystemProgram.createAccount({
                fromPubkey: owner,
                newAccountPubkey: mint.publicKey,
                lamports: mintRent,
                space: MintLayout.span,
                programId: TOKEN_PROGRAM_ID
              })
            )
        
            transaction.add(
              Token.createInitMintInstruction(
                TOKEN_PROGRAM_ID,
                mint.publicKey,
                0,
                owner,
                owner
              )
            )
        
            transaction.add(
              Token.createAssociatedTokenAccountInstruction(
                ASSOCIATED_TOKEN_PROGRAM_ID,
                TOKEN_PROGRAM_ID,
                mint.publicKey,
                ata,
                owner,
                owner,
              )
            )
            // data.creators[0].address = new PublicKey(data.creators[0].address);
            console.log(data);
            
            transaction.add(
              program.instruction.mintNft(
                data,
                {
                  accounts: {
                    owner: owner,
                    collection: new PublicKey(this.NFTData.collection.contract_address.toString()),
                    mint: mint.publicKey,
                    tokenAccount: ata,
                    metadata: metadata,
                    masterEdition: master_edition,
                    tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    systemProgram: anchor.web3.SystemProgram.programId,
                    rent: SYSVAR_RENT_PUBKEY
                  }
                }
              )
            )

            await sendTransaction(transaction, [mint]).then(() => 
              {
                console.log("Mint Success!!!!!!!!")
                this.isLoading = false;
                alert("NFT created successfully!");
                this.$router.push(
                  "/collection/" + this.NFTData.collection.shortUrl
                );
              }
            ).catch(err => {
              console.log(err)
              console.log("Mint Failed!!!!!!!!")
              this.isLoading = false;
              alert("NFT not created!");
            });
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
          })
          
        }
      } else {
        alert("Connect your wallet!");
        this.isLoading = false;
        return 0;
      }
    },
  },
};
</script>

<!-- Collection address -->
<!-- CyUYpd9FniZEE4hPqVq81zf6w3tSySARAjVcfQGGnYvP -->
