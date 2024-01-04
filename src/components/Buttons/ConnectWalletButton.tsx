import React from "react";
import { useAppContext } from "../../hooks/useAppContext";
import useWallet from "../../hooks/useWallet";
import cls from "classnames";
import truncateHash from "../../utils/truncateHash";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { BsWalletFill } from "react-icons/bs";
import Button from "./Button";

interface ConnectWalletButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

const ConnectWalletButton = ({ className, ...props }: ConnectWalletButtonProps) => {
  const {
    wallet: { active, error, retry, isConnecting },
  } = useAppContext();
  const { account } = useActiveWeb3React();

  const { onPresentConnectModal } = useWallet();

  const openModal = () => {
    onPresentConnectModal();
  };

  return (
    <React.Fragment>
      {active && account && (
        <Button
          aria-label="Open connect modal"
          onClick={openModal}
          className="block w-full px-4 py-2 text-base text-gray-600 rounded-lg shadow-none bg-red-600/30 hover:bg-red-600/50"
        >
          <BsWalletFill className="inline-block w-6 h-6 mx-2 text-red-700 hover:text-red-800" />
          {truncateHash(account)}
        </Button>
      )}
      {!active && !error && (
        <Button
          disabled={isConnecting}
          onClick={openModal}
          className={cls(
            "inline-block text-base w-full px-4 py-2",
            {
              "cursor-not-allowed hover:text-opacity-80": isConnecting,
            },
            className,
          )}
          {...props}
        >
          {isConnecting ? "..." : "Connect wallet"}
        </Button>
      )}
      {!active && error && (
        <Button className="!text-red-600 w-auto text-base px-4 py-2" onClick={retry}>
          Click to Retry
        </Button>
      )}
    </React.Fragment>
  );
};

export default ConnectWalletButton;
