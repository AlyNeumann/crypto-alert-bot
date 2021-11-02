const axios = require("axios");
require('dotenv').config()
//This one compares last prices (from db) to current prices & check for exponential growth

module.exports = async () => {
    let apiKey = process.env.API_KEY;

    try {
      let url =
        `https://api.nomics.com/v1/currencies/ticker?key=${apiKey}&ids=XRP,HEX,SOL,DOT,DOGE,UNI,LUNALINK,AVAX,ALGO,FTT,MATIC,ATOM,AXS,FIL,ICP,TRX,DAI,THETA,XTZ,FTM,XMR,CAKE,EOS,OKB,NEAR,CDAI,KLAY,AAVE,QNT,GRT,IOT,KSM,NEO,WAVES,LEO,AR,SUSHI,STX,BTT,CEL,ONE,MKR,AMP,HNT,1INCH,RUNE,OMG,DASH,COMP,CELO,SNX,HOT,DCR,TFUEL,XEM,OMI,ENJ,ZEC,XDC,ICX,QTUM,TTT,BTG,YFI,TUSD,DYDX,TEL,ZIL,ECOIN,CRV,HT,KOKO,IOST,MINA,FLOW,RVN,REN,BAT,SAFEMOON,SRM,PERP,NEXO,KCS,BNT,SC,USDP,ZEN,XWC,ZXR,AUDIO,MDX,ONT,OGN,CELR,DODO,DGB,RAY,SKL,SKALE,NU,UMA,ANKR,LN,GT,ETHM,VGX,SAND,GALA,IOTX,POLY,CHSB,WRX,USD-N,GNT,DENT,LPT,KAVA,RPL,WOO&interval=1h,30d&convert=CAD&per-page=100&page=1`;
      let url2 = 
      `https://api.nomics.com/v1/currencies/ticker?key=${apiKey}&ids=LRC,FET,LSK,GNO.FX,TITAN,DAG,BAL,ALPHA,TRIBE,CKB,EWT,ERG,RSR,XDB,SXP,BCD,WIN,COTI,WAXP.FRAX,ARRR,PLEX,XVG,RGT,BAKE,TWT,VTHO,XYO,SETH,LYXE,KEEP,INJ,VXV,CFX,ETN,REEF,MED,TON,SNT,OCEAN,NXM,UNIC,ORBS,RAD,BAND,ARDR,MASK,VLX,KDA,CVC,FIDA,RLC,WAX,XGOLD,CVC,ASD,XVS,PAXG,UBT,STMX,ROSE,BADGER,SBTC,PROM,SAPP,XCH,STRAX,ALCX,NKN,HIVE,CTSI,ELF,STORM,CSPR,ARK,MAID,ELG,NMX,DAWN,SUPER,ORN,XPR,DERO,TRU,STEEM,TON,OXT,LDO,FXS,TRAC,FUN,ACH,TLOS,KLV,ALBT,MTL,QKC,FLEX,ATLAS,RIF,POLS,BDX,TOMO,DPI,CHR,PLA,MLN,STORJ,LEASH,VRA,AETH,ANT,STPT,UTK,MATH,AP13,IDEX,ANY,META,CP,WAN&interval=1h,30d&convert=CAD&per-page=100&page=1`;
      let url3 = 
      `https://api.nomics.com/v1/currencies/ticker?key=${apiKey}&ids=RLY,NDAU,POLIS,SYS,ERN,LEND,REPV2,UOS,YFII,C20,REQ,POWR,UQC,AVA,KNCL,PBTC,LINA,NOIA,MRPH,HTR,XAUT,HYDRA,DDX,PHA,HXRO,SUN,ALPACA,BOND,PRE,KIN,GUSD,KRN,MCB,RNDR,SNOW,KMD,ARPA,BTS,FORTH,EXRD,MX,BEL,IRIS,NWC,GAS,SUSD,RARI,WISE,MFT,SBIT,DVI,AMPL,AFN,XOR,WHALE,ZNN,CSC,STRONG,BTCV,LOC,WNXM,HOLY,KOIN,DNT,TPT,ZKS,FARM,RAMP,SLX,JST,CORE,AKT,CREAM,ORCA,MXC,VAL,FOX,DATA,CRE,XHV,TT,EURS,TRB,ROOK,XSGD,BZRX,HNS,TOMOE,SUER,CDT,DG,HEGIC,BIFI,CUSD,SWAP,PAC,XZC,GHST,AQT,OM,NRG,LOOM,AUTO,BTM,GIO,DIVI,BOA,HEZ,AERGO,TORN,AION,KP3R,RFR,LTO,ELA,FLUX,TVK,VID,AKRO,HUNT,KAI,VELO&interval=1h,30d&convert=CAD&per-page=100&page=1`;
      const resp = await axios.get(url);
      const respPage2 = await axios.get(url2);
      const respPage3 = await axios.get(url3);
      if (!resp.data || !respPage2.data || !respPage3.data) {
        return { error: true };
      }
      let cryptos = resp.data
      cryptos = cryptos.concat(respPage2.data)
      cryptos = cryptos.concat(respPage3.data)

      //TODO:Save to DB here - call data access layer

      return cryptos.map(crypto => {
        return {
            id: crypto.id,
            price: crypto.price
        };
      })
  
    } catch (error) {
      return { error: true };
    }
  };