import React, { useState, useEffect } from 'react';
import { Drawer, Button, Col, Row, Table, Divider, Input, Space } from 'antd';
// import Highcharts from 'highcharts/highcharts-3d'
// import Highcharts from 'highcharts/highstock';
import Highcharts from 'highcharts'
// import highchartsGantt from "highcharts/modules/gantt";
// import highcharts3D from 'highcharts/highcharts-3d'
// import highchartsExport from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
// import HighPattern from 'highcharts/modules/pattern-fill'; //这个插件可以使柱状图用不规则图片来代替
// HighPattern(Highcharts);
// Load Highcharts modules
// require('highcharts/indicators/indicators')(Highcharts);
// require('highcharts/indicators/pivot-points')(Highcharts);
// require('highcharts/indicators/macd')(Highcharts);
// require('highcharts/modules/exporting')(Highcharts);
// require('highcharts/modules/map')(Highcharts);
// require("highcharts/modules/variwide")(Highcharts);
// 初始化模块
// highchartsGantt(Highcharts);
// highcharts3D(Highcharts);
// cylinder(Highcharts);
// highchartsExport(Highcharts);

// 全局配置，对当前页面的所有图表有效
Highcharts.setOptions({
	time: {
		useUTC: false
	},
  lang:{
    viewFullscreen:"全屏",
    contextButtonTitle:"图表导出菜单",
    decimalPoint:".",
    downloadJPEG:"下载JPEG图片",
    downloadPDF:"下载PDF文件",
    downloadPNG:"下载PNG文件",
    downloadSVG:"下载SVG文件",
    drillUpText:"返回 {series.name}",
    loading:"加载中",
    months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
    noData:"没有数据",
    // numericSymbols: [ "千" , "兆" , "G" , "T" , "P" , "E"],
    printChart:"打印图表",
    resetZoom:"恢复缩放",
    resetZoomTitle:"恢复图表",
    shortMonths: [ "Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"],
    thousandsSep:",",
    weekdays: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期天"]
 }
});
const LineChart = ({
  options
}) => {

  useEffect(() => {
  }, []);


  return (
    <>
      <App
        options={options}
      />
    </>
  );

}



class App extends React.Component {

  state = {
    searchText: '',
    searchedColumn: '',
  };
  // handleReset = clearFilters => {
  //   clearFilters();
  //   this.setState({ searchText: '' });
  // };
  render() {
    const {
      options
    } = this.props

    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          // constructorType={'stockChart'}
          options={options}
        />
      </div>
    )
  }
}



export default LineChart



