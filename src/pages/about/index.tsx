import { ContentWrapper } from "components/ContentWrapper";
import { Avatar } from "components/image/Avatar";
import { NextPage } from "next";

const About: NextPage = () => {
  return (
    <>
      <ContentWrapper>
        <div className="flex mb-20">
          <div className="mt-10 sm:flex mx-auto justify-center lg:px-32 md:px-32">
            <Avatar />
            <div className="flex-auto w-fit sm:ml-10 text-center sm:text-left">
              <h1 className="w-fit text-4xl text-gray-800 mx-auto md:ml-0">kumaotto</h1>
              <p className="w-fit mx-auto md:ml-0">Kumi Komaki</p>
              <br />
              <p className="mb-2 w-fit mx-auto md:ml-0">Job: Web developer</p>
              <p className="mb-2 w-fit mx-auto md:ml-0">Skills: Python, Java, JavaScript, TypeScript</p>
              <br />
              <p className="w-fit mx-auto md:ml-0">Qualifications</p>
              <ul className="list-disc pl-5 text-left w-fit mx-auto sm:mx-0">
                <li>2023 Dec. AWS Certified DevOps Engineer - Professional</li>
                <li>2023 Jun. AWS Certified SysOps Administrator - Associate</li>
                <li>2023 Mar. AWS Certified Solutions Architect - Associate</li>
                <li>2023 Feb. AWS Certified Cloud Practitioner</li>
                <li>2022 Dec. 応用情報技術者試験</li>
                <li>2021 Aug. AWS Certified Developer - Associate</li>
              </ul>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </>
  );
};

export default About;
