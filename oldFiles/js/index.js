var icon_cache = {};
var cForm;
var spkStyleLoaded = false;
var spkFormShown = false;

var spkCss = "" +
    "@font-face {\n" +
    "    font-family: WhitneyHTF-Black;\n" +
    "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-Black.otf);\n" +
    "}\n" +
    "\n" +
    "@font-face {\n" +
    "    font-family: WhitneyHTF-BlackItalic;\n" +
    "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-BlackItalic.otf);\n" +
    "}\n" +
    "\n" +
    "@font-face {\n" +
    "    font-family: WhitneyHTF-BlackItalicSc;\n" +
    "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-BlackItalicSC.otf);\n" +
    "}\n" +
    "\n" +
    "@font-face {\n" +
    "    font-family: WhitneyHTF-BlackSC;\n" +
    "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-BlackSC.otf);\n" +
    "}\n" +
    "\n" +
    "@font-face {\n" +
    "    font-family: whitneyhtf-bolditalic-webfont;\n" +
    "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/whitneyhtf-bolditalic-webfont.ttf);\n" +
    "}\n" +
    "\n" +
    "@font-face {\n" +
    "    font-family: WhitneyHTF-Bold;\n" +
    "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-Bold.ttf);\n" +
    "}\n" +
    "\n" +
    "@font-face {\n" +
    "    font-family: WhitneyHTF-Book;\n" +
    "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-Book.ttf);\n" +
    "}\n" +
    "\n" +
    "@font-face {\n" +
    "    font-family: WhitneyHTF-Light;\n" +
    "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-Light.ttf);\n" +
    "}\n" +
    "\n" +
    "@font-face {\n" +
    "    font-family: WhitneyHTF-Medium;\n" +
    "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-Medium.ttf);\n" +
    "}\n" +
    "\n" +
    "@font-face {\n" +
    "    font-family: WhitneyHTF-SemiBold;\n" +
    "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-SemiBold.ttf);\n" +
    "}\n" +
    "\n" +
    ".ps_checkout {\n" +
    "    background-color: rgba(0, 0, 0, 0.77);\n" +
    "    height: 100%;\n" +
    "    width: 100%;\n" +
    "    /* display: none; */\n" +
    "    top: 0px;\n" +
    "    left: 0px;\n" +
    "    position: fixed;\n" +
    "}\n" +
    "\n" +
    ".spk-card {\n" +
    "    position: relative;\n" +
    "    transform: perspective(1px) translateY(-50%);\n" +
    "    -ms-transform: perspective(1px) translateY(-50%);\n" +
    "    -webkit-transform: perspective(1px) translateY(-50%);\n" +
    "    /* -webkit-transform: perspective(1px)  translateY(40%); */\n" +
    "    -moz-transform: perspective(1px) translateY(-50%);\n" +
    "    top: 50%;\n" +
    "    margin-left: auto;\n" +
    "    margin-right: auto;\n" +
    "    background-color: #f2f2f4;\n" +
    "    width: 320px;\n" +
    "    height: 480px;\n" +
    "    border-radius: 10px 10px 10px 10px;\n" +
    "    box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.10);\n" +
    "    overflow: visible;\n" +
    "}\n" +
    "\n" +
    "/*.ps_form .spk-card {*/\n" +
    "/*transform: translateY(35%) ;*/\n" +
    "/*}*/\n" +
    "/*.spcard-load {*/\n" +
    "/*min-height: 430px ;*/\n" +
    "/*}*/\n" +
    ".spk-card-close {\n" +
    "    position: absolute;\n" +
    "    display: block;\n" +
    "    right: -35px;\n" +
    "    top: 20px;\n" +
    "}\n" +
    "\n" +
    "/*.spclose {*/\n" +
    "/*position: relative ;*/\n" +
    "/*display: inline-block ;*/\n" +
    "/*width: 20px ;*/\n" +
    "/*height: 20px ;*/\n" +
    "/*overflow: hidden ;*/\n" +
    "/*height: 1px ;*/\n" +
    "/*}*/\n" +
    ".spk-card-icon {\n" +
    "    position: relative;\n" +
    "    /* top: 0%;\n" +
    "    transform: translateY(180%); */\n" +
    "    transform: perspective(1px) translateY(-50%);\n" +
    "    -ms-transform: perspective(1px) translateY(-50%);\n" +
    "    -webkit-transform: perspective(1px) translateY(-50%);\n" +
    "    /* -webkit-transform: perspective(1px)  translateY(40%); */\n" +
    "    -moz-transform: perspective(1px) translateY(-50%);\n" +
    "    top: 30%;\n" +
    "    height: 60px;\n" +
    "    width: 120px;\n" +
    "    margin-left: auto;\n" +
    "    margin-right: auto;\n" +
    "}\n" +
    "\n" +
    ".spk-title {\n" +
    "    font-family: WhitneyHTF-SemiBold;\n" +
    "    font-size: 16px;\n" +
    "    color: #73767F;\n" +
    "    letter-spacing: 0;\n" +
    "    margin: auto;\n" +
    "    padding: 30px 23px;\n" +
    "}\n" +
    "\n" +
    ".spk-logo {\n" +
    "    float: right;\n" +
    "    height: 19px;\n" +
    "    width: 63px;\n" +
    "}\n" +
    "\n" +
    ".spk-card label {\n" +
    "    font-family: WhitneyHTF-Bold;\n" +
    "    font-size: 10px;\n" +
    "    color: #818B92;\n" +
    "    letter-spacing: 0.5px;\n" +
    "    text-align: left;\n" +
    "    display: block;\n" +
    "    background-color: #fff;\n" +
    "}\n" +
    "\n" +
    ".spk-card input::-ms-clear {\n" +
    "    display: none;\n" +
    "}\n" +

    "\n" +
    ".spk-card ::-webkit-input-placeholder {\n" +
    "    color: rgba(40, 48, 54, 0.24) !important;\n" +
    "}\n" +
    "\n" +
    "/* Firefox 4-18 */\n" +
    ".spk-card :-moz-placeholder {\n" +
    "    color: rgba(40, 48, 54, 0.24) !important;\n" +
    "}\n" +
    "\n" +
    "/* Firefox 19-50 */\n" +
    ".spk-card ::-moz-placeholder {\n" +
    "    color: rgba(40, 48, 54, 0.24) !important;\n" +
    "}\n" +
    "\n" +
    "/* - Internet Explorer 10–11\n" +
    "   - Internet Explorer Mobile 10-11 */\n" +
    ".spk-card :-ms-input-placeholder {\n" +
    "    color: rgba(40, 48, 54, 0.24) !important;\n" +
    "}\n" +
    "\n" +
    "/* Edge (also supports ::-webkit-input-placeholder) */\n" +
    ".spk-card ::-ms-input-placeholder {\n" +
    "    color: rgba(40, 48, 54, 0.24) !important;\n" +
    "}\n" +
    "\n" +
    "/* CSS Pseudo-Elements Level 4 Editor's Draft */\n" +
    ".spk-card ::placeholder {\n" +
    "    color: rgba(40, 48, 54, 0.24) !important;\n" +
    "}\n" +
    "\n" +
    ".spk-card input {\n" +
    "    font-family: WhitneyHTF-SemiBold;\n" +
    "    font-size: 14px;\n" +
    "    color: #283036;\n" +
    "    /*letter-spacing: 0 ;*/\n" +
    "    text-align: left;\n" +
    "    border-radius: 1px;\n" +
    "    height: 45px;\n" +
    "    width: 236px;\n" +
    "    padding: 0 20px;\n" +
    "    border: 1.4px solid #DEE2E5;\n" +
    "    border-radius: 4px;\n" +
    "    margin-bottom: 25px;\n" +
    "    margin-top: 10px;\n" +
    "    text-transform: capitalize;\n" +
    "    display: block;\n" +
    "    background-color: #fff;\n" +
    "}\n" +
    "\n" +
    ".spk-card input:focus {\n" +
    "    border: 1.45px solid #0ABF53;\n" +
    "    outline: none;\n" +
    "}\n" +
    "\n" +
    ".spk-card input[valid=true] {\n" +
    "    border: 1.45px solid #0ABF53;\n" +
    "}\n" +
    "\n" +
    ".spk-card input[valid=true]:last-of-type {\n" +
    "    border: 1.45px solid #0ABF53;\n" +
    "    font-family: WhitneyHTF-SemiBold;\n" +
    "    font-size: 14px;\n" +
    "    color: #0ABF53;\n" +
    "    letter-spacing: 0;\n" +
    "    text-align: left;\n" +
    "    caret-color: black;\n" +
    "}\n" +
    "\n" +
    ".spk-card input[valid=false] {\n" +
    "    border: 1.45px solid #FF3B30;\n" +
    "}\n" +
    "\n" +
    ".spk-card input[valid=false]:last-of-type {\n" +
    "    border: 1.45px solid #FF3B30;\n" +
    "    font-family: WhitneyHTF-SemiBold;\n" +
    "    font-size: 14px;\n" +
    "    color: #FF3B30;\n" +
    "    letter-spacing: 0;\n" +
    "    text-align: left;\n" +
    "    caret-color: black\n" +
    "}\n" +
    "\n" +
    ".spk-card input[valid=true]:placeholder-shown {\n" +
    "    border: 1.45px solid #DEE2E5;\n" +
    "}\n" +
    "\n" +
    ".spk-card input:required:placeholder-shown {\n" +
    "    border: 1.45px solid #DEE2E5;\n" +
    "}\n" +
    "\n" +
    ".spk-card input:required:placeholder-shown:focus {\n" +
    "    border: 1.45px solid #0ABF53;\n" +
    "}\n" +
    "\n" +
    ".spk-card-content {\n" +
    "    color: rgb(118, 121, 130);\n" +
    "    font-family: WhitneyHTF-Medium;\n" +
    "}\n" +
    "\n" +
    ".spk-card-content-text {\n" +
    "    font-style: normal;\n" +
    "    font-stretch: normal;\n" +
    "    line-height: normal;\n" +
    "    letter-spacing: normal;\n" +
    "    color: #73767f;\n" +
    "    position: absolute;\n" +
    "    width: 100%;\n" +
    "    text-align: center;\n" +
    "    font-size: 22px;\n" +
    "    /*padding-right: -25px ;*/\n" +
    "    height: 320px;\n" +
    "}\n" +
    "\n" +
    ".spk-card-loading-text {\n" +
    "    top: 50%;\n" +
    "}\n" +
    "\n" +
    "/*.spk-card-success-text::before {*/\n" +
    "/*font-family: WhitneyHTF-SemiBold ;*/\n" +
    "/*font-size: 22px ;*/\n" +
    "/*color: #0ABF53 ;*/\n" +
    "/*letter-spacing: 0 ;*/\n" +
    "/*text-align: center ;*/\n" +
    "/*content: \"Payment Successful\" ;*/\n" +
    "/*}*/\n" +
    "/*.spk-card-sent-text {*/\n" +
    "/*font-family: WhitneyHTF-SemiBold ;*/\n" +
    "/*position: absolute ;*/\n" +
    "/*width: 100% ;*/\n" +
    "/*text-align: center ;*/\n" +
    "/*font-size: 17px ;*/\n" +
    "/*padding-right: -5px ;*/\n" +
    "/*height: 40% ;*/\n" +
    "/*top: 35% ;*/\n" +
    "/*}*/\n" +
    "/* \n" +
    ".spk-card-sent-text::before {\n" +
    "\n" +
    "\n" +
    "font-family: WhitneyHTF-SemiBold ;\n" +
    "\n" +
    "\n" +
    "font-size: 22px ;\n" +
    "\n" +
    "\n" +
    "content: \"Request Sent\" ;\n" +
    "\n" +
    "\n" +
    "color: #F5A623 ;\n" +
    "\n" +
    "\n" +
    "} */\n" +
    "/*.spk-card-failed-text {*/\n" +
    "/*font-family: WhitneyHTF-SemiBold ;*/\n" +
    "/*position: absolute ;*/\n" +
    "/*width: 100% ;*/\n" +
    "/*text-align: center ;*/\n" +
    "/*font-size: 17px ;*/\n" +
    "/*padding-right: -5px ;*/\n" +
    "/*height: 40% ;*/\n" +
    "/*top: 35% ;*/\n" +
    "/*}*/\n" +
    "/*.spk-card-failed-text::before {*/\n" +
    "/*font-family: WhitneyHTF-SemiBold ;*/\n" +
    "/*font-size: 22px ;*/\n" +
    "/*content: \"Payment Failed\" ;*/\n" +
    "/*color: #FF3B30 ;*/\n" +
    "/*}*/\n" +
    ".spk-card-icon-failed {\n" +
    "    background-image: url(\"https://s3.amazonaws.com/spektra-checkout/images/failed.svg\");\n" +
    "    background-repeat: no-repeat;\n" +
    "    background-repeat: no-repeat;\n" +
    "    background-position: center;\n" +
    "    background-size: 90px 90px;\n" +
    "    margin-left: auto;\n" +
    "    margin-right: auto;\n" +
    "    padding-top: 180px;\n" +
    "    text-align: center;\n" +
    "}\n" +
    "\n" +
    ".spk-card-icon-done {\n" +
    "    background-image: url(\"https://s3.amazonaws.com/spektra-checkout/images/Success.svg\");\n" +
    "    background-repeat: no-repeat;\n" +
    "    background-position: center;\n" +
    "    background-size: 90px 90px;\n" +
    "    margin-left: auto;\n" +
    "    margin-right: auto;\n" +
    "    padding-top: 180px;\n" +
    "    text-align: center;\n" +
    "}\n" +
    "\n" +
    ".spk-card-icon-sent {\n" +
    "    background-image: url(\"https://s3.amazonaws.com/spektra-checkout/images/Pending.svg\");\n" +
    "    background-repeat: no-repeat;\n" +
    "    background-position: center;\n" +
    "    background-size: 90px 90px;\n" +
    "    /* height: 90px;\n" +
    "    width: 90px; */\n" +
    "    margin-left: auto;\n" +
    "    margin-right: auto;\n" +
    "    padding-top: 180px;\n" +
    "    /* padding-bottom: 20px; */\n" +
    "    text-align: center;\n" +
    "}\n" +
    "\n" +
    ".spk-request-sent::after {\n" +
    "    font-family: WhitneyHTF-SemiBold;\n" +
    "    font-size: 22px;\n" +
    "    content: \"Request Sent\";\n" +
    "    color: #F5A623;\n" +
    "}\n" +
    "\n" +
    ".spk-success-text::after {\n" +
    "    font-family: WhitneyHTF-SemiBold;\n" +
    "    font-size: 22px;\n" +
    "    color: #0ABF53;\n" +
    "    letter-spacing: 0;\n" +
    "    text-align: center;\n" +
    "    content: \"Payment Successful\";\n" +
    "}\n" +
    "\n" +
    ".spk-failed-text::after {\n" +
    "    font-family: WhitneyHTF-SemiBold;\n" +
    "    font-size: 22px;\n" +
    "    color: #FF3B30;\n" +
    "    letter-spacing: 0;\n" +
    "    text-align: center;\n" +
    "    content: \"Request Failed\";\n" +
    "}\n" +
    "\n" +
    ".spk-timeout-text::after {\n" +
    "    font-family: WhitneyHTF-SemiBold;\n" +
    "    font-size: 22px;\n" +
    "    color: #FF3B30;\n" +
    "    letter-spacing: 0;\n" +
    "    text-align: center;\n" +
    "    content: \"Request Timed Out\";\n" +
    "}\n" +
    "\n" +
    "/*.spk-card-sent-text {*/\n" +
    "/*font-family: WhitneyHTF-SemiBold ;*/\n" +
    "/*position: absolute ;*/\n" +
    "/*width: 100% ;*/\n" +
    "/*text-align: center ;*/\n" +
    "/*font-size: 17px ;*/\n" +
    "/*padding-right: -5px ;*/\n" +
    "/*height: 40% ;*/\n" +
    "/*top: 35% ;*/\n" +
    "/*}*/\n" +
    "/* /*  */\n" +
    "sppay-button {\n" +
    "    background-color: rgb(21, 21, 21);\n" +
    "    color: white;\n" +
    "    height: 30px;\n" +
    "    border-radius: 4px;\n" +
    "    outline: 0;\n" +
    "    border: none;\n" +
    "    transition: all .5s ease-in-out;\n" +
    "}\n" +
    "\n" +
    ".spk-card-button {\n" +
    "    background-image: linear-gradient(-180deg, #333333 0%, #000000 100%);\n" +
    "    border: 4px solid #ECECEC;\n" +
    "    border-radius: 4px;\n" +
    "    position: absolute;\n" +
    "    font-family: WhitneyHTF-SemiBold;\n" +
    "    font-size: 18px;\n" +
    "    color: #FFFFFF;\n" +
    "    letter-spacing: 0.56px;\n" +
    "    text-align: center;\n" +
    "    width: 80%;\n" +
    "    padding: 15px;\n" +
    "    top: 77%;\n" +
    "    left: 10%;\n" +
    "    outline: none;\n" +
    "    cursor: pointer;\n" +
    "}\n" +
    "\n" +
    "/* .spk-card-content {\n" +
    "    color: rgb(118, 121, 130);\n" +
    "    font-family: WhitneyHTF-Medium;\n" +
    "    font-style: normal;\n" +
    "    font-stretch: normal;\n" +
    "    line-height: normal;\n" +
    "    letter-spacing: normal; \n" +
    "    color: #73767f; \n" +
    "    position: absolute;\n" +
    "    width: 100%;\n" +
    "    text-align: center;\n" +
    "    font-size: 17px;\n" +
    "    /*padding-right: -25px ;\n" +
    "    height: 60%;\n" +
    "    top: 55%;\n" +
    "} */\n" +
    "/*.spk-card-content a {*/\n" +
    "/*color: rgb(44, 131, 235) ;*/\n" +
    "/*display: inline-block ;*/\n" +
    "/*}*/\n" +
    "/*.spk-card-body {*/\n" +
    "/*color: rgb(118, 121, 130) ;*/\n" +
    "/*}*/\n" +
    "/*.spk-card-body a {*/\n" +
    "/*color: #0F76ED ;*/\n" +
    "/*}*/\n" +
    "/*.spk-card-body-no {*/\n" +
    "/*color: rgb(4, 4, 4) ;*/\n" +
    "/*font-weight: 600 ;*/\n" +
    "/*}*/\n" +
    ".spk-error {\n" +
    "    display: inline-table;\n" +
    "    margin-top: -22px;\n" +
    "    font-family: WhitneyHTF-SemiBold;\n" +
    "    font-size: 12px;\n" +
    "    color: #FF3B30;\n" +
    "    letter-spacing: 0;\n" +
    "    text-align: left;\n" +
    "    float: left;\n" +
    "    width: 100%\n" +
    "}\n" +
    "\n" +
    ".spk-er-wrapper {}\n" +
    "\n" +
    ".spk-pay-btn {\n" +
    "    background-image: linear-gradient(-180deg, #AA216E 0%, #5D1F5E 100%);\n" +
    "    border: 3px solid #F2F2F2;\n" +
    "    border-radius: 4px;\n" +
    "    font-family: WhitneyHTF-Bold;\n" +
    "    font-size: 18px;\n" +
    "    color: #FFFFFF;\n" +
    "    letter-spacing: 0.56px;\n" +
    "    text-align: center;\n" +
    "    width: 100%;\n" +
    "    padding: 15px;\n" +
    "    outline: none;\n" +
    "    cursor: pointer;\n" +
    "}\n" +
    "\n" +
    ".spk-pay-btn:active {\n" +
    "    -webkit-transform: scale(0.97);\n" +
    "    transform: scale(0.97);\n" +
    "}\n" +
    "\n" +
    "/*.spactive {*/\n" +
    "/*box-shadow: 0 0 40px #dee2e5 ;*/\n" +
    "/*}*/\n" +
    ".spk-checkout-msg {\n" +
    "    font-family: WhitneyHTF-SemiBold;\n" +
    "    font-size: 12px;\n" +
    "    color: #4A90E2;\n" +
    "    letter-spacing: 0.38px;\n" +
    "    text-align: center;\n" +
    "    padding: 10px;\n" +
    "}\n" +
    "\n" +
    ".spk-card-body {\n" +
    "    background: #FFFFFF;\n" +
    "    border-radius: 0px 20px 10px 10px;\n" +
    "    box-shadow: 0 2px 2.5px 0 rgba(0, 0, 0, 0.12);\n" +
    "    height: 362px;\n" +
    "    padding: 20px;\n" +
    "}\n" +
    "\n" +
    ".spdefault {\n" +
    "    background: url(\"https://s3.amazonaws.com/spektra-checkout/images/sim.png\") no-repeat;\n" +
    "    background-size: 45px;\n" +
    "    background-position: 97%;\n" +
    "}\n" +
    "\n" +
    "/*.sp-provider-icon {*/\n" +
    "/*background-size: 45px ;*/\n" +
    "/*background-position: 97% ;*/\n" +
    "/*}*/\n" +
    "/*.spvodafoneghana {*/\n" +
    "/*background: url(https://s3.amazonaws.com/spektra-checkout/images/vodafoneghana.png) no-repeat ;*/\n" +
    "/*background-size: 45px ;*/\n" +
    "/*background-position: 97% ;*/\n" +
    "/*}*/\n" +
    "/*.spmtnghana {*/\n" +
    "/*background: url(https://s3.amazonaws.com/spektra-checkout/images/mtnghana.png) no-repeat ;*/\n" +
    "/*background-size: 45px ;*/\n" +
    "/*background-position: 97% ;*/\n" +
    "/*}*/\n" +
    "/*.sptigoghana {*/\n" +
    "/*background: url(https://s3.amazonaws.com/spektra-checkout/images/airteltigoghana.png) no-repeat ;*/\n" +
    "/*background-size: 45px ;*/\n" +
    "/*background-position: 97% ;*/\n" +
    "/*}*/\n" +
    "/*.spairtelghana {*/\n" +
    "/*background: url(https://s3.amazonaws.com/spektra-checkout/images/airteltigoghana.png) no-repeat ;*/\n" +
    "/*background-size: 45px ;*/\n" +
    "/*background-position: 97% ;*/\n" +
    "/*}*/\n" +
    "/*.spsafaricomkenya {*/\n" +
    "/*background: url(https://s3.amazonaws.com/spektra-checkout/images/mpesa.png) no-repeat ;*/\n" +
    "/*background-size: 45px ;*/\n" +
    "/*background-position: 97% ;*/\n" +
    "/*}*/\n" +
    "/*.spairtelkenya {*/\n" +
    "/*background: url(https://s3.amazonaws.com/spektra-checkout/images/airtelkenya.png) no-repeat ;*/\n" +
    "/*background-size: 45px ;*/\n" +
    "/*background-position: 97% ;*/\n" +
    "/*}*/\n" +
    "/*.sptelkom {*/\n" +
    "/*background: url(https://s3.amazonaws.com/spektra-checkout/images/telkom.png) no-repeat ;*/\n" +
    "/*background-size: 45px ;*/\n" +
    "/*background-position: 97% ;*/\n" +
    "/*}*/\n" +
    "/*@media only screen and (min-height: 400px) and (max-width: 489px) {*/\n" +
    "/*.spk-card {*/\n" +
    "/*margin-bottom: auto ;*/\n" +
    "/*width: 70% ;*/\n" +
    "/*}*/\n" +
    "/*}*/\n" +
    "/*@media only screen and (max-width: 489px) {*/\n" +
    "/*.spk-card {*/\n" +
    "/*width: 60% ;*/\n" +
    "/*}*/\n" +
    "/*}*/\n" +
    "/*@media only screen and (max-width: 768px) {*/\n" +
    "/*.spk-card {*/\n" +
    "/*width: 60% ;*/\n" +
    "/*height: 400px ;*/\n" +
    "/*}*/\n" +
    "/*}*/\n" +
    "/*@media only screen and (min-width: 768px) and (max-width: 1024px) {*/\n" +
    "/*.spk-card {*/\n" +
    "/*margin-top: -160px ;*/\n" +
    "/*width: 33% ;*/\n" +
    "/*}*/\n" +
    "/*}*/\n" +
    "/*@media only screen and (min-width: 1224px) {*/\n" +
    "/*.spk-card {*/\n" +
    "/*margin-top: -100px ;*/\n" +
    "/*width: 25% ;*/\n" +
    "/*}*/\n" +
    "/*}*/\n" +
    "/*@media only screen and (min-width: 1440px) {*/\n" +
    "/*.spk-card {*/\n" +
    "/*margin-top: -100px ;*/\n" +
    "/*width: 25% ;*/\n" +
    "/*}*/\n" +
    "/*}*/\n" +
    "/*@media only screen and (min-width: 1824px) {*/\n" +
    "/*.spk-card {*/\n" +
    "/*margin-top: -100px ;*/\n" +
    "/*width: 13% ;*/\n" +
    "/*}*/\n" +
    "/*}*/\n" +
    "/*vg {*/\n" +
    "/*-webkit-transform: scale(3) ;*/\n" +
    "/*transform: scale(3) ;*/\n" +
    "/*}*/\n" +
    "/*@-webkit-keyframes fade {*/\n" +
    "/*0% {*/\n" +
    "/*opacity: 1 ;*/\n" +
    "/*}*/\n" +
    "/*100% {*/\n" +
    "/*opacity: .1 ;*/\n" +
    "/*}*/\n" +
    "/*}*/\n" +
    "/*@keyframes fade {*/\n" +
    "/*0% {*/\n" +
    "/*opacity: 1 ;*/\n" +
    "/*}*/\n" +
    "/*100% {*/\n" +
    "/*opacity: .1 ;*/\n" +
    "/*}*/\n" +
    "/*}*/\n" +
    "@-webkit-keyframes fade {\n" +
    "    0% {\n" +
    "        opacity: 1;\n" +
    "    }\n" +
    "\n" +
    "    100% {\n" +
    "        opacity: .1;\n" +
    "    }\n" +
    "}\n" +
    "\n" +
    "@keyframes fade {\n" +
    "    0% {\n" +
    "        opacity: 1;\n" +
    "    }\n" +
    "\n" +
    "    100% {\n" +
    "        opacity: .1;\n" +
    "    }\n" +
    "}\n" +
    "\n" +
    ".c-spinner {\n" +
    "    /* Bind the animation */\n" +
    "}\n" +
    "\n" +
    ".c-spinner .c-spinner__bar-1 {\n" +
    "    -webkit-animation: fade 1s linear infinite;\n" +
    "    animation: fade 1s linear infinite;\n" +
    "    -webkit-animation-delay: -1s;\n" +
    "    animation-delay: -1s;\n" +
    "}\n" +
    "\n" +
    ".c-spinner .c-spinner__bar-2 {\n" +
    "    -webkit-animation: fade 1s linear infinite;\n" +
    "    animation: fade 1s linear infinite;\n" +
    "    -webkit-animation-delay: -0.9166666667s;\n" +
    "    animation-delay: -0.9166666667s;\n" +
    "}\n" +
    "\n" +
    ".c-spinner .c-spinner__bar-3 {\n" +
    "    -webkit-animation: fade 1s linear infinite;\n" +
    "    animation: fade 1s linear infinite;\n" +
    "    -webkit-animation-delay: -0.8333333333s;\n" +
    "    animation-delay: -0.8333333333s;\n" +
    "}\n" +
    "\n" +
    ".c-spinner .c-spinner__bar-4 {\n" +
    "    -webkit-animation: fade 1s linear infinite;\n" +
    "    animation: fade 1s linear infinite;\n" +
    "    -webkit-animation-delay: -0.75s;\n" +
    "    animation-delay: -0.75s;\n" +
    "}\n" +
    "\n" +
    ".c-spinner .c-spinner__bar-5 {\n" +
    "    -webkit-animation: fade 1s linear infinite;\n" +
    "    animation: fade 1s linear infinite;\n" +
    "    -webkit-animation-delay: -0.6666666667s;\n" +
    "    animation-delay: -0.6666666667s;\n" +
    "}\n" +
    "\n" +
    ".c-spinner .c-spinner__bar-6 {\n" +
    "    -webkit-animation: fade 1s linear infinite;\n" +
    "    animation: fade 1s linear infinite;\n" +
    "    -webkit-animation-delay: -0.5833333333s;\n" +
    "    animation-delay: -0.5833333333s;\n" +
    "}\n" +
    "\n" +
    ".c-spinner .c-spinner__bar-7 {\n" +
    "    -webkit-animation: fade 1s linear infinite;\n" +
    "    animation: fade 1s linear infinite;\n" +
    "    -webkit-animation-delay: -0.5s;\n" +
    "    animation-delay: -0.5s;\n" +
    "}\n" +
    "\n" +
    ".c-spinner .c-spinner__bar-8 {\n" +
    "    -webkit-animation: fade 1s linear infinite;\n" +
    "    animation: fade 1s linear infinite;\n" +
    "    -webkit-animation-delay: -0.4166666667s;\n" +
    "    animation-delay: -0.4166666667s;\n" +
    "}\n" +
    "\n" +
    ".c-spinner .c-spinner__bar-9 {\n" +
    "    -webkit-animation: fade 1s linear infinite;\n" +
    "    animation: fade 1s linear infinite;\n" +
    "    -webkit-animation-delay: -0.3333333333s;\n" +
    "    animation-delay: -0.3333333333s;\n" +
    "}\n" +
    "\n" +
    ".c-spinner .c-spinner__bar-10 {\n" +
    "    -webkit-animation: fade 1s linear infinite;\n" +
    "    animation: fade 1s linear infinite;\n" +
    "    -webkit-animation-delay: -0.25s;\n" +
    "    animation-delay: -0.25s;\n" +
    "}\n" +
    "\n" +
    ".c-spinner .c-spinner__bar-11 {\n" +
    "    -webkit-animation: fade 1s linear infinite;\n" +
    "    animation: fade 1s linear infinite;\n" +
    "    -webkit-animation-delay: -0.1666666667s;\n" +
    "    animation-delay: -0.1666666667s;\n" +
    "}\n" +
    "\n" +
    ".c-spinner .c-spinner__bar-12 {\n" +
    "    -webkit-animation: fade 1s linear infinite;\n" +
    "    animation: fade 1s linear infinite;\n" +
    "    -webkit-animation-delay: -0.0833333333s;\n" +
    "    animation-delay: -0.0833333333s;\n" +
    "}";

