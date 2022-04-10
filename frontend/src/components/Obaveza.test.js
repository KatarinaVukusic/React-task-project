import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import Obaveza from './Obaveze'


test('renderira sadrzaj', () => {
 const obaveza = {
 sadrzaj: 'Napisati domaci',
 datum: 'Fri 24 Apr 2022',
 vazno: true,
 izvrseno: false
 }
 const komponenta = render(
 <Obaveza obaveza={obaveza} />
 )
 komponenta.debug()

 expect(komponenta.container).toHaveTextContent('Napisati domaci')


 const element =komponenta.getByText('Napisati domaci')
 expect(element).toBeDefined()


})


test('Poziv event handlera, izvrseno false', () => {
    const obaveza = {
        sadrzaj: 'Napisati domaci',
        datum: 'Fri 24 Apr 2022',
        vazno: true,
        izvrseno: false
        }
    const testHandler = jest.fn()
    const komponenta = render(
    <Obaveza obaveza={obaveza} promjenaIzvrsenosti={testHandler} />
    )
    const button = komponenta.getByText('Nije izvrseno')
    fireEvent.click(button)
    expect(testHandler.mock.calls).toHaveLength(1)
   })
   
   test('Poziv event handlera, izvrseno true', () => {
    const obaveza = {
        sadrzaj: 'Napisati domaci',
        datum: 'Fri 24 Apr 2022',
        vazno: true,
        izvrseno: true
        }
    const testHandler = jest.fn()
    const komponenta = render(
    <Obaveza obaveza={obaveza} promjenaIzvrsenosti={testHandler} />
    )
    const button = komponenta.getByText('Izvrseno')
    fireEvent.click(button)
    expect(testHandler.mock.calls).toHaveLength(1)
   })
   


