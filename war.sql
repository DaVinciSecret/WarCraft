SET NAMES UTF8;
DROP DATABASE IF EXISTS war;
CREATE DATABASE war CHARSET=UTF8;
USE war;

/**用户信息列表**/
CREATE TABLE war_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32),
  email VARCHAR(64),
  phone VARCHAR(16),        

  avatar VARCHAR(128),      #头像路径
  user_name VARCHAR(32),    #真实姓名
  gender INT                #性别
);

/*商品列表*/
CREATE TABLE war_product(
  lid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(128),       #主标题
  subtitle VARCHAR(128),    #副标题
  price DECIMAL(6,2),       #价格

  lname VARCHAR(32),        #商品名称
  details VARCHAR(512),     #产品详情

  shelf_time BIGINT,        #上架时间
  sold_count INT,           #已售出数量
  is_onsale BOOLEAN         #是否促销中

);

/*首页轮播广告*/
CREATE TABLE war_index_carousel(
    cid INT PRIMARY KEY AUTO_INCREMENT,
    img VARCHAR(128),
    title VARCHAR(64),
    href VARCHAR(128)
);


/******************/
/******数据导入*****/
/******************/


/*用户信息*/
INSERT INTO war_user VALUES
(NULL,'dingding','123456','dingding@qq.com','13597623586','头像路径','丁伟','1'),
(NULL,'yanyan','123456','yanyan@qq.com','13496525086','头像路径','杨燕','0'),
(NULL,'meimei','123456','meimei@qq.com','13923762097','头像路径','李梅','0'),
(NULL,'dongdong','123456','dongdong@qq.com','13848364920','头像路径','张东','1');

/*商品信息*/
INSERT INTO war_product VALUES
(NULL,'主标题','副标题','商品价格','名称1','商品详情','上架时间','已售出的数量',1),
(NULL,'主标题','副标题','商品价格','名称2','商品详情','上架时间','已售出的数量',1),
(NULL,'主标题','副标题','商品价格','名称3','商品详情','上架时间','已售出的数量',1),
(NULL,'主标题','副标题','商品价格','名称4','商品详情','上架时间','已售出的数量',1),
(NULL,'主标题','副标题','商品价格','名称5','商品详情','上架时间','已售出的数量',1),
(NULL,'主标题','副标题','商品价格','名称6','商品详情','上架时间','已售出的数量',1),
(NULL,'主标题','副标题','商品价格','名称7','商品详情','上架时间','已售出的数量',1),
(NULL,'主标题','副标题','商品价格','名称8','商品详情','上架时间','已售出的数量',1),
(NULL,'主标题','副标题','商品价格','名称9','商品详情','上架时间','已售出的数量',1);


/*首页轮播广告*/
INSERT INTO war_index_carousel VALUES
(NULL,'图片路径','轮播广告商品1','链接1'),
(NULL,'图片路径','轮播广告商品1','链接1'),
(NULL,'图片路径','轮播广告商品1','链接1'),
(NULL,'图片路径','轮播广告商品1','链接1');