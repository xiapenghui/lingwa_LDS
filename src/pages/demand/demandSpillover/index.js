//需求溢出

import React, { useState } from "react";
import { Card, Col, Row, Table } from "antd";
import { Link, connect } from "umi";

const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号",
  },
];

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
  },
];

const TableName = "demandSpillover";
const Components = ({}) => {
  return (
    <div className="homeBox">
      <div className="handBox">
        <Row gutter={16}>
          <Col span={4}>
            <Card title="溢出生产线" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={4}>
            <Card title="总需求" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </div>

      <div style={{ width: "100%", background: "#fff", marginTop: "20px" }}>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </div>
  );
};

export default connect(({ demandSpillover }) => ({ demandSpillover }))(
  Components
);
