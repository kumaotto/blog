// Cloudflare Pagesでapiを使用するための設定
export const runtime = 'edge';

import type { NextApiRequest, NextApiResponse } from 'next';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';

// フォントの読み込み
const fontPath = path.join(process.cwd(), 'public', 'fonts', 'NotoSansJP-Regular.ttf');
const fontData = fs.readFileSync(fontPath);

// 背景画像取得
const ogpImagePath = path.join(process.cwd(), 'public', 'ogp.png');
const baseImageData = fs.readFileSync(ogpImagePath);
const baseImageUrl = `data:image/png;base64,${baseImageData.toString('base64')}`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const title = (req.query.title as string) || 'こまきちのブログ';

  // SVG生成
  const svg = await satori(
    <div
      style={{
        width: '1200px',
        height: '630px',
        position: 'relative',
        fontSize: '48px',
        fontFamily: 'NotoSansJP',
        color: '#333',
      }}
    >
      <img
        src={baseImageUrl}
        style={{
          position: 'absolute',
          width: '1200px',
          height: '630px',
          top: 0,
          left: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50px',
          left: '50px',
          width: '1100px',
        }}
      >
        {title}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'NotoSansJP',
          data: fontData,
          weight: 400,
          style: 'normal',
        },
      ],
    },
  );

  // PNGに変換
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  });
  const pngData = resvg.render().asPng();

  // PNGバイナリをレスポンスとして返す
  res.setHeader('Content-Type', 'image/png');
  // キャッシュポリシー
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.send(pngData);
}
