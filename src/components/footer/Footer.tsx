import React from 'react'
import Image from "next/image";

const Footer = () => {
  return (
    <div className='h-28 w-screen bg-stone-200'>
      <div className='h-full flex items-center flex-col justify-center'>
        <div className='flex gap-2 mb-2'>
          <a href="https://github.com/kumaotto">
            <Image src="/images/github.svg" alt="zenn" width={25} height={25} />
          </a>
          <a href="https://zenn.dev/kumao">
            <Image src="/images/zenn.svg" alt="zenn" width={25} height={25} />
          </a>
          <a href="https://qiita.com/Kumaou_00">
            <Image src="/images/qiita.svg" alt="zenn" width={25} height={25} />
          </a>
        </div>
        <p>©️ 2023 kumaotto. All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer