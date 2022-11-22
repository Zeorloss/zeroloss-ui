import BigNumber from "bignumber.js";
import type { CallSignerType } from "../../types";
import { getContract, getGoldCoinContract } from "../contractHelpers";
import { BIG_TEN } from "../bigNumber";
import erc20 from "../../config/abi/erc20.json";

export const claimAirdrop = async (signer: CallSignerType) => {
  const contract = getGoldCoinContract(signer);
  const value = new BigNumber("0.001").times(BIG_TEN.pow(18)).toJSON();
  const tx = await contract.claimAirdrop({ value });
  const receipt = await tx.wait();
  return receipt.status;
};

export const buyGoldCoin = async (amount: string, ref: string, signer: CallSignerType) => {
  const contract = getGoldCoinContract(signer);
  const value = new BigNumber(amount).times(BIG_TEN.pow(18)).toJSON();
  const tx = await contract.buyGoldenCoin(value, ref);
  const receipt = await tx.wait();
  return receipt.status;
};

// check if a user has allowed spending a token in a specified smart contract
export const checkTokenAllowance = async (
  account: string,
  contractAddress: string,
  tokenAddress: string,
  signer: CallSignerType,
) => {
  const contract = getContract(erc20, tokenAddress, signer);
  const { _hex } = await contract.allowance(account, contractAddress);
  return new BigNumber(_hex);
};
