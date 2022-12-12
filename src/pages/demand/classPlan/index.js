import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Form,
  Table,
  DatePicker,
  Button,
  message,
  Select,
  Tag,
} from "antd";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import globalConfig from "../../../../config/defaultSettings";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
const formItemLayout = globalConfig.table.formItemLayout;
import { echartsInit } from "@/services/demand/classPlan"
import Highcharts from 'highcharts';
import BarChart from '../../../../src/components/Chart/BarChart'
import "../index.less";


const Components = ({ classPlan, dispatch }) => {
  const [form] = Form.useForm();
  const [dataSourceInfo, setDataSourceInfo] = useState([]);


  useEffect(() => {
    handSearch();
  }, []);



  const barChartData = {
    credits: {////去掉版权logo水印
      enabled: false,
    },
    exporting: {
      enabled: true,
    },
    chart: {
      type: 'column',
      height: 630,
    },
    title: {
      text: '人力需求',
      y: 20,

    },
    xAxis: {
      categories: [
        '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: '人数 (个)'
      }
    },
    tooltip: {
      // head + 每个 point + footer 拼接成完整的 table
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
         pointWidth:20
      }
    },
    series: [{
      name: '月份',
      data: dataSourceInfo
    }]
  }


  const handSearch = (e) => {
    form.validateFields().then(async (values) => {
      let data = await echartsInit({
        Year: moment(values.Year).format('YYYY'),
      });
      if (data.status === "200") {
        let newList= Object.values(data.list[0]) 
        setDataSourceInfo(newList);
        message.success("查询成功!");
      }else{
        setDataSourceInfo([]);
        message.error(data.message);
      }
    });
  };


  return (
    <PageContainer>
      <div
        style={{
          margin: "20px 0",
          padding: "20px 10px 0 10px",
          background: "#fff",
        }}
      >
        <Form
          className="ant-advanced-search-form"
          form={form}
          name="form_in_modal"
          onFinish={handSearch}
          initialValues={{
            Year: moment(),
          }}
        >
          <Row gutter={40}>
            <Col span={6} style={{ display: "block" }}>
              <Form.Item name="Year" label="选择日期" {...formItemLayout}>
                <DatePicker
                  style={{ width: "100%" }}
                  // format={globalConfig.form.onlyDateFormat}
                  picker="year" 
                  // defaultValue={moment()}
                />
              </Form.Item>
            </Col>


            <Col span={18} style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit">
                <SearchOutlined />
                查询
              </Button>
            </Col>
          </Row>
        </Form>
      </div>


      <div style={{ width: "100%", height: '650px', background: "#fff" }}>
        <BarChart
          options={barChartData}
        />
      </div>


    </PageContainer>
  );
};

export default connect(({ classPlan }) => ({ classPlan }))(Components);
