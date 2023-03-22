import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { Hovereffect } from "./styles";
function Qr_code() {
 
  const [inputText, setInputText] = useState('');
  const [qrCodeText, setQRCodeText] = useState('');
 
  // generate QR code
  const generateQRCode = () => {
    setQRCodeText(inputText);
  }
 
  return (


    <Hovereffect>
    <div className="">
      {/* <h3> <a href="https://www.cluemediator.com/" target="_blank" rel="noopener noreferrer">Clue Mediator</a></h3> */}
      <div className="qr-input myDIV">
        <input
          type="text"
          placeholder="Enter input"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
        <input
          type="button"
          value="Generate"
          onClick={generateQRCode}
        />
      </div>
      <QRCode
      className='hide'
        id="qrCodeEl"
        size={150}
        value={qrCodeText}
      />
    </div>

    </Hovereffect>
  );
}
 
export default Qr_code;