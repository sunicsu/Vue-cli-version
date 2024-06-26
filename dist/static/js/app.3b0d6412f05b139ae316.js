webpackJsonp([1], {
    "+skl": function (t, e) {
    }, "0ZWD": function (t, e) {
    }, "1GH5": function (t, e, i) {
        t.exports = i.p + "static/img/MerchantLogo3.3e0b9d1.png"
    }, "1VkH": function (t, e) {
    }, "1ZFm": function (t, e) {
    }, "7BSs": function (t, e) {
    }, "G/t0": function (t, e) {
    }, IiIG: function (t, e) {
    }, NHnr: function (t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var s = i("7+uW"), n = {
            render: function () {
                var t = this.$createElement, e = this._self._c || t;
                return e("div", {attrs: {id: "app"}}, [e("router-view")], 1)
            }, staticRenderFns: []
        };
        var a = i("VU/8")({name: "App"}, n, !1, function (t) {
            i("7BSs")
        }, null, null).exports, r = i("/ocq"), o = {
            render: function () {
                var t = this, e = t.$createElement, s = t._self._c || e;
                return s("div", {staticClass: "layout"}, [s("Layout", {style: {minHeight: "100vh"}}, [s("Sider", [s("div", {
                    staticStyle: {
                        width: "auto",
                        height: "64px"
                    }, attrs: {id: "logo"}
                }, [s("img", {
                    staticStyle: {height: "100%", width: "100%"},
                    attrs: {src: i("1GH5"), alt: "logo"}
                })]), t._v(" "), s("Menu", {
                    attrs: {
                        "active-name": "1-1",
                        theme: "dark",
                        width: "auto",
                        "open-names": ["1"]
                    }
                }, [s("Submenu", {attrs: {name: "1"}}, [s("template", {slot: "title"}, [s("Icon", {attrs: {type: "ios-analytics"}}), t._v("\n                            导航栏\n                    ")], 1), t._v(" "), s("MenuGroup", {attrs: {title: "餐厅管理"}}, [s("router-link", {attrs: {to: "/home/restaurantinfo"}}, [s("MenuItem", {attrs: {name: "1-1"}}, [t._v("餐厅信息")])], 1), t._v(" "), s("router-link", {attrs: {to: "/home/menu"}}, [s("MenuItem", {attrs: {name: "1-2"}}, [t._v("菜单管理")])], 1), t._v(" "), s("router-link", {attrs: {to: "/home/order"}}, [s("MenuItem", {attrs: {name: "1-3"}}, [t._v("订单管理")])], 1)], 1), t._v(" "), s("MenuGroup", {attrs: {title: "个人中心"}}, [s("router-link", {attrs: {to: "/home/generate_qrcode"}}, [s("MenuItem", {attrs: {name: "2-1"}}, [t._v("定制餐桌二维码")])], 1), t._v(" "), s("MenuItem", {attrs: {name: "2-2"}}, [t._v("设置")])], 1)], 2)], 1)], 1), t._v(" "), s("Layout", [s("Menu", {
                    staticStyle: {height: "65px"},
                    attrs: {mode: "horizontal", theme: t.theme1}
                }, [s("MenuItem", {
                    staticStyle: {float: "right"},
                    attrs: {name: "1"}
                }, [s("Avatar", {attrs: {src: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=123308412,2828093194&fm=58"}})], 1), t._v(" "), s("MenuItem", {
                    staticStyle: {float: "right"},
                    attrs: {name: "2"}
                }, [s("Badge", {attrs: {dot: ""}}, [s("Icon", {
                    attrs: {
                        type: "gear-b",
                        size: "26"
                    }
                })], 1)], 1), t._v(" "), s("MenuItem", {
                    staticStyle: {float: "right"},
                    attrs: {name: "2"}
                }, [s("Badge", {attrs: {count: "3"}}, [s("Icon", {
                    attrs: {
                        type: "email",
                        size: "26"
                    }
                })], 1)], 1)], 1), t._v(" "), s("router-view")], 1)], 1)], 1)
            }, staticRenderFns: []
        };
        var c = i("VU/8")({
            data: function () {
                return {theme1: "light"}
            }
        }, o, !1, function (t) {
            i("XwNe")
        }, "data-v-cbc44ff4", null).exports, d = {
            data: function () {
                return {username: "", password: ""}
            }, methods: {
                handleSubmit: function () {
                    var t = this;
                    if ("" == this.username || "" == this.password) alert("请输入用户名或密码"); else {
                        var e = this.$Message.loading({content: "正在提交数据进行验证，请耐心等待", duration: 0}), i = this;
                        this.axios.post("/api/boss/session", {
                            username: this.username,
                            password: this.password
                        }).then(function (s) {
                            setTimeout(e, 1), "200" == s.status ? (i.$Message.success("登录成功"), console.log(s), t.$router.push({
                                path: "home",
                                query: {id: 1}
                            })) : i.$Message.error("账号密码错误")
                        }).catch(function (t) {
                            setTimeout(e, 1), console.log("err: ", t), i.$Message.error("账号密码错误")
                        })
                    }
                }
            }
        }, l = {
            render: function () {
                var t = this, e = t.$createElement, i = t._self._c || e;
                return i("div", {staticClass: "layout"}, [i("div", {attrs: {id: "Sign-content"}}, [i("div", {attrs: {id: "sign-container"}}, [i("Tabs", {attrs: {value: "username"}}, [i("TabPane", {
                    attrs: {
                        label: "账户密码登录",
                        name: "username"
                    }
                }, [i("div", {staticClass: "Loginlabel-Name"}, [i("Input", {
                    attrs: {
                        id: "name-input",
                        placeholder: "用户名"
                    }, model: {
                        value: t.username, callback: function (e) {
                            t.username = e
                        }, expression: "username"
                    }
                }), t._v(" "), i("Input", {
                    attrs: {id: "password-input", type: "password", placeholder: "密码"},
                    model: {
                        value: t.password, callback: function (e) {
                            t.password = e
                        }, expression: "password"
                    }
                }), t._v(" "), i("Button", {
                    staticClass: "Login-button",
                    attrs: {type: "primary"},
                    on: {
                        click: function (e) {
                            t.handleSubmit()
                        }
                    }
                }, [t._v("登录")]), t._v(" "), i("p", {
                    staticClass: "rightbutton",
                    attrs: {id: "Sign-button", type: "text"}
                }, [t._v("注册账户")])], 1)]), t._v(" "), i("TabPane", {
                    attrs: {
                        label: "手机号登录",
                        name: "userphone"
                    }
                }, [i("div", {staticClass: "Signlabel-Phone"}, [i("Input", {
                    attrs: {
                        id: "phone-input",
                        placeholder: "手机号"
                    }
                }), t._v(" "), i("Input", {
                    staticClass: "vertificate-input",
                    attrs: {placeholder: "验证码"}
                }), t._v(" "), i("Button", {attrs: {id: "Getvertific-button"}}, [t._v("获取验证码")]), t._v(" "), i("Checkbox", {
                    attrs: {
                        size: "large",
                        id: "Autosign-checkbox"
                    }
                }, [t._v("自动登录")]), t._v(" "), i("p", {
                    staticClass: "rightbutton",
                    attrs: {id: "forget-button2", type: "text"}
                }, [t._v("忘记密码")]), t._v(" "), i("Button", {
                    staticClass: "Login-button",
                    attrs: {type: "primary"}
                }, [t._v("登录")]), t._v(" "), i("p", {
                    staticClass: "rightbutton",
                    attrs: {id: "Sign-button", type: "text"}
                }, [t._v("注册账户")])], 1)])], 1)], 1)]), t._v(" "), t._m(0)])
            }, staticRenderFns: [function () {
                var t = this.$createElement, e = this._self._c || t;
                return e("div", {attrs: {id: "Sign-footer"}}, [e("div", {staticClass: "SomeLinks"}, [e("a", {attrs: {href: "www.baidu.com"}}, [this._v("帮助")]), this._v(" "), e("a", {attrs: {href: "www.baidu.com"}}, [this._v("隐私")]), this._v(" "), e("a", {attrs: {href: "www.baidu.com"}}, [this._v("条款")])]), this._v(" "), e("div", {staticClass: "Team"}, [e("a", [this._v("copyright © ChickenDinner8出品")])])])
            }]
        };
        var h = i("VU/8")(d, l, !1, function (t) {
            i("1ZFm")
        }, null, null).exports, u = {
            render: function () {
                var t = this.$createElement, e = this._self._c || t;
                return e("Content", {style: {padding: "0 16px 16px"}}, [e("Breadcrumb", {style: {margin: "16px 0"}}, [e("BreadcrumbItem", [this._v("主页")]), this._v(" "), e("BreadcrumbItem", [this._v("餐厅信息")])], 1), this._v(" "), e("Card", [e("div", {staticStyle: {height: "1000px"}}, [e("h2", [this._v("餐厅信息")])])])], 1)
            }, staticRenderFns: []
        }, p = i("VU/8")(null, u, !1, null, null, null).exports, m = {
            data: function () {
                return {upload_finished: !1}
            },
            props: ["srcdishname", "srcdescription", "srcdishprice", "srcimage", 'srcdishcode', 'getSelectedCategoryName', 'getSelectedNewSpec', 'getSelectedNewUnit', 'getSelectedNewStatus'],
            methods: {
                DeliverData: function () {
                    var t = {
                        EditedName: this.srcdishname,
                        EditedDescription: this.srcdescription,
                        EditedPrice: this.srcdishprice,
                        EditedImage: this.srcimage,
                        EditedCode: this.srcdishcode,
                        EditedCategory: this.getSelectedCategoryName,
                        EditedNewSpec: this.getSelectedNewSpec,
                        EditedNewUnit: this.getSelectedNewUnit,
                        EditedNewStatus: this.getSelectedNewStatus
                    };
                    this.$emit("UpdateDish", t)
                }, handleSuccess: function (t, e) {
                    console.log(t), console.log(e), this.srcimage = "http://" + t.url, this.upload_finished = !0, this.DeliverData(), console.log(this.srcimage)
                }, reset: function () {
                    this.$refs.upload.clearFiles()
                }
            }
        }, v = {
            render: function () {
                var t = this, e = t.$createElement, i = t._self._c || e;
                return i("div", [i("Row", {attrs: {span: "24"}}, [i("Col", {attrs: {span: "8"}}, [i("div", {attrs: {id: "photo"}}, [i("img", {
                    staticStyle: {
                        height: "100%",
                        width: "100%"
                    }, attrs: {src: t.srcimage}
                })]), t._v(" "), i("br"), i("br"), t._v(" "), i("Upload", {
                    ref: "upload",
                    staticStyle: {float: "right", "margin-right": "24px"},
                    attrs: {
                        action: "/api/upload_image",
                        "on-success": t.handleSuccess,
                        name: "image",
                        "before-upload": t.reset
                    }
                }, [i("Tooltip", {
                    attrs: {
                        content: "图片名称不能包含中文字符",
                        placement: "left"
                    }
                }, [i("Button", {
                    attrs: {
                        type: "ghost",
                        icon: "ios-cloud-upload-outline"
                    }
                }, [t._v("上传图片")])], 1)], 1)], 1), t._v(" "), i("Col", {attrs: {span: "16"}}, [i("p", {staticStyle: {float: "left"}}, [t._v("菜品名称")]), t._v(" "), i("br"), i("br"), t._v(" "), i("Tooltip", {
                    attrs: {
                        content: "菜品名称不能包含中文字符",
                        placement: "right-start"
                    }
                }, [i("Input", {
                    attrs: {placeholder: "请输入菜名...", autofocus: !0},
                    on: {"on-change": t.DeliverData},
                    model: {
                        value: t.srcdishname, callback: function (e) {
                            t.srcdishname = e
                        }, expression: "srcdishname"
                    }
                })], 1), t._v(" "), i("p", [t._v("菜品描述")]), t._v(" "), i("Tooltip", {
                    attrs: {
                        content: "菜品描述不能包含中文字符",
                        placement: "right-start"
                    }
                }, [i("Input", {
                    attrs: {placeholder: "请输入描述...", autofocus: !0, type: "textarea", rows: 5},
                    on: {"on-change": t.DeliverData},
                    model: {
                        value: t.srcdescription, callback: function (e) {
                            t.srcdescription = e
                        }, expression: "srcdescription"
                    }
                })], 1), t._v(" "), i("p", [t._v("定价")]), t._v(" "), i("Tooltip", {
                    attrs: {
                        content: "请输入数字",
                        placement: "right-start"
                    }
                }, [i("Input", {
                    attrs: {placeholder: "请输入...", autofocus: !0},
                    on: {"on-change": t.DeliverData},
                    model: {
                        value: t.srcdishprice, callback: function (e) {
                            t.srcdishprice = e
                        }, expression: "srcdishprice"
                    }
                })], 1)], 1)], 1)], 1)
            }, staticRenderFns: []
        };
        var f = {
            data: function () {
                return {
                    modal1: !1,
                    modal2: !1,
                    tempname: "",
                    tempdescription: "",
                    tempprice: "",
                    tempimage: "",
                    tempCode: '',
                    tempCategoryName: '',
                    tempNewSpec: '',
                    tempNewUnit: '',
                    tempNewStatus: '',
                    change: !1
                }
            },
            methods: {
                ok: function () {
                    var t = this;
                    1 == this.change && ("" == this.tempname ? this.$Modal.warning({
                        title: "菜品名称不能为空",
                        content: "请输入菜品名称"
                    }) : "" == this.tempdescription ? this.$Modal.warning({
                        title: "菜品描述不能为空",
                        content: "请输入菜品描述"
                    }) : "" == this.tempprice ? this.$Modal.warning({
                        title: "菜品价格不能为空",
                        content: "请输入菜品价格"
                    }) : "" == this.tempimage ? this.$Modal.warning({
                        title: "菜品图片不能为空",
                        content: "请上传菜品图片"
                    }) : "" == this.tempCode ? this.$Modal.warning({
                            title: "菜品编码不能为空",
                            content: "请填写编码，类别首字全拼加数字，且首字母大写，数字为该类菜品所加的第几个，如Rou1"
                    }) : "" == this.tempCategoryName ? this.$Modal.warning({
                            title: "菜品类别不能为空",
                            content: "请选择类别"
                    }) : "" == this.tempNewSpec ? this.$Modal.warning({
                            title: "菜品规格不能为空",
                            content: "请选择规格"
                    }) : "" == this.tempNewUnit ? this.$Modal.warning({
                            title: "份数不能为空",
                            content: "请选择份数"
                    }) : "" == this.tempNewStatus ? this.$Modal.warning({
                            title: "状态不能为空",
                            content: "请选择状态"
                    })
                        : this.$Modal.confirm({
                        title: "确认修改", content: "确认对菜品信息进行修改？", loading: !0, onOk: function () {
                            var e = t;
                            t.axios.put("api/food/4/" + t.dishid, {
                                food_name: e.tempname,
                                description: e.tempdescription,
                                price: e.tempprice,
                                image: e.tempimage,
                                newSpec: e.tempNewSpec,
                                categoryName: e.tempCategoryName,
                                newStatus: e.tempNewStatus,
                                newunit: e.tempNewUnit,
                                newCode: e.tempCode,
                                priority: 1
                            }).then(function (t) {
                                e.$Modal.remove(), e.$Message.success("修改成功！"), console.log(t), e.dishname = e.tempname, e.description = e.tempdescription, e.price = e.tempprice, e.image = e.tempimage
                            }).catch(function (t) {
                                e.$Modal.remove(), e.$Message.error("修改失败！"), console.log(t)
                            })
                        }
                    })), this.change = !1
                }, cancel: function () {
                    this.$refs.editwin.reset()
                }, Refresh: function (t) {
                    this.tempname = t.EditedName, this.tempdescription = t.EditedDescription, this.tempprice = t.EditedPrice, this.tempimage = t.EditedImage, this.change = !0
                }
            },
            props: ["dishname", "description", "price", "dishid", "image"],
            components: {
                Editwindow: i("VU/8")(m, v, !1, function (t) {
                    i("1VkH")
                }, null, null).exports
            }
        }, g = {
            render: function () {
                var t = this, e = t.$createElement, i = t._self._c || e;
                return i("Card", {
                    staticClass: "dishes",
                    attrs: {bordered: !1}
                }, [i("Row", [i("Col", {attrs: {span: "4"}}, [i("div", {attrs: {id: "photo-list"}}, [i("img", {
                    staticStyle: {
                        height: "100%",
                        width: "100%"
                    }, attrs: {src: t.image}
                })])]), t._v(" "), i("Col", {attrs: {span: "8"}}, [i("p", [t._v(t._s(t.dishname))]), t._v(" "), i("p", [t._v(t._s(t.description))])]), t._v(" "), i("Col", {attrs: {span: "3"}}, [i("p", [t._v("价格：")]), t._v(" "), i("p", [t._v(t._s(t.price))])]), t._v(" "), i("Col", {attrs: {span: "3"}}, [i("p", [t._v("月销量：")]), t._v(" "), i("p", [t._v("----------")])])], 1), t._v(" "), i("ButtonGroup", {
                    staticStyle: {float: "right"},
                    attrs: {id: "buttongroup"}
                }, [i("Button", {
                    attrs: {type: "primary"}, on: {
                        click: function (e) {
                            t.modal1 = !0
                        }
                    }
                }, [t._v("修改")]), t._v(" "), i("Button", {
                    on: {
                        click: function (e) {
                            t.$emit("remove")
                        }
                    }
                }, [t._v("删除")]), t._v(" "), i("Modal", {
                    attrs: {width: "700", "mask-closable": !1, closable: !1},
                    on: {"on-ok": t.ok, "on-cancel": t.cancel},
                    model: {
                        value: t.modal1, callback: function (e) {
                            t.modal1 = e
                        }, expression: "modal1"
                    }
                }, [i("h2", {
                    attrs: {slot: "header"},
                    slot: "header"
                }, [t._v("添加菜品")]), t._v(" "), i("Editwindow", {
                    ref: "editwin",
                    attrs: {
                        srcdescription: this.description,
                        srcdishname: this.dishname,
                        srcimage: this.image,
                        srcdishprice: this.price,
                        srcdishcode: this.newCode,
                        getSelectedCategoryName: this.categoryName,
                        getSelectedNewSpec: this.newSpec,
                        getSelectedNewUnit: this.newUnit,
                        getSelectedNewStatus: this.newStatus,
                    },
                    on: {UpdateDish: t.Refresh}
                })], 1), t._v(" "), i("Modal", {
                    model: {
                        value: t.modal2, callback: function (e) {
                            t.modal2 = e
                        }, expression: "modal2"
                    }
                }, [i("Input")], 1)], 1), t._v(" "), i("hr", {staticStyle: {"margin-top": "20px"}})], 1)
            }, staticRenderFns: []
        };
        var _ = {
            data: function () {
                return {image_url: "", upload_finished: !1, srcdishname: "", srcdescription: "", srcdishprice: ""}
            }, methods: {
                DeliverData: function () {
                    var t = {
                        EditedName: this.srcdishname,
                        EditedDescription: this.srcdescription,
                        EditedPrice: this.srcdishprice,
                        EditedImage: this.image_url,
                        EditedCode: this.srcdishcode,
                        EditedCategory: this.getSelectedCategoryName,
                        EditedNewSpec: this.getSelectedNewSpec,
                        EditedNewUnit: this.getSelectedNewUnit,
                        EditedNewStatus: this.getSelectedNewStatus,
                    };
                    this.$emit("AddNewDish", t)
                }, handleSuccess: function (t, e) {
                    console.log(t), console.log(e), this.image_url = "http://" + t.url, this.upload_finished = !0, this.DeliverData(), this.$refs.upload.clearFiles()
                }, reset: function () {
                    this.upload_finished = !1, this.$refs.upload.clearFiles(), this.image_url = "", this.srcdishprice = "", this.srcdescription = "", this.srcdishname = ""
                }
            }
        }, b = {
            render: function () {
                var t = this, e = t.$createElement, i = t._self._c || e;
                return i("div", [i("Row", {attrs: {span: "24"}}, [i("Col", {attrs: {span: "8"}}, [1 == t.upload_finished ? i("div", {attrs: {id: "photo"}}, [i("img", {
                    staticStyle: {
                        height: "100%",
                        width: "100%"
                    }, attrs: {src: this.image_url}
                })]) : t._e(), t._v(" "), i("br"), i("br"), t._v(" "), i("Upload", {
                    ref: "upload",
                    staticStyle: {float: "right", "margin-right": "24px"},
                    attrs: {action: "/api/upload_image", "on-success": t.handleSuccess, name: "image"}
                }, [i("Tooltip", {
                    attrs: {
                        content: "图片名称不能包含中文字符",
                        placement: "left"
                    }
                }, [i("Button", {
                    attrs: {
                        type: "ghost",
                        icon: "ios-cloud-upload-outline"
                    }
                }, [t._v("上传图片")])], 1)], 1)], 1), t._v(" "), i("Col", {attrs: {span: "16"}}, [i("div", [i("p", {staticStyle: {float: "left"}}, [t._v("菜品名称")]), t._v(" "), i("br"), i("br"), t._v(" "), i("Tooltip", {
                    attrs: {
                        content: "菜品名称不能包含中文字符",
                        placement: "right-start"
                    }
                }, [i("Input", {
                    attrs: {placeholder: "请输入菜名...", autofocus: !0},
                    on: {"on-change": t.DeliverData},
                    model: {
                        value: t.srcdishname, callback: function (e) {
                            t.srcdishname = e
                        }, expression: "srcdishname"
                    }
                })], 1)], 1), t._v(" "), i("p", {staticStyle: {float: "left"}}, [t._v("菜品描述")]), t._v(" "), i("br"), i("br"), t._v(" "), i("Tooltip", {
                    attrs: {
                        content: "菜品描述不能包含中文字符",
                        placement: "right-start"
                    }
                }, [i("Input", {
                    attrs: {placeholder: "请输入菜品描述...", autofocus: !0, type: "textarea", rows: 5},
                    on: {"on-change": t.DeliverData},
                    model: {
                        value: t.srcdescription, callback: function (e) {
                            t.srcdescription = e
                        }, expression: "srcdescription"
                    }
                })], 1), t._v(" "), i("p", [t._v("定价")]), t._v(" "), i("Tooltip", {
                    attrs: {
                        content: "请输入数字",
                        placement: "right-start"
                    }
                }, [i("Input", {
                    attrs: {placeholder: "请输入菜品定价...", autofocus: !0},
                    on: {"on-change": t.DeliverData},
                    model: {
                        value: t.srcdishprice, callback: function (e) {
                            t.srcdishprice = e
                        }, expression: "srcdishprice"
                    }
                })], 1)], 1)], 1)], 1)
            }, staticRenderFns: []
        };
        var w = {
            data: function () {
                return {
                    newname: "",
                    newdes: "",
                    newprice: "",
                    newimage: "",
                    modal: !1,
                    alldishes: [],
                    dishes: [],
                    newpage: 1
                }
            }, components: {
                Dish: i("VU/8")(f, g, !1, function (t) {
                    i("G/t0")
                }, "data-v-df41ed98", null).exports, Addwindow: i("VU/8")(_, b, !1, function (t) {
                    i("bGGX")
                }, null, null).exports
            }, methods: {
                addNewDish: function () {
                    var t = this;
                    "" == this.newname ? (this.$Modal.warning({
                        title: "菜品名称不能为空",
                        content: "请输入菜品名称"
                    }), this.cancel()) : "" == this.newdes ? (this.$Modal.warning({
                        title: "菜品描述不能为空",
                        content: "请输入菜品描述"
                    }), this.cancel()) : "" == this.newprice ? (this.$Modal.warning({
                        title: "菜品价格不能为空",
                        content: "请输入菜品价格"
                    }), this.cancel()) : "" == this.newimage ? (this.$Modal.warning({
                        title: "菜品图片不能为空",
                        content: "请上传菜品图片"
                    }), this.cancel()) : this.$Modal.confirm({
                        title: "确认添加",
                        content: "是否确认添加菜品？",
                        loading: !0,
                        onOk: function () {
                            var e = t;
                            console.log(t.newimage), t.axios.post("/api/food/4", {
                                food_name: e.newname,
                                description: e.newdes,
                                price: e.newprice,
                                image: e.newimage,
                                priority: 1
                            }).then(function (t) {
                                e.$Modal.remove(), console.log(t), e.$Message.success("添加成功！"), e.RefreshList(e.newpage), e.$refs.addwin.reset()
                            }).catch(function (t) {
                                e.$Modal.remove(), e.$Message.error("添加失败！"), console.log(t)
                            })
                        }
                    }), this.$refs.addwin.reset()
                }, Refresh: function (t) {
                    this.newname = t.EditedName, this.newdes = t.EditedDescription, this.newprice = t.EditedPrice, this.newimage = t.EditedImage
                }, RefreshList: function (t) {
                    var e = this.$Message.loading({content: "正在获取菜单数据，请耐心等待", duration: 0}), i = this;
                    this.axios.get("/api/menu/4").then(function (s) {
                        if (console.log(s.data.foods), setTimeout(e, 1), "200" == s.status) {
                            i.alldishes = s.data.foods, console.log(i.alldishes), i.dishes.splice(0, i.dishes.length);
                            var n = i.alldishes.length;
                            n < 5 * (t - 1) || (n - 5 * (t - 1) > 5 ? (i.dishes = i.alldishes.reverse().slice(5 * (t - 1), 5 * t), i.alldishes.reverse()) : (i.dishes = i.alldishes.reverse().slice(5 * (t - 1)), i.alldishes.reverse()))
                        }
                    }).catch(function (t) {
                        setTimeout(e, 1), console.log(t)
                    })
                }, ChangePage: function (t) {
                    this.newpage = t, this.RefreshList(t)
                }, cancel: function () {
                    this.$refs.addwin.reset(), this.newname = "", this.newdes = "", this.newprice = "", this.newimage = ""
                }, DeleteDish: function (t) {
                    var e = this;
                    this.$Modal.confirm({
                        title: "确认删除", content: "是否确认删除该菜品？", loading: !0, onOk: function () {
                            var i = e;
                            e.axios.delete("api/food/4/" + t, {}).then(function (t) {
                                console.log(t), i.$Modal.remove(), i.$Message.success("删除成功！"), i.RefreshList(i.newpage)
                            }).catch(function (t) {
                                i.$Modal.remove(), i.$Message.error("删除失败！"), console.log(t)
                            })
                        }
                    })
                }
            }, mounted: function () {
                this.$nextTick(function () {
                    this.RefreshList(1)
                })
            }
        }, y = {
            render: function () {
                var t = this, e = t.$createElement, i = t._self._c || e;
                return i("Content", {style: {padding: "0 16px 16px"}}, [i("Breadcrumb", {style: {margin: "16px 0"}}, [i("BreadcrumbItem", [t._v("主页")]), t._v(" "), i("BreadcrumbItem", [t._v("菜单管理")])], 1), t._v(" "), i("Card", [i("div", {staticStyle: {height: "1000px"}}, [i("h2", {staticStyle: {color: "#80848f"}}, [t._v("菜单")]), t._v(" "), i("br"), i("br"), t._v(" "), i("Button", {
                    attrs: {
                        id: "addbutton",
                        type: "dashed",
                        icon: "plus"
                    }, on: {
                        click: function (e) {
                            t.modal = !0
                        }
                    }
                }, [t._v("添加菜品")]), t._v(" "), i("Modal", {
                    attrs: {width: "720", "mask-closable": !1, closable: !1},
                    on: {"on-ok": t.addNewDish, "on-cancel": t.cancel},
                    model: {
                        value: t.modal, callback: function (e) {
                            t.modal = e
                        }, expression: "modal"
                    }
                }, [i("h2", {
                    attrs: {slot: "header"},
                    slot: "header"
                }, [t._v("添加菜品")]), t._v(" "), i("Addwindow", {
                    ref: "addwin",
                    on: {AddNewDish: t.Refresh}
                })], 1), t._v(" "), t._l(t.dishes, function (e) {
                    return i("Dish", {
                        key: e.food_id,
                        staticStyle: {width: "90%"},
                        attrs: {
                            dishid: e.food_id,
                            dishname: e.food_name,
                            description: e.description,
                            price: e.price,
                            image: e.image,
                            newCode: e.newCode,
                            categoryName:e.categoryName,
                            newSpec: e.newSpec,
                            newUnit: e.newUnit,
                            newStatus:e.newStatus,
                        },
                        on: {
                            remove: function (i) {
                                t.DeleteDish(e.food_id)
                            }
                        }
                    })
                })], 2), t._v(" "), i("div", {attrs: {id: "pages"}}, [i("Page", {
                    attrs: {
                        total: 100,
                        "show-elevator": "",
                        "show-sizer": ""
                    }, on: {"on-change": t.ChangePage}
                })], 1)])], 1)
            }, staticRenderFns: []
        };
        var x = i("VU/8")(w, y, !1, function (t) {
            i("a9WY")
        }, "data-v-5eec7c90", null).exports, k = {
            data: function () {
                var t = this;
                return {
                    timeout: !0,
                    orderHeader: [{title: "订单编号", key: "order_id"}, {title: "桌号", key: "table_id"}, {
                        title: "总价",
                        key: "total_price"
                    }, {
                        title: "点餐时间", key: "order_time_format", render: function (t, e) {
                            var i = new Date(e.row.order_time);
                            return t("span", "\n                            " + i.getFullYear() + "-" + i.getMonth().toString().padStart(2, "0") + "-" + i.getDate().toString().padStart(2, "0") + " \n                            " + i.getHours().toString().padStart(2, "0") + ":" + i.getMinutes().toString().padStart(2, "0") + ":" + i.getSeconds().toString().padStart(2, "0") + "\n                        ")
                        }
                    }, {
                        title: "操作", key: "action", render: function (e, i) {
                            return e("div", [e("Button", {
                                props: {type: "primary", size: "small"},
                                style: {marginRight: "5px"},
                                on: {
                                    click: function () {
                                        t.showDetailModal(i.index)
                                    }
                                }
                            }, "查看")])
                        }
                    }],
                    orderItems: []
                }
            }, methods: {
                showDetailModal: function (t) {
                    var e = this;
                    this.$Modal.info({
                        width: "600px", title: "订单内容", render: function (i) {
                            return i("div", [i("div", {
                                style: {
                                    padding: "12px 0",
                                    fontSize: "14px"
                                }
                            }, [i("p", {
                                style: {
                                    display: "inline-block",
                                    padding: "0 12px"
                                }
                            }, "订单号：" + e.orderItems[t].order_id), i("p", {
                                style: {
                                    display: "inline-block",
                                    padding: "0 12px"
                                }
                            }, "桌号：" + e.orderItems[t].table_id), i("p", {
                                style: {
                                    display: "inline-block",
                                    padding: "0 12px"
                                }
                            }, "总价：" + e.orderItems[t].total_price)]), i("Table", {
                                props: {
                                    size: "default",
                                    columns: [{
                                        title: "菜名", key: "food_name", render: function (t, e) {
                                            return t("span", e.row.food.food_name)
                                        }
                                    }, {
                                        title: "描述", key: "description", render: function (t, e) {
                                            return t("span", e.row.food.description)
                                        }
                                    }, {
                                        title: "单价", key: "price", render: function (t, e) {
                                            return t("span", e.row.food.price)
                                        }
                                    }, {title: "数量", key: "num"}],
                                    data: e.orderItems[t].detail
                                }, on: {
                                    input: function (t) {
                                        e.value = t
                                    }
                                }
                            })])
                        }
                    })
                }, updateData: function () {
                    var t = this;
                    this.axios.get("/api/restaurant/orders/4").then(function (e) {
                        "200" == e.status ? (console.log(e), t.$set(t, "orderItems", e.data)) : console.log("获取订单失败")
                    }).catch(function (t) {
                        console.log("err: ", t), "400" == t.status && console.log("获取订单失败")
                    }), this.timeout && setTimeout(this.updateData.bind(this), 1e4)
                }
            }, created: function () {
                console.log("order created"), this.timeout = !0, this.updateData()
            }, destroyed: function () {
                this.timeout = !1
            }
        }, $ = {
            render: function () {
                var t = this, e = t.$createElement, i = t._self._c || e;
                return i("Content", {style: {padding: "0 16px 16px"}}, [i("Breadcrumb", {style: {margin: "16px 0"}}, [i("BreadcrumbItem", [t._v("主页")]), t._v(" "), i("BreadcrumbItem", [t._v("订单管理")])], 1), t._v(" "), i("div", {staticClass: "main-wrapper"}, [i("h1", [t._v(" 订单 ")]), t._v(" "), i("div", {staticClass: "table-wrapper"}, [i("Table", {
                    attrs: {
                        stripe: "",
                        size: "large",
                        columns: t.orderHeader,
                        data: t.orderItems
                    }
                }), t._v(" "), 0 === t.orderItems.length ? i("h3", [t._v("正在获取订单数据，请耐心等待...")]) : t._e()], 1)])], 1)
            }, staticRenderFns: []
        };
        var M = i("VU/8")(k, $, !1, function (t) {
            i("0ZWD")
        }, "data-v-764a92ea", null).exports, I = i("mvHQ"), S = i.n(I), D = i("LqYc"), C = i.n(D), E = {
            data: function () {
                return {tableid: 1, qrcode: "", result: 1}
            }, methods: {
                UpdateCode: function () {
                    var t = {restaurantId: 4, tableId: this.tableid};
                    this.qrcode.makeCode(S()(t)), console.log(qrcode)
                }, generate_qrcode: function () {
                    this.UpdateCode(), this.result = this.tableid, this.$Message.config({duration: 2}), this.$Message.success("生成二维码成功，餐桌编号为" + this.result), this.tableid = ""
                }
            }, mounted: function () {
                this.qrcode = new C.a("qrcode", {width: 200, height: 200, text: S()({restaurantId: 4, tableId: 1})})
            }
        }, B = {
            render: function () {
                var t = this, e = t.$createElement, i = t._self._c || e;
                return i("Content", {style: {padding: "0 16px 16px"}}, [i("Breadcrumb", {style: {margin: "16px 0"}}, [i("BreadcrumbItem", [t._v("主页")]), t._v(" "), i("BreadcrumbItem", [t._v("定制餐桌二维码")])], 1), t._v(" "), i("Card", [i("div", {staticStyle: {height: "1000px"}}, [i("h2", {staticStyle: {color: "#80848f"}}, [t._v("定制餐桌二维码")]), t._v(" "), i("h2", {attrs: {id: "tableid"}}, [t._v("餐桌编号：" + t._s(t.result))]), t._v(" "), i("br"), i("br"), t._v(" "), i("div", {attrs: {id: "qrcode"}}), t._v(" "), i("br"), i("br"), t._v(" "), i("h3", {
                    staticStyle: {color: "#9ea7b4"},
                    attrs: {id: "notice"}
                }, [t._v("输入餐桌编号，点击确定即可生成相应二维码")]), t._v(" "), i("br"), i("br"), t._v(" "), i("InputNumber", {
                    attrs: {
                        min: 1,
                        id: "input"
                    }, model: {
                        value: t.tableid, callback: function (e) {
                            t.tableid = e
                        }, expression: "tableid"
                    }
                }), t._v(" "), i("Button", {
                    attrs: {type: "ghost", shape: "circle"},
                    on: {click: t.generate_qrcode}
                }, [t._v("确定")])], 1)])], 1)
            }, staticRenderFns: []
        };
        var R = i("VU/8")(E, B, !1, function (t) {
            i("IiIG")
        }, "data-v-23b14149", null).exports;
        s.default.use(r.a);
        var T = new r.a({
            routes: [{path: "/", name: "Login", component: h}, {
                path: "/home",
                component: c,
                children: [{path: "restaurantinfo", component: p}, {
                    path: "menu",
                    component: x
                }, {path: "generate_qrcode", component: R}, {path: "order", component: M}]
            }, {path: "/", redirect: "/home"}]
        }), U = i("mtWM"), F = i.n(U), N = i("Rf8U"), q = i.n(N), G = i("BTaQ"), L = i.n(G);
        i("+skl");
        s.default.use(L.a), s.default.use(q.a, F.a), s.default.config.productionTip = !1, new s.default({
            el: "#app",
            router: T,
            components: {App: a},
            template: "<App/>"
        })
    }, XwNe: function (t, e) {
    }, a9WY: function (t, e) {
    }, bGGX: function (t, e) {
    }
}, ["NHnr"]);
//# sourceMappingURL=app.3b0d6412f05b139ae316.js.map