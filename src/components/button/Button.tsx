import styles from './Button.module.scss';

export const Button = ({
	title,
	onClick,
	type,
}: {
	title: string;
	onClick?: () => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}) => {
	return (
		<button className={styles.button} type={type} onClick={onClick}>
			{title}
		</button>
	);
};
