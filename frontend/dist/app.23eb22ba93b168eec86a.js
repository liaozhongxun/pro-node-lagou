/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/art-template/lib/compile/runtime.js":
/*!**********************************************************!*\
  !*** ./node_modules/art-template/lib/compile/runtime.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

/*! art-template@runtime | https://github.com/aui/art-template */

var globalThis = typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};

var runtime = Object.create(globalThis);
var ESCAPE_REG = /["&'<>]/;

/**
 * 编码模板输出的内容
 * @param  {any}        content
 * @return {string}
 */
runtime.$escape = function (content) {
    return xmlEscape(toString(content));
};

/**
 * 迭代器，支持数组与对象
 * @param {array|Object} data
 * @param {function}     callback
 */
runtime.$each = function (data, callback) {
    if (Array.isArray(data)) {
        for (var i = 0, len = data.length; i < len; i++) {
            callback(data[i], i);
        }
    } else {
        for (var _i in data) {
            callback(data[_i], _i);
        }
    }
};

// 将目标转成字符
function toString(value) {
    if (typeof value !== 'string') {
        if (value === undefined || value === null) {
            value = '';
        } else if (typeof value === 'function') {
            value = toString(value.call(value));
        } else {
            value = JSON.stringify(value);
        }
    }

    return value;
}

// 编码 HTML 内容
function xmlEscape(content) {
    var html = '' + content;
    var regexResult = ESCAPE_REG.exec(html);
    if (!regexResult) {
        return content;
    }

    var result = '';
    var i = void 0,
        lastIndex = void 0,
        char = void 0;
    for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
        switch (html.charCodeAt(i)) {
            case 34:
                char = '&#34;';
                break;
            case 38:
                char = '&#38;';
                break;
            case 39:
                char = '&#39;';
                break;
            case 60:
                char = '&#60;';
                break;
            case 62:
                char = '&#62;';
                break;
            default:
                continue;
        }

        if (lastIndex !== i) {
            result += html.substring(lastIndex, i);
        }

        lastIndex = i + 1;
        result += char;
    }

    if (lastIndex !== i) {
        return result + html.substring(lastIndex, i);
    } else {
        return result;
    }
}

module.exports = runtime;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/art-template/lib/runtime.js":
/*!**************************************************!*\
  !*** ./node_modules/art-template/lib/runtime.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./compile/runtime */ "./node_modules/art-template/lib/compile/runtime.js");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _views_index_art__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./views/index.art */ "./src/views/index.art");
/* harmony import */ var _views_index_art__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_views_index_art__WEBPACK_IMPORTED_MODULE_0__);
/**
 * src  源代码  source
 */



let html = _views_index_art__WEBPACK_IMPORTED_MODULE_0___default()();

$("#app").html(html);


/***/ }),

/***/ "./src/views/index.art":
/*!*****************************!*\
  !*** ./src/views/index.art ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $imports = __webpack_require__(/*! ../../node_modules/art-template/lib/runtime.js */ "./node_modules/art-template/lib/runtime.js");
