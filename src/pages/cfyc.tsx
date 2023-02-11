import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { MaxUint256 } from "@ethersproject/constants";
import ConnectWalletButton from "../components/Buttons/ConnectWalletButton";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import { useAppContext } from "../hooks/useAppContext";
import useApproveToken from "../hooks/useApproveToken";
import useToast from "../hooks/useToast";
import BigNumber from "bignumber.js";
import classNames from "classnames";
import {
  getBep20Contract,
  getBusdContract,
  getCfycSaleContract,
  getContract,
} from "../utils/contractHelpers";
import {
  getAddress,
  getBusdAddress,
  getCfycSaleAddress,
} from "../utils/addressHelpers";
import CustomButton from "../components/Buttons/Button";
import { CallSignerType } from "../types";
import { BIG_TEN } from "../utils/bignumber";
import erc20 from "../config/abi/erc20.json";
import { addresses } from "../config";
import { ethers } from "ethers";
import { RefreshContext } from "../contexts/RefreshContext";
import { SEO } from "../components/Seo";
import erc20Abi from "../config/abi/erc20.json";
import { Link } from "gatsby";

const buyCfyc = async (amount: string, signer: CallSignerType) => {
  const contract = getCfycSaleContract(signer);
  const value = new BigNumber(amount).times(BIG_TEN.pow(18)).toJSON();
  const tx = await contract.buyCFYC(value);
  const receipt = await tx.wait();
  return receipt.status;
};

// check if a user has allowed spending a token in a specified smart contract
/* const checkTokenAllowance = async (
  account: string,
  contractAddress: string,
  tokenAddress: string,
  signer: CallSignerType
) => {
  const contract = getContract(erc20, tokenAddress, signer);
  const { _hex } = await contract.allowance(account, contractAddress);
  return new BigNumber(_hex);
}; */

