import classes from "./hero.module.css";
import Image from "next/image";
function Hero() {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image
                    src="/images/sits/ht.png"
                    alt="An image showing Myself"
                    width={300}
                    height={300}
                    priority
                />
            </div>
            <h1>Hi, I&apos;m Peng</h1>
            <p>我的博客是关于学习、开发、成长!</p>
        </section>
    );
}

export default Hero;