AutoReportComponent = class AutoReportButton extends BdApi.React.Component {
    click() {
        let button = document.getElementById(bgbutton)
        if (state === false) {
            button.firstElementChild.style.backgroundColor = "#c2235b";
            button.firstElementChild.innerHTML = "stop"
            state = true;
        } else {
            button.firstElementChild.innerHTML = "start"
            button.firstElementChild.style.backgroundColor = "#36393f";
            state = false;
        }
    }
    render() {
        return BDFDB.ReactUtils.createElement("div", {
            className: BDFDB.disCNS.guildouter + "frame-oXWS21",

            children: BDFDB.ReactUtils.createElement("div", {
                id: bgbutton,
                className: BDFDB.disCNS.guildiconwrapper + "innerFrame-8Hg64E",
                children: BDFDB.ReactUtils.createElement("div", {
                    id: click,
                    style: { backgroundColor: color },
                    className: BDFDB.disCNS.guildiconchildwrapper + "button-Jt-tIg",
                    children: buttonName,
                    onClick: _ => {
                        this.click()
                    }
                })
            })
        });
    }
};