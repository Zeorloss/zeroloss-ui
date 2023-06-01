import React, { Fragment, useEffect, useState, useCallback } from 'react';
import Layout from '../components/Layout';
import { BigNumber as BigNumberEth, Signer, Contract, ethers } from 'ethers';
import useApproveToken from '../hooks/useApproveToken';
import { getContract, getKRLZLTContract, } from '../utils/contractHelpers';
import useActiveWeb3React from '../hooks/useActiveWeb3React';
import { getZltSaleAddress, getCfycSaleAddress, getAddress, getKrlZltLPAddress } from '../utils/addressHelpers';
import ConnectWalletButton from '../components/Buttons/ConnectWalletButton';
import { useAppContext } from '../hooks/useAppContext';
import erc20 from "../config/abi/erc20.json";
import zltkrllp from "../config/abi/zltkrlLPstaking.json";
import krl from "../config/abi/krlPool2.json";
import { addresses } from '../config';
import { BIG_TEN } from '../utils/bignumber';
import BigNumber from "bignumber.js";
import { MaxUint256 } from "@ethersproject/constants";


type Props = {}

const stake = (props: Props) => {
    const [zltBal, setZltBal] = useState(0);
    const [stakedBal, setStakedBal] = useState<number | ethers.BigNumber>(0);
    const [decimals, setDecimal] = useState(9);
    const [allowance, setAllowance] = useState(10);
    const [stakeAmount, setStakeAmount] = useState<string | number>(0);
    const [unStakeAmount, setUnStakeAmount] = useState<string | number>(0);
    const [stakeAmountInwei, setStakeAmountInwei] = useState<string | BigNumberEth>()
    const [unStakeAmountInwei, setUnStakeAmountInwei] = useState<string | BigNumberEth>()
    const [isApproving, setApproving]  = useState(false);
    const [fetching, setFetching] = useState(false);
    const [isApproved, setIsApproved] = useState(false);
    const [pendingReward, setPendingReward] = useState<number>(0);

    const { active, account, library } = useActiveWeb3React();


    const { onApprove } = useApproveToken(
        getKRLZLTContract(library?.getSigner()),
        getKrlZltLPAddress()
      );

    const handleApprove = useCallback(async () => {
        if (account && library) {
            setFetching(true);
            try {
                await onApprove();
                setIsApproved(true);
            } catch (e) {
                console.error(e);
                setIsApproved(false);
            } finally {
                setFetching(false);
            }
        }
    }, [onApprove, account, library]);

    const handleUnstake = ()=>{
        const lpContract = getContract(zltkrllp, getAddress(addresses.zltkrlstakinglp), library?.getSigner());
        lpContract.withdraw(account, unStakeAmount)
        .catch((e: any) => {
            console.log("error unsatke: " + e?.message);
        });
    }

    const handleStake = ()=>{
        const lpContract = getContract(zltkrllp, getAddress(addresses.zltkrlstakinglp), library?.getSigner());
        lpContract.deposit(1)
        .catch((e: any) => {
            console.log("error stake: " + e?.message);
        });
    }

    const lpContract = getContract(zltkrllp, getAddress(addresses.zltkrlstakinglp), library?.getSigner());
    lpContract.pendingReward(account)
    .then((p: ethers.BigNumber) => {
      const bal = new BigNumber(p._hex).div(BIG_TEN.pow(18)).toNumber();
      console.log("pending reward: " + bal);
    })
    .catch((e: any) => {
      console.log("error" + e?.message);
    });

    console.log("rerun");
    // read amount staked
    useEffect(()=>{
    const lpContract = getContract(zltkrllp, getAddress(addresses.zltkrlstakinglp), library?.getSigner());

        lpContract.userInfo(account)
    .then((p: ethers.BigNumber) => {
        // const bal = new BigNumber(p._hex).div(BIG_TEN.pow(18)).toNumber();
        setStakedBal(p);
        console.log("amount staked: " + p);
    })
    .catch(() => {
        console.log("error");
    });
    }, [])

    const handleHarvest = () =>{
        const lpContract = getContract(zltkrllp, getAddress(addresses.zltkrlstakinglp), library?.getSigner());

        lpContract.deposit(account, 0)
        .then((p: ethers.BigNumber) => {
            const bal = new BigNumber(p._hex).div(BIG_TEN.pow(18)).toNumber();
            console.log("deposit fn: " + bal);
        })
        .catch(() => {
            console.log("error");
        });
        }
    
    const handlePercentageOfBal = (percent: number) =>{
        const amount = (percent/100) * zltBal;
        setStakeAmount(amount);
    }
    
    const handlePercentageOfStaked = (percent: number) =>{
        const amount = Number(stakedBal) * (percent/100) ;
        setUnStakeAmount(amount);
    }
    
    useEffect(()=>{
        const contract = getContract(erc20, getAddress(addresses.krlzlt), library?.getSigner())
        contract.balanceOf(account)
        .then((p: ethers.BigNumber) => {
            const bal = new BigNumber(p._hex).div(BIG_TEN.pow(18)).toNumber();
            console.log("bal");
            setZltBal(bal);
        })
        .catch(() => {
            console.log("bal erro");
        setZltBal(0);
        });

    }, [account, library]);

    useEffect(() => {
        (async () => {
          // setRequesting(true);
          if (account && library) {
            const contract = getContract(erc20, getAddress(addresses.krlzlt), library?.getSigner());
            contract
              .allowance(account, getKrlZltLPAddress())
              .then(({ _hex }: any) => {
                if (MaxUint256.eq(_hex)) {
                    console.log("good");
                    setIsApproved(true);
                } else {
                    console.log("bad");
                  setIsApproved(false);
                }
                return MaxUint256.eq(_hex); // return promise for finally to run
              })
              .finally(() => {
                // setRequesting(false);
              });
          } else {
            setIsApproved(false);
            // setIsRequesting(false);
          }
        })();
      }, [account, library, isApproved]);

  return (
    <Layout>
        <div className='p-4 text-white'>
            <div className='flex flex-wrap items-center justify-center'>
                <p className=' basis-full md:basis-5/12 text-lg'>Maximize your crypto assets and earn passive income by staking ZLT and KRL, two powerful cryptocurrencies. Our platform offers you a seamless and secure way to participate in staking, enabling you to unlock the potential of your digital investments.</p>
                <img className='basis-full md:basis-5/12' src='/images/staking.png' alt='' />
            </div>

            <div className='py-10 bg-[#323232] my-5 rounded-md shadow-lg w-11/12 m-auto'>
                <div className='flex gap-2 items-center'>
                    <img width={100} src='/cdn/Zeroloss logo.png' alt='' />
                    <div>
                        <p className="font-semibold text-xl">ZEROLOSS</p>
                        <p className='text-slate-400'>Staking</p>
                    </div>
                </div>
                <div className='text-slate-200 font-semibold  text-xl gap-4 rounded-md flex items-center justify-center flex-wrap p-4 shadow-md '>
                    <div className='text-center flex flex-wrap basis-full items-center justify-center'>
                        <div className='my-4 basis-3/12 md:basis-3/12'>
                            <span>{stakedBal.toString()} LP</span>
                            <p className='text-base font-bold'>Staked</p>
                        </div>
                        <div className='my-4 basis-3/12 md:basis-3/12'>
                            <span>21 %</span>
                            <p className='text-base font-bold'>APY</p>
                        </div>
                        <div className='my-4 grow basis-3/12 md:basis-3/12'>
                            <button className=' bg-[#f08c00] m-auto block text-white py-2 px-1'>Get ZLT</button>

                        </div>
                    </div>

                </div>
                <div className='flex flex-wrap justify-between items-center'>
                    <div className='basis-full p-2 text-xl lg:basis-[60%] flex flex-wrap justify-center items-center gap-2'>
                        <div className='basis-full sm:basis-5/12 max-w-[330px] bg-[#3e3d3d] p-2 m-auto my-4'>
                            <div className='text-2xl font-semibold flex justify-between items-end'><span>Stake</span><span className='text-xs'>Balance: {zltBal} LP</span> </div>
                            <input
                                
                                onChange={(e) => {
                                    setStakeAmount(e.target.value);
                                    setStakeAmountInwei(
                                      ethers.utils.parseUnits(e.target.value, decimals)
                                    );
                                }}
                                
                                value={stakeAmount} className='w-full bg-[#393939] p-2 my-4' type='number' />
                            <div className='flex items-center justify-center gap-3'>
                                <span onClick={()=>handlePercentageOfBal(25)} className='py-2 px-4 border border-solid border-slate-500'>25%</span>
                                <span onClick={()=>handlePercentageOfBal(50)} className='py-2 px-4 border border-solid border-slate-500'>50%</span>
                                <span onClick={()=>handlePercentageOfBal(100)} className='py-2 px-4 border border-solid border-slate-500'>100%</span>
                            </div>
                            {!active && (
                                <Fragment>
                                <ConnectWalletButton className="hover:bg-white bg-[#f08c00] my-3" />
                                <p className="text-sm text-center">Connect your wallet.</p>
                                </Fragment>
                            )}
                            {active && !isApproved && (
                            <button
                                disabled={isApproving}
                                onClick={Number(allowance) >= Number(stakeAmount) ? handleApprove : handleStake}
                                className='bg-[#f08c00] p-3 rounded m-auto block my-3'>{isApproved? "Stake" : "Approve"}</button>
                            )}
                            {active && isApproved && (
                            <button
                                disabled={isApproving}
                                onClick={Number(allowance) >= Number(stakeAmount) ? handleStake : handleApprove}
                                className='bg-[#f08c00] p-3 rounded m-auto block my-3'>{isApproved? "Stakes" : "Approves"}</button>
                            )}
                        </div>
                        {Number(stakedBal)>1 && (
                            <div className='basis-full sm:basis-5/12 max-w-[330px] bg-[#3e3d3d] p-2 m-auto my-4'>
                            <p className='text-2xl font-semibold'>Unstake</p>
                            <input
                                onChange={(e) => {
                                    setUnStakeAmount(e.target.value);
                                    setUnStakeAmountInwei(
                                      ethers.utils.parseUnits(e.target.value, decimals)
                                    );
                                }}
                                 value={unStakeAmount} placeholder='0' className='w-full bg-[#393939] p-2 my-4' type='number' />
                            <div className='flex items-center justify-center gap-3'>
                                <span onClick={()=>handlePercentageOfStaked(25)} className='py-2 px-4 border border-solid border-slate-500'>25%</span>
                                <span onClick={()=>handlePercentageOfStaked(50)} className='py-2 px-4 border border-solid border-slate-500'>50%</span>
                                <span onClick={()=>handlePercentageOfStaked(100)} className='py-2 px-4 border border-solid border-slate-500'>100%</span>
                            </div>
                            {!active && (
                                <Fragment>
                                <ConnectWalletButton className="hover:bg-white bg-[#f08c00] my-3" />
                                <p className="text-sm text-center">Connect your wallet.</p>
                                </Fragment>
                            )}
                            {active && !isApproved && (
                                <button 
                                    disabled={isApproving}
                                    onClick={Number(allowance) >= Number(stakeAmount) ? ()=> handleUnstake : handleApprove}
                                    className='bg-[#f08c00] p-3 rounded m-auto block my-4'>Unstake</button>
                            )}

                        </div>
                        )}
                    </div>
                    <div className='basis-full text-lg lg:basis-[30%] text-center'>
                        <p>Pending Reward</p>
                        <p className='font-bold my-2'>{pendingReward} ZLT</p>
                        <button onClick={handleHarvest} className='px-4 py-3 tounded bg-white text-black font-bold'>Harvest</button>
                    </div>
                </div>
            </div>
            <div className='py-10 bg-[#323232] my-5 rounded-md shadow-lg w-11/12 m-auto'>
                <div className='flex gap-2 items-center'>
                    <img width={100} src='/cdn/Zeroloss logo.png' alt='' />
                    <div>
                        <p className="font-semibold text-xl">ZEROLOSS NFT</p>
                        <p className='text-slate-400'>Staking</p>
                    </div>
                </div>
                <div className='text-slate-200 font-semibold  text-xl gap-4 rounded-md flex items-center justify-center flex-wrap p-4 shadow-md '>
                    <div className='text-center flex flex-wrap basis-full items-center justify-center'>
                        <div className='my-4 basis-3/12 md:basis-3/12'>
                            <span>10</span>
                            <p className='text-base font-bold'>Staked</p>
                        </div>
                        <div className='my-4 basis-3/12 md:basis-3/12'>
                            <span>21 %</span>
                            <p className='text-base font-bold'>APY</p>
                        </div>
                        <div className='basis-3/12 grow'>
                            <button className=' bg-[#f08c00] m-auto block text-white py-2 px-1'>Get ZLT</button>

                        </div>
                    </div>

                </div>
                <div className='flex flex-wrap justify-between items-center'>
                    <div className='basis-full p-2 text-xl lg:basis-[60%] flex flex-wrap justify-center items-center gap-2'>
                        <div className='basis-full sm:basis-5/12 max-w-[330px] bg-[#3e3d3d] p-2 m-auto my-4'>
                            <div className='text-2xl font-semibold flex justify-between items-end'><span>Stake</span><span className='text-xs'>Balance: 10 ZLT</span> </div>
                            <input placeholder='0' className='w-full bg-[#393939] p-2 my-4' type='number' />
                            
                            <div className='flex items-center justify-center gap-3'>
                                <span className='py-2 px-4 border border-solid border-slate-500'>25%</span>
                                <span className='py-2 px-4 border border-solid border-slate-500'>50%</span>
                                <span className='py-2 px-4 border border-solid border-slate-500'>100%</span>
                            </div>
                            {active && !isApproved && (
                                <button 
                                    disabled={isApproving}
                                    onClick={Number(allowance) >= Number(stakeAmount) ? ()=>console.log("done") : handleApprove}
                                    className='bg-[#f08c00] p-3 rounded m-auto block my-4'>Approve</button>
                            )}
                            {!active && (
                                <Fragment>
                                <ConnectWalletButton className="hover:bg-white bg-[#f08c00] my-3" />
                                <p className="text-sm text-center">Connect your wallet.</p>
                                </Fragment>
                            )}
                        </div>
                        <div className='basis-full sm:basis-5/12 max-w-[330px] bg-[#3e3d3d] p-2 m-auto my-4'>
                            <p className='text-2xl font-semibold'>Harvest</p>
                            <input placeholder='0' className='w-full bg-[#393939] p-2 my-4' type='number' />
                            <div className='flex items-center justify-center gap-3'>
                                <span className='py-2 px-4 border border-solid border-slate-500'>25%</span>
                                <span className='py-2 px-4 border border-solid border-slate-500'>50%</span>
                                <span className='py-2 px-4 border border-solid border-slate-500'>100%</span>
                            </div>
                            {active && !isApproved && (
                            <button 
                                disabled={isApproving}
                                onClick={Number(allowance) >= Number(stakeAmount) ? ()=>console.log("done") : handleApprove}
                             className='bg-[#f08c00] p-3 rounded m-auto block my-3'>Approve</button>
                            )}
                            {!active && (
                                <Fragment>
                                <ConnectWalletButton className="hover:bg-white bg-[#f08c00] my-3" />
                                <p className="text-sm text-center">Connect your wallet.</p>
                                </Fragment>
                            )}
                        </div>
                    </div>
                    <div className='basis-full text-lg lg:basis-[30%] text-center'>
                        <p>Pending Reward</p>
                        <p className='font-bold my-2'>1.23 ZLT</p>
                        <button className='px-4 py-3 tounded bg-white text-black font-bold'>Harvest</button>
                    </div>
                </div>
            </div>
            
            {/* <div className='py-10 bg-[#323232] my-5 rounded-md shadow-lg w-11/12 m-auto'>
                <div className='flex gap-2 items-center'>
                    <img width={100} src='/cdn/Zeroloss logo.png' alt='' />
                    <div>
                        <p className="font-semibold text-xl">ZEROLOSS NFT</p>
                        <p className='text-slate-400'>Staking</p>
                    </div>
                </div>
                <div className='text-slate-200 font-semibold  text-xl gap-4 rounded-md flex items-center justify-center flex-wrap p-4 shadow-md '>
                    <div className='text-center flex flex-wrap basis-full justify-center'>
                        <div className='my-4 basis-5/12'>
                            <span>10 LP</span>
                            <p className='text-base font-bold'>Staked</p>
                        </div>
                        <div className='my-4 basis-5/12'>
                            <span>1</span>
                            <p className='text-base font-bold'># Staked</p>
                        </div>
                        <div className='my-4 basis-5/12'>
                            <span>21%</span>
                            <p className='text-base font-bold'>APY</p>
                        </div>
                        <div className='my-4 basis-5/12'>
                            <span>$12,493</span>
                            <p className='text-base font-bold'>LP Price</p>
                        </div>
                        
                    </div>

                    <div className='basis-full'>
                        <button className=' bg-[#f08c00] m-auto block text-white py-3 px-4'>Get ZLT</button>

                    </div>
                </div>
                <div className='flex flex-wrap justify-between items-center'>
                    <div className='basis-full p-3 text-xl md:basis-[60%] flex flex-wrap justify-center items-center gap-2'>
                        <div className='basis-full sm:basis-5/12 m-auto my-4'>
                            <p className='text-2xl font-semibold'>Stake</p>
                            <input placeholder='0' className='w-full bg-[#393939] p-2 my-4' type='number' />
                            <div className='flex items-center justify-center gap-3'>
                                <span className='py-2 px-4 border border-solid border-slate-500'>25%</span>
                                <span className='py-2 px-4 border border-solid border-slate-500'>50%</span>
                                <span className='py-2 px-4 border border-solid border-slate-500'>100%</span>
                            </div>
                            <button className='bg-[#f08c00] p-3 rounded m-auto block my-10'>Approve</button>
                        </div>
                        <div className='basis-full m-auto my-4'>
                            <p className='text-2xl font-semibold'>Harvest</p>
                            <input placeholder='0' className='w-full bg-[#393939] p-2 my-4' type='number' />
                            <div className='flex items-center justify-center gap-3'>
                                <span className='py-2 px-4 border border-solid border-slate-500'>25%</span>
                                <span className='py-2 px-4 border border-solid border-slate-500'>50%</span>
                                <span className='py-2 px-4 border border-solid border-slate-500'>100%</span>
                            </div>
                            <button className='bg-[#f08c00] p-3 rounded m-auto block my-10'>Approve</button>
                        </div>
                    </div>
                    <div className='basis-full text-lg lg:basis-[30%] text-center'>
                        <p>Pending Reward</p>
                        <p className='font-bold my-2'>1.23 ZLT</p>
                        <button className='px-4 py-3 tounded bg-white text-black font-bold'>Harvest</button>
                    </div>
                </div>
            </div> */}
        </div>
    </Layout>
  )
}

export default stake