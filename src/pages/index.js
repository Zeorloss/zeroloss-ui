import { Link } from "gatsby"
import * as React from "react"
import Brands from "../components/Brands"
import BuyAndSell from "../components/BuyAndSell"
import Cards from "../components/Cards"
import InfoChart from "../components/InfoChart"
import Layout from "../components/Layout"
import Landing from "../components/Sections/Landing"
import Perks from "../components/Sections/Perks"
import RoadMap from "../components/Sections/RoadMap"
import Support from "../components/Support"
import Why from "../components/Why"

const IndexPage = () => {
  return (
    <Layout>
        <Landing/>
        <Perks />
        <Why />
        <Cards />
        <InfoChart/>
        <BuyAndSell />
        <Support />
        <Brands />
        <RoadMap />
        <Link to="/about">About</Link>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
