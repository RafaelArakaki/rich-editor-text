import styles from './styles.module.css';

type IconComponentProps = {
  name: string,
  className?: string,
  type?: string,
  props?: React.ReactNode,
}

const IconComponent: React.FC<IconComponentProps> = ({
  name, className, type,
}) => {
  const iconType = () => {
    if (type === 'outline') {
      return 'notranslate material-symbols-outlined';
    }
    if (type === 'rounded') {
      return 'notranslate material-symbols-rounded';
    }
    if (type === 'sharp') {
      return 'notranslate material-symbols-sharp';
    }
    return 'notranslate material-icons';
  };

  return (
    <div
      data-testid="icon"
      id={name}
      className={`${iconType()} ${className || ''} ${styles.icon}`}
    >
      {name}
    </div>
  );
};

export default IconComponent;
