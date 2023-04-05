import { ContentWrapper } from "components/ContentWrapper";
import Header from "components/header/Header";
import { Avatar } from "components/image/Avatar";
import { NextPage } from "next";

const About: NextPage = () => {
  return (
    <>
      <Header />
      <ContentWrapper>
        <div className="mt-10 sm:flex mx-auto lg:px-48 md:px-32">
          <Avatar />
          <div className="flex-auto sm:ml-10 text-center sm:text-left">
            <h1 className="text-4xl text-gray-800">kumaotto</h1>
            <p>Kumi Komaki</p>
            <br />
            <p className="mb-2">Job: Web developer</p>
            <p className="mb-2">Skills: Python, Java, JavaScript, TypeScript</p>
            <p>Qualifications</p>
            <ul className="list-disc pl-5 text-left w-1/3 sm:w-auto mx-auto sm:mx-0">
              <li>2023 Mar. AWS Certified Solutions Architect - Associate</li>
              <li>2023 Feb. AWS Certified Cloud Practitioner</li>
              <li>2022 Dec. 応用情報技術者試験</li>
              <li>2021 Aug. AWS Certified Developer - Associate</li>
            </ul>
          </div>
        </div>
      </ContentWrapper>
    </>
  );
};

export default About;
