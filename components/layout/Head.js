import classes from './Head.module.css'
import SimpleLink from "../links/SimpleLink";
import {VscHome} from 'react-icons/vsc'
import HeaderNav from "./HeaderNav";

export default function Header() {
    return (
        <header className='sticky top-0 z-50 w-full bg-[var(--color-grey-900)] h-24 flex items-center'>
            <section className={classes.layout}>
                <div className='mx-8 flex h-[60px] items-center justify-between leading-[60px]'>
                    <div className={classes.logo}>
                        Peng's Blog
                    </div>
                    <HeaderNav/>
                </div>
            </section>
        </header>
    )
}
