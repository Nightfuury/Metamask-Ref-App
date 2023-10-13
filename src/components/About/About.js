import React from "react";

const About = () => {
  return (
    <div className="row pattern">
      <section className="store" id="about">
        <div className="container">
          <div className="row text-center">
            <h2>About Arbieggs.care</h2>
            <p className="section-description">
              The notorious ArbitrumEggs Cartel are running wild globally and causing a unprecedented eggs shortage on Arbi chain! The ArbiEggs supply decreases rapidly with 0.001% per block... The only way to protec your ArbiEggs is to put them in the vault.
              <br />
              <br />
              There are three types of vaults. Full protec vault will protect your precious ArbiEggs FULLY and won't be affected by debase. Full protec vault has a locking period of 7 days. The other two vaults only protect your ArbiEggs partially in the form of rewards. The rewards are 10 million ArbiEggs per block. Big protec vault earns you 9/10 of the rewards by staking ArbiEggs/ETH LP on Uniswap V2. The smol protec vault earns you only 1/10 of the rewards. Both of these vaults only have a locking period of 24 hours.
            </p>
            <br />
            <br />

            {/* <a href="#" className="button-game" style={{width: "auto"}}>
              <span className="button-game-bg-left"></span>
              <span className="button-game-bg-mid">
                <span style={{fontSize: "22px"}}>Get Frogs&nbsp;&nbsp;</span>
              </span>
              <span className="button-game-bg-right"></span>
            </a> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
