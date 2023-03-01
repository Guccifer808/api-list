import React from 'react';

type ApiCardProps = {
  api: {
    API: string;
    Category: string;
    Description: string;
    Auth: string;
    Cors: string;
    Link: string;
  };
};

const ApiCard: React.FC<ApiCardProps> = ({ api }) => {
  const renderInfo = (text: string, field: keyof typeof api) => (
    <p>
      {text}: <span className='font-semibold'>{api[field] || ' '}</span>
    </p>
  );

  return (
    <a href={api.Link} target='_blank' rel='noopener noreferrer'>
      <div className='border-2 border-stone-100 p-2 text-gray-700 rounded-xl bg-stone-50 hover:border-purple-800 cursor-pointer h-full'>
        {renderInfo('Name', 'API')}
        {renderInfo('Category', 'Category')}
        {renderInfo('Description', 'Description')}
        {renderInfo('Auth', 'Auth')}
        {renderInfo('Cors', 'Cors')}
      </div>
    </a>
  );
};

export default ApiCard;
