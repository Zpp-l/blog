import classes from "./Head.module.css";
import SimpleLink from "../links/SimpleLink";
import { VscHome } from "react-icons/vsc";
import HeaderNav from "./HeaderNav";
import { useEffect, useState } from "react";
export default function Header() {
  const [tick, setTick] = useState(0);
  const [navVal, setNavVal] = useState([
    { name: "主页", link: "/" },
    { name: "博客", link: "/posts" },

    { name: "关于", link: "/readme" },
  ]);
  useEffect(() => {
    if (tick === 3) {
      setNavVal([...navVal, { name: "上传", link: "/upload" }]);
    }
  }, [tick]);
  function logoClickHandler() {
    setTick(tick + 1);
  }
  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--color-grey-900)] h-24 flex items-center">
      <section className={classes.layout}>
        <div className="mx-4 flex h-[60px] items-center justify-between leading-[60px]">
          <div className={classes.logo} onClick={logoClickHandler}>
            Peng&apos;s Blog
          </div>
          <HeaderNav navVal={navVal} />
        </div>
      </section>
    </header>
  );
}
