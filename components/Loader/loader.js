import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
    return (
        <>
            <div className='d-flex justify-content-center'>
                <ThreeDots
                   
                    height="80"
                    width="80"
                    radius="9"
                    color="#284E93"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName="text-center"
                    visible={true}
                />
            </div>
        </>
    )
}

export default Loader;