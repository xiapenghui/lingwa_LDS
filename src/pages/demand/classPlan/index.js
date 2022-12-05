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
import { postListInit } from "@/services/demand/classPlan";

const columns = [
  {
    title: "产线",
    dataIndex: "LineName",
    key: "LineName",
  },
  {
    title: "班次",
    dataIndex: "ShiftName",
    key: "ShiftName",
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
    title: "人数",
    dataIndex: "LineCountPeople",
    key: "LineCountPeople",
  },
  {
    title: "成员",
    dataIndex: "PartsWorker",
    key: "PartsWorker",
    render: (text) => {
      let list = text.split(",");
      return list.map((item) => <Tag color="success">{item}</Tag>);
    },
  },
];

const Components = ({ classPlan, dispatch }) => {
  const [form] = Form.useForm();
  const [dataSourceInfo, setDataSourceInfo] = useState([]);
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
      let data = await postListInit({
          Time: moment(values.Time).format(globalConfig.form.onlyDateFormat),
          shiftId: newShiftId,
      });
      if (data.status === "200") {
        debugger
        setDataSourceInfo(data.list);
        message.success("查询成功!");
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
        >
          <Row gutter={40}>
            <Col span={6} style={{ display: "block" }}>
              <Form.Item name="Time" label="选择日期" {...formItemLayout}>
                <DatePicker
                  style={{ width: "100%" }}
                  format={globalConfig.form.onlyDateFormat}
                  defaultValue={moment()}
                />
              </Form.Item>
            </Col>

            {/* <Col span={6} style={{ display: "block" }}>
              <Form.Item
                name="ShiftName"
                label="班次"
                hasFeedback
                {...formItemLayout}
              >
                <Select
                  allowClear
                  showSearch
                >
                  {shiftList.map(function (item, index) {
                    return (
                      <Select.Option key={index} value={item.value}>
                        {item.label}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col> */}

            <Col span={18} style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit">
                <SearchOutlined />
                查询
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      <div className="homeBox">
        <div style={{ width: "100%", background: "#fff" }}>
          <Table dataSource={dataSourceInfo} columns={columns} />
        </div>
      </div>
    </PageContainer>
  );
};

export default connect(({ classPlan }) => ({ classPlan }))(Components);
