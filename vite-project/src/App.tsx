import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './common/Navbar'
import Card from './common/Card'
import { useForm, type SubmitErrorHandler, type SubmitHandler } from 'react-hook-form'
import Form from './common/Form'

type Item = {
  title: string,
  price: number,
  quantity: number,
  details: string
  image: string,
}

function App() {
  const [items, SetItems] = useState<Item[]>([]);
  const [errors, setErrors] = useState<Object>();


  useEffect(() => {
    const itemsAsStr = localStorage.getItem('items');
    console.log(itemsAsStr);
    if (itemsAsStr) {
      SetItems(JSON.parse(itemsAsStr!))
    }
    // console.log(JSON.parse(itemsAsStr!) as Item[]);
  }, [])

  const SaveItem = (obj: Item) => {
    localStorage.setItem('items', JSON.stringify([...items, obj]));
    const itemsAsStr = localStorage.getItem('items');
    console.log(itemsAsStr);
    SetItems(i => [...i, obj]);
  }
  const Onsubmit: SubmitHandler<Item> = (i) => SaveItem(i);
  const onError: SubmitErrorHandler<Item> = (e) => setErrors(e);
  return (
    <>
    <Navbar/>
      <div className="container mx-10 justify-between p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Items</h1>
        <div className="grid grid-cols-3 gap-4">          {
          items.map(i =>
            <Card key={i.title} image={i.image} price={i.price} title={i.title} details={i.details} quantity={i.quantity}>
            </Card>
          )
        }
        </div>

        <div className='justify-items-center py-10'>
                  <h1 className="text-3xl font-bold mb-6 text-gray-800">New Entry</h1>

          <Form Onsubmit={Onsubmit} onError={onError}/>
        </div>
      </div>

    </>
  )
}

export default App
