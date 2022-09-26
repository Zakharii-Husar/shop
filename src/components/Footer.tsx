import { useState } from "react";

function Footer () {

    const [showFooter, setShowfooter] = useState(window.innerWidth >= 600 ? true : false);
    return(
        <div className="Footer">
            <div 
            className="showFooterBtn"
            onClick={()=> showFooter ? setShowfooter(false) : setShowfooter(true)}
            >About us</div>
            <ul className={ showFooter ? "footerList" : "hideFooterList"}>
                <li>Partners</li>
                <li>Locations</li>
                <li>Schedule</li>
                <li>Payment</li>
                <li>info@electronics.ca</li>
                <li>Sales</li>
                <li>Delivery</li>
                <li>1-200-300-353</li>
            </ul>
        </div>
    )
};

export default Footer;