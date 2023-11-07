const faqs = [
  {
    id: 1,
    question: 'What is Daak Bangla?',
    answer:
      'At Daak Bangla, we believe in reviving the cherished tradition of exchanging postcards in a way that embraces the advancements of technology. Our platform offers a warm and convenient way to subscribe to monthly poetry postcards and send heartwarming poems to your loved ones. And in the future, we hope to create a vibrant community of artists where they can showcase their talents and bring their beautiful art to life in the form of NFT stamps and printed postcards. Join us in keeping the tradition of exchanging postcards alive and well!',
  },
  {
    id: 2,
    question: 'What kind of postcards can I send too?',
    answer:
      'You can send beautiful handpicked designer poetry postcards to your loved ones.',
  },
  {
    id: 3,
    question: 'Can I subscribe to monthly poetry postcards?',
    answer:
      'Yes, you can subscribe to monthly poetry postcards and receive them regularly.',
  },
  {
    id: 4,
    question: 'How does this platform use NFTs and blockchain technology?',
    answer:
      'This platform uses NFTs to convert art into unique digital stamps, which can be printed on postcards. The use of blockchain technology ensures the authenticity and ownership of these NFTs.',
  },
  {
    id: 5,
    question: 'Can artists monetize their art on this platform?',
    answer:
      'Yes, artists can monetize their art by converting it to NFT stamps and offering it to be printed on postcards. They will receive a commission for each postcard sold with their art on it.',
  },
  {
    id: 6,
    question: 'Is this platform only for poetry postcards?',
    answer:
      'This platform primarily focuses on poetry postcards, but it may expand to offer other types of postcards in the future.',
  },
];

export const FAQ = () => {
  return (
    <div className='bg-gray-50'>
      <div className='mx-auto max-w-7xl divide-y divide-gray-200 py-12 px-4 sm:px-6 lg:py-16 lg:px-8'>
        <h2 className='text-3xl font-bold tracking-tight text-gray-900'>
          Frequently asked questions
        </h2>
        <div className='mt-8'>
          <dl className='divide-y divide-gray-200'>
            {faqs.map(({ question, answer, id }) => (
              <div
                className='pt-6 pb-8 md:grid md:grid-cols-12 md:gap-8'
                key={id}
              >
                <dt className='text-base font-medium text-gray-900 md:col-span-5'>
                  {question}
                </dt>
                <dd className='mt-2 md:col-span-7 md:mt-0'>
                  <p className='text-base text-gray-500'>{answer}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
