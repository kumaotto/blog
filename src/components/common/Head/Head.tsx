import NextHead from 'next/head'

const Head = (title: string, description: string, content: string) => {
  return (
    <>
      <NextHead>
        <meta name={description} content={content}/>
        <title>{title ? `kumaotto | ${title}` : 'kumaotto'}</title>
      </NextHead>
    </>
  )
}

export default Head
