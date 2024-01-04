import React from "react";
import { SEO } from "../components/Seo";
import Layout from "../components/Layout";
import ConnectWalletButton from "../components/Buttons/ConnectWalletButton";
import { useAppContext } from "../hooks/useAppContext";
import useActiveWeb3React from "../hooks/useActiveWeb3React";

const OatPage = () => {

    const {
        wallet: { active/* , error, retry, isConnecting */ },
    } = useAppContext();
    const { account } = useActiveWeb3React();

    return (
        <Layout>
            <div className="w-full p-5 text-white">
                <div className="grid max-w-xl gap-2 p-6 py-10 mx-auto text-center border-2 border-white rounded-xl justify-items-center">
                    <h3 className="text-xl font-bold tracking-wide">Zeroloss OAT</h3>
                    <p>The Future of DeFi is in Web3, mint and get Zeroloss OAT. Become a Zerolosser for ever.</p>
                    <img src="https://cdn.galxe.com/galaxy/zeroloss/481bd166-d747-4dc2-8fb2-55d105a23e87.gif" className="object-cover w-4/5" />

                    {
                        active && account ?
                            <div className="grid gap-3 select-none">
                                <div className='flex items-center gap-2 text-sm w-fit'>
                                    <span className="px-2 py-1 duration-500 rounded bg-yellow-700/20 hover:bg-yellow-700/30">655</span>
                                    <span className="opacity-50">/</span>
                                    <span className="px-2 py-1 duration-500 rounded bg-yellow-700/20 hover:bg-yellow-700/30 opacity-80">3333</span>
                                </div>
                                <button className="px-3 py-2 text-sm font-semibold tracking-wider capitalize duration-500 rounded-lg bg-gradient-to-br from-yellow-700 to-slate-900 hover:opacity-75">Mint</button>
                            </div> : <ConnectWalletButton />
                    }
                    
                </div>
            </div>
        </Layout>
    );
};

export default OatPage;

export const Head = () => <SEO title="Mint Oat | Zeroloss" description={""} children={""} pathname={"oat"} />;