//detect delete to prevent formating number during delete or backspace
function spkPhoneKeyUp(event) {
    // var key = event.keyCode || event.charCode;

    var spkPhoneField = document.spkCheckout.spphonenumber;
    spValidator()


    //return to defaul sim icon when user deletes operator prefix
    // spClearError("splastname_er");
    if (spkPhoneField.value.length === 1) {
        spClearError("spphonenumber_er");
    }

    if (spkPhoneField.value.length < 4) { //if the phone number begins with 0 then check if digits are less than 4
        spkPhoneField.style.backgroundImage = "url(https://s3.amazonaws.com/spektra-checkout/images/sim.png)"
    } else if (spkPhoneField.value[0] != "0" && spkPhoneField.value.length < 7) { //if the phone number doesnt begin with 0 then check if digits are less than 7(including spaces)
        spkPhoneField.style.backgroundImage = "url(https://s3.amazonaws.com/spektra-checkout/images/sim.png)"
    }

    spFormatNo();
}


//function to format phone number input to xxxx xxx xxx
function spFormatNo() {

    spkPhoneField = document.spkCheckout.spphonenumber;

    // spkPhoneField.value = spkPhoneField.value.replace(/^00\d*/, "");
    var temp_phone = spkPhoneField.value.slice();

    var start = spkPhoneField.selectionStart,
        end = spkPhoneField.selectionEnd;
    var curBeg;

    if (temp_phone.match(/^00\d*/)) {
        spkPhoneField.value = temp_phone.slice(2, temp_phone.length)
        curBeg = true;
    }
    if (spkPhoneField.selectionStart === temp_phone.length) {
        curBeg = true
    }

    var numbers = spkPhoneField.value.replace(/\D/g, '')

    if (temp_phone[0] === '0') {

        document.spkCheckout.spphonenumber.setAttribute('maxlength', 12); //including space a local phone number must be upto 12 characters

        // spkPhoneField.value = temp_phone.replace(/\W/gi, '').replace(/(\d{4})(\d{3})?(\d{3})?/, '$1 $2 $3');
        char = {
            4: ' ',
            7: ' '
        };
        spkPhoneField.value = '';
        for (var i = 0; i < numbers.length; i++) {
            spkPhoneField.value += (char[i] || '') + numbers[i];
        }
    } else {
        document.spkCheckout.spphonenumber.setAttribute('maxlength', 15);
        // spkPhoneField.value = temp_phone.replace(/\W/gi, '').replace(/(\d{3})(\d{3})?(\d{3})?(\d{3})?/, '$1 $2 $3 $4'); //including spaces and country code, the phone number must be up to 15 characters
        char = {
            3: ' ',
            6: ' ',
            9: ' '
        };
        spkPhoneField.value = '';
        for (var i = 0; i < numbers.length; i++) {
            spkPhoneField.value += (char[i] || '') + numbers[i];
        }
    }

    var no_diff = temp_phone.replace(/\D/g, '').length - spkPhoneField.value.replace(/\D/g, '').length;

    var space_diff = (spkPhoneField.value.split(" ").length - 1) - (temp_phone.split(" ").length - 1);
    // console.log(space_diff, "..")

    if (start === end && end === spkPhoneField.value.length) {
        spkPhoneField.setSelectionRange(spkPhoneField.value.length + space_diff, spkPhoneField.value.length + space_diff);
        // console.log("start === end && end === spkPhoneField.value.length", start, end, space_diff)
    } else if (no_diff === 0 && space_diff > 0) {
        // console.log("no_diff === 0 && space_diff > 0", no_diff, space_diff, start === spkPhoneField.value.length)

        if (!curBeg) {
            spkPhoneField.setSelectionRange(start + no_diff, end + no_diff);
        } else {
            spkPhoneField.setSelectionRange(start + space_diff, end + space_diff);
        }


    } else if (no_diff > 0 && space_diff > 0) {
        spkPhoneField.setSelectionRange(start + space_diff, end + space_diff);
        // console.log("else", space_diff)
    } else {
        spkPhoneField.setSelectionRange(start, end);
    }

    // console.log(start, end, spkPhoneField.selectionStart, spkPhoneField.selectionEnd)



    spValidatePhone();

}

