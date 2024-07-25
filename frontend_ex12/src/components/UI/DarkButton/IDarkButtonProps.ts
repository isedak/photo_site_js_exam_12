export default interface IDarkButtonProps {
    click?: React.MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
    label: string
    btnClass?: string | undefined
};