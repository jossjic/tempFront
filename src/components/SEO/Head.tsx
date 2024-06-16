import { useRouter } from 'next/router';
import type { VFC } from 'react';
import SEO from './SEO';

export const Head: VFC = () => {
  const { pathname } = useRouter();


  return (
    <>
      <SEO>
        <meta
        key="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1"
        />
      </SEO >
    </>

  )
}
