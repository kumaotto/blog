// pages/api/og.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';

// 1) 使いたいフォントを読み込む（例: public/fonts に配置）
const fontPath = path.join(process.cwd(), 'public', 'fonts', 'NotoSansJP-Regular.ttf');
const fontData = fs.readFileSync(fontPath);

// 2) 背景画像を取得（Base64 埋め込み or 外部 URL など）
//    - 例: public/OGP.png を読み込んで Base64 化する
const ogpImagePath = path.join(process.cwd(), 'public', 'ogp.png');
const baseImageData = fs.readFileSync(ogpImagePath);
const baseImageUrl = `data:image/png;base64,${baseImageData.toString('base64')}`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // クエリからタイトルを取得
  const title = (req.query.title as string) || 'こまきちのブログ';

  // 3) Satori で SVG を生成
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
      {/* 背景画像 */}
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
      {/* タイトルを載せる */}
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
      // 4) フォントを登録
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

  // 5) Resvg で PNG に変換
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  });
  const pngData = resvg.render().asPng();

  // 6) PNG バイナリをレスポンスとして返す
  res.setHeader('Content-Type', 'image/png');
  // キャッシュポリシー（例: キャッシュ無効にする）
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.send(pngData);
}
