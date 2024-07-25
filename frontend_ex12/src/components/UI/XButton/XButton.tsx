import './XButton.css';
import IXButtonProps from './IXButtonProps';

const XButton: React.FunctionComponent<IXButtonProps> = (props: IXButtonProps) => {
    return (
        <button
            onClick={props.click === undefined ? undefined : props.click}
            className={props.btnClass === undefined ? 'XButton' : [props.btnClass, 'XButton'].join(' ')}
            disabled={props.disabled === undefined ? false : props.disabled}
        >
            {props.label}
        </button>
    );
};

export default XButton;