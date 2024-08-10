import { ContentWrapper } from "components/ContentWrapper";
import { Avatar } from "components/image/Avatar";
import { NextPage } from "next";
import React from "react";

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
              <p className="mb-2 w-fit mx-auto md:ml-0">Comments:</p>
              <p className="mb-2 w-fit mx-auto md:ml-0">  AWSで作るWebアプリケーション開発が一番得意です</p>
              <p className="mb-2 w-fit mx-auto md:ml-0">  アウトプット関連はフッターリンク参照</p>
              <p className="mb-2 w-fit mx-auto md:ml-0">  Speaker Deck: <a className="text-blue-500" href="https://speakerdeck.com/kumaotto">https://speakerdeck.com/kumaotto</a></p>
              <br />
              <p className="w-fit mx-auto md:ml-0">Qualifications</p>
              <ul className="list-disc pl-5 text-left w-fit mx-auto sm:mx-0">
                <li>応用情報技術者試験</li>
                <li>AWSはあと2つで全取得</li>
              </ul>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </>
  );
};

export default About;
