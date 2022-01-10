
const getLastThurs = () => {
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return new Date(today.setDate(today.getDate()-today.getDay() + 4));
}

const toJewishDate = async d => {
    const jewishDateRequestURL = `https://www.hebcal.com/converter?cfg=json&gy=${d.getFullYear()}&gm=${d.getMonth() + 1}&gd=${d.getDay() + 19}&g2h=1`;
    const res = await fetch(jewishDateRequestURL);
    const resJSON = await res.json();
    
    return `${resJSON.hd} ${resJSON.hm} ${resJSON.hy}`;
}

const setMainSubheaderText = async () => {
    mainSubheaderTextBeginning = "THE ERUV HAS BEEN CHECKED AND IS OPERATIONAL AS OF";
    const lastThu = getLastThurs();
    mainSubheaderText = `${mainSubheaderTextBeginning} ${lastThu.toLocaleDateString('en-US')} - ${await toJewishDate(lastThu)}`;
    
    $('#main__subheader').text(mainSubheaderText);
}

const setFooterText = () => {
    const footerText = `Copyright © ${new Date().getFullYear()} Synogague - All Rights Reserved`;
    $('#footer-text').text(footerText);
}

const main = () => {
    setMainSubheaderText();
    setFooterText();
}

$(document).ready(main)