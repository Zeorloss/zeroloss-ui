import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import Button from "../components/Buttons/Button";
import Layout from "../components/Layout";
import Section from "../components/Section";
import {Link} from "gatsby"

function zerolosspad() {
  return (
    <Layout>
      <Section padding containerClass="bg-[#070124]" className="flex flex-wrap justify-between items-center text-white gap-10 text-center md:text-left">
        <div className="max-w-mds w-full md:basis-5/12">
          <StaticImage
            src="../images/launchpadz-page-hero-image.png"
            alt="launchpadz-page-hero-image"
            layout="fullWidth"
            placeholder="blurred"
          />
        </div>
        <div className="md:basis-5/12" >
          <h1 className="text-2xl">IDO LaunchPad</h1>
          <p className="mb-10">
            Use <b className="text-primary-600 ">Zeroloss</b> Token ZLT, to buy
            in early in IDO projects. ZEROLOSS IDO will require new projects to
            lock a large share of their liquidity and team tokens on our third
            party partner’s locker platform. We make it easy, safe and secure to
            lock any BEP-20 based token in seconds protecting investors from
            ‘rug pulls’. Hold 100,000 ZLT to get whitelisted for IDO's
          </p>
          <Link to="/buy">
            <Button>Buy ZLT for IDO</Button>
          </Link>
        </div>
      </Section>
      <Section containerClass="bg-white text-black text-center pt-32 pb-40" >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">No fees, Low risk, No rug polls, only rewards</h2>
        <p>
          Zero risk IDO enables promising projects to raise capital on the BSC.
          Investors are safe to invest in early-stage projects through our KYC
          system and strict due diligence. We make sure only audited, carefully
          vetted, and analyzed blockchain projects will be chosen for IDO.
        </p>
      </Section>

      <Section containerClass="bg-white">
        <img src="/images/launch2.png" alt="lauch page image" />
      </Section>
    </Layout>
  );
}

export default zerolosspad;

export const Head = () => <title>Pad | Zeroloss</title>
