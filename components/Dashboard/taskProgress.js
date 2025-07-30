import maximizeIcon from '../../public/dist/img/maximizeIcon.svg';
import caretDownIcon from '../../public/dist/img/caretDownArrow.svg';
import Image from 'next/image';
import DashletHeading from './dashletHeading';

const Taskprogress = () => {
    return (
        <div className="mt-3 bg-white" style={{ boxShadow: " rgba(0, 0, 0, 8%) 0px 3px 8px" }}>
            <div className="mb-4 pb-4">
                <DashletHeading heading='Current Tasks' bgColor='#284E93'/>
                <div className='row'>
                    <div className='col-6 py-2 pl-4'>
                        <span className='font-14 text-secondary'>Information of current tasks</span>
                    </div>
                    <div className='col-6 py-2 pr-4 text-right'>
                        <span className='font-14 text-secondary'>21/02/23</span>
                    </div>
                </div>

            </div>
            <div className='px-4 pb-4 mb-2'>
                <div className='row'>
                    <div className='col-sm-6 text-dark font-14'>Progress</div>
                    <div className='col-sm-6 text-dark font-14 text-right'>25%</div>
                </div>
                <div className="progress" style={{ height: "10px" }}>
                    <div className="progress-bar bg-success" role='progressbar' style={{ width: "25%" }}
                        aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
                </div>

                <div className='row'>
                    <div className='col-sm-6 text-dark font-14'>Sessions/month</div>
                    <div className='col-sm-6 text-dark font-14 text-right'>75%</div>
                </div>
                <div className="progress" style={{ height: "10px" }}>
                    <div className="progress-bar bg-info" role='progressbar' style={{ width: "75%" }}
                        aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}></div>
                </div>

                <div className='row'>
                    <div className='col-sm-6 text-dark font-14'>Users</div>
                    <div className='col-sm-6 text-dark font-14 text-right'>50%</div>
                </div>
                <div className="progress" style={{ height: "10px" }}>
                    <div className="progress-bar bg-warning" role='progressbar' style={{ width: "50%" }}
                        aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}></div>
                </div>

                <div className='row'>
                    <div className='col-sm-6 text-dark font-14'>Request/day</div>
                    <div className='col-sm-6 text-dark font-14 text-right'>75%</div>
                </div>
                <div className="progress" style={{ height: "10px" }}>
                    <div className="progress-bar bg-danger" role='progressbar' style={{ width: "75%" }}
                        aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}></div>
                </div>

                <div className='row'>
                    <div className='col-sm-6 text-dark font-14'>Projects</div>
                    <div className='col-sm-6 text-dark font-14 text-right'>25%</div>
                </div>
                <div className="progress" style={{ height: "10px" }}>
                    <div className="progress-bar" role='progressbar' style={{ width: "25%", background: "#284E93" }}
                        aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
                </div>
            </div>

        </div>
    )
}
export default Taskprogress;