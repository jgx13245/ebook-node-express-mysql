-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2018-03-21 10:01:20
-- 服务器版本： 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ebook`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE `admin` (
  `id` int(10) NOT NULL,
  `account` varchar(50) CHARACTER SET utf8 NOT NULL,
  `password` varchar(50) CHARACTER SET utf8 NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 NOT NULL,
  `quanxian` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`id`, `account`, `password`, `name`, `quanxian`) VALUES
(1, 'admin', '123', '管理员', 1);

-- --------------------------------------------------------

--
-- 表的结构 `chanpin`
--

CREATE TABLE `chanpin` (
  `id` int(10) NOT NULL,
  `place` varchar(50) CHARACTER SET utf8 NOT NULL,
  `introduce` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `fenlei` int(10) NOT NULL,
  `hasimg` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `shenhe` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `chanpin`
--

INSERT INTO `chanpin` (`id`, `place`, `introduce`, `fenlei`, `hasimg`, `userid`, `shenhe`) VALUES
(1, '马化腾事迹', '马化腾事迹马化腾事迹马化腾事迹马化腾事迹马化腾事迹马化腾事迹马化腾事迹马化腾事迹马化腾事迹马化腾事迹马化腾事迹马化腾事迹马化腾事迹马化腾事迹马化腾事迹马化腾事迹马化腾事迹马化腾事迹马化腾事迹马化腾事迹马化腾事迹马化腾事迹马化腾事迹', 1, 1, 1, 0);

-- --------------------------------------------------------

--
-- 表的结构 `chanpinimg`
--

CREATE TABLE `chanpinimg` (
  `id` int(10) NOT NULL,
  `chanpinid` int(10) NOT NULL,
  `url` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `chanpinimg`
--

INSERT INTO `chanpinimg` (`id`, `chanpinid`, `url`) VALUES
(1, 1, '/uploads/1/1-0-shop_item_02_hover.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `dingdan`
--

CREATE TABLE `dingdan` (
  `id` int(10) NOT NULL,
  `chanpinid` int(10) NOT NULL,
  `xingchengid` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `ddrenshu` int(10) NOT NULL,
  `allprice` varchar(50) CHARACTER SET utf8 NOT NULL,
  `dizhiid` int(10) NOT NULL,
  `time` datetime NOT NULL,
  `state` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `dizhi`
--

CREATE TABLE `dizhi` (
  `id` int(10) NOT NULL,
  `address` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `userid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `fenlei`
--

CREATE TABLE `fenlei` (
  `id` int(10) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `fenlei`
--

INSERT INTO `fenlei` (`id`, `name`) VALUES
(1, '分类1'),
(2, '分类2'),
(3, '分类3');

-- --------------------------------------------------------

--
-- 表的结构 `news`
--

CREATE TABLE `news` (
  `id` int(10) NOT NULL,
  `title` varchar(10000) CHARACTER SET utf8 NOT NULL,
  `content` varchar(10000) CHARACTER SET utf8 NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `pinglun`
--

CREATE TABLE `pinglun` (
  `id` int(10) NOT NULL,
  `content` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `chanpinid` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `pinglun`
--

INSERT INTO `pinglun` (`id`, `content`, `chanpinid`, `userid`, `time`) VALUES
(1, '不错！', 1, 1, '2018-03-21 16:15:01');

-- --------------------------------------------------------

--
-- 表的结构 `shopcart`
--

CREATE TABLE `shopcart` (
  `id` int(10) NOT NULL,
  `chanpinid` int(10) NOT NULL,
  `userid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `shopcart`
--

INSERT INTO `shopcart` (`id`, `chanpinid`, `userid`) VALUES
(1, 1, 2);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `account` varchar(100) CHARACTER SET utf8 NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8 NOT NULL,
  `usertype` varchar(100) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `account`, `password`, `name`, `phone`, `usertype`) VALUES
(1, 'mht', '123', '马化腾', '17855831222', 'zuojia'),
(2, 'lqd', '123', '刘强东', '17855831222', 'duzhe');

-- --------------------------------------------------------

--
-- 表的结构 `xingcheng`
--

CREATE TABLE `xingcheng` (
  `id` int(10) NOT NULL,
  `chanpinid` int(10) NOT NULL,
  `zjname` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `zjcon` mediumtext CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `xingcheng`
--

INSERT INTO `xingcheng` (`id`, `chanpinid`, `zjname`, `zjcon`) VALUES
(1, 1, '马化腾事迹1', '\n                    <p>&nbsp; &nbsp; 马化腾事迹1内容！</p><p>坑钱！！！！！！</p>\n                ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chanpin`
--
ALTER TABLE `chanpin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chanpinimg`
--
ALTER TABLE `chanpinimg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dingdan`
--
ALTER TABLE `dingdan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dizhi`
--
ALTER TABLE `dizhi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fenlei`
--
ALTER TABLE `fenlei`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pinglun`
--
ALTER TABLE `pinglun`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shopcart`
--
ALTER TABLE `shopcart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `xingcheng`
--
ALTER TABLE `xingcheng`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `chanpin`
--
ALTER TABLE `chanpin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `chanpinimg`
--
ALTER TABLE `chanpinimg`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `dingdan`
--
ALTER TABLE `dingdan`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `dizhi`
--
ALTER TABLE `dizhi`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `fenlei`
--
ALTER TABLE `fenlei`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- 使用表AUTO_INCREMENT `news`
--
ALTER TABLE `news`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `pinglun`
--
ALTER TABLE `pinglun`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `shopcart`
--
ALTER TABLE `shopcart`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `xingcheng`
--
ALTER TABLE `xingcheng`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
