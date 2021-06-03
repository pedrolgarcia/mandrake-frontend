import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
// import Cookies from 'js-cookie';

import Loading from '@components/Loading';

export const Authenticated = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      // var signed = Cookies.get('token');

      // if (!signed) {
      //   router.push('/auth/login').then(() => setLoading(false))
      // } else {
      //   if(router.route.includes('auth')) {
      //     router.push('/');
      //   } else {
      //     setLoading(false)
      //   }
      // }
    }, [])

    return !loading ? (
      <Loading />
    ) : (
      <WrappedComponent {...props} />
    );
  }
  
  return Wrapper
}