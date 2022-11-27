import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Layout from "../components/Layout";
import ConnectWalletButton from "../components/Buttons/ConnectWalletButton";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import { useAppContext } from "../hooks/useAppContext";
import useApproveToken from "../hooks/useApproveToken";
import useToast from "../hooks/useToast";
import BigNumber from "bignumber.js";
import classNames from "classnames";
import {
  getBusdContract,
  getContract,
  getZltContract,
} from "../utils/contractHelpers";
import {
  getAddress,
  getBusdAddress,
  getZltSaleAddress,
} from "../utils/addressHelpers";
import CustomButton from "../components/Buttons/Button";
import { CallSignerType } from "../types";
import { BIG_TEN } from "../utils/bignumber";
import erc20 from "../config/abi/erc20.json";
import { addresses } from "../config";
import { ethers } from "ethers";
import { RefreshContext } from "../contexts/RefreshContext";
import CopyToClipboard from "../components/Tools/copyToClipboard";
import { PageProps } from "gatsby";

const buyZLT = async (amount: string, ref: string, signer: CallSignerType) => {
  const contract = getZltContract(signer);
  const value = new BigNumber(amount).times(BIG_TEN.pow(18)).toJSON();
  const tx = await contract.buyZLT(value, ref);
  const receipt = await tx.wait();
  return receipt.status;
};

// check if a user has allowed spending a token in a specified smart contract
const checkTokenAllowance = async (
  account: string,
  contractAddress: string,
  tokenAddress: string,
  signer: CallSignerType
) => {
  const contract = getContract(erc20, tokenAddress, signer);
  const { _hex } = await contract.allowance(account, contractAddress);
  return new BigNumber(_hex);
};

const BuyPage = ({ location }: PageProps) => {
  const [fetching, setFetching] = useState(false);
  const {
    refAddress,
    triggerFetchTokens,
    wallet: { balance },
  } = useAppContext();
  const { active, account, library } = useActiveWeb3React();
  const { toastSuccess, toastError } = useToast();
  const [errorMsg, setErrorMsg] = useState("");
  const [amountToPay, setAmountToPay] = useState("0");
  const [isApproved, setIsApproved] = useState(false);

  const { onApprove } = useApproveToken(
    getBusdContract(library?.getSigner()),
    getZltSaleAddress()
  );

  const { origin } = location;

  const checkZltAllowance = useCallback(async () => {
    if (account && active && library) {
      const allowance = await checkTokenAllowance(
        account,
        getZltSaleAddress(),
        getBusdAddress(),
        library.getSigner(account)
      );

      if (allowance.isLessThan(ethers.constants.MaxUint256)) {
        setIsApproved(false);
      } else {
        setIsApproved(true);
        return true;
      }
    } else {
      setIsApproved(false);
    }
    return false;
  }, [account, active, library]);

  useEffect(() => {
    checkZltAllowance();
  }, [account, active, library]);

  const handleApprove = useCallback(async () => {
    if (account && library) {
      setFetching(true);
      try {
        checkZltAllowance().then(async (res) => {
          if (!res) {
            await onApprove();
            setIsApproved(true);
          }
        });
      } catch (e) {
        console.error(e, "Failed");
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

  const handleBuyZLT = useCallback(async () => {
    if (library) {
      setFetching(true);
      try {
        await buyZLT(amountToPay, refAddress, library.getSigner());
        toastSuccess("ZLT has been sent to your wallet.");
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
  }, [library, refAddress, amountToPay]);

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

  return (
    <Layout>
      <section className="text-white px-8 md:max-w-[80%] m-auto">

        <h1 className="text-5xl text-center font-bold text-yellow-400 my-10 leading-slug">
          Zeroloss Token Sale.
        </h1>
        <section className="text-center space-y-5 relative">
          <div className="absolute top-40 left-0 w-56 opacity-40">
            <img
              alt=""
              src="../images/bg-gcoin-logo.png"
              placeholder="blurred"
            />
          </div>
          <div className="space-y-5 relative">
            <p className="max-w-lg mx-auto">
              BUY ZLT, refer and earn 10% referral bonus in BUSD.
            </p>
            <div className="bg-[#191039] p-5 max-w-sm space-y-3 mx-auto rounded">
              {/* <CountDownTimer
                timestamp={2657753200}
                handleDisableButton={() => {}}
              /> */}

              {active && isApproved && (
                <TextInput
                  errorMsg={errorMsg}
                  onChangeHandler={handleInputChange}
                  value={amountToPay}
                  onSubmit={handleBuyZLT}
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
                  className="!block mx-auto uppercase text-base"
                  disabled={fetching}
                  loading={fetching}
                >
                  Approve BUSD
                </CustomButton>
              )}
              {!active && (
                <Fragment>
                  <ConnectWalletButton />
                  <p className="text-sm">Connect your wallet.</p>
                </Fragment>
              )}
            </div>
          </div>
        </section>

        <section className="text-center py-10">
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
              content={`${origin}/?ref=${account}`}
            />
          </div>
        </section>
      </section>
    </Layout>
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
  const [zltBal, setZltBal] = useState("0");

  const { fast } = useContext(RefreshContext);
  const { active, account, library } = useActiveWeb3React();

  const hasError = errorMsg.length > 0;
  const {
    wallet: { balance },
  } = useAppContext();

  // ZLT Balance
  useEffect(() => {
    (async () => {
      if (account && library) {
        const contract = getContract(erc20, getAddress(addresses.zlt));
        contract
          .balanceOf(account)
          .then((p: ethers.BigNumber) => {
            const bal = new BigNumber(p._hex).div(BIG_TEN.pow(18)).toJSON();
            setZltBal(bal);
          })
          .catch(() => {
            // console.error(e, "Error getting balance");
            setZltBal("0");
          });
      } else {
        setZltBal("0");
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
                  "transition-all duration-200 text-gray-300 p-2 disabled:opacity-70 text-xl",
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
                <span>ZLT Balance</span>
                <span>{zltBal} ZLT</span>
              </div>
              <div
                className={classNames(
                  "flex justify-between text-opacity-80 py-0.5 px-1 text-xs",
                  {
                    "text-red-400 font-normal": hasError,
                  }
                )}
              >
                <span>BUSD Bal.</span>
                <span>{hasError ? errorMsg : balance}</span>
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
                  {new BigNumber(value || 0).times(1065).toJSON()} ZLT
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
        Buy ZLT
      </CustomButton>
    </div>
  );
};

export default BuyPage;

export const Head = () => <title>Buy Page</title>;
