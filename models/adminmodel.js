var db = require('./dboperation');

module.exports = {
  // 验证管理员
  selectAdmin: function(account, callback) {
    var sql = "select * from admin where account = ?;";
    db.exec(sql, account, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取页码
  getAllChanPinPage: function(callback) {
    var sql = "select ceil(count(id)/10) as page from chanpin;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 管理页面
  selectAllChanPin: function(page, callback) {
    var sql = "select chanpin.*, fenlei.name as fenleiname from chanpin left join fenlei on chanpin.fenlei = fenlei.id order by id desc limit " + page + ", 10;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 作家获得自己的书籍
  selectMyBook: function (userid, callback) {
    var sql = "select chanpin.*, fenlei.name as fenleiname from chanpin left join fenlei on chanpin.fenlei = fenlei.id where chanpin.userid = ?;";
    db.exec(sql, userid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 添加基本信息
  addChanPinInfo: function(place, introduce, fenlei, userid, callback) {
    var sql = "insert into chanpin(place, introduce, fenlei, userid, hasimg, shenhe) values(?,?,?,?,0,0);";
    db.exec(sql, [place, introduce, fenlei, userid], function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 添加图片
  addChanPinImg: function(chanpinid, url, callback) {
    var sql = "insert into chanpinimg(chanpinid, url) values(111);";
    db.exec(sql, [chanpinid, url], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  updateChanPinHasImg: function(chanpinid, callback) {
    var sql = "update chanpin set hasimg = 1 where id = ?;";
    db.exec(sql, chanpinid, function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取某个的信息
  getThisChanPinInfo: function(id, callback) {
    var sql = "select * from chanpin where id = ?;";
    db.exec(sql, id, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 修改信息
  updateChanPinInfo: function(place, introduce, fenlei, userid, chanpinid, callback) {
    var sql = "update chanpin set place = ?, introduce = ?, fenlei = ?, userid = ? where id = ?;";
    db.exec(sql, [place, introduce, fenlei, userid, chanpinid], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取图片
  getThisChanPinImg: function(chanpinid, callback) {
    var sql = "select * from chanpinimg where chanpinid = ?;";
    db.exec(sql, chanpinid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  addXingCheng: function(chanpinid, renshu, size, color, callback) {
    var sql = "insert into xingcheng(chanpinid, renshu, size, color) values(?,?,?,?);";
    db.exec(sql, [chanpinid, renshu, size, color], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  getThisXingCheng: function(chanpinid, callback) {
    var sql = "select * from xingcheng where chanpinid = ?;";
    db.exec(sql, chanpinid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取所有分类
  getAllFenLei: function(callback) {
    var sql = "select * from fenlei;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 添加分类
  addFenLei: function(name, callback) {
    var sql = "insert into fenlei(name) values(?);";
    db.exec(sql, name, function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 修改分类
  xgFenLei: function(name, id, callback) {
    var sql = "update fenlei set name = ? where id = ?;";
    db.exec(sql, [name, id], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  getAllDingDanPage: function(state, callback) {
    var sql = "select ceil(count(id)/10) as page from dingdan where state = ?;";
    db.exec(sql, state, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  selectAllDingDan: function(state, page, callback) {
    var sql = "select dingdan.*, chanpin.place, xingcheng.size, xingcheng.color from (dingdan left join chanpin on dingdan.chanpinid = chanpin.id) left join xingcheng on xingcheng.id = dingdan.xingchengid where state = ? order by id desc limit " + page + ", 10;";
    db.exec(sql, state, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  getThisDingDanUserInfo: function(userid, callback) {
    var sql = "select * from user where id = ?;";
    db.exec(sql, userid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  handleDingDan: function(id, callback) {
    var sql = "update dingdan set state = 1 where id = ?;";
    db.exec(sql, id, function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  addXiaoLiang: function (id, num, callback) {
    var sql = "update xingcheng set ydrenshu = ydrenshu + ?, renshu = renshu - ? where id = ?;";
    db.exec(sql, [num, num, id], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 显示所有用户
  selectAllUser: function(callback) {
    var sql = "select * from user order by id desc;";
    db.exec(sql, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 显示所有管理员
  selectAllAdmin: function(callback) {
    var sql = "select * from admin;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 添加管理员
  addAdmin: function(account, password, name, quanxian, callback) {
    var sql = "insert into admin(account, password, name, quanxian) values(?,?,?,?);";
    db.exec(sql, [account, password, name, quanxian], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 添加新闻
  addNews: function (title, content, callback) {
    var sql = "insert into news(title, content, time) values(?,?,now());";
    db.exec(sql, [title, content], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取新闻
  getNews: function (callback) {
    var sql = "select * from news;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 审核书籍
  shenheSj: function (chanpinid, callback) {
    var sql = "update chanpin set shenhe = 1 where id = ?;";
    db.exec(sql, chanpinid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  }
}
