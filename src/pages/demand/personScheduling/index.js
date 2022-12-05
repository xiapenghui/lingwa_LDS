import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Table,
  Form,
  DatePicker,
  Button,
  message,
  Space,
  Modal,
  Select,
  Tag,
  Input,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import globalConfig from "../../../../config/defaultSettings";
import moment from "moment";
import {
  postListInit,
  getLine,
  EmployeeNoList,
  Modify,
  LineInfo,
  ClassCUseWorker,
} from "@/services/demand/personScheduling";
import number from "@/pages/product/number";
import { set } from "lodash";
const formItemLayout = globalConfig.table.formItemLayout;

const Components = ({ personScheduling, dispatch }) => {
  const [form] = Form.useForm();
  const [formModel] = Form.useForm();
  const { TableList } = personScheduling;
  const [dataSourceInfo, setDataSourceInfo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newList, setNewList] = useState([]);
  const [peopleData, setPeopleData] = useState([]);
  const [morning, setMorning] = useState(0);
  const [noon, setNoon] = useState(0);

  const [shiftList, setShiftList] = useState([
    {
      value: "早班",
      label: "早班",
    },
    {
      value: "中班",
      label: "中班",
    },
    {
      value: "晚班",
      label: "晚班",
    },
  ]);

  const columns = [
    {
      title: "产线",
      dataIndex: "LineName",
      key: "LineName",
      width: 200,
    },
    {
      title: "班次",
      dataIndex: "ShiftName",
      key: "ShiftName",
      width: 80,
      render: (text) => {
        if (text == "1") {
          return (text = "早班");
        } else if (text == "2") {
          return (text = "中班");
        } else {
          return (text = "晚班");
        }
      },
    },
    {
      title: "当前人数",
      width: 120,
      dataIndex: "CurrentWorker",
      key: "CurrentWorker",
    },
    {
      title: "最优人数",
      width: 120,
      dataIndex: "OptimalWorker",
      key: "OptimalWorker",
    },
    {
      title: "成员",
      dataIndex: "PartsWorker",
      key: "PartsWorker",
      render: (text, record) => {
        let list = text.split(",");
        return list.map((item) => (
          <Tag color="success">
            <Space size="middle">
              <a onClick={() => handModal(item)}>{item}</a>
            </Space>
          </Tag>
        ));
      },
    },
    // {
    //   title: "操作",
    //   width: 80,
    //   dataIndex: "address",
    //   key: "address",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a onClick={() => handModal(record)}>调度</a>
    //     </Space>
    //   ),
    // },
  ];

  useEffect(() => {
    handSearch();
  }, []);

  const handSearch = (e) => {
    form.validateFields().then(async (values) => {
      let newShiftId;
      if (values.ShiftName == "早班") {
        newShiftId = "1";
      } else if (values.ShiftName == "中班") {
        newShiftId = "2";
      } else if (values.ShiftName == "晚班") {
        newShiftId = "3";
      }
      //获取列表
      let data = await postListInit({
        Time: moment(values.Time).format(globalConfig.form.onlyDateFormat),
        // Time: '2022-11-25',
        ShiftName: newShiftId,
      });
      if (data.status === "200") {
        setDataSourceInfo(data.list);
        message.success("查询成功!");
      }

      //早中，晚，可用人数
      let dataPeople = await ClassCUseWorker({
        Time: document.getElementById("DatePicker").value,
      });
      if (dataPeople.status === "200") {
        setMorning(dataPeople.list[0]?.ClassCUseWorker);
        setNoon(dataPeople.list[1]?.ClassCUseWorker);
      }
    });
  };

  //保存数据
  const onSave = async (values) => {
    setIsModalOpen(false);
    let newShift;
    if (values.ShiftName == "早班") {
      newShift = 1;
    } else if (values.ShiftName == "中班") {
      newShift = 2;
    } else {
      newShift = 3;
    }
    let data = await Modify({
      ShiftId: values.ShiftId,
      EmployeeNo: values.EmployeeNo,
      LineId: values.LineId,
      ModifyLineId: values.LineName,
      ModifyShiftId: newShift,
      Time: document.getElementById("DatePicker").value + " " + "00:00:00",
      // lineName:
    });
    if (data.status == "200") {
      handSearch();
      message.success(data.message);
    } else {
      debugger;
      message.error(data.message);
    }
  };
  //关闭弹出框
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handModal = async (val) => {
    //打开弹窗获取人员
    // let data = await EmployeeNoList({
    //   LineId: val.LineId,
    //   Time: document.getElementById("DatePicker").value,
    //   // Time: '2022-11-25',
    //   ShiftNum: val.ShiftName,
    // });
    // if (data.status === "200") {
    //   setPeopleData(data.list);
    // }

    //打开弹窗获取线体
    let dataLine = await LineInfo({
      // Time: moment(),
      Time: document.getElementById("DatePicker").value,
    });
    if (dataLine.status === "200") {
      setNewList(dataLine.list);
    }

    let newShiftName = val.ShiftName;
    if (newShiftName == "1") {
      newShiftName = "早班";
    } else if (newShiftName == "2") {
      newShiftName = "中班";
    } else {
      newShiftName = "晚班";
    }

    setIsModalOpen(true);
    formModel.setFieldsValue({
      // LineName: val.LineName,
      LineName: "",
      ShiftName: "",
      // ShiftName: newShiftName,
      // people: val.PartsWorker,

      ShiftId: val.ShiftName,
      EmployeeNo: val.EmployeeNo,
      LineId: val.LineId,
    });
  };

  return (
    <PageContainer>
      <div className="homeBox">
        <div className="handBox">
          <Row gutter={16}>
            <Col span={6}>
              <Card
                title={
                  <>
                    <span>早班可用人员</span>
                    {/* <span>（0）人</span> */}
                  </>
                }
                bordered={false}
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginRight: "10px",
                  }}
                >
                  {morning}
                </span>
                人
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title={
                  <>
                    <span>中班班可用人员</span>
                    {/* <span>（0）人</span> */}
                  </>
                }
                bordered={false}
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginRight: "10px",
                  }}
                >
                  {noon}
                </span>
                人
              </Card>
            </Col>
            <Col span={6}>
              <Card
                extra={
                  <>
                    <a href="#" style={{ marginRight: "30px" }}>
                      释放
                    </a>
                    <a href="#">重置</a>
                  </>
                }
                title={
                  <>
                    <span>待加入人员</span>
                    <span>（0）人</span>
                  </>
                }
                bordered={false}
              >
                Card content
              </Card>
            </Col>
            <Col span={6}>
              <Card
                extra={<a href="#">重置</a>}
                title={
                  <>
                    <span>待撤离人员</span>
                    <span>（0）人</span>
                  </>
                }
                bordered={false}
              >
                Card content
              </Card>
            </Col>
          </Row>
        </div>

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
          >
            <Row gutter={40}>
              <Col span={6} style={{ display: "block" }}>
                <Form.Item name="Time" label="选择日期" {...formItemLayout}>
                  <DatePicker
                    style={{ width: "100%" }}
                    format={globalConfig.form.onlyDateFormat}
                    defaultValue={moment()}
                    id="DatePicker"
                  />
                </Form.Item>
              </Col>

              <Col span={6} style={{ display: "block" }}>
                <Form.Item
                  name="ShiftName"
                  label="班次"
                  hasFeedback
                  {...formItemLayout}
                >
                  <Select allowClear showSearch>
                    {shiftList.map(function (item, index) {
                      return (
                        <Select.Option key={index} value={item.value}>
                          {item.label}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12} style={{ textAlign: "right" }}>
                <Button type="primary" htmlType="submit">
                  <SearchOutlined />
                  查询
                </Button>
              </Col>
            </Row>
          </Form>
        </div>

        <div style={{ width: "100%", background: "#fff", marginTop: "20px" }}>
          <Table dataSource={dataSourceInfo} columns={columns} />
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
        >
          <Form
            form={formModel}
            name="ModalValueForm"
            // initialValues={{
            //   LineName: LineNamedata,
            //   ShiftName: shiftData,
            //   people: peopleData,
            // }}
          >
            <Row gutter={40}>
              <Col span={24} style={{ display: "block" }}>
                <Form.Item
                  name="LineName"
                  label="产线"
                  {...formItemLayout}
                  rules={[
                    {
                      required: true,
                      message: "请选择产线",
                    },
                  ]}
                >
                  <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"

                    // onFocus={() => handLine()
                    // }
                  >
                    {newList.map(function (item, index) {
                      return (
                        <Select.Option key={index} value={item.LineId}>
                          {item.LineName}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24} style={{ display: "block" }}>
                <Form.Item
                  name="ShiftName"
                  label="班次"
                  hasFeedback
                  {...formItemLayout}
                  rules={[
                    {
                      type: "string",
                      required: true,
                      message: "请选择班次",
                    },
                  ]}
                >
                  <Select allowClear showSearch>
                    {shiftList.map(function (item, index) {
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
                  name="EmployeeNo"
                  label="成员"
                  hasFeedback
                  {...formItemLayout}
                  rules={[
                    {
                      type: "string",
                      required: true,
                      message: "请选择成员",
                    },
                  ]}
                >
                  <Select allowClear showSearch>
                    {peopleData.map(function (item, index) {
                      return (
                        <Select.Option key={index} value={item.EmployeeNo}>
                          {item.EmployeeName}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24} style={{ display: "none" }}>
                <Form.Item
                  name="ShiftId"
                  label="ShiftId"
                  hasFeedback
                  {...formItemLayout}
                >
                  <Input />;
                </Form.Item>
              </Col>

              <Col span={24} style={{ display: "none" }}>
                <Form.Item
                  name="LineId"
                  label="LineId"
                  hasFeedback
                  {...formItemLayout}
                >
                  <Input />;
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    </PageContainer>
  );
};

export default connect(({ personScheduling }) => ({ personScheduling }))(
  Components
);
