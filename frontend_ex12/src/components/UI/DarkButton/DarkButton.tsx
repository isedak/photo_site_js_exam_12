import './DarkButton.css';
import IDarkButtonProps from './IDarkButtonProps';

const DarkButton: React.FunctionComponent<IDarkButtonProps> = (props: IDarkButtonProps) => {
    return (
        <button
            onClick={props.click === undefined ? undefined : props.click}
            className={props.btnClass === undefined ?  ['DarkButton', 'Regular'].join(' ') : ['DarkButton', props.btnClass].join(' ')}
            disabled={props.disabled === undefined ? false : props.disabled}
        >
            {props.label}
        </button>
    );
};

export default DarkButton;