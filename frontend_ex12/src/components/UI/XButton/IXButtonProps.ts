export default interface IXButtonProps {
    click?: React.MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
    label: string
    btnClass?: string | undefined
};