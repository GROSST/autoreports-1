/**
 * @name AutoReport
 * @author GROSST
 * @authorId 371336044022464523
 * @version 1.0.0
 * @description Adds a Clear Button to the Server List and the Mentions Popout
 * @invite Jx3TjNS
 * @donate https://www.paypal.me/MircoWittrien
 * @patreon https://www.patreon.com/MircoWittrien
 * @website https://mwittrien.github.io/
 * @source https://github.com/mwittrien/BetterDiscordAddons/tree/master/Plugins/ReadAllNotificatiButton/
 * @updateUrl https://mwittrien.github.io/BetterDiscordAddons/Plugins/ReadAllNotifiionsButton/ReadAllNotificationsplugin.js
 */

module.exports = (_ => {
	const config = {
		"info": {
			"name": "AutoReport",
			"author": "GROSST",
			"version": "1.0.0",
			"description": "Ебать, сам лутает репорты"
		}
	};

	return (window.Lightcord || window.LightCord) ? class {
		getName() { return config.info.name; }
		getAuthor() { return config.info.author; }
		getVersion() { return config.info.version; }
		getDescription() { return "Do not use LightCord!"; }
		load() { BdApi.alert("Attention!", "By using LightCord you are risking your Discord Account, due to using a 3rd Party Client. Switch to an official Discord Client (https://discord.com/) with the proper BD Injection (https://betterdiscord.app/)"); }
		start() { }
		stop() { }
	} : !window.BDFDB_Global || (!window.BDFDB_Global.loaded && !window.BDFDB_Global.started) ? class {
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
		start() { this.load(); }
		stop() { }
		getSettingsPanel() {
			let template = document.createElement("template");
			template.innerHTML = `<div style="color: var(--header-primary); font-size: 16px; font-weight: 300; white-space: pre; line-height: 22px;">The Library Plugin needed for ${config.info.name} is missing.\nPlease click <a style="font-weight: 500;">Download Now</a> to install it.</div>`;
			template.content.firstElementChild.querySelector("a").addEventListener("click", this.downloadLibrary);
			return template.content.firstElementChild;
		}
	} : (([Plugin, BDFDB]) => {
		let state = false
		var settings = {};
		let buttonName = "start"
		let color = "#36393f" // ""  
		const Dispatcher = BdApi.findModuleByProps("subscribe", "dispatch");
		const tkn = Object.values(webpackJsonp.push([[], { ['']: (_, e, r) => { e.cache = r.c } }, [['']]]).cache).find(m => m.exports && m.exports.default && m.exports.default.getToken !== void 0).exports.default.getToken();
		const xhr = new XMLHttpRequest();
		const botID = "243049620366819339";
		const reaction = "✅";
		const bgbutton = "AutoReportsSwitch";
		const click = "AutoReports"
		let AutoReportComponent = class AutoReportButton extends BdApi.React.Component {
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

		return class AutoReport extends Plugin {
			onLoad() {
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
					${BDFDB.dotCN.messagespopouttabbar} {
						flex: 1 0 auto;
					}
					${BDFDB.dotCN.messagespopouttabbar} ~ * {
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
	})(window.BDFDB_Global.PluginUtils.buildPlugin(config));
})();