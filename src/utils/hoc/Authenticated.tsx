import React, { useEffect, useState } from 'react';

import { useRouter } from "next/router";
import { useAuth } from "utils/hooks/useAuth"
import Loading from 'components/Loading';

export const Authenticated = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const { signed } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      if (signed) {
        router.push('/')
      } else {
        router.push('/auth/login')
      }
    }, [signed])

    return loading ? (
      <Loading />
    ) : (
      <WrappedComponent {...props} />
    );
  }
  
  return Wrapper
}