// vslidate number if in xxxxx xxx xxx format
function spValidatePhone() {
    spkPhoneField = document.spkCheckout.spphonenumber;
    let spkPhoneNumber = document.spkCheckout.spphonenumber.value.replace(/\s/g, '');
    var icon_cache = window.icon_cache

    //validate for both local phone numbers (begins with 0) and internation (includes country code)
    if (spkPhoneNumber.length >= 4 && spkPhoneField.value[0] === "0") {

        //detect operator and update logo
        sp_op_pref = spkPhoneNumber.slice(0, 4)
        if (sp_op_pref in icon_cache) {
            document.spkCheckout.spphonenumber.style.backgroundImage = "url(" + icon_cache[sp_op_pref] + ")"
        } else {
            psDetectOperator(spkPhoneNumber.slice(0, 4), spkPhoneField)
        }

    } else if (spkPhoneNumber.length >= 6 && spkPhoneField.value[0] != "0") {
        //detect operator and update logo
        sp_op_pref = spkPhoneNumber.slice(0, 6)
        if (sp_op_pref in icon_cache) {
            document.spkCheckout.spphonenumber.style.backgroundImage = "url(" + icon_cache[sp_op_pref] + ")"
        } else {
            psDetectOperator(spkPhoneNumber.slice(0, 6), spkPhoneField)
        }
    }

    if ((spkPhoneField.value.match(/^[0-9]{4}[\s]{1}[0-9]{3}[\s]{1}[0-9]{3}$/) || spkPhoneField.value.match(/^[0-9]{3}[\s]{1}[0-9]{3}[\s]{1}[0-9]{3}[\s]{1}[0-9]{3}$/))) {
        spClearError("spphonenumber_er");
        // spValidInput(document.spkCheckout.spphonenumber)

        document.spkCheckout.spphonenumber.className = "spdefault";
    }

}


