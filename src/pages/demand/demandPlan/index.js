import React, { useState, useEffect } from "react";
import { Card, Col, Row, Table, Form, DatePicker, Button, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import globalConfig from "../../../../config/defaultSettings";
import moment from "moment";
import { postListInit,ParamShow } from "@/services/demand/demandPlan";
import "../index.less";
const formItemLayout = globalConfig.table.formItemLayout;

const spanStyle = {
  color: "green",
  fontSize: "28px",
  marginRight: "15px",
  fontWeight: "bold",
};

const columns = [
  {
    title: "产线",
    dataIndex: "LineName",
    key: "LineName",
  },
  {
    title: "需求量(日)",
    dataIndex: "Requirement",
    key: "Requirement",
  },
  {
    title: "班次数(日)",
    dataIndex: "ShiftNums",
    key: "ShiftNums",
  },
  {
    title: "最优产能",
    dataIndex: "OptimalProduce",
    key: "OptimalProduce",
  },
  {
    title: "CAMA",
    dataIndex: "cama",
    key: "cama",
  },
  {
    title: "班次详情",
    dataIndex: "ShiftDetails",
    key: "ShiftDetails",
  },
  {
    title: "需求人数",
    dataIndex: "PeopleRequire",
    key: "PeopleRequire",
  },
];

const Components = ({ demandPlan, dispatch }) => {
  const [form] = Form.useForm();
  const { TableList } = demandPlan;
  const [dataSourceInfo, setDataSourceInfo] = useState([]);
  const [newHopeNum, setnewHopeNum] = useState(0);
  const [newPeopleRequire, setnewPeopleRequire] = useState(0);
  const [newShiftNums, setnewShiftNums] = useState(0);
  const [newDemandSpillover, setnewDemandSpillover] = useState(0);
  const [newCUseWorker, setnewCUseWorker] = useState(0);
  const [newGAP, setnewGAP] = useState(0);


  useEffect(() => {
    handSearch();
    setTimeout(()=>{
      numList()
    },1000)
  }, []);

  const handSearch = (e) => {
    form.validateFields().then(async (values) => {
      let data = await postListInit({
        Time: moment(values.Time).format(
          globalConfig.form.onlyDateFormat
        ),
      });
      if (data.status === "200") {
        setDataSourceInfo(data.list);
        numList();
        message.success("查询成功!");
      }
    });
  };

  //求和
  const numList = async () => {
    let data = await ParamShow({
      Time: document.getElementById("DatePicker3").value,
    });
    if (data.status === "200") {
      setnewHopeNum(data.list[0]?.Requirement)
      setnewPeopleRequire(data.list[0]?.PeopleRequire)
      setnewShiftNums(data.list[0]?.ShiftNums)
      setnewDemandSpillover(data.list[0].RequirementOut)
      setnewCUseWorker(data.list[0].CUseWorker)
      setnewGAP(data.list[0].GAP)
    }else{
      setnewHopeNum(0)
      setnewPeopleRequire(0)
      setnewShiftNums(0)
      setnewDemandSpillover(0)
      setnewCUseWorker(0)
      setnewGAP(0)
    }
  }

  const disStyle = (record) => {
    if (record.OutFlag == 1) {
      return "diffRow";
    } else {
      return "";
    }
  };

  return (
    <PageContainer>
      <div className="homeBox">
        <div className="handBox">
          <Row gutter={16}>
            <Col span={4}>
              <Card title="需求量" bordered={false}>
                <span style={spanStyle}>{newHopeNum}</span>PCS
              </Card>
            </Col>
            <Col span={4}>
              <Card title="需求人数" bordered={false}>
                <span style={spanStyle}>{newPeopleRequire}</span>人
              </Card>
            </Col>
            <Col span={4}>
              <Card title="需求溢出数" bordered={false}>
                <span style={spanStyle}>{newDemandSpillover}</span>条
              </Card>
            </Col>
            <Col span={4}>
              <Card title="批次量" bordered={false}>
                <span style={spanStyle}>{newShiftNums}</span>班
              </Card>
            </Col>
            <Col span={4}>
              <Card title="可用人数" bordered={false}>
                <span style={spanStyle}>{newCUseWorker}</span>人
              </Card>
            </Col>
            <Col span={4}>
              <Card title="GAP" bordered={false}>
                <span style={spanStyle}>{newGAP}</span>人
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
                    id="DatePicker3"
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

        <div style={{ width: "100%", background: "#fff", marginTop: "20px" }}>
          <Table
            dataSource={dataSourceInfo}
            columns={columns}
            rowClassName={disStyle}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default connect(({ demandPlan }) => ({ demandPlan }))(Components);
