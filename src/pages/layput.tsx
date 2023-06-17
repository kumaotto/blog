const siteName = 'kumaotto blog'
const description = 'やってみたことや日常をつらつら'
const url = 'https://kumaotto.com/'

export const metadata = {
  title: {
    default: siteName,
    template: `%s - ${siteName}`
  },
  description,
  openGraph: {
    title: siteName,
    description,
    url,
    siteName,
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description,
    site: '@kumaouu',
    creator: '@kumaouu',
  },
  verification: {
    google: 'kumaotto blog',
  },
  alternates: {
    canonical: url,
  },
}
