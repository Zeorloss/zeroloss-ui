import React from 'react'
// import Button from '../components/Button';
import CountDownTimer from "../components/Tools/CountDownTimer";
// import ConnectWalletButton from "../components/Buttons/ConnectWalletButton";
// import cls from "classnames";
// import { useAppContext } from '../hooks/useAppContext';
import Layout from '../components/Layout';
// import CopyToClipboard from "../components/Tools/copyToClipboard";

const buy = () => {
  return (
    <Layout>
        <section className='text-white px-8 md:max-w-[80%] m-auto'>
            <section  className=" md:text-center">
                <h1 className="text-5xl font-bold text-yellow-400 my-10 leading-slug">Zeroloss Token, The New generation platform.</h1>
                <p className="my-10 md:text-xl">
                    Zeroloss is a Decentralized peer to peer digital currency just like Bitcoin it's a new medium of exchange for
                    goods and services. you can use ZLT to pay for products and services within and outside Zeroloss Connect
                    (Z-CONNECT) ecosystem. Zeroloss is also a digital asset that increases and decreases in price over time just
                    like bitcoin. this creates a golden opportunity for investors to make good profits by buying low and selling
                    high.
                </p>
                <p className="my-10 md:text-xl">
                    ZLT can be exchanged to bitcoin, binance coin(BNB smart chain, BUSD), Ethereum, US dollars, and and other
                    currencies all over the world.
                </p>
                <p className="my-10 md:text-xl">
                    ZLT investors are in charge of their investment. which means you can buy and sale anytime you want. Even
                    the founders of GCOIN don't have control over ZLT. It is a democratic digital currency. GCOIN is money of
                    the people, by the people and for the people
                </p>
            </section>

            <section className="bg-[#191039]/90 m-auto p-5 w-full flex flex-col md:flex-row rounded md:justify-between !max-w-4xl">
                <div>
                    <h2 className="uppercase text-white text-3xl font-semibold mb-4">Tokenomics</h2>
                    <p>Total supply = 500,000</p>
                    <ol className="list-decimal list-inside pl-3 space-y-1 text-base">
                        <li>Private Sale = 5%</li>
                        <li>Pre-sale = 25%</li>
                        <li>Liquidity = 30% (to be locked for 3 years)</li>
                        <li>Marketing and partnerships/advisory = 10%</li>
                        <li>Products development = 10%</li>
                        <li>Airdrops = 5%</li>
                        <li>Referral rewards = 5%</li>
                        <li>Buy back = 5%</li>
                        <li>Charity = 5%</li>
                    </ol>
                </div>

                <div>
                    <h2 className="uppercase text-white text-3xl font-semibold my-4">Benefits</h2>
                    <ol className="list-decimal list-inside pl-3 space-y-1 text-base">
                        <li>Referral Count is Unlimited</li>
                        <li>10% BUSD Per Referral</li>
                    </ol>
                </div>
            </section>

            <section padding className="text-center space-y-5 relative">
            <div className="absolute top-40 left-0 w-56 opacity-40">
                <img alt="" src="../images/bg-gcoin-logo.png" placeholder="blurred" />
            </div>
            <h2 className="text-5xl font-medium text-yellow-400">Pre-sale</h2>
            <h3 className="text-3xl text-white relative">Join Presale Now.</h3>
            <div className="space-y-5 relative">
                <p className="text-[#FF61B6] font-bold">Presale Ends July 14th, 2022.</p>
                <p className="max-w-lg mx-auto">
                125,000 GCOIN available only. BUY GCOIN, refer and earn 10% referral bonus in BUSD.
                </p>
                <div className="bg-[#191039] p-5 max-w-sm space-y-3 mx-auto rounded">
                <CountDownTimer timestamp={2657753200} handleDisableButton={() => {}} />
                
                {/* {active && isApproved && (
                    <TextInput
                    errorMsg={errorMsg}
                    onChangeHandler={handleInputChange}
                    value={amountToPay}
                    onSubmit={handleBuyGoldCoin}
                    trx={fetching}
                    isDisabled={fetching || errorMsg.length > 0 || Number.isNaN(Number.parseFloat(amountToPay))}
                    />
                )}
                {active && !isApproved && (
                    <Button
                    onClick={handleApprove}
                    className="!block mx-auto uppercase text-base"
                    disabled={fetching}
                    loading={fetching}
                    >
                    Approve Contract
                    </Button>
                )}
                {!active && (
                    <Fragment>
                    <ConnectWalletButton />
                    <p className="text-sm">Connect your wallet.</p>
                    </Fragment>
                )} */}
                </div>
            </div>
            </section>

            <section padding className="text-center py-10">
                <h2 className="text-3xl font-medium text-yellow-400 my-2">The Referral Programe</h2>
                <p className="">
                    Share your referral link and get commission for referred token purchases instantly to your wallet.
                </p>
                <div className="">
                    {/* <CopyToClipboard canCopy={active && account != null} content={`${origin}/?ref=${account}`} /> */}
                </div>
            </section>
        </section>
    </Layout>
  )
}

// interface TextInputProps {
//     errorMsg: string;
//     onChangeHandler: (e: React.FormEvent<HTMLInputElement>) => void;
//     onSubmit: () => void;
//     value: string;
//     isDisabled: boolean;
//     trx: boolean; // transaction
//   }
  
//   const TextInput = ({ onChangeHandler, onSubmit, errorMsg, value, isDisabled, trx }) => {
//     const hasError = errorMsg.length > 0;
//     const {
//       wallet: { balance },
//     } = useAppContext();
//     return (
//       <div className="w-full space-y-2 mx-auto">
//         <div className="p-3 rounded-lg transition-transform duration-200 ease-linear">
//           <div>
//             <div className="mb-2 text-xs font-light text-left">Amount</div>
//             <div className="relative flex items-center justify-between space-x-1">
//               <div className=" w-full">
//                 <input
//                   type="text"
//                   className={cls(
//                     "placeholder-gray-400 outline-none border-b border-[#7B8BA5] font-medium",
//                     "transition-all duration-200 text-gray-300 p-2 disabled:opacity-70 text-xl",
//                     "disabled:cursor-not-allowed block bg-transparent w-full leading-none",
//                     "bg-primary/20 rounded",
//                     {
//                       "text-red-400": hasError,
//                     },
//                   )}
//                   placeholder="0"
//                   value={value}
//                   onChange={onChangeHandler}
//                 />
//                 <div
//                   className={cls("flex justify-between text-opacity-80 py-0.5 px-1 text-xs", {
//                     "text-red-400 font-normal": hasError,
//                   })}
//                 >
//                   <span>BUSD Bal.</span>
//                   <span>{hasError ? errorMsg : balance}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <Button onClick={onSubmit} className="block mx-auto w-full" disabled={isDisabled} loading={trx}>
//           Buy Gold Coin
//         </Button>
//       </div>
//     );
//   };

export default buy

export const Head = () => <title>Buy Page</title>

