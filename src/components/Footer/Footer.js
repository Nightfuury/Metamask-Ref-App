import React from "react";

const Footer = () => {
  return (
    <div className="row pattern-dark">
      <footer className="container footer">
        <div className="row">
          <div className="col-lg-12 col-md-12 text-center">
            <nav className="social-nav">
              {/* <a href="#">
                <span className="ion-social-facebook"></span>
              </a>
              <a href="#">
                <span className="ion-social-twitter"></span>
              </a>
              <a href="#">
                <span className="ion-social-youtube"></span>
              </a>
              <a href="#">
                <span className="ion-social-instagram"></span>
              </a> */}

              <a href="https://t.me/ArbiEggs_Care" target="_blank" rel="noreferrer">
                <span className="ion-ios-paperplane"></span>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8l-8 6l-8.054-2.685z"
                  />
                </svg> */}
              </a>
            </nav>
          </div>
        </div>
        <div className="row">
          <p className="copyright">Copyright &copy; 2023 by Arbieggs.care</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
