import React from "react";
import { shortAddress } from "../../utils/format/address.format";
import toast from "react-hot-toast";

import Loader from "../Loader/Loader";

const TrxTable = ({ trxData, trxLoading, getTrxData }) => {
  const copyTrxHash = (hash) => {
    navigator.clipboard.writeText(hash);
    toast.success("Transaction Hash Copied");
  };

  return (
    <div style={{paddingTop : '1rem'}}>
       <h2>Transactions</h2>
      {/* <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <h2 style={{ width: "90%" }}>Transactions</h2>
        <div
          style={{ cursor: "pointer" }}
          onClick={getTrxData}
          title="Refresh "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 20q-3.35 0-5.675-2.325T4 12q0-3.35 2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V4h2v7h-7V9h4.2q-.8-1.4-2.188-2.2T12 6Q9.5 6 7.75 7.75T6 12q0 2.5 1.75 4.25T12 18q1.925 0 3.475-1.1T17.65 14h2.1q-.7 2.65-2.85 4.325T12 20Z"
            />
          </svg>
        </div>
      </div> */}
      <table className="responsive-table">
        <thead className="responsive-table__head">
          <tr className="responsive-table__row">
            <th className="responsive-table__head__title responsive-table__head__title--status">
              Sno.
            </th>
            <th className="responsive-table__head__title responsive-table__head__title--status">
              Transaction Hash
            </th>
            <th className="responsive-table__head__title responsive-table__head__title--types">
              Amount
            </th>
          </tr>
        </thead>

        {trxLoading && (
          <tbody className="responsive-table__body">
           <p style={{ padding: "1rem" }}>Loading...</p>
          </tbody>
        )}
        <tbody className="responsive-table__body">
          {!trxLoading && trxData.length > 0 && 
            trxData.map((data, index) => (
              <tr className="responsive-table__row" key={index}>
                <td className="responsive-table__body__text responsive-table__body__text--types">
                  {index + 1}.
                </td>
                <td className="responsive-table__body__text responsive-table__body__text--name">
                  {shortAddress(data.txHash, 10)}
                  <div
                    style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                    onClick={() => copyTrxHash(data.txHash)}
                  >
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
                  <i
                    className="fa fa-external-link"
                    style={{ marginLeft: "10px" }}
                  ></i>
                </td>
                <td className="responsive-table__body__text responsive-table__body__text--types">
                  {data.amount} ETH
                </td>
              </tr>
            ))}

          {trxData.length == 0 && (
            <p style={{ padding: "1rem" }}>No Transactions yet.</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TrxTable;
