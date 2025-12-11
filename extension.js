//    Overview on empty workspace
//    GNOME Shell extension
//    @fthx 2025


import * as Main from 'resource:///org/gnome/shell/ui/main.js';


export default class OverviewOnEmptyWorkspaceExtension {
    _showOverview() {
        if (!Main.overview.visible && global.workspace_manager.get_active_workspace()?.n_windows === 0)
            Main.overview.show();
    }

    enable() {
        global.display.connectObject('window-left-monitor', () => this._showOverview(), this);
        global.workspace_manager.connectObject('active-workspace-changed', () => this._showOverview(), this);
    }

    disable() {
        global.display.disconnectObject(this);
        global.workspace_manager.disconnectObject(this);
    }
}
