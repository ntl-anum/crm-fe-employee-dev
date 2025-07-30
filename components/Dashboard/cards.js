import Image from "next/image";
import userIcon from '../../public/dist/img/dashboardUserIcon.svg';
import externalIcon from '../../public/dist/img/link-external.svg';
const DashboardCards = () => {
    const cardArray = [
        {
            backgroundColor: '#E0F8EA',
            percentageValue: '+24%',
            visitValue: '914,001',
            incrementPercentageValue: '30%',
            iconsBg: '#BCF5D3'
        },
        {
            backgroundColor: '#C0D2FB',
            percentageValue: '+24%',
            visitValue: '914,001',
            incrementPercentageValue: '30%',
            iconsBg: '#7695FC'
        },
        {
            backgroundColor: '#FDEAE4',
            percentageValue: '+24%',
            visitValue: '914,001',
            incrementPercentageValue: '30%',
            iconsBg: '#F5AD97'
        },
        {
            backgroundColor: '#FFF5E1',
            percentageValue: '+24%',
            visitValue: '914,001',
            incrementPercentageValue: '30%',
            iconsBg: '#FED98E'
        },
    ]
    return (
        <div className="container mb-3">
            <div className="row bg-white rounded py-2">
                {
                    cardArray.map((element,index) => (
                        <div  key={index} className="col-xs-12 col-sm-12 col-md-6 col-lg-3 px-2 my-2">
                        <div className="col-lg-12 py-4 px-4 rounded"  style={{ background: `${element.backgroundColor}` }}>
                            <div className="row">
                                <div className="col-6">
                                    <span style={{ background: `${element.iconsBg}`, padding: '8px', borderRadius: '50%' }}>
                                        <Image
                                            src={userIcon}
                                            alt="users"
                                            width={18}
                                            height={18}
    
                                        />
                                    </span>
    
                                </div>
                                <div className="col-6 text-right">
                                    <p className="font-12 weight-500">{element.percentageValue}</p>
                                </div>
                            </div>
    
                            <div className="row">
                                <div className="col-6">
                                    <p className="font-16 weight-500 py-0 my-0">{element.visitValue}</p>
                                    <span className="font-12 weight-400 text-secondary">Visits</span>
                                </div>
                                <div className="col-6 text-right mt-2">
                                    <span style={{ background: `${element.iconsBg}`, padding: '8px', borderRadius: '50%' }}>
                                        <Image
                                            src={externalIcon}
                                            alt="users"
                                            width={18}
                                            height={18}
    
                                        />
                                    </span>
    
                                    <span className="font-12 weight-500 pl-2">{element.incrementPercentageValue}</span>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    ))
                }

            </div>
        </div>
    )
}

export default DashboardCards;