const info = (...obaveze) => {
    if (process.env.NODE_ENV !== 'test') {
      console.log(...obaveze);
    }  
  }
  
  const greska = (...obaveze) => {
    console.error(...obaveze);
  }
    
  module.exports = {info, greska}