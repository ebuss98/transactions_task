import axios from "axios";
import {Transaction} from '../db/models/index'
import config from '../config/config.json'
import sequelize from "sequelize";


const apiURL = config.apiUrl + 'api?module=proxy&action=eth_blockNumber&apikey=' + config.apiKey

async function getLastBlockInfo() : Promise<string> {
    let lastBlockInfo = await Transaction.findAll({attributes: [[sequelize.fn('MAX', sequelize.col('block_number')), "alias"]]})
    if (lastBlockInfo[0].getDataValue("alias")) {
        return '0x' + lastBlockInfo[0].getDataValue("alias").toString(16)
    } else return null
}
async function insertTransactionsInfo(): Promise<Function> {
    try {
        let res = await axios.get(apiURL)
        let lastBlock = await getLastBlockInfo() || '0x963075'
        console.log('last block in db: ', lastBlock)
        if (res.status != 200) {
            console.log(res.data);
            await new Promise(resolve => setTimeout(resolve, 200));
            return insertTransactionsInfo();
        } else {
            let currentBlock = res.data.result
            console.log('current block: ', currentBlock)
            if (!isNaN(parseInt(currentBlock, 16))) {
                if (currentBlock !== lastBlock) {
                    let block = parseInt(lastBlock, 16) + 1;
                    for (block; block <= parseInt(currentBlock, 16); block++) {
                        console.log('writing data in db... block: 0x' + block.toString(16))
                        let queryInfo = await axios.get(
                            config.apiUrl + `api?module=proxy&action=eth_getBlockByNumber&tag=${'0x' + block.toString(16)}&boolean=true&apikey=` + config.apiKey)
                        await Promise.all(queryInfo.data.result.transactions.map(elem => {
                            return Transaction.create({
                                block_number: block,
                                from_address: elem.from,
                                to_address: elem.to,
                                value: parseInt(elem.value, 16) / 1000000000000000000
                            })

                        }))
                    }
                    lastBlock = currentBlock
                }

            }
            await new Promise(resolve => setTimeout(resolve, 200));
            return insertTransactionsInfo();
        }
    } catch (e) {
        console.log(e)
    }
}

export default insertTransactionsInfo