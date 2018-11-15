const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./Block.js');
const BlockchainClass = require('./Blockchain.js');

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} server 
     */
    constructor(server) {
        this.server = server;
        this.chain = new BlockchainClass.Blockchain();
        this.initializeMockData(this.chain);
        this.getBlockByIndex();
        this.postNewBlock();
    }

    /**
     * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
     */
    getBlockByIndex() {
        this.server.route({
            method: 'GET',
            path: '/block/{index}',
            config: {
                handler: async (request, h) => {
                    try {
                        const block = await this.chain.getBlock(request.params.index);
                        let block_str = JSON.stringify(block).toString();
                        return h.response(JSON.parse(block_str)).code(200);
                    } catch (err) {
                        return h.response(err).code(404);
                    }
                }
            }        
        });
    }

    /**
     * Implement a POST Endpoint to add a new Block, url: "/api/block"
     */
    postNewBlock() {
        this.server.route({
            method: 'POST',
            path: '/block',
            handler: async (request, h) => {
                if (request.payload === null) {
                    return h.response('Missing input json in Body').code(400);
                }
                if (request.payload.body === void 0) {
;                    return h.response('No body field in input json').code(400);
                }
                let blockAux = new BlockClass.Block(request.payload.body);
                try {
                    blockAux.height = await this.chain.getBlockHeight();
                    blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
                    const result = await this.chain.addBlock(blockAux);
                    console.log(result);;                     
                    return h.response(result).code(201);
                } catch (err) {
                    return h.response(err).code(500);
                } 
            }
        });
    }

    /**
     * Help method to inizialized Mock dataset, adds 10 test blocks to the blocks array
     */
    async initializeMockData(chain) {
        for (let index = 1; index <= 10; index++) {                
            let blockAux = new BlockClass.Block(`Test Data #${index}`);
            try {
                let result = await chain.addBlock(blockAux);
                console.log(result);
            } catch (err) {
            }
        }
        //this.chain.validateChain();
    }
    
}

/**
 * Exporting the BlockController class
 * @param {*} server 
 */
module.exports = (server) => { return new BlockController(server);}