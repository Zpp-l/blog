import SimpleLink from "../links/SimpleLink";
import classes from "./HeaderNav.module.css";

const HeaderNav = ({navVal}) => {
  // const navVal = useRecoilValue(navAtom)

  return (
    <nav className={classes.header}>
      <ul>
        {navVal.map((item) => {
          return (
            <li key={item.name}>
              <SimpleLink href={item.link}>{item.name}</SimpleLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default HeaderNav;
