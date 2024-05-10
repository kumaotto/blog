import React from 'react';

interface TocEntry {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  toc: TocEntry[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ toc }) => {
  return (
    <div className="hidden sm:block sticky top-10 p-2 h-fit max-w-80 min-w-60">
      <p className="TableOfContentsHead text-gray-500 mb-3">目次</p>
      <ul className="sm:mr-5 text-sm">
        {toc.map(data => (
          <li key={data.id}>
            <a href={`#${data.id}`}>
              {data.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};