//valid for name
function validateName(el, submit) { //Second argument determines whether to show certain errors- use if form was submitted

    var re_valid = /^[A-Za-z]+$/.test(el.value)

    if (el.value.length === 1 && re_valid) {
        el.setAttribute("valid", "false")
        if (arguments.length == 2) {
            spDisplayError(el.id + "_er", "Please Use Your Legal Name")
        } else {
            spClearError(el.id + "_er");
        }
        return false
    }

    if (el.value === ""){
        el.setAttribute("valid", "false")
        return false;
    }

    re_valid = /^[A-Za-z\s]+$/.test(el.value)

    if (!re_valid) {
        // console.log("Sorry only letters")
        el.setAttribute("valid", "false")

        // if (/^[0-9]+$/.test(el.value)){
        //     spDisplayError(el.id + "_er", "Please Use Letters Only")
        // }

        spDisplayError(el.id + "_er", "Please Use Letters Only")
        return false
    }
    if (re_valid && el.value.length >= 2) {
        spClearError(el.id + "_er");
        el.setAttribute("valid", "true")
        return true
    }

}
//Pay Button clicked
function spkPayWrapper(state, payBtn) {
    
    console.log(window.cForm, "+++");
    if (spValidator(true)) {
        window.cForm = Object.assign({}, document.getElementById("spkcheckoutForm"));
        // console.log(payBtn)
        spkMakePayment(payBtn,  document.getElementById("spkcheckoutForm"));
        spkCheckout.showLoading();
        document.getElementById("ps_checkout").style.display="none"
        document.getElementById("ps_loading").style.display = "block";
        
    }
}


