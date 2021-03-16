import React, { Component } from 'react'
import { GetServerSideProps } from 'next';
import Router from 'next/router'

import Loading from '@components/Loading';

import { useAuth } from '@utils/hooks/useAuth'

export default function Authenticated(AuthComponent: any) {
  const Auth = useAuth();
  
  return class Authenticated extends Component {
    static async getInitialProps(ctx: GetServerSideProps) {
      const pageProps =
        AuthComponent.getInitialProps &&
        (await AuthComponent.getInitialProps(ctx))
      return { ...pageProps }
    }

    constructor(props: any) {
      super(props)
      this.state = {
        isLoading: true,
      }
    }

    componentDidMount() {
      if (Auth.signed) {
        Router.push('/')
      } else {
        Router.push('/auth/login')
      }
      this.setState({ isLoading: false })
    }

    render() {
      return (
        <div>
          {this.state.isLoading ? (
            <Loading />
          ) : (
            <AuthComponent {...this.props} auth={Auth} />
          )}
        </div>
      )
    }
  }
}