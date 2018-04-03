var express = require('express');
var router = express.Router();

var usermodel = require('../models/usermodel');

// 用户首页面
router.get('/', function (req, res, next) {
  usermodel.getNewChanPin(function (err, chanpinList) {
    if (err) {
      return next(err);
    }
    usermodel.getAllFenLei(function (err, fenleiList) {
      if (err) {
        return next(err);
      }
      usermodel.getFourNews(function (err, newsList) {
        if (err) {
          return next(err);
        }
        for (var i = 0; i < newsList.length; i++) {
          var sqltime = newsList[i].time;
          var parsetime = new Date(sqltime);
          newsList[i].time = parsetime.getFullYear() + '-' + (parsetime.getMonth() + 1) + '-' + parsetime.getDate() + ' ' + parsetime.getHours() + ':' + parsetime.getMinutes() + ':' + parsetime.getSeconds();
        }
        res.render('user/index/index', {
          title: '电子书查阅系统首页',
          chanpinList: chanpinList,
          fenleiList: fenleiList,
          newsList: newsList
        });
      });
    });
  });
});

// 注册登录
router.get('/reglogin', function (req, res, next) {
  usermodel.getAllFenLei(function (err, fenleiList) {
    if (err) {
      return next(err);
    }
    res.render('user/index/reglogin', {
      title: '用户注册',
      fenleiList: fenleiList
    });
  });
});

// 登录页面
router.get('/login', function (req, res, next) {
  res.render('user/index/login', {
    title: '用户登录'
  });
});

// 用户注册
router.post('/userreg', function (req, res, next) {
  var account = req.body.account;
  var password = req.body.password;
  var name = req.body.name;
  var phone = req.body.phone;
  var usertype = req.body.usertype;
  usermodel.selectUser(account, function (err, rows) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    if (rows.length > 0) {
      res.json({
        'error': '用户名存在'
      });
      return next(err);
    }
    usermodel.userReg([account, password, name, phone, usertype], function (err) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      res.json({
        'success': '注册成功'
      });
    });
  });
});

// 用户登录
router.post('/userlogin', function (req, res, next) {
  var account = req.body.account;
  var password = req.body.password;
  usermodel.selectUser(account, function (err, rows) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    if (rows.length == 0) {
      res.json({
        'error': '用户不存在'
      });
      return next(err);
    }
    if (rows[0].password != password) {
      res.json({
        'error': '密码错误'
      });
      return next(err);
    }
    req.session.name = rows[0].name;
    req.session.uid = rows[0].id;
    req.session.usertype = rows[0].usertype;
    res.json({
      'success': '登录成功'
    });
  });
});

// 按产品名查询产品
router.post('/searchlist', function (req, res, next) {
  var place = req.body.place;
  usermodel.getChanPinByplace(place, function (err, chanpinList) {
    if (err) {
      return next(err);
    }
    usermodel.getAllFenLei(function (err, fenleiList) {
      if (err) {
        return next(err);
      }
      if (place.length == 0) {
        place = '不限'
      }
      res.render('user/chanpin/list', {
        title: '书籍列表',
        smalltip: '查询：' + place,
        fenleiList: fenleiList,
        chanpinList: chanpinList
      });
    });
  });
});

router.get('/allchanpin', function (req, res, next) {
  usermodel.getAllChanPin(function (err, chanpinList) {
    if (err) {
      return next(err);
    }
    usermodel.getAllFenLei(function (err, fenleiList) {
      if (err) {
        return next(err);
      }
      res.render('user/chanpin/list', {
        title: '书籍列表',
        smalltip: '所有书籍',
        fenleiList: fenleiList,
        chanpinList: chanpinList
      });
    });
  });
});

router.get('/fllist/:id', function (req, res, next) {
  var fenlei = req.params.id;
  usermodel.getChanPinByFenLei(fenlei, function (err, chanpinList) {
    if (err) {
      return next(err);
    }
    usermodel.getAllFenLei(function (err, fenleiList) {
      if (err) {
        return next(err);
      }
      for (var i = 0; i < fenleiList.length; i++) {
        if (fenlei == fenleiList[i].id) {
          fenlei = fenleiList[i].name;
        }
      }
      res.render('user/chanpin/list', {
        title: '书籍列表',
        smalltip: '分类查询：' + fenlei,
        fenleiList: fenleiList,
        chanpinList: chanpinList
      });
    });
  });
});

