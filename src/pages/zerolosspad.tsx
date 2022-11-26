import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import Button from "../components/Buttons/Button";
import Layout from "../components/Layout";
import Section from "../components/Section";

function zerolosspad() {
  return (
    <Layout>
      <Section padding containerClass="bg-[#070124]" className="flex flex-row justify-end items-center">
        <div className="max-w-md w-full">
          <StaticImage
            src="../images/launchpadz-page-hero-image.png"
            alt="launchpadz-page-hero-image"
            layout="fullWidth"
            placeholder="blurred"
          />
        </div>
        <div>
          <h1>IDO LaunchPad</h1>
          <p>
            Use <b className="text-primary-600">Zeroloss</b> Token ZLT, to buy
            in early in IDO projects. ZEROLOSS IDO will require new projects to
            lock a large share of their liquidity and team tokens on our third
            party partner’s locker platform. We make it easy, safe and secure to
            lock any BEP-20 based token in seconds protecting investors from
            ‘rug pulls’. Hold 2000 ZLT to get whitelisted for IDO's
          </p>
          <Button>Buy ZLT for IDO</Button>
        </div>
      </Section>
      <Section>
        <h2>No fees, Low risk, No rug polls, only rewards</h2>
        <p className="text-white">
          Zero risk IDO enables promising projects to raise capital on the BSC.
          Investors are safe to invest in early-stage projects through our KYC
          system and strict due diligence. We make sure only audited, carefully
          vetted, and analyzed blockchain projects will be chosen for IDO.
        </p>
      </Section>
    </Layout>
  );
}

export default zerolosspad;