const BuyPage = () => {
  const [fetching, setFetching] = useState(false);
  const {
    triggerFetchTokens,
    wallet: { balance },
  } = useAppContext();
  const { active, account, library } = useActiveWeb3React();
  const { toastSuccess, toastError } = useToast();
  const [errorMsg, setErrorMsg] = useState("");
  const [amountToPay, setAmountToPay] = useState("0");
  const [isApproved, setIsApproved] = useState(false);
  const [contractBal, setContractBal] = useState("0");
  const [zltThreshold, setZltThreshold] = useState(10000);
  const [zltBal, setZltBal] = useState(0);

  const { onApprove } = useApproveToken(
    getBusdContract(library?.getSigner()),
    getCfycSaleAddress()
  );

  const { fast } = useContext(RefreshContext);

  useEffect(() => {
    (async () => {
      // setRequesting(true);
      if (account && library) {
        const contract = getBep20Contract(
          getBusdAddress(),
          library.getSigner(account)
        );
        contract
          .allowance(account, getCfycSaleAddress())
          .then(({ _hex }: any) => {
            if (MaxUint256.eq(_hex)) {
              setIsApproved(true);
            } else {
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

  /* useEffect(() => {
    (async () => {
      if (account != null && active && library != null) {
        const allowance = await checkTokenAllowance(
          account,
          getCfycSaleAddress(),
          getBusdAddress(),
          library.getSigner()
        );
        if (allowance.isLessThan(ethers.constants.MaxUint256)) {
          setIsApproved(false);
        } else {
          setIsApproved(true);
        }
      } else {
        setIsApproved(false);
      }
    })();
  }, [account, active, library]); */

  // ZLT Balance
  useEffect(() => {
    (async () => {
      if (account && library) {
        const contract = getContract(
          erc20,
          getAddress(addresses.zlt),
          library.getSigner()
        );
        contract
          .balanceOf(account)
          .then((p: ethers.BigNumber) => {
            const bal = new BigNumber(p._hex).div(BIG_TEN.pow(18)).toNumber();
            setZltBal(bal);
          })
          .catch(() => {
            // console.error(e, "Error getting balance");
            setZltBal(0);
          });
      } else {
        setZltBal(0);
      }
    })();
    // also add the fast and slow vars from the refresh context
  }, [library, account, fast, active]);

  useEffect(() => {
    const fetchCurrentThreshold = async () => {
      if (library) {
        const contract = getCfycSaleContract(library.getSigner());
        const result = await contract.ZerolossThreshold();
        const threshold = new BigNumber(result._hex)
          .div(BIG_TEN.pow(18))
          .toNumber();
        setZltThreshold(threshold);
      }
    };
    fetchCurrentThreshold();
  }, [library]);

  const handleApprove = useCallback(async () => {
    if (account && library) {
      setFetching(true);
      try {
        await onApprove();
        setIsApproved(true);
      } catch (e) {
        console.error(e);
        toastError(
          "Error",
          "Please try again. Confirm the transaction and make sure you are paying enough gas!"
        );
        setIsApproved(false);
      } finally {
        setFetching(false);
      }
    }
  }, [onApprove, account, library, toastError]);

  const handleBuyCfyc = useCallback(async () => {
    if (library) {
      setFetching(true);
      try {
        await buyCfyc(amountToPay, library.getSigner());
        toastSuccess("CFYC has been sent to your wallet.");
        triggerFetchTokens();
      } catch (err) {
        console.error(err);
        toastError(
          "Error",
          "Something went wrong while trying to perform the transaction."
        );
      } finally {
        setFetching(false);
      }
    }
  }, [library, amountToPay]);

  const handleInputChange: React.FormEventHandler<HTMLInputElement> =
    useCallback(
      async (e) => {
        const val = e.currentTarget.value.replace(/,/g, ".");
        const pattern = /^[0-9]*[.,]?[0-9]{0,18}$/g;
        if (!pattern.test(val)) return;

        const amount = new BigNumber(val);
        const bal = new BigNumber(balance);
        if (amount.isGreaterThan(bal)) {
          setErrorMsg("Insufficient funds in your wallet");
        } else {
          setErrorMsg("");
        }
        setAmountToPay(val);
      },
      [balance]
    );

  useEffect(() => {
    const contract = getContract(erc20Abi, getAddress(addresses.cfyc));
    contract
      .balanceOf("0xe4B81318EFb567317d14eea9E34FA2B17b6380bb") // hard coded dev wallet
      .then((p: ethers.BigNumber) => {
        const bal = new BigNumber(p._hex).div(BIG_TEN.pow(2)).toJSON();
        const toNum = Number(bal);
        const percentBal = (((20000000 - toNum) / 20000000) * 100).toFixed(2);
        setContractBal(percentBal);
      })
      .catch((e: any) => {
        console.error(e, "Error getting balance");
      });
  }, []);
  return (
    <section className="bg-[#d3d4d5] h-screen">
      <section className="text-[#1E50BC] px-8 md:max-w-[80%] m-auto py-10">
        <h1 className="text-5xl text-center font-bold mb-10 leading-slug">
          Croptofy Token Sale.
        </h1>
        <section className="text-center space-y-5 relative text-xl">
          <div className="space-y-5 relative">
            <p className="max-w-lg mx-auto font-bold">BUY CFYC.</p>
            <p>
              <span className="font-bold">Max Buy</span> 5000 BUSD
            </p>
            <p>
              <span className="font-bold">Min Buy</span> 500 BUSD
            </p>
            <p className="text-sm">Hold 10000 ZLT to get whitelisted for IZO</p>
            {zltBal < zltThreshold && (
              <Link
                to="/buy"
                className="text-base underline hover:no-underline transition-all duration-300"
              >
                Buy ZLT
              </Link>
            )}
            {/*  <p>
              <span className="font-bold">Sale Starts in:</span> 4 days
            </p>*/}
            <div className="bg p-5 max-w-sm space-y-3 mx-auto rounded">
              {active && isApproved && (
                <TextInput
                  errorMsg={errorMsg}
                  onChangeHandler={handleInputChange}
                  value={amountToPay}
                  onSubmit={handleBuyCfyc}
                  trx={fetching}
                  isDisabled={
                    fetching ||
                    errorMsg.length > 0 ||
                    Number.isNaN(Number.parseFloat(amountToPay)) ||
                    Number.parseFloat(amountToPay) === 0
                  }
                />
              )}
              {active && !isApproved && (
                <CustomButton
                  onClick={handleApprove}
                  className="!block mx-auto uppercase text-base hover:bg-white bg-[#1E50BC]"
                  disabled={fetching}
                  loading={fetching}
                >
                  Approve BUSD
                </CustomButton>
              )}
              {!active && (
                <Fragment>
                  <ConnectWalletButton className="hover:bg-white bg-[#1E50BC]" />
                  <p className="text-sm">Connect your wallet.</p>
                </Fragment>
              )}
            </div>
          </div>
          {contractBal && (
            <>
              <p className="font-bold">Token Sale Progress.</p>
              <div className="relative h-5 w-full md:w-6/12 m-auto bg-white overflow-hidden  rounded-lg">
                <div
                  className={`h-full absolute top-0 px-4 bg-[#1E50BC]`}
                  style={{ width: `${contractBal}%` }}
                ></div>
                <p className="text-black text-center block m-auto font-bold">{`${contractBal}%`}</p>
              </div>
            </>
          )}
        </section>

        {/* <section className="text-center py-10">
          <h2 className="text-3xl font-medium text-yellow-400 my-2">
            The Referral Programe
          </h2>
          <p className="">
            Share your referral link and get 10% BUSD commission for referred
            token purchases instantly to your wallet.
          </p>
          <div className="">
            <CopyToClipboard
              canCopy={active && account != null}
              content={`${origin}/buy?ref=${account}`}
            />
          </div>
        </section> */}
      </section>
    </section>
    // </Layout>
  );
};

interface TextInputProps {
  errorMsg: string;
  onChangeHandler: (e: React.FormEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  value: string;
  isDisabled: boolean;
  trx: boolean; // transaction
}

const TextInput = ({
  onChangeHandler,
  onSubmit,
  errorMsg,
  value,
  isDisabled,
  trx,
}: TextInputProps) => {
  const [cfycBal, setCfycBal] = useState("0");

  const { fast } = useContext(RefreshContext);
  const { active, account, library } = useActiveWeb3React();

  const hasError = errorMsg.length > 0;
  const {
    wallet: { balance },
  } = useAppContext();

  // CFYC Balance
  useEffect(() => {
    (async () => {
      if (account && library) {
        const contract = getContract(erc20, getAddress(addresses.cfyc));
        contract
          .balanceOf(account)
          .then((p: ethers.BigNumber) => {
            const bal = new BigNumber(p._hex).div(BIG_TEN.pow(2)).toJSON();
            setCfycBal(bal);
          })
          .catch(() => {
            setCfycBal("0");
          });
      } else {
        setCfycBal("0");
      }
    })();
    // also add the fast and slow vars from the refresh context
  }, [library, account, fast, active]);

  return (
    <div className="w-full space-y-2 mx-auto">
      <div className="p-3 rounded-lg transition-transform duration-200 ease-linear">
        <div>
          <div className="mb-2 text-xs font-light text-left">Amount</div>
          <div className="relative flex items-center justify-between space-x-1">
            <div className="w-full">
              <input
                type="text"
                className={classNames(
                  "placeholder-gray-400 outline-none border border-[#7B8BA5] font-medium",
                  "transition-all duration-200 text-gray-700 p-2 disabled:opacity-70 text-xl",
                  "disabled:cursor-not-allowed block bg-transparent w-full leading-none",
                  "bg-primary/20 rounded",
                  {
                    "text-red-400": hasError,
                  }
                )}
                placeholder="0"
                value={value}
                onChange={onChangeHandler}
              />
              <div
                className={classNames(
                  "flex justify-between text-opacity-80 py-0.5 px-1 text-xs",
                  {
                    "text-red-400 font-normal": hasError,
                  }
                )}
              >
                <span>CFYC Balance</span>
                <span>{cfycBal} CFYC</span>
              </div>
              <div
                className={classNames(
                  "flex justify-between text-opacity-80 py-0.5 px-1 text-xs",
                  {
                    "text-red-400 font-normal": hasError,
                  }
                )}
              >
                <span className="text-left">BUSD Bal.</span>
                <span className="text-right">
                  {hasError ? errorMsg : balance}
                </span>
              </div>
              <div
                className={classNames(
                  "flex justify-between text-opacity-80 py-0.5 px-1 text-xs",
                  {
                    "text-red-400 font-normal": hasError,
                  }
                )}
              >
                <span>You will receive</span>
                <span>
                  {new BigNumber(value || 0).times(10).times(0.1).toJSON()} CFYC
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomButton
        onClick={onSubmit}
        className="block mx-auto w-full"
        disabled={isDisabled}
        loading={trx}
        variant="primary"
      >
        Buy CFYC
      </CustomButton>
    </div>
  );
};

export default BuyPage;

export const Head = () => <SEO title="Buy CFY | Cryptofy" />;
