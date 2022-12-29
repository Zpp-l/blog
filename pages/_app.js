import '../styles/globals.css'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import {Router} from "next/router";
import {RecoilRoot} from "recoil";
import Layout from "../components/layout/Layout";

Router.events.on('routeChangeStart', NProgress.start)
Router.events.on('routeChangeError', NProgress.done)
Router.events.on('routeChangeComplete', NProgress.done);

function MyApp({Component, pageProps}) {
    return (
        <RecoilRoot>
            <Layout>
                <Component {...pageProps} />
            </Layout>

        </RecoilRoot>
    )
}

export default MyApp
