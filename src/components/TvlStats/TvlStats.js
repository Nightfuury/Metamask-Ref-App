import React from "react";

const TvlStats = () => {
  return (
    <div className="row pattern-dark">
      <section className="store" id="stats">
        <div className="container">
          <div className="row">
            <h2>TVL Stats</h2>
            <br />
            <div className="section-description" style={{width: '100%'}}>
              <div className="col-lg-4">
                <div className="Stats_stats__ZwCGO">
                  <div>
                    <p>Total TVL</p>
                    <p className="Stats_tooltip__Za9DT">$20,162,755.42</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="Stats_stats__ZwCGO">
                  <div>
                    <p>Marketcap (Fully Diluted)</p>
                    <p className="Stats_tooltip__Za9DT">$8,773,621.27</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="Stats_stats__ZwCGO">
                  <div>
                    <p>Total Liquidity</p>
                    <p className="Stats_tooltip__Za9DT">$7,114,233</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="Stats_stats__ZwCGO">
                  <div>
                    <p>Total Supply</p>
                    <p className="Stats_tooltip__Za9DT">589,288,352,186 FROGS</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="Stats_stats__ZwCGO">
                  <div>
                    <p>Supply in Vaults</p>
                    <div
                      className="nextui-c-ftJsHY nextui-c-ftJsHY-iPJLV-css nextui-tooltip-button"
                      role="button"
                      tabindex="-1"
                    >
                      <p className="Stats_tooltip__Za9DT">440,116,486,670 FROGS</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="Stats_stats__ZwCGO">
                  <div>
                    <p>Circulating supply</p>
                    <div
                      className="nextui-c-ftJsHY nextui-c-ftJsHY-iPJLV-css nextui-tooltip-button"
                      role="button"
                      tabindex="-1"
                    >
                      <p className="Stats_tooltip__Za9DT">149,171,865,516 FROGS</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TvlStats;
