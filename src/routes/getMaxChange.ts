import express from 'express'
const router = express.Router();
import {Database} from '../db/models/index'



router.get('/', async function(req, res) {
  try{
    const result = await Database.query(
        `with bn as (select max(block_number) from "Transactions"),
        un as (select from_address as address, value * -1 as value from "Transactions" f
        where block_number >= (select * from bn) - 99 and block_number <= (select * from bn)
        union all
        select to_address, value from "Transactions" t
        where block_number >= (select * from bn) - 99 and block_number <= (select * from bn)
        ),
        ab as (select address, abs(sum(value)) as abs_change from un
        group by address)
        select  address, abs_change from ab
        where abs_change = (select max(abs_change) from ab)`
    )
    res.send(result[0])
  } catch (e) {
    res.status(500).json(e)
  }
});

export default router