//
function numberfy(str) {
    return str.replace(/\D/g, '')
}

function spkMakePayment(payBtn, cForm) {
    var payBtn = document.spkCheckout.spkPayBtn

    var spkAmt = payBtn.dataset.spkamount;
    // var cForm = window.cForm;
    var spkKey = payBtn.dataset.spkkey;
    var url = "https://payments.spektra.co/core/core/pay/";
    console.log(payBtn, window.cForm)
    var data = JSON.stringify({
        first_name: cForm.spfirstname.value,
        last_name: cForm.splastname.value,
        phone: numberfy(cForm.spphonenumber.value),
        public_key: spkKey,
        amount: spkAmt,
        reference: payBtn.dataset.reference,
    })

    spkAjax.post(url, data, "application/json")
        .success(function (data, xhr) {
            document.getElementById("ps_loading").outerHTML = "";
            spkCheckout.showSent();
            document.getElementById("ps_sent").style.display = "block";

            console.log("Payment request successful", data, xhr)

        })
        .error(function (data, xhr) {
            document.getElementById("ps_loading").outerHTML = "";
            spkCheckout.showError();
            document.getElementById("ps_failed").style.display = "block";

            console.log("mmhh.. something's wrong", data, xhr)
        });

}

//validate the form for errors
function spValidator() {
    let spfirstnamefield = document.spkCheckout.spfirstname;
    let splastnamefield = document.spkCheckout.splastname;
    let spkPhoneField = document.spkCheckout.spphonenumber

    var isvalid = true;

    if (!spfirstnamefield.value) {
        spfirstnamefield.setAttribute("valid", "false")
        spDisplayError("spfirstname_er", "Please Enter Your First Name");
        isvalid = false
    } else {
        spfirstnamefield.setAttribute("valid", "true")
        spClearError("spfirstname_er");
        isvalid = validateName(spfirstnamefield, true)
    }
    if (!splastnamefield.value) {
        // console.log("validationg lastname field")
        splastnamefield.setAttribute("valid", "false")
        spDisplayError("splastname_er", "Please Enter Your Last Name");
        isvalid = false
    } else {
        splastnamefield.setAttribute("valid", "true")
        spClearError("splastname_er");
        isvalid = validateName(splastnamefield, true)
    }
    // console.log("Length is " + spkPhoneField.value.length, spkPhoneField.value[0] === "0")

    if ((spkPhoneField.value.length < 12 && spkPhoneField.value[0] === "0") || (spkPhoneField.value.length < 15 && spkPhoneField.value[0] != "0")) {
        spkPhoneField.setAttribute("valid", "false")

        if (arguments.length > 0) {
            if (spkPhoneField.value.length === 0) {
                spDisplayError("spphonenumber_er", "Please Enter Your Phone Number");
            } else {
                spDisplayError("spphonenumber_er", "The Phone Number Is Too Short");
            }
        } else {
            // spClearError("spphonenumber_er");
        }

        isvalid = false
    } else {
        spkPhoneField.setAttribute("valid", "true")
    }

    return isvalid;
}


function spDisplayError(sp_id, sp_msg) {
    document.getElementById(sp_id).innerHTML = sp_msg

}

function spClearError(sp_id) {
    document.getElementById(sp_id).innerHTML = "";
}

//
function psDetectOperator(spkPhonePrefix, spkPhoneField) {

    var url = "https://payments.spektra.co/core/core/validate-prefix/"
    var data = JSON.stringify({
        "prefix": spkPhonePrefix
    });

    // console.log("Detecting")
    spkAjax.post(url, data, "application/json; charset=utf-8")
        .success(function (data, xhr) {
            var icon;
            var ua = window.navigator.userAgent;
            var isIE = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1

            if (isIE) {
                icon = JSON.parse(xhr.response).icon;
                console.log("Icon ", icon, xhr.response)

            } else {
                icon = xhr.response.icon;
                console.log("Icon ", icon, xhr)
            }

            window.icon_cache[spkPhonePrefix] = icon; //add icon to cache with the prefix as key
            document.spkCheckout.spphonenumber.style.backgroundImage = "url(" + icon + ")"

        }).error(function (data, xhr) {
        console.log("mmhh.. something's wrong", data, xhr)
        if (xhr.status === 404) {
            spkPhoneField.setAttribute('valid', 'false')
            if (document.spkCheckout.spphonenumber.value[0] === "0") {
                spDisplayError("spphonenumber_er", "Please Include Your Country Code");
            } else {

                spDisplayError("spphonenumber_er", "Unknown Service Provider");
            }
            document.spkCheckout.spphonenumber.style.backgroundImage = "url(https://s3.amazonaws.com/spektra-checkout/images/sim.png)"
        } else {
            // spDisplayError("spphonenumber_er", xmlHttp.response.error);
            document.spkCheckout.spphonenumber.style.backgroundImage = "url(https://s3.amazonaws.com/spektra-checkout/images/sim.png)"
        }
    });
}

function spkGetCharges(payBtn) {
    // var payBtn = document.spkCheckout.spkPayBtn
    var spkAmt = payBtn.dataset.spkamount;
    var xmlHttp = new XMLHttpRequest();
    
    // console.log(spkAmt)
    var spkKey = payBtn.dataset.spkkey;
    var url = "https://payments.spektra.co/core/core/check-amount/?key=" + spkKey + "&amount=" + spkAmt

    // spkPhonePrefix.slice(0, 7)
    spkAjax.get(url).success(function (data, xhr) {
        var ua = window.navigator.userAgent;
        var isIE = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1

        if (isIE) {
            var response = JSON.parse(data);
            console.log("Response: ", response)
            var local = response.local
            var charge = local.currency === "KES" ? Math.ceil(local.charge) : local.charge
            var total = local.currency === "KES" ? Math.ceil(local.total) : local.total
            document.getElementById("spk_charges").innerText = "(" + local.currency + " " + local.amount + " + " + charge + " FEE)"
            document.getElementById("spkPayBtn").innerText = "Pay " + local.currency + " " + total

        } else {
            console.log("Yey, Success!")
            var local = data.local
            var charge = local.currency === "KES" ? Math.ceil(local.charge) : local.charge
            var total = local.currency === "KES" ? Math.ceil(local.total) : local.total
            document.getElementById("spk_charges").innerText = "(" + local.currency + " " + local.amount + " + " + charge + " FEE)"
            document.getElementById("spkPayBtn").innerText = "Pay " + local.currency + " " + total
            console.log("Response: ", data)
        }
    })
        .error(function (data, xhr) {
            console.log("mmhh.. something's wrong", data, xhr)
            if (xhr.status === 400) {
                console.log("Bad request")
            } else if (xhr.status === 403) {
                console.log("Unauthorised")
            }
        });

}



