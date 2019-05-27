import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import TradingViewWidget from "react-tradingview-widget";

import Web3 from "web3";

import "./styles.css";

if (window.ethereum) {
  window.web3 = new Web3(window.ethereum);
  try {
    window.ethereum.enable().then(function() {});
  } catch (e) {
    alert("Please Enable MetMask");
  }
}

const sendEthereum = (amountETH, receivingAddress) => {
  const weiValue = window.web3.utils.toWei(`${amountETH}`, "ether");
  console.log(weiValue);
  window.web3.eth
    .sendTransaction({
      from: "0x270FCb13af27Ab15d5651236802b874302a6D63D",
      to: `${receivingAddress}`,
      value: `${weiValue}`
    })
    .then(function(receipt) {
      console.log(receipt);
    });
};

const getBalance = address => {
  window.web3.eth
    .getBalance(`${address}`)
    .then(
      data =>
        (document.getElementById("balance").innerHTML = `Balance is :${parseInt(
          web3.utils.fromWei(data)
        )}ETH`)
    );
};

const calculateTotal = subTotal => {
  let fees = subTotal * 0.2;

  let total = fees + parseInt(subTotal, 10);
  return total;
};

/* React */

function App() {
  const [amountETH, setAmountETH] = useState("");
  const [receivingAddress, setReceivingAddress] = useState("");
  const [ethAnimation, toggle] = useState(false);
  const sendEthAni = useSpring({
    width: ethAnimation ? "8rem" : "0rem",
    opacity: ethAnimation ? 1 : 0
  });

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>

      <FormWapper>
        <input
          value={amountETH}
          placeholder={"Amount ETH"}
          onChange={e => {
            setAmountETH(e.target.value);
          }}
        />

        <input
          value={receivingAddress}
          placeholder={"Receving Address"}
          onChange={e => {
            setReceivingAddress(e.target.value);
          }}
        />
        <Flex>
          <div className="button-box">
            <SubmitButton
              onMouseEnter={() => toggle(!ethAnimation)}
              onMouseLeave={() => toggle(!ethAnimation)}
              onClick={() => sendEthereum(amountETH, receivingAddress)}
            />
          </div>

          <ScrollAnimation style={sendEthAni}>Send ETH</ScrollAnimation>
          <div className="opacity-layer" />
        </Flex>
      </FormWapper>
      <p>Total + Fees : {calculateTotal(amountETH, 0)} </p>
      <p id="balance">{getBalance(receivingAddress)}></p>
      <TradingViewWrapper>
        <TradingViewWidget symbol="ETHUSD" locale="fr" autosize />
      </TradingViewWrapper>
      <FooterWrapper>
        <div className="buy" />
        <div className="sell" />
      </FooterWrapper>
    </div>
  );
}

const SubmitButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  background-image: url("https://icodrops.com/wp-content/uploads/2018/10/Ethereum-Logo.png");
  border-radius: 1rem;
  background-size: cover;
  width: 2rem;

  height: 2rem;
`;

const TradingViewWrapper = styled.div`
  height: 20rem;
  width: 30rem;
  
  }
`;

const FooterWrapper = styled.div`
  height: 12rem;
  width: 30rem;
  background: black;
  display: flex;
  .buy {
    background: blue;
    width: 50%;
  }
`;

const ScrollAnimation = styled(animated.div)`
  height: 2rem;
  background: white;
  font-weight: bold;
  color: black;
  display: flex;
  box-shadow: inset 0 0 7px 4px black, 0 0 5px 2px lightgrey;
  white-space: nowrap;
  overflow: hidden;
  margin-left: 1rem;
  align-items: center;
  justify-content: center;
`;

const Flex = styled.div`
  display: flex;

  align-items: center;
`;

const FormWapper = styled.div`
  input {
    width: 22rem;
    margin-bottom: 2rem;
  }

  display: flex;
  flex-direction: column;
  .button-box {
    width: 3rem;

    background: #5f6268;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    box-shadow: inset 0 0 7px 4px grey, 0 0 5px 2px black;

    &:hover {
      box-shadow: inset 0 0 7px 4px black, 0 0 5px 2px lightgray;
    }
    transition: box-shadow 1s;
  }
`;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
