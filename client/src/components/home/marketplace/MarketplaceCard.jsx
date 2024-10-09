import React from "react"
import { marketplacelist } from "../../data/Data"

const MarketplaceCard = () => {
  return (
    <>
      <div className='content grid3 mtop'>
        {marketplacelist.map((val, index) => {
          const { cover } = val
          return (
            <div className='box shadow' key={index}>
              <div className='img'>
                <img src={cover} alt='' />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default MarketplaceCard 
