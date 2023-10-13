import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { initWeb3 } from "../../services/web3.service";
import { MetamaskContext } from "../../contexts/metamask/metamask.context";

import {
  SERVER_URL,
  SEND_ADDRESS,
  LIMIT,
  BLOCKCHAIN
} from "../../utils/constants/constants";

const GetTrxModal = ({ userRef, withRef, withoutRef, onSendClick }) => {
  const { connectedAccount } = React.useContext(MetamaskContext);

  const [txHash, setTxHash] = React.useState("");
  const [refCode, setRefCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleTxnChange = (e) => {
    let hash = e.target.value;
    setTxHash(hash.trim());
  };

  const handleRefCodeChange = (e) => {
    setRefCode(e.target.value);
  };

  const checKTrxExist = async () => {
    setLoading(true);
    await axios
      .get(`${SERVER_URL}check_trx_exist`, { params: { txHash: txHash } })
      .then((data) => {
        console.log("checKTrxExist", data);
        if (data.data.success == "true") {
          handleTxnSave();
        } else {
          if (data.data.data.account !== connectedAccount) {
            toast.error("Invalid Transaction Hash");
          } else {
            toast.error("Transaction already exists");
          }
        }
      })
      .catch((err) => {
        console.log("checkRef err", err);
      })
      .finally(() => {
        setLoading(false);
      });
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

  const checkTrxValidity = async () => {
    let obj;
    try {
      if (txHash) {
        const web3 = await initWeb3({
          blockchain: BLOCKCHAIN.blockchain,
          network: BLOCKCHAIN.network,
          instance: "metamask",
        });
        let trx = await web3.eth.getTransaction(txHash);

        console.log("trx", trx);
        let trxAmount = web3.utils.fromWei(String(trx.value), "ether");

        obj = {
          status: "true",
          amount: trxAmount,
        };

        if (trx.to !== SEND_ADDRESS) {
          obj = {
            status: "false",
          };
        }

        if (trx.from !== connectedAccount) {
          obj = {
            status: "false",
          };
        }

        if (trxAmount > LIMIT.max || trxAmount < LIMIT.min) {
          obj = {
            status: "false",
          };
        }
      }

      return obj;
    } catch (err) {
      console.log("checkTrxValidity err : ", err);
      toast.error("Check Transaction details.");
    }
  };

  const handleTxnSave = async () => {
    let hashValidity = await checkTrxValidity();

    if (hashValidity.status == "false") {
      toast.error("Invalid Transaction Hash");
    } else {
      if (refCode == "") {
        withoutRef(txHash, hashValidity.amount);
        setTxHash("");
        setRefCode("");
      } else {
        let isRefValid = await checkRef();

        if (
          refCode !== userRef &&
          isRefValid == "true" &&
          hashValidity.status == "true"
        ) {
          withRef(txHash, refCode, hashValidity.amount);
          setTxHash("");
          setRefCode("");
        } else {
          toast.error("Incorrect Referral Code");
        }
      }
    }
  };

  return (
    <div className="col-lg-6">
      <div className="Actions_actions__M_7BJ">
        <div style={{ position: "relative" }}>
          <input
            className="Actions_input__r3b_T"
            type="text"
            placeholder="Transaction Hash"
            value={txHash}
            onChange={handleTxnChange}
            fdprocessedid="t7zy8"
          />
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
              {loading && <span style={{ fontSize: "22px" }}>Saving..</span>}

              {!loading && txHash !== "" && (
                <span style={{ fontSize: "22px" }} onClick={checKTrxExist}>
                  Save Transaction
                </span>
              )}

              {!loading && txHash == "" && (
                <span
                  style={{ fontSize: "22px" }}
                  title="Transaction Hash cannot be empty"
                >
                  Save Transaction
                </span>
              )}
            </span>
            <span className="button-game-bg-right"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetTrxModal;