//close card
function spCloseCard(el_id) {
    document.getElementById(el_id).outerHTML = "";
    document.getElementById("sppay-button").style.display = "initial";
}

//close card
function spClose(el_id) {
    document.getElementById(el_id).outerHTML = "";
}

//override default  HTML5 form validation behaviour
document.addEventListener('invalid', (function () {
    return function (e) {
        e.preventDefault();
        document.getElementById("name").focus();
    };
})(), true);


if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) { // .length of function is 2
            'use strict';
            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) { // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}



function spkCheckout(el_id) {
    spkCheckout.showForm(el_id);
    var temp = document.getElementById("spkcheckoutForm");
    // console.log(window.cForm, "____________---------");
}

// resetElements();
// /*reset form elements (firefox saves it)*/

// function resetElements() {
//     var inputs = document.querySelectorAll('input[type=text]');

//     for (var i = 0; i < inputs.length; i++) {
//         document.getElementsByTagName('input')[i].value = "";
//     }
//     var textareas = document.getElementsByTagName('textarea');
//     for (var i = 0; i < textareas.length; i++) {
//         document.getElementsByTagName('textarea')[i].value = "";
//     }
// }tn

(function () {

    'use strict';

    var exports = {};

    var options = {
        contentType: 'application/x-www-form-urlencoded',
        responseType: 'json'
    };

    var parse = function (req) {
        var result;
        try {
            result = JSON.parse(req.responseText);
        } catch (e) {
            result = req.responseText;
        }
        return [result, req];
    };

    var xhr = function (httpMethod, url, data, contentType) {
        var contentTypeHeader = contentType || options.contentType;
        var responseType = options.responseType;
        var methods = {
            success: function () {},
            error: function () {}
        };
        var XHR = window.XMLHttpRequest || ActiveXObject;
        var request = new XHR('MSXML2.XMLHTTP.3.0');
        request.open(httpMethod, url, true);
        request.setRequestHeader('Content-Type', contentTypeHeader);
        request.responseType = responseType;
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    if (responseType != "json") {
                        methods.success.apply(methods, parse(request));
                    } else {
                        methods.success.apply(methods, [request.response, request]);
                    }

                } else {
                    if (responseType != "json") {
                        methods.error.apply(methods, parse(request));
                    } else {
                        methods.error.apply(methods, [request.response, request]);
                    }
                }
            }
        };
        request.send(data);
        // console.log()
        var callbacks = {
            success: function (callback) {
                methods.success = callback;
                return callbacks;
            },
            error: function (callback) {
                methods.error = callback;
                return callbacks;
            }
        };

        return callbacks;
    };

    exports['get'] = function (src) {
        return xhr('GET', src);
    };

    exports['put'] = function (url, data, contentType) {
        return xhr('PUT', url, data, contentType);
    };

    exports['post'] = function (url, data, contentType) {
        return xhr('POST', url, data, contentType);
    };

    exports['delete'] = function (url) {
        return xhr('DELETE', url);
    };

    exports['setContentType'] = function (contentType) {
        options.contentType = contentType;
    };

    exports['setResponseType'] = function (responseType) {
        options.responseType = responseType;
    };

    // check for AMD/Module support, otherwise define Bullet as a global variable.
    if (typeof define !== 'undefined' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function () {
            return exports;
        });

    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = exports;
    } else {
        window.spkAjax = exports;
    }

})();



// (function (){
// var spkpaybtns = document.getElementsByClassName("sppay-button");

// });