module.exports = function ($data) {
    'use strict';
    $data = $data || {};
    var $$out = '';
    $$out += '<div class="wrapper">\r\n    <!-- Main Header -->\r\n    <header class="main-header">\r\n        <!-- Logo -->\r\n        <a href="index2.html" class="logo">\r\n            <!-- mini logo for sidebar mini 50x50 pixels -->\r\n            <span class="logo-mini"><b>A</b>LT</span>\r\n            <!-- logo for regular state and mobile devices -->\r\n            <span class="logo-lg"><b>Admin</b>LTE</span>\r\n        </a>\r\n\r\n        <!-- Header Navbar -->\r\n        <nav class="navbar navbar-static-top" role="navigation">\r\n            <!-- Sidebar toggle button-->\r\n            <a\r\n                href="#"\r\n                class="sidebar-toggle"\r\n                data-toggle="offcanvas"\r\n                role="button"\r\n            >\r\n                <span class="sr-only">Toggle navigation</span>\r\n            </a>\r\n            <!-- Navbar Right Menu -->\r\n            <div class="navbar-custom-menu">\r\n                <ul class="nav navbar-nav">\r\n                    <!-- Messages: style can be found in dropdown.less-->\r\n                    <li class="dropdown messages-menu">\r\n                        <!-- Menu toggle button -->\r\n                        <a\r\n                            href="#"\r\n                            class="dropdown-toggle"\r\n                            data-toggle="dropdown"\r\n                        >\r\n                            <i class="fa fa-envelope-o"></i>\r\n                            <span class="label label-success"\r\n                                >4</span\r\n                            >\r\n                        </a>\r\n                        <ul class="dropdown-menu">\r\n                            <li class="header">\r\n                                You have 4 messages\r\n                            </li>\r\n                            <li>\r\n                                <!-- inner menu: contains the messages -->\r\n                                <ul class="menu">\r\n                                    <li>\r\n                                        <!-- start message -->\r\n                                        <a href="#">\r\n                                            <div class="pull-left">\r\n                                                <!-- User Image -->\r\n                                                <img\r\n                                                    ';
    $$out += 'src="http://adminlte.xueyao.org/dist/img/user2-160x160.jpg"';
    $$out += '\r\n                                                    class="img-circle"\r\n                                                    alt="User Image"\r\n                                                />\r\n                                            </div>\r\n                                            <!-- Message title and timestamp -->\r\n                                            <h4>\r\n                                                Support Team\r\n                                                <small\r\n                                                    ><i\r\n                                                        class="fa fa-clock-o"\r\n                                                    ></i>\r\n                                                    5 mins</small\r\n                                                >\r\n                                            </h4>\r\n                                            <!-- The message -->\r\n                                            <p>\r\n                                                Why not buy a new\r\n                                                awesome theme?\r\n                                            </p>\r\n                                        </a>\r\n                                    </li>\r\n                                    <!-- end message -->\r\n                                </ul>\r\n                                <!-- /.menu -->\r\n                            </li>\r\n                            <li class="footer">\r\n                                <a href="#">See All Messages</a>\r\n                            </li>\r\n                        </ul>\r\n                    </li>\r\n                    <!-- /.messages-menu -->\r\n\r\n                    <!-- Notifications Menu -->\r\n                    <li class="dropdown notifications-menu">\r\n                        <!-- Menu toggle button -->\r\n                        <a\r\n                            href="#"\r\n                            class="dropdown-toggle"\r\n                            data-toggle="dropdown"\r\n                        >\r\n                            <i class="fa fa-bell-o"></i>\r\n                            <span class="label label-warning"\r\n                                >10</span\r\n                            >\r\n                        </a>\r\n                        <ul class="dropdown-menu">\r\n                            <li class="header">\r\n                                You have 10 notifications\r\n                            </li>\r\n                            <li>\r\n                                <!-- Inner Menu: contains the notifications -->\r\n                                <ul class="menu">\r\n                                    <li>\r\n                                        <!-- start notification -->\r\n                                        <a href="#">\r\n                                            <i\r\n                                                class="fa fa-users text-aqua"\r\n                                            ></i>\r\n                                            5 new members joined\r\n                                            today\r\n                                        </a>\r\n                                    </li>\r\n                                    <!-- end notification -->\r\n                                </ul>\r\n                            </li>\r\n                            <li class="footer">\r\n                                <a href="#">View all</a>\r\n                            </li>\r\n                        </ul>\r\n                    </li>\r\n                    <!-- Tasks Menu -->\r\n                    <li class="dropdown tasks-menu">\r\n                        <!-- Menu Toggle Button -->\r\n                        <a\r\n                            href="#"\r\n                            class="dropdown-toggle"\r\n                            data-toggle="dropdown"\r\n                        >\r\n                            <i class="fa fa-flag-o"></i>\r\n                            <span class="label label-danger"\r\n                                >9</span\r\n                            >\r\n                        </a>\r\n                        <ul class="dropdown-menu">\r\n                            <li class="header">You have 9 tasks</li>\r\n                            <li>\r\n                                <!-- Inner menu: contains the tasks -->\r\n                                <ul class="menu">\r\n                                    <li>\r\n                                        <!-- Task item -->\r\n                                        <a href="#">\r\n                                            <!-- Task title and progress text -->\r\n                                            <h3>\r\n                                                Design some buttons\r\n                                                <small\r\n                                                    class="pull-right"\r\n                                                    >20%</small\r\n                                                >\r\n                                            </h3>\r\n                                            <!-- The progress bar -->\r\n                                            <div\r\n                                                class="progress xs"\r\n                                            >\r\n                                                <!-- Change the css width attribute to simulate progress -->\r\n                                                <div\r\n                                                    class="progress-bar progress-bar-aqua"\r\n                                                    style="\r\n                                                        width: 20%;\r\n                                                    "\r\n                                                    role="progressbar"\r\n                                                    aria-valuenow="20"\r\n                                                    aria-valuemin="0"\r\n                                                    aria-valuemax="100"\r\n                                                >\r\n                                                    <span\r\n                                                        class="sr-only"\r\n                                                        >20%\r\n                                                        Complete</span\r\n                                                    >\r\n                                                </div>\r\n                                            </div>\r\n                                        </a>\r\n                                    </li>\r\n                                    <!-- end task item -->\r\n                                </ul>\r\n                            </li>\r\n                            <li class="footer">\r\n                                <a href="#">View all tasks</a>\r\n                            </li>\r\n                        </ul>\r\n                    </li>\r\n                    <!-- User Account Menu -->\r\n                    <li class="dropdown user user-menu">\r\n                        <!-- Menu Toggle Button -->\r\n                        <a\r\n                            href="#"\r\n                            class="dropdown-toggle"\r\n                            data-toggle="dropdown"\r\n                        >\r\n                            <!-- The user image in the navbar-->\r\n                            <img\r\n                                ';
    $$out += 'src="http://adminlte.xueyao.org/dist/img/user2-160x160.jpg"';
    $$out += '\r\n                                class="user-image"\r\n                                alt="User Image"\r\n                            />\r\n                            <!-- hidden-xs hides the username on small devices so only the image appears. -->\r\n                            <span class="hidden-xs"\r\n                                >Alexander Pierce</span\r\n                            >\r\n                        </a>\r\n                        <ul class="dropdown-menu">\r\n                            <!-- The user image in the menu -->\r\n                            <li class="user-header">\r\n                                <img\r\n                                    ';
    $$out += 'src="http://adminlte.xueyao.org/dist/img/user2-160x160.jpg"';
    $$out += '\r\n                                    class="img-circle"\r\n                                    alt="User Image"\r\n                                />\r\n\r\n                                <p>\r\n                                    Alexander Pierce - Web Developer\r\n                                    <small\r\n                                        >Member since Nov.\r\n                                        2012</small\r\n                                    >\r\n                                </p>\r\n                            </li>\r\n                            <!-- Menu Body -->\r\n                            <li class="user-body">\r\n                                <div class="row">\r\n                                    <div\r\n                                        class="col-xs-4 text-center"\r\n                                    >\r\n                                        <a href="#">Followers</a>\r\n                                    </div>\r\n                                    <div\r\n                                        class="col-xs-4 text-center"\r\n                                    >\r\n                                        <a href="#">Sales</a>\r\n                                    </div>\r\n                                    <div\r\n                                        class="col-xs-4 text-center"\r\n                                    >\r\n                                        <a href="#">Friends</a>\r\n                                    </div>\r\n                                </div>\r\n                                <!-- /.row -->\r\n                            </li>\r\n                            <!-- Menu Footer-->\r\n                            <li class="user-footer">\r\n                                <div class="pull-left">\r\n                                    <a\r\n                                        href="#"\r\n                                        class="btn btn-default btn-flat"\r\n                                        >Profile</a\r\n                                    >\r\n                                </div>\r\n                                <div class="pull-right">\r\n                                    <a\r\n                                        href="#"\r\n                                        class="btn btn-default btn-flat"\r\n                                        >Sign out</a\r\n                                    >\r\n                                </div>\r\n                            </li>\r\n                        </ul>\r\n                    </li>\r\n                    <!-- Control Sidebar Toggle Button -->\r\n                    <li>\r\n                        <a href="#" data-toggle="control-sidebar"\r\n                            ><i class="fa fa-gears"></i\r\n                        ></a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </nav>\r\n    </header>\r\n    <!-- Left side column. contains the logo and sidebar -->\r\n    <aside class="main-sidebar">\r\n        <!-- sidebar: style can be found in sidebar.less -->\r\n        <section class="sidebar">\r\n            <!-- Sidebar user panel (optional) -->\r\n            <div class="user-panel">\r\n                <div class="pull-left image">\r\n                    <img\r\n                        ';
    $$out += 'src="http://adminlte.xueyao.org/dist/img/user2-160x160.jpg"';
    $$out += '\r\n                        class="img-circle"\r\n                        alt="User Image"\r\n                    />\r\n                </div>\r\n                <div class="pull-left info">\r\n                    <p>Alexander Pierce</p>\r\n                    <!-- Status -->\r\n                    <a href="#"\r\n                        ><i class="fa fa-circle text-success"></i>\r\n                        Online</a\r\n                    >\r\n                </div>\r\n            </div>\r\n\r\n            <!-- search form (Optional) -->\r\n            <form action="#" method="get" class="sidebar-form">\r\n                <div class="input-group">\r\n                    <input\r\n                        type="text"\r\n                        name="q"\r\n                        class="form-control"\r\n                        placeholder="Search..."\r\n                    />\r\n                    <span class="input-group-btn">\r\n                        <button\r\n                            type="submit"\r\n                            name="search"\r\n                            id="search-btn"\r\n                            class="btn btn-flat"\r\n                        >\r\n                            <i class="fa fa-search"></i>\r\n                        </button>\r\n                    </span>\r\n                </div>\r\n            </form>\r\n            <!-- /.search form -->\r\n\r\n            <!-- Sidebar Menu -->\r\n            <ul class="sidebar-menu">\r\n                <li class="header">HEADER</li>\r\n                <!-- Optionally, you can add icons to the links -->\r\n                <li class="active">\r\n                    <a href="#"\r\n                        ><i class="fa fa-link"></i>\r\n                        <span>Link</span></a\r\n                    >\r\n                </li>\r\n                <li>\r\n                    <a href="#"\r\n                        ><i class="fa fa-link"></i>\r\n                        <span>Another Link</span></a\r\n                    >\r\n                </li>\r\n                <li class="treeview">\r\n                    <a href="#"\r\n                        ><i class="fa fa-link"></i>\r\n                        <span>Multilevel</span>\r\n                        <span class="pull-right-container">\r\n                            <i\r\n                                class="fa fa-angle-left pull-right"\r\n                            ></i>\r\n                        </span>\r\n                    </a>\r\n                    <ul class="treeview-menu">\r\n                        <li><a href="#">Link in level 2</a></li>\r\n                        <li><a href="#">Link in level 2</a></li>\r\n                    </ul>\r\n                </li>\r\n            </ul>\r\n            <!-- /.sidebar-menu -->\r\n        </section>\r\n        <!-- /.sidebar -->\r\n    </aside>\r\n\r\n    <!-- Content Wrapper. Contains page content -->\r\n    <div class="content-wrapper">\r\n        <!-- Content Header (Page header) -->\r\n        <section class="content-header">\r\n            <h1>\r\n                Page Header\r\n                <small>Optional description</small>\r\n            </h1>\r\n            <ol class="breadcrumb">\r\n                <li>\r\n                    <a href="#"\r\n                        ><i class="fa fa-dashboard"></i> Level</a\r\n                    >\r\n                </li>\r\n                <li class="active">Here</li>\r\n            </ol>\r\n        </section>\r\n\r\n        <!-- Main content -->\r\n        <section class="content">\r\n            <!-- Your Page Content Here -->\r\n        </section>\r\n        <!-- /.content -->\r\n    </div>\r\n    <!-- /.content-wrapper -->\r\n\r\n    <!-- Main Footer -->\r\n    <footer class="main-footer">\r\n        <!-- To the right -->\r\n        <div class="pull-right hidden-xs">Anything you want</div>\r\n        <!-- Default to the left -->\r\n        <strong\r\n            >Copyright &copy; 2016 <a href="#">Company</a>.</strong\r\n        >\r\n        All rights reserved.\r\n    </footer>\r\n\r\n    <!-- Control Sidebar -->\r\n    <aside class="control-sidebar control-sidebar-dark">\r\n        <!-- Create the tabs -->\r\n        <ul class="nav nav-tabs nav-justified control-sidebar-tabs">\r\n            <li class="active">\r\n                <a\r\n                    href="#control-sidebar-home-tab"\r\n                    data-toggle="tab"\r\n                    ><i class="fa fa-home"></i\r\n                ></a>\r\n            </li>\r\n            <li>\r\n                <a\r\n                    href="#control-sidebar-settings-tab"\r\n                    data-toggle="tab"\r\n                    ><i class="fa fa-gears"></i\r\n                ></a>\r\n            </li>\r\n        </ul>\r\n        <!-- Tab panes -->\r\n        <div class="tab-content">\r\n            <!-- Home tab content -->\r\n            <div\r\n                class="tab-pane active"\r\n                id="control-sidebar-home-tab"\r\n            >\r\n                <h3 class="control-sidebar-heading">最近的活动</h3>\r\n                <ul class="control-sidebar-menu">\r\n                    <li>\r\n                        <a href="javascript::;">\r\n                            <i\r\n                                class="menu-icon fa fa-birthday-cake bg-red"\r\n                            ></i>\r\n\r\n                            <div class="menu-info">\r\n                                <h4\r\n                                    class="control-sidebar-subheading"\r\n                                >\r\n                                    流体石头生日\r\n                                </h4>\r\n\r\n                                <p>10.02</p>\r\n                            </div>\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n                <!-- /.control-sidebar-menu -->\r\n\r\n                <h3 class="control-sidebar-heading">技能</h3>\r\n                <ul class="control-sidebar-menu">\r\n                    <li>\r\n                        <a href="javascript:;">\r\n                            <h4 class="control-sidebar-subheading">\r\n                                自定义模板的设计\r\n                                <span class="pull-right-container">\r\n                                    <span\r\n                                        class="label label-danger pull-right"\r\n                                        >70%</span\r\n                                    >\r\n                                </span>\r\n                            </h4>\r\n\r\n                            <div class="progress progress-xxs">\r\n                                <div\r\n                                    class="progress-bar progress-bar-danger"\r\n                                    style="width: 70%"\r\n                                ></div>\r\n                            </div>\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n                <!-- /.control-sidebar-menu -->\r\n            </div>\r\n            <!-- /.tab-pane -->\r\n            <!-- Stats tab content -->\r\n            <div class="tab-pane" id="control-sidebar-stats-tab">\r\n                Stats Tab Content\r\n            </div>\r\n            <!-- /.tab-pane -->\r\n            <!-- Settings tab content -->\r\n            <div class="tab-pane" id="control-sidebar-settings-tab">\r\n                <form method="post">\r\n                    <h3 class="control-sidebar-heading">\r\n                        常规设置\r\n                    </h3>\r\n\r\n                    <div class="form-group">\r\n                        <label class="control-sidebar-subheading">\r\n                            Report panel usage\r\n                            <input\r\n                                type="checkbox"\r\n                                class="pull-right"\r\n                                checked\r\n                            />\r\n                        </label>\r\n\r\n                        <p>\r\n                            Some information about this general\r\n                            settings option\r\n                        </p>\r\n                    </div>\r\n                    <!-- /.form-group -->\r\n                </form>\r\n            </div>\r\n            <!-- /.tab-pane -->\r\n        </div>\r\n    </aside>\r\n    <div class="control-sidebar-bg"></div>\r\n</div>';
    return $$out;
};

/***/ })

/******/ });
//# sourceMappingURL=app.23eb22ba93b168eec86a.js.map