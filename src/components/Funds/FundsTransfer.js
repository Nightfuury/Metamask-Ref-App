import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

import GetTrxModal from "./GetTrx.modal";

import { shortAddress } from "../../utils/format/address.format";
import { initWeb3 } from "../../services/web3.service";
import { MetamaskContext } from "../../contexts/metamask/metamask.context";
import { MetamaskConnectContext } from "../../contexts/metamask/metamask.connect.context";
import {
  SERVER_URL,
  SEND_ADDRESS,
  LIMIT,
  REF_PERCENTAGE,
  BLOCKCHAIN,
} from "../../utils/constants/constants";

const DECIMALS = 6;

const FundsTransfer = ({ userRef, userAmount, getUserData, getTrxData }) => {
  const { connectedAccount, connectedNetwork } =
    React.useContext(MetamaskContext);

  const { handleSwitchMetamaskNetwork } = React.useContext(
    MetamaskConnectContext
  );

  const [amount, setAmount] = React.useState(LIMIT.min);
  const [refCode, setRefCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [userBal, setUserBal] = React.useState();

  const [select, setSelect] = React.useState("send");

  const handleToggleModal = () => {
    if (select == "send") {
      setSelect("check");
    } else {
      setSelect("send");
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleRefCodeChange = (e) => {
    setRefCode(e.target.value);
  };

  const setMaxInput = () => {
    setAmount(LIMIT.max);
  };

  const withRef = async (txHash, refCode, amount) => {
    //console.log('txHash',txHash)
    let data = {
      account: connectedAccount,
      amount: amount,
      refId: refCode,
      txhash: txHash,
    };

    await axios
      .post(`${SERVER_URL}ref_user`, data)
      .then((data) => {
        toast.success("Transaction Successful");
        getUserData();
        getBal();
        getTrxData();
      })
      .catch((err) => {
        console.log("withRef", err);
        toast.error("Something went wrong.Try again after sometime");
      });
  };

  const withoutRef = async (txHash, amount) => {
    //console.log('send1 ',txHash)
    let data = {
      account: connectedAccount,
      amount: amount,
      txhash: txHash,
    };

    await axios
      .post(`${SERVER_URL}new_user`, data)
      .then((data) => {
        toast.success("Transaction Successful");
        getUserData();
        getBal();
        getTrxData();
      })
      .catch((err) => {
        console.log("withoutRef", err);
        toast.error("Something went wrong.Try again after sometime");
      });
  };

  const updateDb = async () => {
    if (!connectedAccount) {
      toast.error("Connect to metamask");
    }

    if (amount < LIMIT.min) {
      toast.error(`Minimum amount should be ${LIMIT.min} ETH`);
    }

    if (amount > LIMIT.max) {
      toast.error(`Maximum amount should be ${LIMIT.max} ETH`);
    }

    if (connectedAccount && amount >= LIMIT.min && amount <= LIMIT.max) {
      if (refCode == "") {
        let res = await sentTrx();

        if (res.status == true) {
          withoutRef(res.hash, amount);
        }
      } else {
        let isRefValid = await checkRef();

        if (refCode !== userRef && isRefValid == "true") {
          let res = await sentTrx();

          if (res.status == true) {
            withRef(res.hash, refCode, amount);
          }
        } else {
          toast.error("Incorrect Referral Code");
        }
      }
    }
  };

  const sentTrx = async () => {
    setLoading(true);
    try {
      const web3 = await initWeb3({
        blockchain: BLOCKCHAIN.blockchain,
        network: BLOCKCHAIN.network,
        instance: "metamask",
      });

      let send = await web3.eth.sendTransaction({
        from: connectedAccount,
        to: SEND_ADDRESS,
        value: web3.utils.toWei(String(amount), "ether"),
      });

      let obj = {
        hash: send.transactionHash,
        status: send.status,
      };
      return obj;
    } catch (err) {
      console.log("sentTrx err", err);
      toast.error("Transaction Failed");
    } finally {
      setAmount(LIMIT.min);
      setRefCode("");
      setLoading(false);
    }
  };

  const checkRef = async () => {
    let res;

    await axios
      .get(`${SERVER_URL}check_ref`, { params: { refId: refCode } })
      .then((data) => {
        //console.log("userData", data);
        if (data.data.success == "true") {
          res = "true";
        } else {
          res = "false";
        }
      })
      .catch((err) => {
        console.log("checkRef err", err);
      });

    return res;
  };

  const copyRefCode = () => {
    navigator.clipboard.writeText(userRef);
    toast.success("Referral Code Copied");
  };

  const getBal = async () => {
    const web3 = await initWeb3({
      blockchain: BLOCKCHAIN.blockchain,
      network: BLOCKCHAIN.network,
      instance: "rpcUrl",
    });
    let bal = await web3.eth.getBalance(connectedAccount);
    setUserBal(web3.utils.fromWei(String(bal), "ether"));
    //console.log("bal", bal);
  };

  React.useEffect(() => {
    if (connectedAccount) {
      getBal();
      console.log("network", connectedNetwork, BLOCKCHAIN.connec_netw);
    }
  }, [connectedAccount, connectedNetwork]);

  if (connectedNetwork !== BLOCKCHAIN.viewString) {
    return (
      <div className="text-center">
        <div
          className="button-game"
          style={{ width: "fit-content", cursor: "pointer" }}
          onClick={() =>
            handleSwitchMetamaskNetwork({
              blockchain: BLOCKCHAIN.blockchain,
              network: BLOCKCHAIN.network,
            })
          }
        >
          <span className="button-game-bg-left"></span>
          <span className="button-game-bg-mid">
            <span style={{ fontSize: "22px" }}>
              Switch to {BLOCKCHAIN.viewString}
            </span>
          </span>
          <span className="button-game-bg-right"></span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="row">
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          {select == "check" && (
            <h2 style={{ width: "90%" }}>Add Transaction</h2>
          )}

          {select == "send" && <h2 style={{ width: "90%" }}>Send ETH</h2>}
          {/* <div
            style={{ cursor: "pointer" }}
            onClick={handleToggleModal}
            title="Click to save your missing transaction"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M11 18h2v-2h-2v2m1-16A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-14a4 4 0 0 0-4 4h2a2 2 0 0 1 2-2a2 2 0 0 1 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5a4 4 0 0 0-4-4Z"
              />
            </svg>
          </div> */}
        </div>

        {select == "check" && (
          <GetTrxModal
            userRef={userRef}
            withRef={withRef}
            withoutRef={withoutRef}
            onSendClick={handleToggleModal}
          />
        )}

        {select == "send" && (
          <div className="col-lg-6">
            <div className="Actions_actions__M_7BJ">
              <div className="Actions_balance__YbiOW">
                <div>Token balance</div>
                <div>
                  <img
                    src="assets/img/arbitrum.png"
                    style={{ height: "1.2rem", paddingRight: "0.2rem" }}
                  />
                  {userBal} ETH
                </div>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  className="Actions_input__r3b_T"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={handleAmountChange}
                  fdprocessedid="t7zy8"
                />
                <button
                  className="button Actions_maxbutton__B6ax9"
                  fdprocessedid="my7s4u"
                  onClick={setMaxInput}
                >
                  Max
                </button>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  className="Actions_input__r3b_T"
                  type="text"
                  placeholder="Enter Referral Code (Optional)"
                  fdprocessedid="t7zy8"
                  value={refCode}
                  onChange={handleRefCodeChange}
                />
              </div>
              <div className="text-center">
                <div
                  className="button-game"
                  style={{ width: "fit-content", cursor: "pointer" }}
                >
                  <span className="button-game-bg-left"></span>
                  <span className="button-game-bg-mid">
                    {loading ? (
                      <span style={{ fontSize: "22px" }}>Sending..</span>
                    ) : (
                      <span style={{ fontSize: "22px" }} onClick={updateDb}>
                        Send
                      </span>
                    )}
                  </span>
                  <span className="button-game-bg-right"></span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="col-lg-6">
          <div>
            <div className="Actions_stats__JAAdt">
              <div>
                <p>Total Sent</p>
                <div
                  className="nextui-c-ftJsHY nextui-c-ftJsHY-iPJLV-css nextui-tooltip-button"
                  role="button"
                  tabindex="-1"
                >
                  <p className="Actions_tooltip__lDk4T">
                    {userAmount ? (
                      <span>
                        {new Intl.NumberFormat("en-US").format(
                          Number(
                            Math.floor(userAmount * Math.pow(10, DECIMALS)) /
                              Math.pow(10, DECIMALS)
                          )
                        )}{" "}
                        ETH
                      </span>
                    ) : (
                      <span>-</span>
                    )}
                  </p>
                </div>
              </div>
              <div>
                <p>Limit</p>
                <div
                  className="nextui-c-ftJsHY nextui-c-ftJsHY-iPJLV-css nextui-tooltip-button"
                  role="button"
                  tabindex="-1"
                >
                  <p className="Actions_tooltip__lDk4T">
                    {LIMIT.min}-{LIMIT.max} ETH{" "}
                  </p>
                </div>
              </div>
              <div>
                <p>Referral Percentage</p>
                <p className="Actions_tooltip__lDk4T">{REF_PERCENTAGE}%</p>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ marginRight: "0.3rem" }}>Referral Code</p>
                  {userRef ? (
                    <div style={{ cursor: "pointer" }} onClick={copyRefCode}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M5 22q-.825 0-1.413-.588T3 20V6h2v14h11v2H5Zm4-4q-.825 0-1.413-.588T7 16V4q0-.825.588-1.413T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.588 1.413T18 18H9Zm0-2h9V4H9v12Zm0 0V4v12Z"
                        />
                      </svg>
                    </div>
                  ) : null}
                </div>
                <p className="Actions_tooltip__lDk4T">
                  {userRef ? (
                    <span>{shortAddress(userRef, 7)}</span>
                  ) : (
                    <span>-</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundsTransfer;
