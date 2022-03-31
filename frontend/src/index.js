import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'


const obaveze = [
  {
  id: 1,
  sadrzaj: 'Pripremiti razgovor za posao',
  datum: 'Fri Apr 29 2022',
  vazno: true,
  izvrseno: false

  },
  {
  id: 2,
  sadrzaj: 'Otići u dućan',
  datum: 'Wed Apr 6 2022',
  vazno: false,
  izvrseno: false

  },
  {
  id: 3,
  sadrzaj: 'Napisati domaći',
  datum: 'Fri Apr 22 2022',
  vazno: true,
  izvrseno: false

  
  }
 ]


ReactDOM.render(<App obaveze={obaveze} />, document.getElementById('root')
);

