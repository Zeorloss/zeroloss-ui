import pancakePairAbi from '../config/abi/PancakePairABI.json';
import { addresses } from "../config"; 
import { getContract } from "../utils/contractHelpers";
import useActiveWeb3React from "./useActiveWeb3React";
import { BigNumber } from "bignumber.js";
import { BIG_TEN } from "../utils/bignumber";

  export default function useCalculateAPR(){

    const {library} = useActiveWeb3React();

    async function getBNBPriceUSD() {
      let BNBPrice = 0;
      const bnb = await fetch("https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd")
      // const bnb = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd");
      const res = await bnb.json();
      BNBPrice = res.binancecoin.usd;
      return BNBPrice
    }
        
    async function getLPPriceUSD(){
      // const {library} = useActiveWeb3React();
      const lpContract = getContract(pancakePairAbi, addresses.krlBNBLP[56], library?.getSigner());
      const [x, y, _temp] = await lpContract.getReserves();
      const reserve1 = new BigNumber(y._hex).times(BIG_TEN.pow(18)).toNumber();// amount of BNB in the LP CA
      const BNBPrice = await getBNBPriceUSD();
      const priceR1 = BNBPrice * reserve1;
      const LPValue = priceR1 * 2;
      console.log(priceR1);
      const supply = await lpContract.totalSupply();
      const totalLPSupply = new BigNumber(supply._hex).times(BIG_TEN.pow(18)).toNumber();// amount of BNB in the LP CA
      console.log(LPValue/totalLPSupply);
      return LPValue / totalLPSupply;
    }
    
    async function getZLTPriceUSD(){
      const lpContract = getContract(pancakePairAbi, addresses.krlBNBLP[56], library?.getSigner());
      const [x, y, _temp] = await lpContract.getReserves();
      const reserve0 = new BigNumber(x._hex).times(BIG_TEN.pow(18)).toNumber();// amount of ZLT in the LP CA
      const reserve1 = new BigNumber(y._hex).times(BIG_TEN.pow(18)).toNumber();// amount of BNB in the LP CA
      const BNBPrice = await getBNBPriceUSD();
      const priceR1 = BNBPrice * reserve1;
      console.log(priceR1/reserve0);
      return priceR1 / reserve0;
    }

    return {
      getLPPriceUSD,
      getZLTPriceUSD,
      getBNBPriceUSD,
    } 
  }





