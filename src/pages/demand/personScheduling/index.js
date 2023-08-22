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
  Radio,
} from "antd";
import { SearchOutlined ,PlusOutlined } from "@ant-design/icons";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import globalConfig from "../../../../config/defaultSettings";
import moment from "moment";
import "../index.less";

import {
  postListInit,
  getLine,
  EmployeeNoList,
  Modify,
  LineInfo,
  ClassCUseWorker,
  AddClass
} from "@/services/demand/personScheduling";
import number from "@/pages/product/number";
import { set } from "lodash";
const formItemLayout = globalConfig.table.formItemLayout;

const Components = ({ personScheduling, dispatch }) => {
  const [form] = Form.useForm();
  const [formModel] = Form.useForm();
  const [formModel2] = Form.useForm();
  const { TableList } = personScheduling;
  const [dataSourceInfo, setDataSourceInfo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClassOpen, setIsClassOpen] = useState(false);
  
  const [newList, setNewList] = useState([]);
  const [peopleData, setPeopleData] = useState([]);
  const [morning, setMorning] = useState(0);
  const [morningPeo, setMorningPeo] = useState('');
  const [noon, setNoon] = useState(0);
  const [noonPeo, setNoonPeo] = useState('');
  const [night, setNight] = useState(0);
  const [nightPeo, setNightPeo] = useState('');
  const [lineMeter, setLineMeter] = useState("");
  const [classMeter, setClassMeter] = useState("");

  const [dataSource2, setDataSource2] = useState([]);
  const [peoName, setPeoName] = useState("");
  const [lineId, setLineId] = useState(0);
  const [shiftId, setShiftId] = useState(0);
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
      title: "cama",
      dataIndex: "cama",
      key: "cama",
      width: 100,
    },


    {
      title: "需求数量",
      dataIndex: "Requirement",
      key: "Requirement",
      width: 100,
    },


    {
      title: "最优产能",
      dataIndex: "OptiamlProduce", 
      key: "OptiamlProduce",
      width: 100,
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
      title: "需求人数",
      dataIndex: "RequireWorker",
      key: "RequireWorker",
      width: 100,
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
              <a onClick={() => handModal(item, record)}>{item}</a>
            </Space>
          </Tag>
        ));
      },
    },
    // {
    //   title: "操作",
    //   width: 150,
    //   dataIndex: "address",
    //   key: "address",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Button  type="primary"  onClick={() => handAddClass(record)}>增加班次</Button>
    //     </Space>
    //   ),
    // },
  ];

  const columns2 = [
    {
      title: "姓名",
      dataIndex: "EmployeeName",
      key: "EmployeeName",
    },
    {
      title: "产线",
      dataIndex: "lineName",
      key: "lineName",
    },


    {
      title: "班次",
      dataIndex: "shiftName",
      key: "shiftName",
    },
    // {
    //   title: "产线",
    //   dataIndex: "LineId",
    //   key: "LineId",
    // },
    {
      title: "状态",
      dataIndex: "classstate",
      key: "classstate",
      render: (text, record) => {
        if (record.ClassState == '排班') {
          return <Tag color="success">
            排班
          </Tag>
        } else {
          return <Tag color="error">
            撤销
          </Tag>
        }
      },

    },
    {
      title: "日期",
      dataIndex: "Time",
      key: "Time",
    },
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
        ShiftName: newShiftId,
        LineId: values.LineName
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
        setMorning(dataPeople.list.length == 0 ? 0 : dataPeople.list[1]?.ClassCUseWorker);
        setMorningPeo(dataPeople.list[1]?.ClassCUseWorkerInfo);
        setNoon(dataPeople.list.length == 0 ? 0 : dataPeople.list[2]?.ClassCUseWorker);
        setNoonPeo(dataPeople.list[2]?.ClassCUseWorkerInfo);
        setNight(dataPeople.list.length == 0 ? 0 : dataPeople.list[0]?.ClassCUseWorker);
        setNightPeo(dataPeople.list[0]?.ClassCUseWorkerInfo);

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
      // ShiftId: classMeter,
      EmployeeName: values.EmployeeName,
      // LineId: lineMeter,
      ModifyLineId: values.LineName,
      ModifyShiftId: values.ShiftName,
      Time: document.getElementById("DatePicker2").value + " " + "00:00:00",
      // ClassState: 2,
      ModiData: dataSource2,
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

  const handleCancelClass=()=>{
    setIsClassOpen(false)
  }


  //点击行获取数据
  const test = (val) => {
    setLineMeter(val.LineId);
    setClassMeter(val.ShiftName);
  };

  const handLineSearch = async () => {
    //打开弹窗获取线体
    let dataLine = await LineInfo({
      Time: document.getElementById("DatePicker").value,
    });
    if (dataLine.status === "200") {
      setNewList(dataLine.list);
    }
  };

  const handModal = async (val) => {
    formModel.resetFields();
    setPeoName(val);
    //打开弹窗获取线体
    let dataLine = await LineInfo({
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
    setDataSource2([]);
    formModel.setFieldsValue({
      // LineName: val.LineName,
      EmployeeName: val,
      LineName: "",
      ShiftName: "",
      // ShiftName: newShiftName,
      // people: val.PartsWorker,
      // ShiftId: val.ShiftName,
      // LineId: val.LineId,
    });
  };

  //排班撤销
  var newJson = [];
  var arr = [];
  const isOk = (value) => {
    if (value == "2") {
   
      newJson.push({
        EmployeeName: peoName,
        lineName: lineId == undefined ? '' : document.getElementsByClassName(
          "ant-select-item-option-active"
        )[0]?.title,
        shiftName: shiftId == undefined ? '' : document.getElementsByClassName(
          "ant-select-item-option-active"
        )[1]?.title,
        Time: document.getElementById("DatePicker2").value,
        ClassState: '排班',
      });
      arr = [...dataSource2, newJson];
      setDataSource2(arr.flat());
    } else {
      // setDataSource2([]);
      newJson.push({
        EmployeeName: peoName,
        lineName: lineId == undefined ? '' : document.getElementsByClassName(
          "ant-select-item-option-active"
        )[0]?.title,
        shiftName: shiftId == undefined ? '' : document.getElementsByClassName(
          "ant-select-item-option-active"
        )[1]?.title,
        Time: document.getElementById("DatePicker2").value,
        ClassState: '撤销',
      });
      arr = [...dataSource2, newJson];
      setDataSource2(arr.flat());
    }
  };




  //线体下拉
  const handLine = (value) => {
     setLineId(value);
  };

  //班次下拉
  const handShift = (value) => {
    // if (value == "早班") {
    //   value = 1;
    // } else if (value == "中班") {
    //   value = 2;
    // } else {
    //   value = 3;
    // }
   
    if (value == undefined) {
      setShiftId(value);
    }else{
      setShiftId(value);
    }
  };

  
  const disStyle = (record) => {
    if (record.OutFlag == 1) {
      return "diffRow";
    } else {
      return "";
    }
  };



  //增加班次
  const handAddClass = async () => {
     //打开弹窗获取线体
     formModel2.resetFields();
     let dataLine = await LineInfo({
      Time: document.getElementById("DatePicker").value,
    });
    if (dataLine.status === "200") {
      if(dataLine.list.length==0){
       return  message.error('当前日期没有对应的产线!');
      }
      setNewList(dataLine.list);
    }
    setIsClassOpen(true)
  };

  //保存班次弹窗
  const onSave2 = async (values) => {
    setIsClassOpen(false);
    let data = await AddClass({
      ModifyLineId: values.LineName,
      ModifyShiftId: values.ShiftName,
      Time: document.getElementById("DatePicker5").value + " " + "00:00:00",
      requre: values.requre,
       
    });
    if (data.status == "200") {
      handSearch();
      message.success(data.message);
    } else {
      message.error(data.message);
    }
  };
  


  return (
    <PageContainer>
      <div className="homeBox">
        <div className="handBox handBoxNo">
          <Row gutter={16}>
            <Col span={8}>
              <Card
                title={
                  <>
                    <span>早班可用人员</span>
                    <span style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginLeft: "10px",
                    }}
                    >
                      （{morning}）</span>人 </>
                }
                bordered={false}
              >
                {
                  morningPeo?.split(",").map((item) => (
                    <Tag color="success">
                      <Space size="middle">
                        {/* {item} */}
                        <a onClick={() => handModal(item)}>{item}</a>
                      </Space>
                    </Tag>
                  ))
                }
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title={
                  <>
                    <span>中班可用人员</span>
                    <span style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginLeft: "10px",
                    }}
                    >（{noon}）</span>人
                  </>
                }
                bordered={false}
              >
                {
                  noonPeo?.split(",").map((item) => (
                    <Tag color="success">
                      <Space size="middle">
                        <a onClick={() => handModal(item)}>{item}</a>
                      </Space>
                    </Tag>
                  ))
                }
              </Card>
            </Col>

            <Col span={8}>
              <Card
                title={
                  <>
                    <span>晚班可用人员</span>
                    <span style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginLeft: "10px",
                    }}
                    >（{night}）</span>人
                  </>
                }
                bordered={false}
              >
                {
                  nightPeo?.split(",").map((item) => (
                    <Tag color="success">
                      <Space size="middle">
                        <a onClick={() => handModal(item)}>{item}</a>
                      </Space>
                    </Tag>
                  ))
                }
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
            // onFinish={handSearch}
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

              <Col span={6} style={{ display: "block" }}>
                <Form.Item
                  name="LineName"
                  label="产线"
                  hasFeedback
                  {...formItemLayout}
                  onFocus={handLineSearch}
                >
                  <Select allowClear showSearch>
                    {newList.map(function (item, index) {
                      return (
                        <Select.Option key={index} value={item.LineId} >
                          {item.LineName}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={6} style={{ textAlign: "right" }}>
                <Button type="primary" htmlType="submit" onClick={()=>handSearch()}>
                  <SearchOutlined />
                  查询
                </Button>

                <Button type="primary" htmlType="submit" onClick={()=>handAddClass()} style={{'marginLeft':'15px'}}>
                <PlusOutlined />
                  新增班次
                </Button>

              </Col>
            </Row>
          </Form>
        </div>

        <div style={{ width: "100%", background: "#fff", marginTop: "20px" }}>
          <Table
            dataSource={dataSourceInfo}
            columns={columns}
            rowClassName={disStyle}
            onRow={(record) => {
              return {
                onClick: (event) => {
                  test(record);
                }, // 点击行
              };
            }}
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
          // initialValues={{
          //   LineName: LineNamedata,
          //   ShiftName: shiftData,
          //   people: peopleData,
          // }}
          >
            <Row gutter={40}>
              <Col span={24} style={{ display: "block" }}>
                <Form.Item
                  name="EmployeeName"
                  label="姓名"
                  hasFeedback
                  {...formItemLayout}
                >
                  <Input disabled />
                </Form.Item>
              </Col>

              <Col span={24} style={{ display: "block" }}>
                <Form.Item
                  name="Time"
                  label="日期"
                  hasFeedback
                  {...formItemLayout}
                  rules={[
                    {
                      required: true,
                      message: "请选择日期",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    format={globalConfig.form.onlyDateFormat}
                    // defaultValue={moment()}
                    id="DatePicker2"
                  />
                </Form.Item>
              </Col>

              <Col span={24} style={{ display: "block" }}>
                <Form.Item
                  name="LineName"
                  label="产线"
                  {...formItemLayout}
                  // rules={
                  //   dataSource2.length == 0 ? [
                  //     {
                  //       type: "string",
                  //       required: true,
                  //       message: "请选择产线",
                  //     },
                  //   ] : null
                  // }

                >
                  <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    onChange={handLine}
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
                  rules={
                    dataSource2.length == 0 ? [
                      {
                        type: "string",
                        required: true,
                        message: "请选择班次",
                      },
                    ] : null
                  }
                >
                  <Select allowClear showSearch onChange={handShift}>
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
                  name="ClassState"
                  label="状态"
                  hasFeedback
                  {...formItemLayout}
                >
                  <Button onClick={() => isOk(2)} type="primary">
                    排班
                  </Button>
                  <Button
                    type="primary"
                    danger
                    onClick={() => isOk(0)}
                    style={{ marginLeft: "10px" }}
                  >
                    撤销
                  </Button>
                </Form.Item>
              </Col>
              <Col span={24} style={{ display: "block" }}>
                <Table
                  dataSource={dataSource2}
                  columns={columns2}
                  pagination={false}
                />
              </Col>
            </Row>
          </Form>
        </Modal>





         {/* //增加班次弹出框 */}
         <Modal
          title="增加班次"
          open={isClassOpen}
          onOk={() => {
            formModel2
              .validateFields()
              .then((values) => {
                onSave2(values);
              })
              .catch((info) => {
                console.log("CreateForm Failed:", info);
              });
          }}
          onCancel={handleCancelClass}
          okText={"提交"}
        >
          <Form
            form={formModel2}
            name="ModalValueForm2"
          // initialValues={{
          //   LineName: LineNamedata,
          //   ShiftName: shiftData,
          // }}
          >
            <Row gutter={40}>
            
            

              <Col span={24} style={{ display: "block" }}>
                <Form.Item
                  name="LineName"
                  label="产线"
                  {...formItemLayout}
                  // rules={
                  //   dataSource2.length == 0 ? [
                  //     {
                  //       type: "string",
                  //       required: true,
                  //       message: "请选择产线",
                  //     },
                  //   ] : null
                  // }

                >
                  <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    onChange={handLine}
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
                  name="Time"
                  label="日期"
                  hasFeedback
                  {...formItemLayout}
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "请选择日期",
                  //   },
                  // ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    format={globalConfig.form.onlyDateFormat}
                    // defaultValue={moment()}
                    id="DatePicker5"
                  />
                </Form.Item>
              </Col>

              <Col span={24} style={{ display: "block" }}>
                <Form.Item
                  name="ShiftName"
                  label="班次"
                  hasFeedback
                  {...formItemLayout}
                  // rules={
                  //   dataSource2.length == 0 ? [
                  //     {
                  //       type: "string",
                  //       required: true,
                  //       message: "请选择班次",
                  //     },
                  //   ] : null
                  // }
                >
                  <Select allowClear showSearch onChange={handShift}>
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
                  name="requre"
                  label="需求量"
                  hasFeedback
                  {...formItemLayout}
                >
                  <Input />
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
