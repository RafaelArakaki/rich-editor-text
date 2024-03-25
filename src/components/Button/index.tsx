import IconComponent from '../Icon';
import { Button } from 'antd';

import styles from './styles.module.css';

type ButtonProps = {
  className?: string,
  callbackCommand: () => void,
  iconName: string,
  dataTestid: string
}

const ButtonEditor: React.FC<ButtonProps> = (props) => {
  const {
    dataTestid, className, callbackCommand, iconName,
  } = props;

  return (
    <Button
      data-testid={dataTestid}
      className={`${styles.default} ${className}`}
      onClick={() => callbackCommand()}
    >
      <IconComponent name={iconName} type="sharp" />
    </Button>
  );
};

export default ButtonEditor;
