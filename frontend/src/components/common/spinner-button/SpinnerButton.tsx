import './SpinnerButton.css';
import spinnerSource from '../../../../assets/loading1.gif';

interface SpinnerButtonProps {
    buttonText: string
    loadingText: string
    isSubmitting: boolean
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    className?: string
}

export default function SpinnerButton(props: SpinnerButtonProps) {

    const { buttonText, loadingText, isSubmitting, onClick, className } = props;
    const combinedClassName = className ?? '';

    return (
        <div className='SpinnerButton'>
            {!isSubmitting && (
                <button
                    onClick={onClick}
                    className={combinedClassName}
                    type="submit"
                >
                    {buttonText}
                </button>
            )}
            {isSubmitting && (
                <span className={`${combinedClassName} spinner-button__loading`} role="status">
                    {loadingText}...<i><img src={spinnerSource} /></i>
                </span>
            )}
        </div>
    );
}
