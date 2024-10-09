import React from "react"
import Heading from "../../common/Heading"
import "./marketplace.css"
import MarketplaceCard from "../marketplace/MarketplaceCard"

const Marketplace = () => {
  return (
    <>
      <section className='marketplace padding'>
        <div className='container'>
          <Heading title='Marketplace' />
          <MarketplaceCard />
        </div>
      </section>
    </>
  )
}

export default Marketplace
