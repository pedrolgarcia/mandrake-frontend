import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";

import Loading from '@components/Loading';

import { useAuth } from "@utils/hooks/useAuth"

export const Authenticated = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const { signed } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      console.log(signed)
      if (signed) {
        router.push('/');
      } else {
        router.push('/auth/login')
      }
      setLoading(false)
    }, [signed])

    return loading ? (
      <Loading />
    ) : (
      <WrappedComponent {...props} />
    );
  }
  
  return Wrapper
}