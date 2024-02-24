import { NavLink } from 'react-router-dom';

type Props = {
  name: string | null;
  classNameFunc: ({ isActive }: { isActive: boolean }) => string,
  handeMenuOpen?: () => void;
};

export const NavigationLink: React.FC<Props> = ({
  name,
  classNameFunc,
  handeMenuOpen,
}) => {
  const correctName = name
    ? name[0].toUpperCase() + name.slice(1)
    : 'Home';

  return (
    <NavLink
      className={classNameFunc}
      to={`/${name}`}
      onClick={handeMenuOpen}
    >
      {correctName}
    </NavLink>
  );
};
