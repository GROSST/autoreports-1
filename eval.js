class AutoReport extends Plugin {
			
    onLoad() {
        ZeresPluginLibrary.PluginUpdater.checkForUpdate(config.info.name, config.info.version, 'https://raw.githubusercontent.com/GR0SST/autoreports/main/AutoReport.plugin.js')

        
        this.defaults = {
            settings: {
                botID: { value: "", inner: true, description: "Bot id" },
                reaction: { value: "", inner: true, description: "Reactions" }
            }
        };

        this.patchedModules = {
            after: {
                Guilds: "render"
            }
        };

        this.css = `
            .tabBar-31Wimb {
                flex: 1 0 auto;
            }
            .tabBar-31Wimb ~ * {
                margin-left: 10px;
            }
            .frame-oXWS21 {
                height: 24px;
                margin-bottom: 10px;
            }
            .frame-oXWS21:active {
                transform: translateY(1px);
            }
            .innerFrame-8Hg64E {
                height: 24px;
            }
            .button-Jt-tIg {
                border-radius: 4px;
                height: 24px;
                font-size: 12px;
                line-height: 1.3;
                white-space: nowrap;
                cursor: pointer;
            }
        `;
    }

    onStart() {
        
        Dispatcher.subscribe("MESSAGE_CREATE", this.onMessage);
        this.forceUpdateAll();
    }

    onStop() {
        this.forceUpdateAll();
        Dispatcher.unsubscribe("MESSAGE_CREATE", this.onMessage);
    }

    getSettingsPanel(collapseStates = {}) {
        let settingsItems = [];
        const name = this.getName()
        settingsItems.push(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SettingsPanelList, {
            title: "fdgdfdfg",
            first: false,
            last: true,
            children: Object.keys(settings).filter(key => this.defaults.settings[key].inner).map(key => BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SettingsItem, {
                type: "TextInput",
                plugin: this,
                keys: ["settings", key],
                label: this.defaults.settings[key].description,
                value: settings[key]
            }))
        }))


        return BDFDB.PluginUtils.createSettingsPanel(this, settingsItems);
    }

    onSettingsClosed() {
        if (this.SettingsUpdated) {
            delete this.SettingsUpdated;
            this.forceUpdateAll();
        }
    }

    forceUpdateAll() {
        settings = BDFDB.DataUtils.get(this, "settings");

        BDFDB.PatchUtils.forceAllUpdates(this);
    }

    processGuilds(e) {

        if (typeof e.returnvalue.props.children == "function") {

            let childrenRender = e.returnvalue.props.children;
            e.returnvalue.props.children = (...args) => {
                let children = childrenRender(...args);
                this.checkTree(children);
                return children;
            };
        }
        else this.checkTree(e.returnvalue);
    }

    checkTree(returnvalue) {
        let tree = BDFDB.ReactUtils.findChild(returnvalue, { filter: n => n && n.props && typeof n.props.children == "function" });
        if (tree) {
            let childrenRender = tree.props.children;
            tree.props.children = (...args) => {
                let children = childrenRender(...args);
                this.handleGuilds(children);
                return children;
            };
        }
        else this.handleGuilds(returnvalue);
    }

    handleGuilds(returnvalue) {
        let [children, index] = BDFDB.ReactUtils.findParent(returnvalue, { name: "ConnectedUnreadDMs" });
        if (index > -1) children.splice(index + 1, 0, BDFDB.ReactUtils.createElement(AutoReportComponent, {}));
    }

    onMessage(e) {
        if (e.message.author.id !== botID) return
        let ifDM = ZeresPluginLibrary.DiscordAPI.Channel.fromId(e.channelId).type == "DM"
        if (!ifDM || !state) return
        document.getElementById(click).click()
        xhr.open('PUT', `https://discord.com/api/v9/channels/${e.channelId}/messages/${e.message.id}/reactions/${reaction}/%40me`, true)
        xhr.setRequestHeader("authorization", tkn)
        xhr.send()
    }
};