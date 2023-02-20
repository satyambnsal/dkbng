import Image from 'next/image';

const files = [
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: '/images/Hindi1-Back.png',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: '/images/Hindi1.png',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: '/images/Hindi1.png',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: '/images/Hindi1-Back.png',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: '/images/Hindi1.png',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: '/images/Hindi1.png',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: '/images/Hindi1-Back.png',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: '/images/Hindi1.png',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: '/images/Hindi1.png',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: '/images/Hindi1-Back.png',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: '/images/Hindi1.png',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: '/images/Hindi1.png',
  },
];

export default function ImagesWithDetails() {
  return (
    <div className='mx-auto flex justify-center'>
      <ul
        role='list'
        className='gapy-y-8 xl:grid-x-8 grid gap-x-4 sm:grid-cols-2 lg:grid-cols-3'
      >
        {files.map((file) => (
          <li key={file.source} className='relative rounded-lg shadow'>
            <div className='group block w-full overflow-hidden  bg-gray-100 px-4 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100'>
              <Image
                src={file.source}
                alt=''
                className='object-cover group-hover:opacity-75'
                width={700}
                height={400}
              />
              <button
                type='button'
                className='absolute inset-0 focus:outline-none'
              >
                <span className='sr-only'>View details for {file.title}</span>
              </button>
            </div>
            <p className='pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900'>
              {file.title}
            </p>
            <p className='pointer-events-none block text-sm font-medium text-gray-500'>
              {file.size}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
