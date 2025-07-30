import maximizeIcon from '../../public/dist/img/maximizeIcon.svg';
import caretDownIcon from '../../public/dist/img/caretDownArrow.svg';
import Image from 'next/image';

const DashletHeading = (props) => {
    return (
        <div className="px-2 rounded-top" style={{background:props.bgColor}}>
            <div className="row py-2">
                <div className="col-6 col-lg-10">
                    <h7 className="text-white font-16 weight-400 m-0">{props.heading}</h7>
                </div>

                <div className="col-6 col-lg-2 text-right">
                    <a href="#" className='p-1'>
                        <Image
                            src={maximizeIcon}
                            alt="maximize-icon"
                            className='img-fluid'
                        />
                    </a>
                    <a href='#' className='pl-lg-2'>
                        <Image
                            src={caretDownIcon}
                            alt="caret-arrow-Down-icon"
                            className='img-fluid'
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}
export default DashletHeading;