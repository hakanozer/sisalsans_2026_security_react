import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchProduct } from '../services/productService'
import { iProduct } from '../models/iAllProduct'
import ProductItem from '../components/ProductItem'
import { toast } from 'react-toastify'

function Search() {

  const [proArr, setproArr] = useState<iProduct[]>([])
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState<string | null>(null)
  useEffect(() => {
    const q = params.get('q')
    setQ(q)
    if (q) {
        searchProduct(q).then(res => {
            const dt = res.data
            if (dt && dt.data) {
                setproArr(dt.data)
            }
        }).catch(err => {
            // console.log(err)
            toast.error(err.message)
            localStorage.clear()
            setTimeout(() => {
              window.location.href = '/'
            }, 3000);
        })
    }
  }, [])
  

  return (
    <>
      <h2 dangerouslySetInnerHTML={{ __html: `Search - ${q}` }} />
      <div className='row'>
          { proArr.map((item, index) =>
            <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={index}>
              <ProductItem item={item}/>
            </div>
          )}

        {
          proArr.length === 0 && <div className='col-12'>No product found</div>
        }
      </div>
    </>
  )
}

export default Search