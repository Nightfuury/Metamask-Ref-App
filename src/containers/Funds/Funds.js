import React from "react";
import axios from "axios";

import RefTable from "../../components/Funds/RefTable";
import FundsTransfer from "../../components/Funds/FundsTransfer";
import TrxTable from "../../components/Funds/TrxTable";
import Loader from "../../components/Loader/Loader";

import { SERVER_URL } from "../../utils/constants/constants";

import { MetamaskContext } from "../../contexts/metamask/metamask.context";
const Funds = () => {
  const { connectedAccount } = React.useContext(MetamaskContext);
  const [loading, setLoading] = React.useState(false);

  const [trxLoading, setTrxLoading] = React.useState(false);
  const [refLoading, setRefLoading] = React.useState(false);

  const [userRef, setUserRef] = React.useState("");
  const [userAmount, setUserAmount] = React.useState("");
  const [refData, setRefData] = React.useState([]);
  const [trxData, setTrxData] = React.useState([]);

  const getUserData = async () => {
    setRefLoading(true);
    await axios
      .get(`${SERVER_URL}user_data`, { params: { account: connectedAccount } })
      .then((data) => {
        console.info("user_data: ", data.data);
        if (data.data.success == "true") {
          setUserAmount(data.data.data.amount);
          setUserRef(data.data.data.link);

          getRefData(data.data.data.link);
        } else {
          setRefLoading(false);
        }
        //console.log("userData", data);
      })
      .catch((err) => {
        setRefLoading(false);
        console.log("getUserData err", err);
      });
  };

  const getRefData = async (refId) => {
    await axios
      .get(`${SERVER_URL}user_ref_data`, { params: { refId: refId } })
      .then((data) => {
        console.info("user_ref_data: ", data);
        if (data.data.success == "true") {
          let arr = data.data.data.ref_list;
          setRefData([...arr]);
        }
        //console.log("getRefData", data);
      })
      .catch((err) => {
        setRefLoading(false);
        console.log("getRefData err", err);
      })
      .finally(() => {
        setRefLoading(false);
      });
  };

  const getTrxData = async () => {
    setTrxLoading(true);
    await axios
      .get(`${SERVER_URL}transactions`, {
        params: { account: connectedAccount }
      })
      .then((data) => {
        console.info("transactions: ", data.data);
        if (data.data.success == "true") {
          let arr = data.data.data.trxns;
          //console.log("getTrxData", arr);
          setTrxData([...arr]);
        }
      })
      .catch((err) => {
        console.log("getTrxData err", err);
      })
      .finally(() => {
        setTrxLoading(false);
      });
  };

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  React.useEffect(() => {
    if (connectedAccount) {
      getUserData();
      getTrxData();
    }
  }, [connectedAccount]);

  if (loading) {
    return (
      <div className="row pattern">
        <section className="features" id="funds">
          <div
            className="container"
            style={{
              height: "10rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="row pattern">
      <section className="features" id="funds">
        <div className="container">
          <FundsTransfer
            userRef={userRef}
            userAmount={userAmount}
            getUserData={getUserData}
            getTrxData={getTrxData}
          />

          {
            connectedAccount && (
              <>
                <TrxTable
                  trxData={trxData}
                  trxLoading={trxLoading}
                  getTrxData={getTrxData}
                />
                <RefTable
                  refData={refData}
                  refLoading={refLoading}
                  getUserData={getUserData}
                />
              </>
            )
          }

        </div>
      </section>
    </div>
  );
};

export default Funds;
