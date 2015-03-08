Type.registerNamespace('Sales.Common.Framework');

function __Type() {
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\_Type.cs (10,3)
__Type.hasField = function __Type$hasField(instance, name) {
    return !IsNull(instance[name]);
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\_Type.cs (24,3)
__Type.hasMethod = function __Type$hasMethod(instance, name) {
    return typeof(instance[name]) === 'function';
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\_Type.cs (37,3)
__Type.hasProperty = function __Type$hasProperty(instance, name) {
    return !IsNull(instance['get_' + name]());
}


Type.registerNamespace('Follow');

Follow.FollowCommands = function Follow_FollowCommands(dialogArguments, gridControl) {
    this.$3_0 = dialogArguments;
    this.$7_0 = gridControl;
    this.$6_0 = Xrm.Page.context;
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowCommands.js.cs (41,3)
Follow.FollowCommands.dummy = function Follow_FollowCommands$dummy() {
    return true;
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowCommands.js.cs (52,3)
Follow.FollowCommands.followFromGrid = function Follow_FollowCommands$followFromGrid(gridControl, selectedRecords, entityTypeCode) {
    Follow.FollowCommands.$0 = null;
    var $v_0 = {};
    $v_0['selectedRecords'] = selectedRecords;
    $v_0['entityTypeCode'] = entityTypeCode;
    $v_0['action'] = 'follow';
    Follow.FollowCommands.$0 = new Follow.FollowCommands($v_0, gridControl);
    Follow.FollowCommands.$0.execute();
    Follow.FollowCommands.$0 = null;
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowCommands.js.cs (70,3)
Follow.FollowCommands.unfollowFromGrid = function Follow_FollowCommands$unfollowFromGrid(gridControl, selectedRecords, entityTypeCode) {
    Follow.FollowCommands.$0 = null;
    var $v_0 = {};
    $v_0['selectedRecords'] = selectedRecords;
    $v_0['entityTypeCode'] = entityTypeCode;
    $v_0['action'] = 'unfollow';
    Follow.FollowCommands.$0 = new Follow.FollowCommands($v_0, gridControl);
    Follow.FollowCommands.$0.execute();
    Follow.FollowCommands.$0 = null;
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowCommands.js.cs (88,3)
Follow.FollowCommands.followFromForm = function Follow_FollowCommands$followFromForm(selectedRecordId, entityLogicalName, entityTypeCode) {
    Follow.FollowCommands.$0 = null;
    var $v_0 = {};
    $v_0['selectedRecords'] = Follow.FollowCommands.$H(selectedRecordId, entityLogicalName);
    $v_0['entityTypeCode'] = entityTypeCode;
    $v_0['action'] = 'follow';
    $v_0['formAction'] = true;
    $v_0['window'] = window.self;
    Follow.FollowCommands.$0 = new Follow.FollowCommands($v_0, null);
    Follow.FollowCommands.$0.execute();
    Follow.FollowCommands.$0 = null;
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowCommands.js.cs (109,3)
Follow.FollowCommands.unfollowFromForm = function Follow_FollowCommands$unfollowFromForm(selectedRecordId, entityLogicalName, entityTypeCode) {
    Follow.FollowCommands.$0 = null;
    var $v_0 = {};
    $v_0['selectedRecords'] = Follow.FollowCommands.$H(selectedRecordId, entityLogicalName);
    $v_0['entityTypeCode'] = entityTypeCode;
    $v_0['action'] = 'unfollow';
    $v_0['formAction'] = true;
    $v_0['window'] = window.self;
    Follow.FollowCommands.$0 = new Follow.FollowCommands($v_0, null);
    Follow.FollowCommands.$0.execute();
    Follow.FollowCommands.$0 = null;
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowCommands.js.cs (130,3)
Follow.FollowCommands.$H = function Follow_FollowCommands$$H($p0, $p1) {
    var $v_0 = new Array(1);
    $v_0[0] = {};
    $v_0[0].Id = $p0;
    $v_0[0].TypeName = $p1;
    return $v_0;
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowCommands.js.cs (291,3)
Follow.FollowCommands.$S = function Follow_FollowCommands$$S($p0, $p1, $p2, $p3) {
    var $v_0 = Xrm.Page.context.getClientUrl();
    var $v_1 = String.format('{0}/xrmservices/2011/OrganizationData.svc/PostFollowSet(guid\'{1}\')', $v_0, $p0);
    var $v_2 = new XMLHttpRequest();
    $v_2.open('POST', $v_1, true);
    $v_2.setRequestHeader('Accept', 'application/json');
    $v_2.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    $v_2.setRequestHeader('X-HTTP-Method', 'DELETE');
    $v_2.onreadystatechange = function() {
        if ($v_2.readyState !== 4) {
            return;
        }
        var $v_3 = $v_2.responseText;
        if ($v_3.indexOf('\"error\"') > 0) {
            Follow.FollowCommands.$B($v_3);
        }
        else if ($p1) {
            Follow.FollowCommands.$F($p2, $p3, false);
        }
    };
    $v_2.send(null);
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowCommands.js.cs (325,3)
Follow.FollowCommands.$B = function Follow_FollowCommands$$B($p0) {
    var $v_0 = Xrm.Page.context.getClientUrl();
    var $v_1 = new RegExp('\"code\":\\s\"(-?\\d+)\"', 'im');
    var $v_2 = $p0.match($v_1);
    if ($v_2 && $v_2.length >= 2) {
        var $v_3 = parseInt($v_2[1]);
        if ($v_3 === Follow.FollowCommands.$A || $v_3 === Follow.FollowCommands.$E) {
            return;
        }
        var $v_4 = String.format('{0}/_common/error/dlg_error.aspx?hresult=0x{1}', $v_0, (4294967295 + $v_3 + 1).toString(16));
        Follow.FollowCommands.windowShowModalDialog($v_4, null, 450, 300);
    }
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowCommands.js.cs (357,3)
Follow.FollowCommands.$Q = function Follow_FollowCommands$$Q() {
    window.refreshRibbon();
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowCommands.js.cs (365,3)
Follow.FollowCommands.$P = function Follow_FollowCommands$$P() {
    for (var $v_0 = 0; $v_0 < window.frames.length; $v_0++) {
        var $v_1 = window.frames[$v_0];
        if (!Follow.FollowCommands.$5($v_1.ActivityFeeds) && !Follow.FollowCommands.$5($v_1.ActivityFeeds.UI) && !Follow.FollowCommands.$5($v_1.ActivityFeeds.UI.Followers) && !Follow.FollowCommands.$5($v_1.ActivityFeeds.UI.Followers.refresh)) {
            $v_1.ActivityFeeds.UI.Followers.refresh();
        }
    }
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowCommands.js.cs (388,3)
Follow.FollowCommands.$5 = function Follow_FollowCommands$$5($p0) {
    return !$p0 || typeof($p0) === 'undefined';
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowCommands.js.cs (401,3)
Follow.FollowCommands.windowShowModalDialog = function Follow_FollowCommands$windowShowModalDialog(url, $sn_arguments, width, height) {
    var $v_0 = null;
    try {
        $v_0 = openStdDlg(url, $sn_arguments, width, height, true, false, null);;
    }
    catch ($$e_5) {
    }
    return $v_0;
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowCommands.js.cs (417,3)
Follow.FollowCommands.$N = function Follow_FollowCommands$$N() {
    return '1' === window._IsRefreshForm;
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowCommands.js.cs (428,3)
Follow.FollowCommands.$F = function Follow_FollowCommands$$F($p0, $p1, $p2) {
    if (Follow.FollowCommands.$N()) {
        var $v_0 = window._activityFeedsStateDictionary;
        $v_0['IsFollowed'] = $p2.toString();
        Mscrm.ReadFormUtilities.setCommandBarButtonVisible('followButton', !$p2);
        Mscrm.ReadFormUtilities.setCommandBarButtonVisible('unfollowButton', $p2);
    }
    else {
        Follow.FollowEnabled.refreshFormFollowEnabled($p0, $p1, $p2);
        Follow.FollowCommands.$Q();
        Follow.FollowCommands.$P();
    }
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowCommands.js.cs (448,3)
Follow.FollowCommands.$M = function Follow_FollowCommands$$M() {
    var $v_0 = window._installedLocales;
    if (!$v_0 || $v_0 === 'undefined') {
        return [ 1033 ];
    }
    return $v_0;
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowCommands.js.cs (464,3)
Follow.FollowCommands.getFallbackLcid = function Follow_FollowCommands$getFallbackLcid(userLcid, orgLcid) {
    var $v_0 = Follow.FollowCommands.$M();
    for (var $v_1 = 0; $v_1 < $v_0.length; $v_1++) {
        if ($v_0[$v_1] === userLcid) {
            return userLcid;
        }
    }
    for (var $v_2 = 0; $v_2 < $v_0.length; $v_2++) {
        if ($v_0[$v_2] === orgLcid) {
            return orgLcid;
        }
    }
    return 1033;
}
Follow.FollowCommands.prototype = {
    $3_0: null,
    $7_0: null,
    $6_0: null,
    
    // file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowCommands.js.cs (144,3)
    execute: function Follow_FollowCommands$execute() {
        if (!this.$3_0 || !this.$3_0['action']) {
            return;
        }
        var $v_0 = this.$3_0['selectedRecords'];
        var $v_1 = !Follow.FollowCommands.$5(this.$3_0['formAction']) && this.$3_0['formAction'];
        if ($v_0.length === 1 && $v_1) {
            var $v_2 = $v_0[0];
            var $v_3 = $v_2.Id;
            var $v_4 = $v_2.TypeName;
            var $v_5 = this.$3_0['action'];
            switch ($v_5) {
                case 'follow':
                    this.$J_0($v_3, $v_4, $v_1);
                    break;
                case 'unfollow':
                    this.$K_0($v_3, $v_4, $v_1);
                    break;
            }
        }
        else {
            var $v_6 = Follow.FollowCommands.getFallbackLcid(this.$6_0.getUserLcid(), this.$6_0.getOrgLcid());
            var $v_7 = String.format('FollowDialog.{0}.htm', $v_6);
            var $v_8 = String.format('{0}/WebResources/msdyn_/{1}', this.$6_0.getClientUrl(), $v_7);
            var $v_9 = Follow.FollowCommands.windowShowModalDialog($v_8, this.$3_0, 450, 300);
            if ($v_9 && $v_9 === -1) {
                return;
            }
            if (this.$7_0) {
                this.$7_0.refresh();
            }
        }
    },
    
    // file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowCommands.js.cs (197,3)
    $J_0: function Follow_FollowCommands$$J_0($p0, $p1, $p2) {
        var $v_0 = Xrm.Page.context.getClientUrl();
        var $v_1 = String.format('\'Id\': \'{0}\', \'LogicalName\': \'{1}\'', $p0, $p1);
        var $v_2 = '{\'RegardingObjectId\': {' + $v_1 + '}}';
        var $v_3 = String.format('{0}/xrmservices/2011/OrganizationData.svc/PostFollowSet', $v_0);
        var $v_4 = new XMLHttpRequest();
        $v_4.open('POST', $v_3, true);
        $v_4.setRequestHeader('Accept', 'application/json');
        $v_4.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        var $$t_9 = this;
        $v_4.onreadystatechange = function() {
            if ($v_4.readyState !== 4) {
                return;
            }
            var $v_5 = $v_4.responseText;
            if ($v_5.indexOf('\"error\"') > 0) {
                Follow.FollowCommands.$B($v_5);
            }
            else if ($p2) {
                Follow.FollowCommands.$F($p0, $p1, true);
            }
        };
        $v_4.send($v_2);
    },
    
    // file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowCommands.js.cs (241,3)
    $K_0: function Follow_FollowCommands$$K_0($p0, $p1, $p2) {
        var $v_0 = Xrm.Page.context.getClientUrl();
        var $v_1 = String.format('{0}/xrmservices/2011/OrganizationData.svc/PostFollowSet?$select=PostFollowId&$filter=RegardingObjectId/Id eq guid\'{1}\' and OwnerId/Id eq guid\'{2}\'', $v_0, $p0, Xrm.Page.context.getUserId());
        var $v_2 = new XMLHttpRequest();
        $v_2.open('GET', $v_1, true);
        $v_2.setRequestHeader('Accept', 'application/json');
        $v_2.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        var $$t_9 = this;
        $v_2.onreadystatechange = function() {
            if ($v_2.readyState !== 4) {
                return;
            }
            var $v_3 = new RegExp('\"PostFollowId\":\\s\"(-?.*)\"', 'im');
            var $v_4 = $v_2.responseText.match($v_3);
            if ($v_4 && $v_4.length >= 2) {
                var $v_5 = $v_4[1];
                Follow.FollowCommands.$S($v_5, $p2, $p0, $p1);
            }
        };
        $v_2.send(null);
    }
}


Follow.FollowEnabledState = function Follow_FollowEnabledState() {
}
Follow.FollowEnabledState.prototype = {
    enableFollow: false,
    enableUnFollow: false,
    inProgress: false
}


Follow.FollowEnabled = function Follow_FollowEnabled() {
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowEnabled.js.cs (43,3)
Follow.FollowEnabled.$C = function Follow_FollowEnabled$$C($p0, $p1) {
    var $v_0 = Xrm.Page.context.getClientUrl();
    var $v_1 = String.format('{0}/xrmservices/2011/OrganizationData.svc/msdyn_PostConfigSet?$select=msdyn_EntityName,statecode&$filter=msdyn_EntityName eq \'{1}\' and statecode/Value eq 0', $v_0, CrmEncodeDecode.CrmUrlEncode($p0));
    var $v_2 = new XMLHttpRequest();
    $v_2.open('GET', $v_1, true);
    $v_2.setRequestHeader('Accept', 'application/json');
    $v_2.onreadystatechange = function() {
        if ($v_2.readyState !== 4) {
            return;
        }
        var $v_3 = new Follow.FollowEnabledState();
        var $v_4 = $v_2.responseText;
        $v_4 = _String.replaceAll($v_4, '\n', '');
        $v_4 = _String.replaceAll($v_4, '\r', '');
        if ($v_4.indexOf(String.format('msdyn_EntityName\": \"{0}\"', $p0)) >= 0) {
            var $v_5 = $v_4.match(Follow.FollowEnabled.$G);
            if ($v_5 || $v_5.length === 2) {
                $v_3.enableUnFollow = true;
                $v_3.enableFollow = ($v_5[1] === '0');
            }
        }
        $p1($v_3);
    };
    $v_2.send(null);
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowEnabled.js.cs (113,3)
Follow.FollowEnabled.$L = function Follow_FollowEnabled$$L($p0, $p1, $p2) {
    Follow.FollowEnabled.$C($p0, function($p1_0) {
        if (!$p1_0.enableFollow) {
            $p2($p1_0);
            return;
        }
        var $v_0 = Xrm.Page.context.getClientUrl();
        var $v_1 = String.format('{0}/xrmservices/2011/OrganizationData.svc/PostFollowSet?$select=OwnerId,PostFollowId,RegardingObjectId&$filter=RegardingObjectId/Id eq guid\'{1}\' and OwnerId/Id eq guid\'{2}\'', $v_0, CrmEncodeDecode.CrmUrlEncode($p1), CrmEncodeDecode.CrmUrlEncode(Xrm.Page.context.getUserId()));
        var $v_2 = new XMLHttpRequest();
        $v_2.open('GET', $v_1, true);
        $v_2.setRequestHeader('Accept', 'application/json');
        $v_2.onreadystatechange = function() {
            if ($v_2.readyState !== 4) {
                return;
            }
            var $v_3 = new Follow.FollowEnabledState();
            $v_3.enableUnFollow = $v_2.responseText.indexOf('PostFollowId') > 0;
            $v_3.enableFollow = !$v_3.enableUnFollow;
            $p2($v_3);
        };
        $v_2.send(null);
    });
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowEnabled.js.cs (197,3)
Follow.FollowEnabled.preCreateRows = function Follow_FollowEnabled$preCreateRows(gridControl) {
    if (Follow.FollowEnabled.$8) {
        Follow.FollowEnabled.retrieveAllActivityFeedEnabledEntities(gridControl);
        Follow.FollowEnabled.$8 = false;
    }
    return true;
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowEnabled.js.cs (214,3)
Follow.FollowEnabled.dummy = function Follow_FollowEnabled$dummy() {
    return true;
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowEnabled.js.cs (223,3)
Follow.FollowEnabled.$R = function Follow_FollowEnabled$$R() {
    var $v_0 = !Follow.FollowEnabled.$9 && !IsNull(ActivityFeeds.Resources);
    return $v_0;
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowEnabled.js.cs (233,3)
Follow.FollowEnabled.loadResources = function Follow_FollowEnabled$loadResources() {
    if (!Follow.FollowEnabled.$R()) {
        var $v_0 = Sales.Common.CrmSoapServiceProxy.Utils.Utils.getContextFromXrmPage();
        var $v_1 = $v_0.getClientUrl();
        loadLocalizedContent($v_1 + '/WebResources/msdyn_/ActivityFeeds.Resources.js', $v_0, function($p1_0) {
            eval($p1_0);
            Follow.FollowEnabled.$9 = false;
        });
    }
    return true;
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowEnabled.js.cs (254,3)
Follow.FollowEnabled.activateDeactivateOverride = function Follow_FollowEnabled$activateDeactivateOverride(gridControl, records, otc, activate) {
    if (activate) {
        Mscrm.GridRibbonActions.activate(gridControl, records, otc);
    }
    else {
        Mscrm.GridRibbonActions.deactivate(gridControl, records, otc);
    }
    window.setTimeout(function() {
        if (records.length === 1) {
            alert(ActivityFeeds.Resources.ActivityFeedsUI.postConfigurationPublishChangesNotificationGrid);
        }
        else {
            alert(ActivityFeeds.Resources.ActivityFeedsUI.postConfigurationPublishChangesNotificationGridPlural);
        }
    }, 100);
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowEnabled.js.cs (283,3)
Follow.FollowEnabled.retrieveAllActivityFeedEnabledEntities = function Follow_FollowEnabled$retrieveAllActivityFeedEnabledEntities(gridControl) {
    var $v_0 = Xrm.Page.context.getClientUrl();
    var $v_1 = String.format('{0}/xrmservices/2011/OrganizationData.svc/msdyn_PostRuleConfigSet?$select=msdyn_name&$filter=msdyn_name eq \'{1}\'', $v_0, CrmEncodeDecode.CrmUrlEncode('5EF5871D-FE40-4EB9-9952-39B0AC611895'));
    var $v_2 = new XMLHttpRequest();
    $v_2.open('GET', $v_1, true);
    $v_2.setRequestHeader('Accept', 'application/json');
    $v_2.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    $v_2.onreadystatechange = function() {
        if ($v_2.readyState !== 4) {
            return;
        }
        var $v_3 = $v_2.responseText;
        if ($v_3.indexOf('\"error\"') === -1) {
            if (__Type.hasMethod(gridControl, 'refresh')) {
                gridControl.refresh();
            }
        }
    };
    $v_2.send(null);
    if (__Type.hasMethod(gridControl, 'ShowLoadingMessage')) {
        gridControl.ShowLoadingMessage();
    }
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowEnabled.js.cs (327,3)
Follow.FollowEnabled.isEntityWallEnabled = function Follow_FollowEnabled$isEntityWallEnabled(logicalName, followButton) {
    if (Follow.FollowEnabled.$4[logicalName] === undefined) {
        Follow.FollowEnabled.$4[logicalName] = new Follow.FollowEnabledState();
        (Follow.FollowEnabled.$4[logicalName]).inProgress = true;
        Follow.FollowEnabled.$C(logicalName, function($p1_0) {
            Follow.FollowEnabled.$4[logicalName] = $p1_0;
            window.refreshRibbon();
        });
    }
    else {
        if ((Follow.FollowEnabled.$4[logicalName]).inProgress) {
            return false;
        }
        return (followButton) ? (Follow.FollowEnabled.$4[logicalName]).enableFollow : (Follow.FollowEnabled.$4[logicalName]).enableUnFollow;
    }
    return false;
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowEnabled.js.cs (363,3)
Follow.FollowEnabled.isFollowButtonEnabled = function Follow_FollowEnabled$isFollowButtonEnabled(entityId, logicalName, followButton) {
    entityId = Follow.FollowEnabled.$D(entityId);
    if (Follow.FollowEnabled.$2[entityId] === undefined) {
        Follow.FollowEnabled.$2[entityId] = new Follow.FollowEnabledState();
        (Follow.FollowEnabled.$2[entityId]).inProgress = true;
        Follow.FollowEnabled.$L(logicalName, entityId, function($p1_0) {
            Follow.FollowEnabled.$2[entityId] = $p1_0;
            window.refreshRibbon();
        });
    }
    else {
        if ((Follow.FollowEnabled.$2[entityId]).inProgress) {
            return false;
        }
        return (followButton) ? (Follow.FollowEnabled.$2[entityId]).enableFollow : (Follow.FollowEnabled.$2[entityId]).enableUnFollow;
    }
    return false;
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowEnabled.js.cs (401,3)
Follow.FollowEnabled.refreshFormFollowEnabled = function Follow_FollowEnabled$refreshFormFollowEnabled(entityId, logicalName, isEntityFollowed) {
    entityId = Follow.FollowEnabled.$D(entityId);
    Follow.FollowEnabled.$2[entityId] = new Follow.FollowEnabledState();
    (Follow.FollowEnabled.$2[entityId]).enableFollow = !isEntityFollowed;
    (Follow.FollowEnabled.$2[entityId]).enableUnFollow = isEntityFollowed;
    window.top.refreshRibbon();
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowEnabled.js.cs (415,3)
Follow.FollowEnabled.$D = function Follow_FollowEnabled$$D($p0) {
    if (!$p0) {
        return '';
    }
    if ($p0.startsWith('{')) {
        $p0 = $p0.substr(1);
    }
    if ($p0.endsWith('}')) {
        $p0 = $p0.substr(0, $p0.length - 1);
    }
    return $p0.toLowerCase();
}
// file://c:\bt\20184\src\sales\activityfeeds\Follow.Command\FollowEnabled.js.cs (438,3)
Follow.FollowEnabled.activityFeedVersionSalesRefresh = function Follow_FollowEnabled$activityFeedVersionSalesRefresh() {
    return alert("activityfeedsolution.salesrefresh");;
}


__Type.registerClass('__Type');
Follow.FollowCommands.registerClass('Follow.FollowCommands');
Follow.FollowEnabledState.registerClass('Follow.FollowEnabledState');
Follow.FollowEnabled.registerClass('Follow.FollowEnabled');
Follow.FollowCommands.$0 = null;
Follow.FollowCommands.$A = -2147220937;
Follow.FollowCommands.$E = -2147220969;
Follow.FollowCommands.$I = -2147158368;
Follow.FollowEnabled.$G = new RegExp('statecode.*?Value.*(\\d+)', 'i');
Follow.FollowEnabled.$4 = {};
Follow.FollowEnabled.$2 = {};
Follow.FollowEnabled.$9 = false;
Follow.FollowEnabled.$8 = true;
