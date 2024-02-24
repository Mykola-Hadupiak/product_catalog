import { Link } from 'react-router-dom';
import './Logo.scss';
import { goTop } from '../../helpers/goTop';

type Props = {
  handeMenuOpen?: () => void;
};

export const Logo: React.FC<Props> = ({ handeMenuOpen }) => {
  const click = () => {
    if (handeMenuOpen) {
      handeMenuOpen();
      goTop();
    } else {
      goTop();
    }
  };

  return (
    <Link
      to="/"
      onClick={click}
    >
      <div className="logo" />
    </Link>
  );
};