// 查看产品详情
router.get('/detail/:id', function (req, res, next) {
  var chanpinid = req.params.id;
  var userid = req.session.uid;
  var nowdatetime = Date.parse(new Date()) / 1000;
  usermodel.getThisChanPinInfo(chanpinid, function (err, chanpinInfo) {
    if (err) {
      return next(err);
    }
    usermodel.getThisChanPinXingCheng(nowdatetime, chanpinid, function (err, xingchengList) {
      if (err) {
        return next(err);
      }
      usermodel.getThisChanPinImg(chanpinid, function (err, imgList) {
        if (err) {
          return next(err);
        }
        usermodel.getAllFenLei(function (err, fenleiList) {
          if (err) {
            return next(err);
          }
          usermodel.getPingLun(chanpinid, function (err, pinglunList) {
            if (err) {
              return next(err);
            }
            for (var i = 0; i < pinglunList.length; i++) {
              var sqltime = pinglunList[i].time;
              var parsetime = new Date(sqltime);
              pinglunList[i].time = parsetime.getFullYear() + '-' + (parsetime.getMonth() + 1) + '-' + parsetime.getDate() + ' ' + parsetime.getHours() + ':' + parsetime.getMinutes() + ':' + parsetime.getSeconds();
            }
            usermodel.isShouCang(chanpinid, userid, function (err, isShouCang) {
              if (err) {
                return next(err);
              }
              usermodel.getScNum(chanpinid, function (err, scNum) {
                if (err) {
                  return next(err);
                }
                res.render('user/chanpin/detail', {
                  title: '书籍详情',
                  chanpinInfo: chanpinInfo[0],
                  xingchengList: xingchengList,
                  imgList: imgList,
                  fenleiList: fenleiList,
                  pinglunList: pinglunList,
                  isShouCang: isShouCang,
                  scNum: scNum
                });
              });
            });
          });
        });
      });
    });
  });
});

// 添加评论
router.post('/addPingLun', function (req, res, next) {
  var content = req.body.content;
  var chanpinid = req.body.chanpinid;
  var userid = req.session.uid;
  usermodel.addPingLun(content, chanpinid, userid, function (err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '评论成功'
    });
  });
});

// 加入收藏
router.post('/addShouCang', function (req, res, next) {
  var chanpinid = req.body.chanpinid;
  var userid = req.session.uid;
  usermodel.addShouCang(chanpinid, userid, function (err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '加入收藏成功'
    });
  });
});

// 取消收藏
router.post('/qxShouCang', function (req, res, next) {
  var chanpinid = req.body.chanpinid;
  var userid = req.session.uid;
  usermodel.qxShouCang(chanpinid, userid, function (err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '已取消收藏'
    });
  });
});

// 修改密码
router.post('/updatePassword', function (req, res, next) {
  var hash = crypto.createHash('md5');
  var hash1 = crypto.createHash('md5');
  var userid = req.session.uid;
  var reqpassword = req.body.password;
  var reqoldPassword = req.body.oldpassword;
  hash.update(reqpassword);
  hash1.update(reqoldPassword);
  var password = hash.digest('hex');
  var oldpassword = hash1.digest('hex');
  usermodel.getOldPassword(userid, function (err, rows) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    if (oldpassword != rows[0].password) {
      res.json({
        'error': '请输入正确的原密码!'
      });
      return next(err);
    }
    usermodel.updatePassword(password, userid, function (err) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      res.json({
        'success': '修改密码成功'
      });
    });
  });
});

router.get('/mysc', function (req, res, next) {
  var userid = req.session.uid;
  usermodel.getAllFenLei(function (err, fenleiList) {
    if (err) {
      return next(err);
    }
    usermodel.getShouCang(userid, function (err, chanpinList) {
      if (err) {
        return next(err);
      }
      res.render('user/chanpin/shopcart', {
        title: '我的收藏',
        fenleiList: fenleiList,
        chanpinList: chanpinList
      });
    });
  });
});

