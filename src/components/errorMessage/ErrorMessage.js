import gifError from './error.gif';

const ErrorMessage = () => {
    return (
        <img style={{display: "block", width: 250, height: 250, objectFit: 'contain', margin: "0 auto"}} src={gifError}
             alt={'error message'}/>
    )
}

export default ErrorMessage;