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
  Modal,
  Input
} from "antd";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import globalConfig from "../../../../config/defaultSettings";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
const formItemLayout = globalConfig.table.formItemLayout;
import { echartsInit, tableShow, ListLine, Modify, ModifyOutWork } from "@/services/demand/classPlan"
import Highcharts from 'highcharts';
import BarChart from '../../../../src/components/Chart/BarChart'
import "../index.less";


const Components = ({ classPlan, dispatch }) => {
  const [form] = Form.useForm();
  const [formModel] = Form.useForm();
  const [dataSourceInfo, setDataSourceInfo] = useState([]);
  const [dataSourceLine, setDataSourceLine] = useState([]);
  const [dataSourceList, setDataSourceList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    handSearch();
  }, []);

  const yearList = [{
    value: 1,
    label: '1月'
  },
  {
    value: 2,
    label: '2月'
  },
  {
    value: 3,
    label: '3月'
  },
  {
    value: 4,
    label: '4月'
  },
  {
    value: 5,
    label: '5月'
  },
  {
    value: 6,
    label: '6月'
  },
  {
    value: 7,
    label: '7月'
  },
  {
    value: 8,
    label: '8月'
  },
  {
    value: 9,
    label: '9月'
  },
  {
    value: 10,
    label: '10月'
  },
  {
    value: 11,
    label: '11月'
  },
  {
    value: 12,
    label: '12月'
  },
  ]

  const columns = [
    {
      title: '人力需求',
      dataIndex: 'Title',
      key: 'Title',
      width: 300
    },
    {
      title: '1月',
      dataIndex: 'M1',
      key: 'M1',
    },
    {
      title: '2月',
      dataIndex: 'M2',
      key: 'M3',
    },
    {
      title: '3月',
      dataIndex: 'M3',
      key: 'M3',
    },
    {
      title: '4月',
      dataIndex: 'M4',
      key: 'M4',
    }, {
      title: '5月',
      dataIndex: 'M5',
      key: 'M5',
    }, {
      title: '6月',
      dataIndex: 'M6',
      key: 'M6',
    }, {
      title: '7月',
      dataIndex: 'M7',
      key: 'M7',
    }, {
      title: '8月',
      dataIndex: 'M8',
      key: 'M8',
    }, {
      title: '9月',
      dataIndex: 'M9',
      key: 'M9',
    }, {
      title: '10月',
      dataIndex: 'M10',
      key: 'M10',
    }, {
      title: '11月',
      dataIndex: 'M11',
      key: 'M11',
    },
    {
      title: '12月',
      dataIndex: 'M12',
      key: 'M12',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, record, index) => {
        if (index == 1) {
          return (
            <Button type="primary" onClick={() => handRow(record)}>编辑</Button>
          );
        } else {
          return
        }
      },
    },

  ]

  const barChartData = {
    credits: {////去掉版权logo水印
      enabled: false,
    },
    exporting: {
      enabled: true,
    },
    chart: {
      type: 'column',
      height: 330,
    },
    title: {
      text: '人力需求',
      // y: 20,

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
        '<td style="padding:0"><b>{point.y:.1f} 人</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointWidth: 40
      }
    },
    series: [{
      name: '人力共给',
      data: dataSourceInfo
    },
    {
      name: '人力需求',
      type: 'line',
      data: dataSourceLine,
      color: '#67be8e',
    }
    ]
  }


  const handSearch = (e) => {
    form.validateFields().then(async (values) => {
      let data = await echartsInit({
        Year: moment(values.Year).format('YYYY'),
      });
      if (data.status === "200") {
        let newList = Object.values(data.list.length == 0 ? [] : data.list[0])
        setDataSourceInfo(newList);
        message.success("查询成功!");
      } else {
        setDataSourceInfo([]);
        message.error(data.message);
      }

      let dataLine = await ListLine({
        Year: moment(values.Year).format('YYYY'),
      });
      if (dataLine.status === "200") {
        let newList = Object.values(dataLine.list.length == 0 ? [] : dataLine.list[0])
        setDataSourceLine(newList);
      } else {
        setDataSourceLine([]);
        message.error(dataLine.message);
      }



      //表格数据
      let dataTbale = await tableShow({
        Year: moment(values.Year).format('YYYY'),
      });
      if (dataTbale.status === "200") {
        setDataSourceList(dataTbale.list);
        message.success("查询成功!");
      } else {
        setDataSourceList([]);
        message.error(dataTbale.message);
      }
    });
  };


  //编辑当前行
  const handRow = (value) => {
    setIsModalOpen(true);
    formModel.resetFields();
  };


  //保存数据
  const onSave = async (values) => {
    setIsModalOpen(false);
    let data = await Modify({
      tsyear: moment(values.values).format('YYYY'),
      tsmonth: values.tsmonth,
      title: values.title,
      tsvalue: values.tsvalue,
    });
    if (data.status == "200") {
      handSearch();
      message.success(data.message);
    } else {
      message.error(data.message);
    }
  };

  //修改排版计划
  const handOutWork = async () => {
    let data = await ModifyOutWork({
      Time: document.getElementById('timeData').value,
      tsvalue: document.getElementById('tsvalue').value,
    });
    if (data.status == "200") {
      handSearch();
      message.success(data.message);
    } else {
      message.error(data.message);
    }
  };


  //关闭弹出框
  const handleCancel = () => {
    setIsModalOpen(false);
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


      <div style={{ width: "100%", height: '330px', background: "#fff", padding: '20px' }}>
        <Row>
          <Col span={4}>
            <Form.Item
              label="日期"
              name="Time"
            >
              <DatePicker format={globalConfig.form.onlyDateFormat} id="timeData" />
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item
              label="离职率"
              name="tsvalue"
            >
              <Input type="number" id="tsvalue" />
            </Form.Item>
          </Col>
          <Col span={1}>
            &nbsp;<b style={{ 'lineHeight': '2.5' }}>%</b>
          </Col>
          <Col span={2} offset={1}>
            <Button type="primary" htmlType="submit" onClick={() => handOutWork()}>
              确定
            </Button></Col>
        </Row>
        <Table dataSource={dataSourceList} columns={columns} scroll={{
          y: 200,
        }} pagination={false} />
      </div>

      <div style={{ width: "100%", height: '300px', background: "#fff", marginTop: '20px' }}>
        <BarChart
          options={barChartData}
        />
      </div>




      {/* //弹出框 */}
      <Modal
        title="人员调度"
        open={isModalOpen}
        onOk={() => {
          formModel
            .validateFields()
            .then((values) => {
              onSave(values);
            })
            .catch((info) => {
              console.log("CreateForm Failed:", info);
            });
        }}
        onCancel={handleCancel}
        okText={"提交"}
      >
        <Form
          form={formModel}
          name="ModalValueForm"
          initialValues={{
            title: '可安排加班天数',
            tsyear: moment()
          }}
        >
          <Row gutter={40}>
            <Col span={24} style={{ display: "block" }}>
              <Form.Item
                name="title"
                label="人力需求"
                hasFeedback
                {...formItemLayout}
              >
                <Input disabled />
              </Form.Item>
            </Col>

            <Col span={24} style={{ display: "block" }}>
              <Form.Item name="tsyear" label="选择年份" {...formItemLayout}>
                <DatePicker
                  style={{ width: "100%" }}
                  format={globalConfig.form.onlyYear}
                  picker="year"
                // defaultValue={moment()}
                />
              </Form.Item>
            </Col>

            <Col span={24} style={{ display: "block" }}>
              <Form.Item
                name="tsmonth"
                label="选择月份"
                hasFeedback
                {...formItemLayout}
              >
                <Select allowClear showSearch>
                  {yearList.map(function (item, index) {
                    return (
                      <Select.Option key={index} value={item.value}>
                        {item.label}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>


            <Col span={24} style={{ display: "block" }}>
              <Form.Item
                name="tsvalue"
                label="修改数据"
                hasFeedback
                {...formItemLayout}
              >
                <Input />
              </Form.Item>

            </Col>
          </Row>
        </Form>
      </Modal>


    </PageContainer>
  );
};

export default connect(({ classPlan }) => ({ classPlan }))(Components);
