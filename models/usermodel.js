var db = require('./dboperation');
var sqls = require('./sqls');

module.exports = {
  // 验证用户
  selectUser: function(parameter, callback) {
    db.implement(sqls.sqlSelectUser, parameter, callback);
  },
  // 用户注册
  userReg: function(parameter, callback) {
    db.implement(sqls.sqlUserReg, parameter, callback);
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
  // 获取最新
  getNewChanPin: function(callback) {
    var sql = "select chanpin.*, chanpinimg.url from chanpin right join chanpinimg on chanpin.id = chanpinimg.chanpinid where chanpin.shenhe = 1 group by chanpin.id order by chanpin.id desc limit 0, 7;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取所有
  getAllChanPin: function(callback) {
    var sql = "select chanpin.*, chanpinimg.url from chanpin right join chanpinimg on chanpin.id = chanpinimg.chanpinid where chanpin.shenhe = 1 group by chanpin.id;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 按名称查询
  getChanPinByplace: function(place, callback) {
    var sql = "select chanpin.*, chanpinimg.url from chanpin right join chanpinimg on chanpin.id = chanpinimg.chanpinid where chanpin.shenhe = 1 and place like '%" + place + "%' group by chanpin.id;"
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 根据分类查询
  getChanPinByFenLei: function(fenleiid, callback) {
    var sql = "select chanpin.*, chanpinimg.url from chanpin right join chanpinimg on chanpin.id = chanpinimg.chanpinid where chanpin.shenhe = 1 and fenlei = ? group by chanpin.id;";
    db.exec(sql, fenleiid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取基本信息
  getThisChanPinInfo: function(id, callback) {
    var sql = "select chanpin.*, fenlei.name as fenleiname from chanpin left join fenlei on chanpin.fenlei = fenlei.id where chanpin.id = ?;";
    db.exec(sql, id, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  getThisChanPinXingCheng: function(nowdatetime, chanpinid, callback) {
    var sql = "select * from xingcheng where chanpinid = ?;";
    db.exec(sql, [chanpinid, nowdatetime], function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
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
  updateYdRenShu: function(ddrenshu, xingchengid, callback) {
    var sql = "update xingcheng set ydrenshu = ydrenshu + ? where id = ?;";
    db.exec(sql, [ddrenshu, xingchengid], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  selectMyDingDan: function(userid, state, callback) {
    var sql = "select dingdan.*, chanpin.place, chanpinimg.url from ((dingdan left join chanpin on dingdan.chanpinid = chanpin.id) left join xingcheng on xingcheng.chanpinid = chanpin.id) left join chanpinimg on chanpinimg.chanpinid = dingdan.chanpinid where dingdan.userid = ? and dingdan.state = ? group by chanpin.id;";
    db.exec(sql, [userid, state], function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取原密码
  getOldPassword: function(id, callback) {
    var sql = "select * from user where id = ?;";
    db.exec(sql, id, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
  },
  // 修改密码
  updatePassword: function(password, id, callback) {
    var sql = "update user set password = ? where id = ?;";
    db.exec(sql, [password, id], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  canAddToShopCart: function(xingchengid, userid, callback) {
    var sql = "select * from shopcart where xingchengid = ? and userid = ?;";
    db.exec(sql, [xingchengid, userid], function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
  },
  addToShopCart: function(chanpinid, xingchengid, num, userid, callback) {
    var sql = "insert into shopcart(chanpinid, xingchengid, num, userid) values(?,?,?,?);";
    db.exec(sql, [chanpinid, xingchengid, num, userid], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  getUserShopCart: function(userid, callback) {
    var sql = "select size, color, shopcart.id as cartid, shopcart.chanpinid, shopcart.xingchengid, chanpin.place, chanpin.price, shopcart.num from (shopcart left join chanpin on shopcart.chanpinid = chanpin.id) left join xingcheng on shopcart.xingchengid = xingcheng.id where shopcart.userid = ?;";
    db.exec(sql, userid, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
  },
  addDingdan: function(chanpinid, xingchengid, userid, ddrenshu, allprice, dizhiid, callback) {
    var sql = "insert into dingdan(chanpinid, xingchengid, userid, ddrenshu, allprice, dizhiid, time) values(?,?,?,?,?,?,now());";
    db.exec(sql, [chanpinid, xingchengid, userid, ddrenshu, allprice, dizhiid], function(err) {
			if (err) {
				callback(err);
			}
			callback(err);
		});
  },
  addDiZhi: function(address, userid, callback) {
    var sql = "insert into dizhi(address, userid) values(?,?);";
    db.exec(sql, [address, userid], function(err) {
			if (err) {
				callback(err);
			}
			callback(err);
		});
  },
  getDiZhi: function(userid, callback) {
    var sql = "select * from dizhi where userid = ?;";
    db.exec(sql, userid, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
  },
  getMyDingDan: function (userid, state, callback) {
    var sql = "select dingdan.id, dingdan.chanpinid, ddrenshu as num, allprice, time, place, size, color, state from ((dingdan left join chanpin on dingdan.chanpinid = chanpin.id) left join xingcheng on dingdan.xingchengid = xingcheng.id) left join dizhi on dingdan.dizhiid = dizhi.id where dingdan.userid = ? and dingdan.state = ?;";
    db.exec(sql, [userid, state], function (err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  getMyDingDanImg: function (userid, callback) {
    var sql = "select dingdan.chanpinid, chanpinimg.url from dingdan left join chanpinimg on dingdan.chanpinid = chanpinimg.chanpinid where dingdan.userid = ? group by chanpinimg.chanpinid;";
    db.exec(sql, userid, function (err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取最新发布的新闻
  getFourNews: function (callback) {
    var sql = "select * from news order by id desc limit 4;";
    db.exec(sql, '', function (err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 发表评论
  addPingLun: function (content, chanpinid, userid, callback) {
    var sql = "insert into pinglun(content, chanpinid, userid, time) values(?,?,?,now());";
    db.exec(sql, [content, chanpinid, userid], function (err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取评论
  getPingLun: function (chanpinid, callback) {
    var sql = "select user.name, pinglun.* from pinglun left join user on pinglun.userid = user.id where chanpinid = ?;";
    db.exec(sql, chanpinid, function (err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取书籍章节和内容
  getBookCon: function (chanpinid, callback) {
    var sql = "select * from xingcheng where chanpinid = ?;";
    db.exec(sql, chanpinid, function (err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 添加章节
  addZj: function (chanpinid, zjname, zjcon, callback) {
    var sql = "insert into xingcheng(chanpinid, zjname, zjcon) values(?,?,?);";
    db.exec(sql, [chanpinid, zjname, zjcon], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 查看章节内容
  getZjCon: function (zjid, callback) {
    var sql = "select * from xingcheng where id = ?;";
    db.exec(sql, zjid, function (err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 修改章节
  updateZj: function (zjname, zjcon, zjid, callback) {
    var sql = "update xingcheng set zjname = ?, zjcon = ? where id = ?;";
    db.exec(sql, [zjname, zjcon, zjid], function (err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 删除章节
  deleteZj: function (zjid, callback) {
    var sql = "delete from xingcheng where id = ?;";
    db.exec(sql, zjid, function (err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 收藏书籍
  isShouCang: function(chanpinid, userid, callback) {
    var sql = "select * from shopcart where chanpinid = ? and userid = ?;";
    db.exec(sql, [chanpinid, userid], function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
  },
  addShouCang: function(chanpinid, userid, callback) {
    var sql = "insert into shopcart(chanpinid, userid) values(?,?);";
    db.exec(sql, [chanpinid, userid], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 取消收藏
  qxShouCang: function (chanpinid, userid, callback) {
    var sql = "delete from shopcart where chanpinid = ? and userid = ?;";
    db.exec(sql, [chanpinid, userid], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取收藏的书籍
  getShouCang: function (userid, callback) {
    var sql = "select chanpin.* from shopcart left join chanpin on shopcart.chanpinid = chanpin.id where shopcart.userid = ?;";
    db.exec(sql, userid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取某书籍收藏量
  getScNum: function (chanpinid, callback) {
    var sql = "select count(id) as num from shopcart where chanpinid = ?;";
    db.exec(sql, chanpinid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 是否是作者
  isZuoZhe: function (chanpinid, callback) {
    var sql = "select * from chanpin where id = ?;";
    db.exec(sql, chanpinid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  }
}
