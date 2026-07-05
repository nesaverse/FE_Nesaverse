import styles from './Badge.module.css';

const Badge = ({ label, color = 'primary', size = 'sm' }) => {
  return (
    <span className={`${styles.badge} ${styles[color]} ${styles[size]}`}>
      {label}
    </span>
  );
};

export default Badge;