// Array.from(spkpaybtns).forEach(function(element){
//   element.addEventListener("click", function() { spcheckout(this); }, false);
// });


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.spkCheckout = factory(root);
    }
})(this, function (root) {

    'use strict';

    var exports = {};

    var config = {
        targetElement: "spkCheckoutDiv"

    };
    var pages = {

    }

    // var methods = {
    //     showSuccess: function() {},
    //     showError: function() {},
    //     showTimedout: function() {},
    //     showSent: function() {},
    //     showLoading: function() {},
    //     showForm: function() {}
    // };



    pages.checkoutForm = "" +
        " <!-- Checkout form section -->\n" +
        "    <div id=\"ps_checkout\" class=\"ps_checkout ps_form\">\n" +
        "\n" +
        "        <div class=\"spk-card\">\n" +
        "            <span class=\"spk-card-close\" onclick=\"spCloseCard('ps_checkout')\">\n" +
        "                <svg width=\"18px\" height=\"18px\" viewBox=\"0 0 14 14\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"\n" +
        "                    xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n" +
        "                    <!-- Generator: Sketch 51.2 (57519) - http://www.bohemiancoding.com/sketch -->\n" +
        "                    <title>close</title>\n" +
        "                    <desc>Created with Sketch.</desc>\n" +
        "                    <defs></defs>\n" +
        "                    <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n" +
        "                        <g id=\"2C\" transform=\"translate(-574.000000, -90.000000)\" fill=\"#73767F\">\n" +
        "                            <g id=\"3\" transform=\"translate(208.000000, 72.000000)\">\n" +
        "                                <g id=\"Material/Icons-black/close\" transform=\"translate(361.000000, 13.000000)\">\n" +
        "                                    <polygon id=\"Shape\" points=\"19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12\"></polygon>\n" +
        "                                </g>\n" +
        "                            </g>\n" +
        "                        </g>\n" +
        "                    </g>\n" +
        "                </svg>\n" +
        "            </span>\n" +
        "            <div class=\"spk-title\">\n" +
        "                <span class=\"spk-brand-name\">Payment Information</span>\n" +
        "                <span class=\"spk-logo\"><img src=\"https://s3.amazonaws.com/spektra-checkout/images/spektra.png\" alt=\"Spektra.\"\n" +
        "                        width=\"65\" height=\"20\"></span>\n" +
        "            </div>\n" +
        "            <div class=\"spk-card-body\">\n" +
        "                <form id=\"spkcheckoutForm\" name=\"spkCheckout\" class=\"spkCheckout\">\n" +
        "                    <label for=\"spfirstname\">\n" +
        "                        FIRST NAME\n" +
        "                    </label>\n" +
        "                    <input id=\"spfirstname\" onkeyup=\"validateName(this)\" name=\"spfirstname\" type=\"text\" autocomplete=\"off\"" +
        "                        placeholder=\"Enter Your First Name \">\n" +
        "                    <span id=\"spfirstname_er\" class=\"spk-error\"></span>\n" +
        "\n" +
        "                    <label for=\"splastname\">\n" +
        "                        LAST NAME\n" +
        "                    </label>\n" +
        "                    <input id=\"splastname\" onkeyup=\"validateName(this)\" name=\"splastname\" type=\"text\" autocomplete=\"off\"" +
        "                        placeholder=\"Enter Your Last Name \">\n" +
        "                    <span id=\"splastname_er\" class=\"spk-error\"></span>\n" +
        "\n" +
        "                    <label for=\"spphonenumber\">\n" +
        "                        MOBILE NUMBER\n" +
        "                    </label>\n" +
        "\n" +
        "                    <input id=\"spphonenumber\" name=\"spphonenumber\" type=\"text\" autocomplete=\"off\" placeholder=\"Enter Your Mobile Number \"\n" +
        "                        class=\"sp-provider-icon spdefault \" maxlength=\"15\" minlength=\"12\" onkeyup=\"spkPhoneKeyUp(event)\">\n" +
        "                    <span id=\"spphonenumber_er\" class=\"spk-error\"></span>\n" +
        "\n" +
        "\n" +
        "                    <button is=\"spk-button\" type=\"button\" onclick=\"spkPayWrapper(true, this)\" id=\"spkPayBtn\" class=\"spk-pay-btn\"\n" +
        "                        data-spkAmount=\"\" data-reference=\"\" data-spkKey=\"\">Pay </button>\n" +
        "\n" +
        "                    <div id=\"spk_charges\" class=\"spk-checkout-msg\"> </div>\n" +
        "                </form>\n" +
        "\n" +
        "            </div>\n" +
        "        </div>\n" +
        "\n" +
        "    </div>\n" +
        "    <!-- end of checkout form -->\n";

    pages.requestSent = "" +
        "\n" +
        "    <!-- request sent section -->\n" +
        "    <div id=\"ps_sent\" class=\"ps_checkout\">\n" +
        "\n" +
        "        <div class=\"spk-card\">\n" +
        "            <span class=\"spk-card-close\" onclick=\"spCloseCard('ps_sent')\">\n" +
        "                <svg width=\"18px\" height=\"18px\" viewBox=\"0 0 14 14\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"\n" +
        "                    xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n" +
        "                    <!-- Generator: Sketch 51.2 (57519) - http://www.bohemiancoding.com/sketch -->\n" +
        "                    <title>close</title>\n" +
        "                    <desc>Created with Sketch.</desc>\n" +
        "                    <defs></defs>\n" +
        "                    <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n" +
        "                        <g id=\"2C\" transform=\"translate(-574.000000, -90.000000)\" fill=\"#73767F\">\n" +
        "                            <g id=\"3\" transform=\"translate(208.000000, 72.000000)\">\n" +
        "                                <g id=\"Material/Icons-black/close\" transform=\"translate(361.000000, 13.000000)\">\n" +
        "                                    <polygon id=\"Shape\" points=\"19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12\"></polygon>\n" +
        "                                </g>\n" +
        "                            </g>\n" +
        "                        </g>\n" +
        "                    </g>\n" +
        "                </svg>\n" +
        "            </span>\n" +
        "\n" +
        "            <div class=\"spk-card-content\">\n" +
        "                <div class=\"spk-card-icon-sent spk-request-sent\"></div>\n" +
        "\n" +
        "                <span class=\"spk-card-content-text\">\n" +
        "                    <p>A Payment Request <br /> Has Been Sent To Your Number, <br /> Check Your Phone Now And <br />Enter\n" +
        "                        Your <span style=\"color:#000000; font-family: WhitneyHTF-Bold; font-size: 19;\">M-PESA PIN</span>\n" +
        "                        <br /> To Confirm.</p>\n" +
        "\n" +
        "\n" +
        "\n" +
        "                </span>\n" +
        "\n" +
        "                <br>\n" +
        "            </div>\n" +
        "\n" +
        "        </div>\n" +
        "    </div>\n" +
        "    <!-- end of request sent section -->\n" +
        "\n";

    pages.loading = "" +
        "<!-- request loading section -->\n" +
        "    <div id=\"ps_loading\" class=\"ps_checkout\">\n" +
        "\n" +
        "        <div class=\"spk-card \">\n" +
        "            <span class=\"spk-card-close\" onclick=\"spCloseCard('ps_loading')\">\n" +
        "                <svg width=\"18px\" height=\"18px\" viewBox=\"0 0 14 14\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"\n" +
        "                    xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n" +
        "                    <!-- Generator: Sketch 51.2 (57519) - http://www.bohemiancoding.com/sketch -->\n" +
        "                    <title>close</title>\n" +
        "                    <desc>Created with Sketch.</desc>\n" +
        "                    <defs></defs>\n" +
        "                    <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n" +
        "                        <g id=\"2C\" transform=\"translate(-574.000000, -90.000000)\" fill=\"#73767F\">\n" +
        "                            <g id=\"3\" transform=\"translate(208.000000, 72.000000)\">\n" +
        "                                <g id=\"Material/Icons-black/close\" transform=\"translate(361.000000, 13.000000)\">\n" +
        "                                    <polygon id=\"Shape\" points=\"19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12\"></polygon>\n" +
        "                                </g>\n" +
        "                            </g>\n" +
        "                        </g>\n" +
        "                    </g>\n" +
        "                </svg>\n" +
        "            </span>\n" +
        "            <div class=\"spk-card-icon\">\n" +
        "                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\" viewBox=\"0 0 30 30\" class=\"c-spinner js-spinner\">\n" +
        "                    <title></title>\n" +
        "                    <g fill=\"none\" fill-rule=\"evenodd\">\n" +
        "                        <path class=\"c-spinner__bar-1\" d=\"M7.132 3.373c-.275-.477-.114-1.085.368-1.363.478-.277 1.093-.108 1.365.363l3.003 5.2c.275.478.114 1.087-.368 1.365-.478.276-1.093.107-1.365-.364l-3.003-5.2z\"\n" +
        "                            fill=\"#858585\" />\n" +
        "                        <path class=\"c-spinner__bar-2\" d=\"M2.373 8.865c-.477-.276-.64-.883-.363-1.365.276-.478.892-.64 1.363-.368l5.2 3.003c.478.276.643.883.365 1.365-.276.478-.893.64-1.364.368l-5.2-3.003z\"\n" +
        "                            fill=\"#858585\" />\n" +
        "                        <path class=\"c-spinner__bar-3\" d=\"M.997 16C.447 16 0 15.556 0 15c0-.552.453-1 .997-1h6.006c.55 0 .997.444.997 1 0 .552-.453 1-.997 1H.997z\"\n" +
        "                            fill=\"#858585\" />\n" +
        "                        <path class=\"c-spinner__bar-4\" d=\"M3.373 22.868c-.477.275-1.085.114-1.363-.368-.277-.478-.108-1.093.363-1.365l5.2-3.003c.478-.275 1.087-.114 1.365.368.276.478.107 1.093-.364 1.365l-5.2 3.003z\"\n" +
        "                            fill=\"#858585\" />\n" +
        "                        <path class=\"c-spinner__bar-5\" d=\"M8.865 27.627c-.276.477-.883.64-1.365.363-.478-.276-.64-.892-.368-1.363l3.003-5.2c.276-.478.883-.643 1.365-.365.478.276.64.893.368 1.364l-3.003 5.2z\"\n" +
        "                            fill=\"#858585\" />\n" +
        "                        <path class=\"c-spinner__bar-6\" d=\"M16 29.003c0 .55-.444.997-1 .997-.552 0-1-.453-1-.997v-6.006c0-.55.444-.997 1-.997.552 0 1 .453 1 .997v6.006z\"\n" +
        "                            fill=\"#858585\" />\n" +
        "                        <path class=\"c-spinner__bar-7\" d=\"M22.868 26.627c.275.477.114 1.085-.368 1.363-.478.277-1.093.108-1.365-.363l-3.003-5.2c-.275-.478-.114-1.087.368-1.365.478-.276 1.093-.107 1.365.364l3.003 5.2z\"\n" +
        "                            fill=\"#858585\" />\n" +
        "                        <path class=\"c-spinner__bar-8\" d=\"M27.627 21.135c.477.276.64.883.363 1.365-.276.478-.892.64-1.363.368l-5.2-3.003c-.478-.276-.643-.883-.365-1.365.276-.478.893-.64 1.364-.368l5.2 3.003z\"\n" +
        "                            fill=\"#858585\" />\n" +
        "                        <path class=\"c-spinner__bar-9\" d=\"M29.003 14c.55 0 .997.444.997 1 0 .552-.453 1-.997 1h-6.006c-.55 0-.997-.444-.997-1 0-.552.453-1 .997-1h6.006z\"\n" +
        "                            fill=\"#858585\" />\n" +
        "                        <path class=\"c-spinner__bar-10\" d=\"M26.627 7.132c.477-.275 1.085-.114 1.363.368.277.478.108 1.093-.363 1.365l-5.2 3.003c-.478.275-1.087.114-1.365-.368-.276-.478-.107-1.093.364-1.365l5.2-3.003z\"\n" +
        "                            fill=\"#858585\" />\n" +
        "                        <path class=\"c-spinner__bar-11\" d=\"M21.135 2.373c.276-.477.883-.64 1.365-.363.478.276.64.892.368 1.363l-3.003 5.2c-.276.478-.883.643-1.365.365-.478-.276-.64-.893-.368-1.364l3.003-5.2z\"\n" +
        "                            fill=\"#858585\" />\n" +
        "                        <path class=\"c-spinner__bar-12\" d=\"M14 .997c0-.55.444-.997 1-.997.552 0 1 .453 1 .997v6.006c0 .55-.444.997-1 .997-.552 0-1-.453-1-.997V.997z\"\n" +
        "                            fill=\"#858585\" />\n" +
        "                    </g>\n" +
        "                </svg>\n" +
        "\n" +
        "            </div>\n" +
        "            <div class=\"spk-card-content\">\n" +
        "\n" +
        "                <span class=\"spk-card-content-text spk-card-loading-text\">We Are Processing Your Payment ...</span>\n" +
        "\n" +
        "            </div>\n" +
        "\n" +
        "        </div>\n" +
        "        <!-- loading section end -->\n" +
        "\n";

    pages.success = "" +
        "\"<!-- request succesful section -->\\n\" +\n" +
        "    \"        <div id=\\\"ps_success\\\" class=\\\"ps_checkout\\\">\\n\" +\n" +
        "    \"\\n\" +\n" +
        "    \"            <div class=\\\"spk-card\\\">\\n\" +\n" +
        "    \"                <span class=\\\"spk-card-close\\\" onclick=\\\"spCloseCard('ps_success')\\\">\\n\" +\n" +
        "    \"                    <svg width=\\\"18px\\\" height=\\\"18px\\\" viewBox=\\\"0 0 14 14\\\" version=\\\"1.1\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\"\\n\" +\n" +
        "    \"                        xmlns:xlink=\\\"http://www.w3.org/1999/xlink\\\">\\n\" +\n" +
        "    \"                        <!-- Generator: Sketch 51.2 (57519) - http://www.bohemiancoding.com/sketch -->\\n\" +\n" +
        "    \"                        <title>close</title>\\n\" +\n" +
        "    \"                        <desc>Created with Sketch.</desc>\\n\" +\n" +
        "    \"                        <defs></defs>\\n\" +\n" +
        "    \"                        <g id=\\\"Page-1\\\" stroke=\\\"none\\\" stroke-width=\\\"1\\\" fill=\\\"none\\\" fill-rule=\\\"evenodd\\\">\\n\" +\n" +
        "    \"                            <g id=\\\"2C\\\" transform=\\\"translate(-574.000000, -90.000000)\\\" fill=\\\"#73767F\\\">\\n\" +\n" +
        "    \"                                <g id=\\\"3\\\" transform=\\\"translate(208.000000, 72.000000)\\\">\\n\" +\n" +
        "    \"                                    <g id=\\\"Material/Icons-black/close\\\" transform=\\\"translate(361.000000, 13.000000)\\\">\\n\" +\n" +
        "    \"                                        <polygon id=\\\"Shape\\\" points=\\\"19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12\\\"></polygon>\\n\" +\n" +
        "    \"                                    </g>\\n\" +\n" +
        "    \"                                </g>\\n\" +\n" +
        "    \"                            </g>\\n\" +\n" +
        "    \"                        </g>\\n\" +\n" +
        "    \"                    </svg>\\n\" +\n" +
        "    \"                </span>\\n\" +\n" +
        "    \"\\n\" +\n" +
        "    \"                <div class=\\\"spk-card-content\\\">\\n\" +\n" +
        "    \"                    <div class=\\\"spk-card-icon-done spk-success-text\\\"></div>\\n\" +\n" +
        "    \"\\n\" +\n" +
        "    \"                    <span class=\\\"spk-card-content-text \\\">\\n\" +\n" +
        "    \"                        <p>Your Payment Of <span style=\\\"color:#000000; font-family: WhitneyHTF-Bold; font-size: 19;\\\">KES\\n\" +\n" +
        "    \"                                3,500 </span> <br /> Was Successful.\\n\" +\n" +
        "    \"\\n\" +\n" +
        "    \"                        </p>\\n\" +\n" +
        "    \"                    </span>\\n\" +\n" +
        "    \"\\n\" +\n" +
        "    \"                    <br>\\n\" +\n" +
        "    \"                    <button class=\\\"spk-card-button\\\">All Done</button>\\n\" +\n" +
        "    \"                </div>\\n\" +\n" +
        "    \"\\n\" +\n" +
        "    \"\\n\" +\n" +
        "    \"\\n\" +\n" +
        "    \"            </div>\\n\" +\n" +
        "    \"        </div>\\n\" +\n" +
        "    \"        <!-- end of request succesful section -->\"";

    pages.timedOut = "" +
        "<!-- request timeout section -->\n" +
        "        <div id=\"ps_timeout\" class=\"ps_checkout\">\n" +
        "\n" +
        "            <div class=\"spk-card\">\n" +
        "                <span class=\"spk-card-close\" onclick=\"spCloseCard('ps_sent')\">\n" +
        "                            <svg width=\"18px\" height=\"18px\" viewBox=\"0 0 14 14\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n" +
        "                            <!-- Generator: Sketch 51.2 (57519) - http://www.bohemiancoding.com/sketch -->\n" +
        "                            <title>close</title>\n" +
        "                            <desc>Created with Sketch.</desc>\n" +
        "                            <defs></defs>\n" +
        "                            <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n" +
        "                                <g id=\"2C\" transform=\"translate(-574.000000, -90.000000)\" fill=\"#73767F\">\n" +
        "                                    <g id=\"3\" transform=\"translate(208.000000, 72.000000)\">\n" +
        "                                        <g id=\"Material/Icons-black/close\" transform=\"translate(361.000000, 13.000000)\">\n" +
        "                                            <polygon id=\"Shape\" points=\"19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12\"></polygon>\n" +
        "                                        </g>\n" +
        "                                    </g>\n" +
        "                                </g>\n" +
        "                            </g>\n" +
        "                        </svg>\n" +
        "                    </span>\n" +
        "    \n" +
        "                <div class=\"spk-card-content\">\n" +
        "                    <div class=\"spk-card-icon-failed spk-timeout-text\"></div>\n" +
        "                    <span class=\"spk-card-content-text\"><p>Your Payment Request <br /> <span style=\"color:#000000; font-family: WhitneyHTF-Bold; font-size: 19;\">TIMED OUT!</span></p>\n" +
        "    \n" +
        "    \n" +
        "                    <a href=\"#\">Please Try Again</a>\n" +
        "                    </span>\n" +
        "    \n" +
        "                    <br>\n" +
        "                </div>\n" +
        "    \n" +
        "            </div>\n" +
        "            <script src=\"./js/index.js\"></script>\n" +
        "    \n" +
        "        </div>\n" +
        "        <!-- Enf of request timeout section -->";

    pages.failed = "" +
        "<!-- Request failed section -->\n" +
        "        <div id=\"ps_sent\" class=\"ps_checkout\">\n" +
        "\n" +
        "            <div class=\"spk-card\">\n" +
        "                <span class=\"spk-card-close\" onclick=\"spCloseCard('ps_sent')\">\n" +
        "                            <svg width=\"18px\" height=\"18px\" viewBox=\"0 0 14 14\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n" +
        "                            <!-- Generator: Sketch 51.2 (57519) - http://www.bohemiancoding.com/sketch -->\n" +
        "                            <title>close</title>\n" +
        "                            <desc>Created with Sketch.</desc>\n" +
        "                            <defs></defs>\n" +
        "                            <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n" +
        "                                <g id=\"2C\" transform=\"translate(-574.000000, -90.000000)\" fill=\"#73767F\">\n" +
        "                                    <g id=\"3\" transform=\"translate(208.000000, 72.000000)\">\n" +
        "                                        <g id=\"Material/Icons-black/close\" transform=\"translate(361.000000, 13.000000)\">\n" +
        "                                            <polygon id=\"Shape\" points=\"19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12\"></polygon>\n" +
        "                                        </g>\n" +
        "                                    </g>\n" +
        "                                </g>\n" +
        "                            </g>\n" +
        "                        </svg>\n" +
        "                    </span>\n" +
        "    \n" +
        "                <div class=\"spk-card-content\">\n" +
        "                    <div class=\"spk-card-icon-failed spk-failed-text\"></div>\n" +
        "                    <span class=\"spk-card-content-text\"><p>Your Payment Request <br /> <span style=\"color:#000000; font-family: WhitneyHTF-Bold; font-size: 19;\">FAILED!</span></p>\n" +
        "    \n" +
        "    \n" +
        "                    <a href=\"#\">Please Try Again</a>\n" +
        "                    </span>\n" +
        "    \n" +
        "                    <br>\n" +
        "                    <button class=\"spk-card-button\">Change Number</button>\n" +
        "                </div>\n" +
        "    \n" +
        "            </div>\n" +
        "    \n" +
        "        </div>\n" +
        "\n" +
        "        <!-- End of request failed section -->";

    var selector = function (codeString) {
        // console.log(config.targetElement, "comparing", document.getElementById("spkCheckout"));
        try{
            // console.log("Attempting to load styles", window.spkCss)
            document.getElementById("spkCheckoutDiv").innerHTML += codeString ;

        } catch(e){
            document.body.innerHTML += '<div id="spkCheckoutDiv">'+ "<style>" + window.spkCss + "</style>" + codeString +'</div>';
        }
        
        var target = document.getElementById(config.targetElement);
        target.style.display = "block";
        // root.spkGetCharges();
    }
    var payForm = function (codeString, btn) {
        // console.log(btn, "This is the button", btn.dataset.amt);
        // console.log("comparing", codeString);
        try{
            // console.log("Attempting to load styles", window.spkCss)
            document.getElementById("spkCheckoutDiv").innerHTML += codeString;

        } catch(e){
            document.body.innerHTML += '<div id="spkCheckoutDiv">'+ "<style>" + window.spkCss + "</style>" + codeString +'</div>';
        }

        var target = document.getElementById(config.targetElement);
        var payBtn = document.getElementById("spkPayBtn");
        console.log(payBtn, btn)
        payBtn.dataset.reference = btn.dataset.reference;
        payBtn.dataset.spkamount = btn.dataset.amt;
        payBtn.dataset.spkkey = btn.dataset.key;
        target.style.display = "block";
        console.log(payBtn)

        root.spkGetCharges(payBtn);
    }

    exports.showSuccess = function () {
        return selector(pages.success);
    };
    exports.showError = function () {
        return selector(pages.failed);
    };
    exports.showTimeout = function () {
        return selector(pages.timedout);
    };
    exports.showSent = function () {
        return selector(pages.requestSent);
    };
    exports.showLoading = function () {
        return selector(pages.loading);
    };
    exports.showForm = function (btn) {

        return payForm(pages.checkoutForm, btn);
    };

    exports.setTarget = function (value) {
        config.targetElement = value
    };

    return exports;
})


// class SpkDiv extends HTMLDivElement {
//     constructor() {
//         super(); // always call super() first in the constructor.
//     }

// }

// customElements.define('spk-div', SpkDiv, {
//     extends: 'div'
// });


Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}, false;

Element.prototype.appendBefore = function (element) {
    element.parentNode.insertBefore(this, element);
}, false;
