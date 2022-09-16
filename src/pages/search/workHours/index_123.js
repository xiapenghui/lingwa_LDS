import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  DatePicker,
  InputNumber,
  Radio,
  Select,
  message,
  Tag,
  Table,
} from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Link, connect } from "umi";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import TableComponents from "./components/TableComponents";
import globalConfig from "../../../../config/defaultSettings";
import ExportJsonExcel from "js-export-excel";
import { PageContainer } from "@ant-design/pro-layout";
import moment from "moment";
import {
  postListInit,
  Agree,
  Negative,
  ConfirmationDetail,
} from "@/services/search/workHours";
const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 15 },
};

const TableName = "workHours";

const Component = ({ workHours, dispatch, user }) => {
  const TableModelsData = workHours;
  const {
    FromParams,

    // pagination,
    // tableLoading,
    // banciModalVisible,
    // banbieModalVisible,
    // quyuModalVisible,
    // lineModalVisible,
    // departmentList,
    // personList,
    // areaList,
    // lineList,

    shiftTypeList,
    personnelList,
  } = TableModelsData;

  const [form] = Form.useForm();
  const [TableList, setTableList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hours, setHours] = useState(0);
  const [average, setAverage] = useState(0);

  const TableColumns = [
    {
      key: "1",
      title: "班别",
      // dataIndex: 'defalutshifttypeid',
      dataIndex: "classtype",
      valueType: "text",
      align: "center",
      width: 100,
      fixed: "left",
      render: (_, text) => {
        return text.class;
      },
    },

    {
      key: "2",
      title: "员工编号",
      dataIndex: "employeeno",
      valueType: "text",
      align: "center",
      width: 150,
      fixed: "left",
    },

    {
      key: "3",
      title: "员工姓名",
      dataIndex: "employeename",
      valueType: "text",
      align: "center",
      width: 100,
      fixed: "left",
    },

    {
      key: "4",
      title: "排班",
      dataIndex: "hour",
      valueType: "text",
      align: "center",
      width: 100,
      fixed: "left",
    },

    {
      key: "5",
      title: "工时",
      dataIndex: "periodtime",
      valueType: "text",
      align: "center",
      width: 100,
      fixed: "left",
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "6",
      title: "休假",
      dataIndex: "relax",
      valueType: "text",
      align: "center",
      width: 100,
      fixed: "left",
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "7",
      title: "加班",
      dataIndex: "overwork",
      valueType: "text",
      align: "center",
      fixed: "left",
      width: 100,
      // render: (text) => {
      //   return  text.toFixed(2);
      // },
      render: (text, record) => {
        let color = record.overwork >= 50 ? "red" : "";
        if (record.overwork.toFixed(2) >= 50) {
          return <Tag color={color}>{record.overwork.toFixed(2)}</Tag>;
        } else {
          return <span> {record.overwork.toFixed(2)}</span>;
        }
      },
    },

    {
      key: "8",
      title: "员工属性",
      valueType: "text",
      align: "center",
      width: 120,
    },

    {
      key: "9",
      title: "1",
      dataIndex: "d01",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "10",
      title: "2",
      dataIndex: "d02",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "11",
      title: "3",
      dataIndex: "d03",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "12",
      title: "4",
      dataIndex: "d04",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "13",
      title: "5",
      dataIndex: "d05",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "14",
      title: "6",
      dataIndex: "d06",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "15",
      title: "7",
      dataIndex: "d07",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "16",
      title: "8",
      dataIndex: "d08",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "17",
      title: "9",
      dataIndex: "d09",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "18",
      title: "10",
      dataIndex: "d10",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "19",
      title: "11",
      dataIndex: "d11",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "20",
      title: "12",
      dataIndex: "d12",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "21",
      title: "13",
      dataIndex: "d13",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "22",
      title: "14",
      dataIndex: "d14",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "23",
      title: "15",
      dataIndex: "d15",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "24",
      title: "16",
      dataIndex: "d16",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "25",
      title: "17",
      dataIndex: "d17",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "26",
      title: "18",
      dataIndex: "d18",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "27",
      title: "19",
      dataIndex: "d19",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },
    {
      key: "28",
      title: "20",
      dataIndex: "d20",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "29",
      title: "21",
      dataIndex: "d21",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "30",
      title: "22",
      dataIndex: "d22",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "31",
      title: "23",
      dataIndex: "d23",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "100",
      title: "24",
      dataIndex: "d24",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "32",
      title: "25",
      dataIndex: "d25",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "33",
      title: "26",
      dataIndex: "d26",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "34",
      title: "27",
      dataIndex: "d27",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "35",
      title: "28",
      dataIndex: "d28",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "36",
      title: "29",
      dataIndex: "d29",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "37",
      title: "30",
      dataIndex: "d30",
      valueType: "text",
      align: "center",
      width: 100,
    },

    {
      key: "38",
      title: "31",
      dataIndex: "d31",
      valueType: "text",
      align: "center",
      width: 100,
      render: (text) => {
        return text.toFixed(2);
      },
    },

    {
      key: "39",
      title: "确认状态",
      dataIndex: "state",
      valueType: "text",
      align: "center",
      width: 100,
      fixed: "right",
      width: 120,
    },
  ];

  const handleResetFields = (type) => {
    form.resetFields();
  };

  /**
   *
   * @param handleSearch 搜索
   */
  // const search = async () => {
  //   setLoading(true);
  //   debugger
  //   let data = await postListInit({
  //     yearth: 2022,
  //     month: 9,
  //     // classtype:document.getElementsByName
  //   });
  //   if (data.status == 200) {
  //     setLoading(false);
  //     setTableList(data.list);
  //   }
  // };

  useEffect(() => {
    // handleSearch()
  }, []);

  const handleSearch = (e) => {
    form.validateFields().then(async (values) => {
      setLoading(true);
      let data = await postListInit({
        yearth: moment(values.month).format(globalConfig.form.onlyYear),
        month: moment(values.month).format(globalConfig.form.onlyMonth),
        classtype: values.classtype,
        pageNum: 1,
        pageSize: 100000,
      });
      if (data.status == 200) {
        setLoading(false);
        setTableList(data.list);
        // var num = 0;
        // data.list.map((item) => {
        //   num = item.overwork + num;
        //   setHours(num);

        // });

        setAverage(1000 / data.list.length);
        message.success("查询成功！");
      } else {
        message.error(data.message);
      }
    });
  };

  // 导出
  const downloadExcel = async () => {
    var option = {};
    var dataTable = [];
    if (TableList.length > 0) {
      for (let i in TableList) {
        let obj = {
          departmentshortname: TableList[i].departmentshortname,
          employeename: TableList[i].employeename,
          areaname: TableList[i].areaname,
          defaultlinename: TableList[i].defaultlinename,
          defalutshifttypename: TableList[i].defalutshifttypename,
          defaultshiftclassname: TableList[i].defaultshiftclassname,
          shifthour: TableList[i].shifthour,
        };
        dataTable.push(obj);
      }
    }
    option.fileName = "班别班次维护";
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: "sheet",
        sheetFilter: [
          "departmentshortname",
          "employeename",
          "areaname",
          "defaultlinename",
          "defalutshifttypename",
          "defaultshiftclassname",
          "shifthour",
        ],
        sheetHeader: [
          "部门",
          "员工",
          "区域",
          "线体",
          "班别",
          "班次",
          "花费时间",
        ],
      },
    ];
    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  };

  return (
    <div>
      <PageContainer />
      <Form
        style={{ margin: "20px 0", background: "#fff", padding: "15px 10px" }}
        className="ant-advanced-search-form"
        onFinish={handleSearch}
        form={form}
        name="form_in_modal"
        initialValues={{
          month: moment(),
          // sdate2:moment( lastdate,globalConfig.form.onlyDateFormat),
        }}
      >
        <Row gutter={40}>
          <Col span={6} style={{ display: "block" }}>
            <Form.Item name="month" label="日期" {...formItemLayout}>
              <DatePicker
                defaultValue={moment()}
                format={"YYYY-MM"}
                picker="month"
              />
            </Form.Item>
          </Col>

          <Col span={6} style={{ display: "block" }}>
            <Form.Item name="classtype" label="班别" {...formItemLayout}>
              <Select allowClear showSearch>
                {shiftTypeList != null
                  ? shiftTypeList.map(function (item, index) {
                      return (
                        <Select.Option key={index} value={item.key}>
                          {item.label}
                        </Select.Option>
                      );
                    })
                  : ""}
              </Select>
            </Form.Item>
          </Col>

          <Col span={6} style={{ display: "block" }}>
            <Form.Item name="employeeno" label="员工编号" {...formItemLayout}>
              <Input></Input>
            </Form.Item>
          </Col>

          <Col span={6} style={{ display: "block" }}>
            <Form.Item
              name="employeepattributes"
              label="员工属性"
              {...formItemLayout}
            >
              <Select allowClear showSearch>
                {personnelList != null
                  ? personnelList.map(function (item, index) {
                      return (
                        <Select.Option key={index} value={item.key}>
                          {item.label}
                        </Select.Option>
                      );
                    })
                  : ""}
              </Select>
            </Form.Item>
          </Col>

          {/* <Button type="primary" htmlType="submit">
            <SearchOutlined />
            查询
          </Button>
          <Button
            style={{ marginLeft: "7px" }}
            onClick={() => handleResetFields()}
          >
            <ClearOutlined />
            清空
          </Button> */}
        </Row>

        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              <SearchOutlined />
              查询
            </Button>
            <Button
              style={{ marginLeft: "7px" }}
              onClick={() => handleResetFields()}
            >
              <ClearOutlined />
              清空
            </Button>
          </Col>
        </Row>
      </Form>

      <Table
        title={() => {
          return (
            <>
              <span>查询表格</span>
              <span
                style={{ color: "red", fontSize: "16px", marginLeft: "10px" }}
              >
                *加班总时长&nbsp;{hours.toFixed(2)}&nbsp;小时,平均加班工时&nbsp;
                {average.toFixed(2)}&nbsp;小时
              </span>
            </>
          );
        }}
        dataSource={TableList}
        columns={TableColumns}
        scroll={{
          x: 1500,
          y: 550,
        }}
        loading={loading}
        pagination={false}
      />
    </div>
  );
};

export default connect(({ workHours }) => ({ workHours }))(Component);

// {
//       downloadExcel={downloadExcel}
//       scroll={{ y: 500 }}
//       tableName={TableName}
//       data={TableList}
//       loading={true}
//       pagination={pagination}
//       columns={TableColumns}
//       TableWidth={"100%"}
//       handleAdd={handleAdd}
//       tableModels={TableModelsData}
//       PaginationComponentsChanger={PaginationComponentsChanger}
//       handleResetFields={handleResetFields}
//       ModalShowChanger={ModalShowChanger}
//    }
