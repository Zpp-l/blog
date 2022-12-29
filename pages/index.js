import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";
import useLoaded from "../hooks/useLoaded";
import Hero from "../components/home-page/hero";

export default function Home() {
    const isLoaded = useLoaded()
    return (
        <main>
            <Hero/>
        </main>
    )
}