// 我的订单
router.get('/mydingdan', function (req, res, next) {
  var userid = req.session.uid;
  usermodel.getAllFenLei(function (err, fenleiList) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    usermodel.getMyDingDan(userid, '0', function (err, wcldingdanList) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      usermodel.getMyDingDan(userid, '1', function (err, ycldingdanList) {
        if (err) {
          res.json({
            'error': err
          });
          return next(err);
        }
        usermodel.getMyDingDanImg(userid, function (err, dingdanimgList) {
          if (err) {
            res.json({
              'error': err
            });
            return next(err);
          }
          for (var i = 0; i < wcldingdanList.length; i++) {
            var sqltime = wcldingdanList[i].time;
            var parsetime = new Date(sqltime);
            wcldingdanList[i].time = parsetime.getFullYear() + '-' + (parsetime.getMonth() + 1) + '-' + parsetime.getDate() + ' ' + parsetime.getHours() + ':' + parsetime.getMinutes() + ':' + parsetime.getSeconds();
          }
          for (var i = 0; i < ycldingdanList.length; i++) {
            var sqltime = ycldingdanList[i].time;
            var parsetime = new Date(sqltime);
            ycldingdanList[i].time = parsetime.getFullYear() + '-' + (parsetime.getMonth() + 1) + '-' + parsetime.getDate() + ' ' + parsetime.getHours() + ':' + parsetime.getMinutes() + ':' + parsetime.getSeconds();
          }
          res.render('user/chanpin/dingdan', {
            title: '我的订单',
            fenleiList: fenleiList,
            wcldingdanList: wcldingdanList,
            ycldingdanList: ycldingdanList,
            dingdanimgList: dingdanimgList
          });
        });
      });
    });
  });
});

// 退出登录
router.get('/logout', function (req, res) {
  req.session.name = '';
  req.session.uid = '';
  req.session.usertype = '';
  res.redirect('/');
});

// 阅读书籍
router.get('/readbook/:id', function (req, res, next) {
  var chanpinid = req.params.id;
  usermodel.getBookCon(chanpinid, function (err, zjList) {
    if (err) {
      return next(err);
    }
    usermodel.isZuoZhe(chanpinid, function (err, isZuoZhe) {
      if (err) {
        return next(err);
      }
      res.render('admin/bookread/index', {
        title: '书籍详情',
        zjList: zjList,
        chanpinid: chanpinid,
        isZuoZhe: isZuoZhe[0]
      });
    });
  });
});

// 添加章节modal
router.post('/addZjModal', function (req, res, next) {
  res.render('admin/bookread/_AddZj', {}, function (err, html) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': true,
      'view': html
    });
  });
});

// 添加章节
router.post('/addZj', function (req, res, next) {
  var chanpinid = req.body.chanpinid;
  var zjname = req.body.zjname;
  var zjcon = req.body.zjcon;
  usermodel.addZj(chanpinid, zjname, zjcon, function (err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '添加成功'
    });
  });
});

// 获取章节内容
router.post('/getZjCon', function (req, res, next) {
  var zjid = req.body.zjid;
  usermodel.getZjCon(zjid, function (err, zjcon) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': true,
      'zjcon': zjcon[0].zjcon
    });
  });
});

// 修改章节内容modal
router.post('/updateZjModal', function (req, res, next) {
  var zjid = req.body.zjid;
  usermodel.getZjCon(zjid, function (err, zjcon) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.render('admin/bookread/_EditZj', {
      zjcon: zjcon[0]
    }, function (err, html) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      res.json({
        'success': true,
        'view': html
      });
    });
  });
});

// 修改章节
router.post('/updateZj', function (req, res, next) {
  var zjid = req.body.zjid;
  var zjname = req.body.zjname;
  var zjcon = req.body.zjcon;
  usermodel.updateZj(zjname, zjcon, zjid, function (err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '修改成功'
    });
  });
});

// 删除章节
router.post('/deleteZj', function (req, res, next) {
  var zjid = req.body.zjid;
  usermodel.deleteZj(zjid, function (err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '删除成功'
    });
  });
});

module.exports = router;